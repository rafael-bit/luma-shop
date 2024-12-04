'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


export default function Footer() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<footer
			id="footer"
			className={`bg-neutral-50 rounded-3xl transform opacity-0 transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
		>
			<div className="text-center sm:flex items-center sm:mx-auto max-w-full justify-around">
				<div>
					<div className="text-center py-1 flex items-center justify-center sm:justify-normal">
						<Link href="#" className="flex items-center gap-5">
							<span className="sr-only">Luma</span>
							<Image alt="" src="/logo.png" width={50} height={50} />
							<h1 className="text-3xl font-bold text-primary hover:text-hover duration-300">Luma</h1>
						</Link>
					</div>
					<p className="my-3 text-xs leading-5 text-neutral-500">
						<span className="hidden sm:inline">&copy; 2024 Craftly. All rights reserved.</span>
						<span className="sm:hidden">&copy; 2024 Craftly.</span>
					</p>
				</div>
				<ul className="hidden sm:block">
					<li className="text-md font-bold leading-10">Company</li>
					<li><Link href="" className="text-xs leading-6 font-semibold text-neutral-800 hover:underline">Technologies</Link></li>
					<li><Link href="" className="text-xs leading-6 font-semibold text-neutral-800 hover:underline">Products</Link></li>
					<li><Link href="" className="text-xs leading-6 font-semibold text-neutral-800 hover:underline">Colletion</Link></li>
				</ul>
				<ul className="hidden sm:block">
					<li className="text-md font-bold leading-10">Info</li>
					<li><Link href="" className="text-xs leading-6 font-semibold text-neutral-800 hover:underline">About</Link></li>
					<li><Link href="" className="text-xs leading-6 font-semibold text-neutral-800 hover:underline">Contact</Link></li>
					<li><Link href="" className="text-xs leading-6 font-semibold text-neutral-800 hover:underline">FAQ</Link></li>
				</ul>
				<div className="flex flex-col items-center gap-2">
					<p className="w-1/2 sm:w-full text-sm font-semibold leading-5 text-neutral-800">Follow our store to find out about news and updates on our social networks</p>
					<div className="flex gap-2 mt-3">
						<Link href="" className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 p-1.5 rounded-full"><FaInstagram className="text-neutral-50 text-2xl"/></Link>
						<Link href="" className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 p-1.5 rounded-full"><FaFacebook className="text-neutral-50 text-2xl"/></Link>
						<Link href="" className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 p-1.5 rounded-full"><FaSquareXTwitter className="text-neutral-50 text-2xl"/></Link>
						<Link href="" className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 p-1.5 rounded-full"><FaLinkedin className="text-neutral-50 text-2xl"/></Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
