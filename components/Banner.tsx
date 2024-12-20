import { COUPON_CODES } from "@/sanity/lib/sales/CouponCodes";
import { getAtiveSaleByCouponCode } from "@/sanity/lib/sales/getAtiveSalesByCouponCode";

export default async function Banner() {
	const sale = await getAtiveSaleByCouponCode(COUPON_CODES.BFL);

	if (!sale?.isActive) return null;

	return (
		<div className="bg-gradient-to-r from-blue-400 to-blue-800 text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-md">
			<div className="container mx-auto flex items-center justify-between">
				<div className="flex-1">
					<h2 className="text-2xl font-bold sm:text-4xl text-left mb-3">{sale.title}</h2>
					<p className="text-base sm:text-lg text-left font-semibold mb-5">{sale.description}</p>
					<div className="flex">
						<div className="bg-white text-neutral-900 py-3 px-6 full rounded-full shadow-md transform hover:scale-105 duration-300">
							<span className="text-sm sm:text-base">Use code: {" "}</span>
							<span className="font-bold text-blue-500">{sale.couponCode}</span>
							<span className="ml-2 text-sm sm:text-base">for {sale.discountAmount}% OFF</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}