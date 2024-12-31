import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
	if (!userId) {
		throw new Error("User ID is required");
	}

	const ORDERS_QUERY = defineQuery(`
    *[_type == "ordertype" && clerkUserId == $clerkUserId] | order(orderNumber desc) {
      _id,
      orderNumber,
      products[] {
        quantity,
        product-> {
          _id,
          name,
          price,
          image
        }
      },
      status,
      createdAt
    }
  `);

	try {
		const response = await sanityFetch({
			query: ORDERS_QUERY,
			params: { clerkUserId: userId },
		});

		if (!response?.data) {
			console.warn("No orders found for user:", userId);
		}

		return response.data || [];
	} catch (err) {
		console.error("Error fetching orders:", err, err);
		return [];
	}
}