import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

export default async function Search({
	searchParams,
}: {
	searchParams: {
		query: string;
	};
}) {
	const { query } = await searchParams;
	const products = await searchProductsByName(query);

	if (!products.length) {
		return (
			<div className="flex flex-col items-center justify-start  min-h-screen bg-neutral-100 p-4 pt-7">
				<div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
					<h1 className="text-2xl font-bold mb-4 text-center">
						No products found for "{query}"
					</h1>
					<p className="text-neutral-600  text-center">
						We couldn't find any products that match your search. Please try a different keyword.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-start min-h-screen bg-neutral-100 p-4">
			<div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold">
						{products.length} products found for "{query}"
				</h1>
				<ProductGrid products={products}/>
			</div>
		</div>
	);
}
