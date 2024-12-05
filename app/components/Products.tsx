import Image from "next/image";
import { BiShoppingBag, BiHeart } from "react-icons/bi";
import { products } from "../constants/products";
import Link from "next/link";

export default function Products() {
	return (
		<div className="bg-neutral-100 py-7">
			<h1 className="text-3xl font-bold text-neutral-900 text-center pb-7">Our best products</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
				{products.map((product) => (
					<div key={product.id} className="bg-white flex flex-col justify-around rounded-2xl p-5 ">
						<div className="flex items-start justify-between">
							<Image src={product.image} width={200} height={200} alt={product.title} />
							<Link href="" className="bg-zinc-100 p-3 rounded-full">
								<BiHeart className="text-neutral-700" />
							</Link>
						</div>
						<div>
							<h4>{product.title}</h4>
							<div className="flex items-center justify-between">
								<h2 className="font-bold text-xl">${product.price.toFixed(2)}</h2>
								<Link href="" className="bg-zinc-800 p-3 rounded-full">
									<BiShoppingBag className="text-neutral-50" />
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}