'use client'

import Carousel from "./components/Carousel";
import Numbers from "./components/Numbers";
import Products from "./components/Products";

export default function Home() {
  return (
    <>
      <Carousel />
      <Numbers />
      <Products />
    </>
  );
}