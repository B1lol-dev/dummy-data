import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Search, Plus, Edit, Trash2, Eye, EyeClosed } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import TabLoader from "../components/TabLoader";
import toast from "react-hot-toast";

interface IAdminProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  rating: number;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<IAdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [originalProducts, setOriginalProducts] = useState<IAdminProduct[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.products}?limit=0`)
      .then((res) => {
        setProducts(res.data.products);
        setOriginalProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <TabLoader />;
  }

  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setProducts(originalProducts);
      return;
    }

    setProducts((prev) =>
      prev.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Products</h1>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Product Management</h2>
            <p className="text-gray-600">Manage your product catalog</p>
          </div>
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Products ({products.length})</CardTitle>
                <CardDescription>
                  A list of all products in your store
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products by title..."
                  className="pl-8"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch();
                  }}
                  value={search}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <ProductTable
                    product={product}
                    key={product.id}
                    onDelete={() => handleDelete(product.id)}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default React.memo(AdminProducts);

function ProductTable({
  product,
  onDelete,
}: {
  product: IAdminProduct;
  onDelete: () => void;
}) {
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    if (hide) {
      setHide(false);
      toast.success(`Product "${product.title}" is now visible`);
    } else {
      setHide(true);
      toast.success(`Product "${product.title}" is now hidden`);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{product.title}</TableCell>
      <TableCell>
        <Badge variant="outline" className="border-black">
          {product.category}
        </Badge>
      </TableCell>
      <TableCell>{product.brand}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>
        <span>{product.stock}</span>
      </TableCell>
      <TableCell>{product.rating}/5</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={toggleHide}>
            {!hide ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </Button>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
