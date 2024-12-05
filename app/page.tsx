'use client'

import Carousel from "./components/Carousel";
import Products from "./components/Products";
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);

  const animateValue = (start: number, end: number, duration: number, setter: (value: number) => void) => {
    const range = end - start;
    const increment = range / (duration / 50);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
      }
      setter(Math.floor(current));
    }, 50);
  };

  useEffect(() => {
    animateValue(0, 30, 2000, setUsers);
    animateValue(0, 200, 2500, setProducts);
  }, []);

  return (
    <>
      <Carousel />
      
      <Products />
    </>
  );
}