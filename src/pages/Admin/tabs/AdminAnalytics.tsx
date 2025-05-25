import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Users, Eye, Clock } from "lucide-react";

const metrics = [
  {
    title: "Page Views",
    value: "45,231",
    change: "+20.1%",
    trend: "up",
    icon: Eye,
  },
  {
    title: "Unique Visitors",
    value: "12,847",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "+0.5%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "Avg. Session Duration",
    value: "4m 32s",
    change: "-12s",
    trend: "down",
    icon: Clock,
  },
];

const topPages = [
  { page: "/products", views: "12,345", percentage: "25%" },
  { page: "/recipes", views: "8,901", percentage: "18%" },
  { page: "/users", views: "6,789", percentage: "14%" },
  { page: "/posts", views: "5,432", percentage: "11%" },
  { page: "/admin", views: "210", percentage: "7%" },
];

const trafficSources = [
  { source: "Direct", visitors: "15,234", percentage: "45%" },
  { source: "Google Search", visitors: "8,901", percentage: "26%" },
  { source: "Social Media", visitors: "4,567", percentage: "13%" },
  { source: "Referrals", visitors: "3,210", percentage: "9%" },
  { source: "Email", visitors: "2,345", percentage: "7%" },
];

const AdminAnalytics = () => {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Analytics</h1>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Analytics Overview</h2>
          <p className="text-gray-600">
            Track your platform's performance and user engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {metric.change}
                  </span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-gray-500">
                          {page.views} views
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-black">
                      {page.percentage}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{source.source}</p>
                      <p className="text-sm text-gray-500">
                        {source.visitors} visitors
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: source.percentage }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {source.percentage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>
              Daily visitors for the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Chart cannot load</p>
                <p className="text-sm text-gray-400"></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
};

export default React.memo(AdminAnalytics);
