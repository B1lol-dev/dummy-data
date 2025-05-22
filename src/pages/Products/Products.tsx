import React from "react";
import { useEffect, useState } from "react";
import Container from "@/components/helpers/Container";
import ProductCard from "./components/ProductCard";
import type { IProduct } from "@/types/api";
import ProductCardSkeleton from "./components/skeleton/ProductCardSkeleton";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=8");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default React.memo(Products);
