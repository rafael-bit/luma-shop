import { defineQuery } from "next-sanity";
import { CouponCode } from "./CouponCodes";
import { sanityFetch } from "../live";

export const getAtiveSaleByCouponCode = async (couponCode: CouponCode) => {
	const ACTIVE_BY_COUPON_CODE = defineQuery(`
    *[
      _type == "salestype"
      && couponCode == $couponCode
    ] | order(validFrom desc)[0]
  `);

	try {
		const response = await sanityFetch({
			query: ACTIVE_BY_COUPON_CODE,
			params: { couponCode },
		});

		return response?.data || null;
	} catch (err) {
		console.error("Error fetching active sale:", err);
		return null;
	}
};
