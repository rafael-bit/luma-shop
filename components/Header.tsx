'use client'

import { LuShoppingCart, LuPackage } from "react-icons/lu";
import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import Form from "next/form"

function Header() {
	const { user } = useUser()
	const createClerkPasskey = async () => {
		try {
			const response = await user?.createPasskey()
			console.log(response)
		} catch (error) {
			console.log("Error:", JSON.stringify(error, null, 2))
		}
	}

	return (
		<header className="flex flex-wrap justify-between items-center px-4 py-2">
			<div className="flex w-full flex-wrap justify-between items-center">
				<Link
					href="/"
					className="font-bold text-2xl mx-auto"
				>
					Luma Shop
				</Link>
				<Form action="/search" className="flex-1 mx-3">
					<input type="text" name="query" placeholder="Search for products" className="w-[100%] max-w-4xl border border-neutral-400 bg-neutral-50 outline-none px-2 py-1 rounded-lg text-neutral-700 placeholder:text-neutral-600" />
				</Form>
				<div className="flex items-center space-x-4 mt-3 sm:mt-0 flex-1 sm:flex-none">
					<Link
						href="/basket"
						className="relative flex flex-1 justify-center items-center sm:justify-start sm:flex-none gap-2 hover:text-neutral-900 hover:underline transition-all duration-200"
					>
						<LuShoppingCart className="w-5 h-5" />
						<span>My basket</span>
					</Link>
					<ClerkLoaded>
						<SignedIn>
							<Link
								href="/orders"
								className="relative flex flex-1 justify-center items-center sm:justify-start sm:flex-none gap-2 hover:text-neutral-900 hover:underline transition-all duration-200"
							>
								<LuPackage className="w-5 h-5" />
								<span>My orders</span>
							</Link>
						</SignedIn>

						{user ? (
							<div className="flex items-center gap-2">
								<UserButton />
								<div className="hidden sm:block text-xs">
									<p className="text-neutral-500">Welcome Back !</p>
									<p className="font-bold">{user.fullName}</p>
								</div>
							</div>
						) : (
							<SignInButton mode="modal" />
						)}

						{user?.passkeys.length === 0 && (
							<button
								onClick={createClerkPasskey}
								className="bg-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 animate-bounce transition-all duration-1000 py-2 px-3 rounded-lg text-sm"
							>
								Create passkey
							</button>
						)}
					</ClerkLoaded>
				</div>
			</div>
		</header>
	)
}

export default Header