import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/imageUrl"
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { Button } from "@/components/ui/button";
import AddToBasketButton from "@/components/AddToBasketButton";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const product = await getProductBySlug(slug)
	const isOutOfStock = product.stock != null && product.stock <= 0

	if (!product) {
		return notFound()
	}

	return (
		<div className="container px-10 py-7">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-7">
				<div className={`relative aspect-square overflow-hidden rounded-lg , shadow-md ${isOutOfStock ? "opacity-50" : ""}`}>
					{product.image && (
						<Image src={imageUrl(product.image).url()} alt={product.name ?? "Product Image"} fill className="object-container transition-transform duration-300 hover:scale-105" />
					)}

					{isOutOfStock && (
						<div className="absolute inset-0 flex items-center justify-center bg-neutral-950 bg-opacity-50 text-white">
							<p className="font-bold text-base">Out of stock</p>
						</div>
					)}
				</div>
				<div className="flex flex-col justify-between">
					<div>
						<h1 className="text-4xl font-bold mb-3">{product.name}</h1>
						<div className="text-lg font-semibold mb-3">
							${product.price?.toFixed(2)}
						</div>
						<div className="prose max-w-none mb-5 text-sm">
							{Array.isArray(product.description) && (
								<PortableText value={product.description}/>
							)}
						</div>
					</div>
					<div className="mt-5">
							<AddToBasketButton product={product} disabled={isOutOfStock}/>
					</div>
				</div>
			</div>
		</div>
	)
}
