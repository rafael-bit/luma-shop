import { getMyOrders } from "@/sanity/lib/orders/getMyOrders"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface Order {
	orderNumber: string; 	
}

export default async function Orders() {
	const { userId } = await auth()
	if (!userId) {
		redirect("/")
	}

	const orders = await getMyOrders(userId)

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-4">
			<div className="bg-white w-full max-w-4xl p-4 sm:p-8 rounded-xl shadow-lg">
				<h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-7">My Orders</h1>
				{orders.length === 0 ? (
					<div className="text-center text-neutral-600">
						<p>You have not orders yet.</p>
					</div>
				) : (
					<div className="space-y-3">
						{orders.map((order) => (
							<div key={order.orderNumber} className="bg-white overflow-hidden rounded-lg shadow-sm border border-neutral-200">
								<div className="border-b border-neutral-200 p-4 sm:p-6">
									<div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
										<div>
											<p className="text-sm text-neutral-600 mb-1 font-bold">Order ID:</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
