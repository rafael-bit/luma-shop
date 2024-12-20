export const COUPON_CODES = {
	BFL: "BFL",
	QUWAY: "QUWAY",
	REACT: "REACT",
	NEXT: "NEXT",
	MYSQL: "MYSQL",
} as const;

export type CouponCode = keyof typeof COUPON_CODES;