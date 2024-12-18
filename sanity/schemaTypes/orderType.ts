import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
	name: "ordertype",
	title: "Order",
	type: "document",
	icon: BasketIcon,
	fields: [
		defineField({
			name: "orderNumber",
			title: "Order Number",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "stripeCheckoutSessionId",
			title: "Stripe Checkout Session Id",
			type: "string",
		}),
		defineField({
			name: "stripeCustomerId",
			title: "Stripe Customer Id",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "email",
			title: "Customer Email",
			type: "string",
			validation: (Rule) => Rule.required().email(),
		}),
		defineField({
			name: "stripePaymentIntentId",
			title: "Stripe Payment Intent Id",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "products",
			title: "Products",
			type: "array",
			of: [
				defineArrayMember({
					type: "object",
					fields: [
						defineField({
							name: "product",
							title: "Product Bought",
							type: "reference",
							to: [{ type: "productType" }],
						}),
						defineField({
							name: "quantity",
							title: "Quantity Purchased",
							type: "number",
						}),
					],
					preview: {
						select: {
							product: "product.name",
							quantity: "quantity",
							price: "product.price",
							image: "product.image",
						},
						prepare({ product, quantity, price, image }) {
							return {
								title: `${product} x ${quantity}`,
								subtitle: `${price} * ${quantity}`,
								media: image,
							};
						},
					},
				}),
			],
		}),
		defineField({
			name: "totalPrice",
			title: "Total Price",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),
		defineField({
			name: "currency",
			title: "Currency",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "amountDiscount",
			title: "Amount Discount",
			type: "number",
			validation: (Rule) => Rule.min(0),
		}),
		defineField({
			name: "status",
			title: "Order Status",
			type: "string",
			options: {
				list: [
					{ title: "Pending", value: "pending" },
					{ title: "Shipped", value: "shipped" },
					{ title: "Delivered", value: "delivered" },
					{ title: "Cancelled", value: "cancelled" },
					{ title: "Paid", value: "paid" },
				],
			},
		}),
		defineField({
			name: "orderDate",
			title: "Order Date",
			type: "datetime",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			name: "email",
			amount: "totalPrice",
			currency: "currency",
			orderId: "orderNumber",
			email: "email"
		},
		prepare({ name, amount, currency, orderId }) {
			const orderIdSnippet = orderId
				? `${orderId.slice(0, 5)}...${orderId.slice(-5)}`
				: "N/A";
			return {
				title: `${name} (${orderIdSnippet})`,
				subtitle: `${amount} ${currency}`,
				media: BasketIcon,
			};
		},
	},
});