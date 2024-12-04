'use client'

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<header className="relative bg-neutral-50 top-0 bg-neutral-50/25">
			<nav
				aria-label="Header"
				className={`mx-auto flex max-w-7xl items-center justify-between sm:justify-around transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
			>
				<div className={`flex transition-transform duration-1000 p-3 ${isVisible ? 'translate-y-0' : 'translate-y-5'}`}>
					<Link href="#" className="flex items-center gap-5">
						<span className="sr-only">Luma</span>
						<Image alt="" src="/logo.png" width={50} height={50} />
						<h1 className="text-3xl font-bold text-primary hover:text-hover duration-300">Luma</h1>
					</Link>
				</div>
				<div className="flex sm:hidden mr-5">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className={`inline-flex items-center justify-center rounded-md p-2.5 text-neutral-900 transition-all duration-1000 ${isVisible ? 'translate-y-0' : 'translate-y-5'}`}
					>
						<span className="sr-only">Open main menu</span>
						<FaBarsStaggered aria-hidden="true" className="size-6" />
					</button>
				</div>
				<div className="hidden sm:flex items-center space-x-7">
					{['Home', 'Product', 'Collection', 'About', 'Contact'].map((item, index) => (
						<Link
							key={item}
							href="/"
							className={`text-sm/6 font-semibold text-neutral-900 transition-all duration-300 transform hover:-translate-y-1 hover:text-neutral-950 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
								} delay-${50 + index * 50}ms`}
						>
							{item}
						</Link>
					))}
				</div>
				<div className="hidden sm:flex items-center">
					<div className="flex items-center space-x-7 px-3">
						<IoSearchOutline className={`w-5 h-5 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`} />
						<LuShoppingCart className={`w-5 h-5 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`} />
					</div>
					<div className={`border-l border-neutral-500 px-3 py-1.5 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
						<button>Login</button>
					</div>
				</div>
			</nav>
			<Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="fixed inset-0 z-10 bg-neutral-50">
				<div className={`fixed inset-0 z-20 flex items-start justify-end transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
					<DialogPanel className="w-full sm:max-w-xs bg-primary h-full px-6 py-6 overflow-y-auto">
						<div className="flex items-center justify-between mb-6">
							<Link href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Luma</span>
								<Image src="/logo.png" alt="Luma logo" width={50} height={50} />
							</Link>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-primary hover:text-hover"
							>
								<span className="sr-only">Close menu</span>
								<HiOutlineXMark aria-hidden="true" className="size-6" />
							</button>
						</div>

						<div className="space-y-3">
							{['Docs', 'Components', 'Block', 'Theme'].map((item, index) => (
								<Link
									key={item}
									href="#"
									className={`block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
										} delay-${index * 100}ms`}
								>
									{item}
								</Link>
							))}
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</header>
	);
}