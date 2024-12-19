import { ProductType } from "@/sanity.types"
import { imageUrl } from "@/sanity/lib/imageUrl"
import Image from "next/image"
import Link from "next/link"

export default function ProductThumb({ product }: { product: ProductType }) {
	const isOutOfStock = product.stock != null && product.stock <= 0
	return (
		<Link
			href={`/product/${product.slug?.current}`}
			className={`group flex flex-col rounded-lg bg-white p-3 border border-neutral-300 shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
		>
			<div className="relative w-full h-full aspect-square overflow-hidden">
				{product.image && (
					<Image
						className="object-contain transition-transform duration-300 group-hover:scale-105"
						src={imageUrl(product.image).url()}
						alt={product.name || "Product Image"}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				)}

				{isOutOfStock && (
					<div className="absolute inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-50 px-2 py-1">
						<span className="text-neutral-50 font-bold text-lg">Out of stock</span>
					</div>
				)}
			</div>
			<div className="p-3">
				<h2 className="text-lg text-neutral-900 font-semibold">{product.name}</h2>
				<p className="mt-2 text-xs text-neutral-900 line-clamp-4">{product.description?.map((block) => block._type === "block" ? block.children?.map((child) => child.text).join("") : "").join("") || "No description"}</p>
				<p className="mt-2 text-xl font-bold text-neutral-900">${product.price?.toFixed(2)}</p>
			</div>
		</Link>
	)
}
