import React, { useEffect, useState } from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Users,
  ShoppingCart,
  ChefHat,
  FileText,
  DollarSign,
  Activity,
  Badge,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auth } from "@/utils/auth";
import toast from "react-hot-toast";
import TabLoader from "./components/TabLoader";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "1,234",
    change: "+8.2%",
    icon: ShoppingCart,
  },
  {
    title: "Total Recipes",
    value: "567",
    change: "+15.3%",
    icon: ChefHat,
  },
  {
    title: "Total Posts",
    value: "3,456",
    change: "-2.1%",
    icon: FileText,
  },
  {
    title: "Earnings",
    value: "$45,231",
    change: "+20.1%",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "573",
    change: "+5.4%",
    icon: Activity,
  },
];

const recentActivity = [
  { action: "New user registered", user: "John Doe", time: "1 minute ago" },
  { action: "Product updated", user: "Admin", time: "5 minutes ago" },
  { action: "Recipe published", user: "Gordon Ramsey", time: "10 minutes ago" },
  { action: "Order completed", user: "Gadoy", time: "15 minutes ago" },
  { action: "Post deleted", user: "System", time: "20 minutes ago" },
];

const Admin = () => {
  const [adminName, setAdminName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth
      .getMyInfo(auth.adminToken)
      .then((admin) => {
        setAdminName(admin.firstName || "Admin");
      })
      .catch((err) => {
        console.error("Failed to fetch admin info:", err);
        toast.error("Failed to fetch admin info. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <TabLoader />;
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {adminName}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs">
                  <span>{stat.change}</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions on DummyData</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        by {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-black h-20 flex flex-col hover:bg-black hover:text-white"
                >
                  <Users className="h-6 w-6 mb-2" />
                  <span>Add User</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-black h-20 flex flex-col hover:bg-black hover:text-white"
                >
                  <ShoppingCart className="h-6 w-6 mb-2" />
                  <span>Add Product</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-black h-20 flex flex-col hover:bg-black hover:text-white"
                >
                  <ChefHat className="h-6 w-6 mb-2" />
                  <span>Add Recipe</span>
                </Button>
                <Button
                  variant="outline"
                  className="border-black h-20 flex flex-col hover:bg-black hover:text-white"
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Create Post</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-gray-200 mt-6">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">CDN</span>
                <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Firewall & DDoS</span>
                <Badge className="bg-red-100 text-red-800 border-green-200 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default React.memo(Admin);
