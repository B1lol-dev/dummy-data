import React from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    items: 3,
    total: 129.99,
    status: "Delivered",
    date: "2024-01-15",
    shippingAddress: "123 Main St, New York, NY",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg",
    items: 1,
    total: 49.99,
    status: "Shipped",
    date: "2024-01-14",
    shippingAddress: "456 Oak Ave, Los Angeles, CA",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg",
    items: 2,
    total: 89.99,
    status: "Processing",
    date: "2024-01-13",
    shippingAddress: "789 Pine St, Chicago, IL",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg",
    items: 5,
    total: 199.99,
    status: "Pending",
    date: "2024-01-12",
    shippingAddress: "321 Elm St, Houston, TX",
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    avatar: "/placeholder.svg",
    items: 1,
    total: 29.99,
    status: "Cancelled",
    date: "2024-01-11",
    shippingAddress: "654 Maple Dr, Phoenix, AZ",
  },
];

const AdminOrders = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Processing":
        return <Package className="h-4 w-4 text-blue-500" />;
      case "Shipped":
        return <Truck className="h-4 w-4 text-purple-500" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Cancelled":
        return <Trash2 className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Processing: "bg-blue-100 text-blue-800 border-blue-200",
      Shipped: "bg-purple-100 text-purple-800 border-purple-200",
      Delivered: "bg-green-100 text-green-800 border-green-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      variants[status as keyof typeof variants] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, order) => acc + order.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const processingOrders = orders.filter(
    (o) => o.status === "Processing"
  ).length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Orders</h1>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Order Management</h2>
            <p className="text-gray-600">Track and manage customer orders</p>
          </div>
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Create Order
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earning
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-gray-500">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
              <p className="text-xs text-gray-500">Awaiting processing</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processingOrders}</div>
              <p className="text-xs text-gray-500">Being prepared</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveredOrders}</div>
              <p className="text-xs text-gray-500">Successfully completed</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Orders ({orders.length})</CardTitle>
                <CardDescription>
                  Manage customer orders and fulfillment
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search orders..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Shipping Address</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={order.avatar || "/placeholder.svg"}
                            className="grayscale"
                          />
                          <AvatarFallback>
                            {order.customer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-gray-500">
                            {order.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell className="font-medium">
                      ${order.total}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <Badge className={getStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        {order.shippingAddress}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Truck className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default React.memo(AdminOrders);
