'use client'

import { SignInButton, useAuth, useUser } from "@clerk/nextjs"
import useBasketStore from "../store"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import AddToBasketButton from "@/components/AddToBasketButton"
import Image from "next/image"
import { imageUrl } from "@/sanity/lib/imageUrl"
import Loader from "@/components/Loader"
import { createCheckoutSession, MetaData } from "@/actions/createCheckoutSession"

export default function Basket() {
	const groupedItems = useBasketStore((state) => state.getGroupedItems())
	const isSignedIn = useAuth()
	const { user } = useUser()
	const router = useRouter()
	const [isClient, setIsClient] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return <Loader />
	}

	if (groupedItems.length === 0) {
		return (
			<div className="flex flex-col items-center justify-start min-h-screen bg-neutral-100 p-4">
				<div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
					<h1 className="text-2xl font-bold text-center">
						Your basket is empty
					</h1>
					<p className="text-neutral-600  text-center">
						You haven't added any products to your basket yet.
					</p>
				</div>
			</div>
		)
	}

	const handleCheckout = async () => {
		if (!isSignedIn) return

		setIsLoading(true)
		try {
			const metadata: MetaData = {
				orderNumber: crypto.randomUUID(),
				customerName: user?.fullName ?? "Unknown",
				customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
				clerkUserId: user!.id
			}
			const checkoutUrl = await createCheckoutSession(groupedItems, metadata)
			if(checkoutUrl) {
				window.location.href = checkoutUrl
			}
		} catch (err) {
			console.log(err)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="container mx-auto p-4 max-w-6xl">
			<h1 className="text-2xl font-bold mb-3">Your Basket</h1>
			<div className="flex flex-col lg:flex-row gap-8">
				<div className="flex-grow">
					{groupedItems?.map((group) => (
						<div key={group.product._id} className="mb-5 p-3 border rounded-lg flex items-center justify-between">
							<div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
								{group.product.image && (
									<Image src={imageUrl(group.product.image).url()} alt={group.product.name ?? "Product Image"} className="w-full h-full object-container transition-transform duration-300 hover:scale-105 rounded" width={96} height={96} />
								)}
							</div>
							<div className="flex items-center ml-4 flex-shrink-0">
								<AddToBasketButton product={group.product} />
							</div>
						</div>
					))}
				</div>
				<div className="w-full lg:w-60 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
					<h2 className="text-xl font-semibold">Order Summary</h2>
					<div className="mt-4 space-y-2">
						<div className="flex justify-between">
							<span>Items</span>
							<span>{groupedItems.reduce((total, group) => total + group.quantity, 0)}</span>
						</div>
						<div className="flex justify-between text-xl font-bold border-t pt-3">
							<span>Total</span>
							<span>${groupedItems.reduce((total, group) => total + (group.product.price ?? 0) * group.quantity, 0).toFixed(2)}</span>
						</div>
					</div>
					{isSignedIn ? (
						<button onClick={handleCheckout} disabled={isLoading} className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:bg-gray-400">
							{isLoading ? "Loading..." : "Checkout"}
						</button>
					) : (
						<SignInButton mode="modal">
							<button className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign in to Checkout</button>
						</SignInButton>
					)
					}
				</div>
			</div>
		</div>
	)
}
