'use client'

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiOutlineXMark } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<header className="relative bg-neutral-50 bg-opacity-20 backdrop-blur-lg w-[95%] mx-auto rounded-3xl m-5 top-0  bg-primary/25 shadow-md z-50">
			<nav aria-label="Header" className="mx-auto flex max-w-7xl items-center justify-between p-1 lg:px-8">
				<div className={`flex lg:flex-1 transition-transform duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
					<Link href="#" className="-m-1.5 p-1.5 flex items-center gap-5">
						<span className="sr-only">Luma</span>
						<Image
							alt=""
							src="/logo.png"
							width={65}
							height={65}
						/>
						<h1 className="text-2xl font-bold text-primary hover:text-hover duration-300">Craftly</h1>
					</Link>
				</div>
				<div className="flex sm:hidden mr-5">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary"
					>
						<span className="sr-only">Open main menu</span>
						<FaBarsStaggered aria-hidden="true" className="size-6" />
					</button>
				</div>
			</nav>
			<Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="fixed inset-0 z-10 bg-black bg-opacity-50">
				<div className="fixed inset-0 z-20 flex items-start justify-end">
					<DialogPanel className="w-full sm:max-w-xs bg-primary h-full px-6 py-6 overflow-y-auto">
						<div className="flex items-center justify-between mb-6">
							<Link href="#" className="-m-1.5 p-1.5">
								<span className="sr-only">Luma</span>
								<Image src="/logo.png" alt="Luma logo" width={65} height={65} />
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
							<Link href="#" className="block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">Docs</Link>
							<Link href="/component" className="block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">Components</Link>
							<Link href="#" className="block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">Block</Link>
							<Link href="#" className="block px-3 py-2 text-primary font-semibold rounded-lg hover:bg-hover hover:text-hover">Theme</Link>
						</div>
					</DialogPanel>
				</div>
			</Dialog>
		</header>
	);
}