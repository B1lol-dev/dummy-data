import React from "react";
import { useEffect, useState } from "react";
import Container from "@/components/helpers/Container";
import ProductCard from "./components/ProductCard";
import type { IProduct } from "@/types/api";
import ProductCardSkeleton from "./components/skeleton/ProductCardSkeleton";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.products}?limit=0`)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
        setLoading(false);
      });
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
