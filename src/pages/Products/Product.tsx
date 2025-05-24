import { ArrowLeft, Star, ShoppingCart, Heart } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import type { IProduct } from "@/types/api";
import { Loader } from "@/components/ui/loader";

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.products}/${params.id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/404");
      });
  }, [params.id, navigate]);

  if (!product) {
    return (
      <main className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[80vh]">
        <Loader variant="circular" size="lg" className="scale-200" />
      </main>
    );
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <Link
        to="/products"
        className="flex items-center text-sm mb-8 hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images?.slice(0, 4).map((image: string, i: number) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-md border border-gray-200"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.title} ${i + 1}`}
                  className="h-full w-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-black text-white">{product.category}</Badge>
              <span className="text-sm text-gray-500">ID: {product.id}</span>
            </div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? "fill-black text-black"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({Math.floor(Math.random() * 100) + 20}{" "}
                  reviews)
                </span>
              </div>
              <span className="text-sm text-gray-600">
                Brand: <span className="font-medium">{product.brand}</span>
              </span>
            </div>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-baseline mb-6">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    $
                    {Math.round(
                      product.price / (1 - product.discountPercentage / 100)
                    )}
                  </span>
                  <Badge variant="outline" className="ml-2 border-black">
                    {Math.round(product.discountPercentage)}% OFF
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <div className="text-sm">
                <span
                  className={`font-medium ${
                    product.stock > 10
                      ? "text-green-600"
                      : product.stock > 0
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>
                <span className="text-gray-500 ml-1">
                  ({product.stock} available)
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="flex-1 bg-black hover:bg-gray-800">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" className="border-black">
                <Heart className="mr-2 h-4 w-4" /> Save
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          <Tabs defaultValue="specifications">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Brand</div>
                  <div>{product.brand}</div>
                  <div className="font-medium">Category</div>
                  <div>{product.category}</div>
                  <div className="font-medium">Rating</div>
                  <div>{product.rating}/5</div>
                  <div className="font-medium">Stock</div>
                  <div>{product.stock} units</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-4 text-sm">
                <p>Standard shipping: 3-5 business days</p>
                <p>Express shipping: 1-2 business days (additional fee)</p>
                <p>Free shipping on orders over $50</p>
              </div>
            </TabsContent>
            <TabsContent value="returns" className="pt-4">
              <div className="space-y-4 text-sm">
                <p>30-day return policy</p>
                <p>Items must be in original condition with tags attached</p>
                <p>Return shipping fee may apply</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default React.memo(ProductPage);
