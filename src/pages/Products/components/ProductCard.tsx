import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IProduct } from "@/types/api";
import { Badge } from "@/components/ui/badge";
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Card className="overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="relative h-48 bg-gray-100">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
        <Badge className="absolute top-2 right-2 bg-black text-white">
          {product.category}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.discountPercentage > 0 && (
            <Badge variant="outline" className="border-black">
              {product.discountPercentage}% OFF
            </Badge>
          )}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Rating: {product.rating}/5</span>
          <span>Stock: {product.stock}</span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-200 bg-gray-50">
        <div className="w-full text-center font-medium">{product.brand}</div>
      </CardFooter>
    </Card>
  );
};

export default React.memo(ProductCard);
