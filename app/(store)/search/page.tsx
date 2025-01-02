import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

interface PageProps {
	searchParams: Promise<{
		query: string;
	}>;
}

export default async function Search({ searchParams }: PageProps) {
	const resolvedParams = await searchParams;
	const { query } = resolvedParams;

	let products = [];
	try {
		products = await searchProductsByName(query);
	} catch (error) {
		console.error("Error fetching products:", error);
		return (
			<div className="flex flex-col items-center justify-start min-h-screen bg-neutral-100 p-4 pt-7">
				<div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
					<h1 className="text-2xl font-bold mb-4 text-center text-red-600">
						Error loading products
					</h1>
					<p className="text-neutral-600 text-center">
						There was an issue loading the products. Please try again later.
					</p>
				</div>
			</div>
		);
	}

	if (!products.length) {
		return (
			<main className="flex flex-col items-center justify-start min-h-screen bg-neutral-100 p-4 pt-7">
				<section className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
					<h1 className="text-2xl font-bold mb-4 text-center">
						No products found for &ldquo;{query}&rdquo;
					</h1>
					<p className="text-neutral-600 text-center">
						We couldn&#39;t find any products that match your search. Please try a different keyword.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className="flex flex-col items-center justify-start min-h-screen bg-neutral-100 p-4">
			<section className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold">
					{products.length} products found for &ldquo;{query}&ldquo;
				</h1>
				<ProductGrid products={products} />
			</section>
		</main>
	);
}