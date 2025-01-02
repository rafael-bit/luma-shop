import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Banner from "@/components/Banner";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await getAllProducts()
  const categories = await getAllCategories()
  return (
    <div className="bg-gray-100 pt-3">
      <Banner />
      <div className="flex flex-col items-center justify-start min-h-screen mt-2 px-4">
        <div className="bg-white w-full min-h-[65vh] p-5 mb-3 flex items-center justify-around rounded-md">
          <div>
            <h1 className="text-3xl font-semibold w-[80%]">The best clothes to make you feel good.</h1>
            <p className="w-[70%] text-sm text-neutral-600 pt-3">Renew your wardrobe with exclusive pieces that reflect your personality and follow the latest fashion trends.</p>
          </div>
          <Image src="/banner.webp" width={500} height={500} alt="Banner" className="rounded-2xl" />
        </div>
        <ProductsView products={products} categories={categories} />
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-4xl font-bold text-center text-neutral-800 mb-6">
              Unlocking the Essence of Style
            </h2>
            <p className="text-center text-neutral-600 text-lg mb-8">
              Discover clothes that match your personality and express your true style.
              Fashion made for you, by you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  src="/womanClothes.jpg"
                  width={500}
                  height={500}
                  alt="Woman's Collection"
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-700 mb-2">
                    Women&#39;s Collection
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Elegance and sophistication for all occasions.
                  </p>
                  <Link
                    href="#"
                    className="text-indigo-500 hover:text-indigo-700 font-medium"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  src="/heavy.jpg"
                  width={500}
                  height={500}
                  alt="Man's Collection"
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-700 mb-2">
                    Man&#39;s Collection
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Comfort and style for everyday life.
                  </p>
                  <Link
                    href="#"
                    className="text-indigo-500 hover:text-indigo-700 font-medium"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <Image
                  src="/short.webp"
                  width={500}
                  height={500}
                  alt="Acessories"
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-neutral-700 mb-2">
                    Acessories
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    The finishing touch to complete your look.
                  </p>
                  <Link
                    href="#"
                    className="text-indigo-500 hover:text-indigo-700 font-medium"
                  >
                    Explore Accessories
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
