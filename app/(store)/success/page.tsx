'use client'

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useBasketStore from "../store"

export default function Success() {
	const searchParams = useSearchParams()
	const orderNumber = searchParams.get("orderNumber")
	const clearBasket = useBasketStore((state) => state.clearBasket)

	useEffect(() => {
		if (orderNumber) {
			clearBasket()
		}
	}, [orderNumber, clearBasket])

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50">
			<div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
				<div className="flex justify-center mb-8">
					<div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
						<svg
							className="h-9 w-9 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
						</svg>
					</div>
				</div>
				<h1 className="text-center font-bold">Thank you for your purchase!</h1>
				<div className="space-y-2">
					{orderNumber && (
						<div className="text-neutral-700 flex items-center space-x-5 my-1 justify-center">
							<span>Your order number is:</span>
							<span className="font-mono text-sm text-green-600">{orderNumber}</span>
						</div>
					)}
				</div>
				<div className="space-y-4">
					<p className="text-neutral-600 text-center">A confirmation email has been sent to your email address.</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button asChild className="bg-green-600 hover:bg-green-700">
							<Link href="/orders">View order details</Link>
						</Button>
						<Button asChild variant={"outline"}>
							<Link href="/">Continue shopping</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
