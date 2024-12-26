import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";


export default async function Categories({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const products = await getProductsByCategory(slug)
	const categories = await getAllCategories()
	return (
		<div className="flex flex-col items-center justify-start min-h-screen bg-neutral-100 p-4">
			<div className="bg-white p-7 rounded-lg shadow-sm w-full max-w-4xl">
				<h1 className="text-3xl font-bold mb-5 text-center">
					{slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}{''}
					Colletion
				</h1>
				<ProductsView products={products} categories={categories}/>
			</div>
		</div>
	)
}
