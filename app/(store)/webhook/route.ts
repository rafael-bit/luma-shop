import Stripe from "stripe";
import stripe from "@/sanity/lib/stripe";
import { NextResponse, NextRequest } from "next/server";
import { backEndClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { MetaData } from "@/actions/createCheckoutSession";

export async function POST(request: NextRequest) {
	const body = await request.text();
	const headersList = headers();

	const signature = (await headersList).get("stripe-signature");
	if (!signature) {
		return NextResponse.json({ error: "Missing stripe signature" }, { status: 400 });
	}

	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!webhookSecret) {
		return NextResponse.json({ error: "Missing webhook secret" }, { status: 400 });
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
	} catch (err) {
		return NextResponse.json({ error: `Invalid webhook: ${err}` }, { status: 400 });
	}

	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;

		try {
			const order = await createOrderInSanity(session);
			await backEndClient.create(order);
			return NextResponse.json({ message: "Order created successfully", order });
		} catch (err) {
			return NextResponse.json({ error: `Error creating order in Sanity: ${err}` }, { status: 500 });
		}
	}

	return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
	const {
		id,
		amount_total,
		currency,
		customer,
		metadata,
		payment_intent,
		total_details,
	} = session;

	const { orderNumber, customerEmail, customerName, clerkUserId } = metadata as MetaData;

	const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
		expand: ["data.price.product"],
	});

	const sanityProducts = lineItemsWithProduct.data.map((item) => ({
		_key: crypto.randomUUID(),
		productType: {
			_type: "reference",
			_ref: (item.price?.product as Stripe.Product)?.metadata?.id || "",
		},
		quantity: item.quantity || 0,
	}));

	const order = {
		_type: "order",
		orderNumber,
		stripeCheckoutSessionId: id,
		stripePaymentIntentId: payment_intent,
		stripeCustomerId: customer,
		clerkUserId: clerkUserId,
		email: customerEmail,
		customerName,
		currency,
		amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
		productType: sanityProducts,
		totalPrice: amount_total ? amount_total / 100 : 0,
		status: "paid",
		orderDate: new Date().toISOString(),
	};

	return order;
}