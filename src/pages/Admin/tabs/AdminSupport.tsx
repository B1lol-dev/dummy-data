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
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tickets = [
  {
    id: "TK-001",
    subject: "Unable to upload product images",
    user: "John Doe",
    status: "Open",
    priority: "High",
    created: "2024-01-15",
    updated: "2024-01-15",
  },
  {
    id: "TK-002",
    subject: "Recipe search not working properly",
    user: "Jane Smith",
    status: "In Progress",
    priority: "Medium",
    created: "2024-01-14",
    updated: "2024-01-15",
  },
  {
    id: "TK-003",
    subject: "User profile page loading slowly",
    user: "Mike Johnson",
    status: "Resolved",
    priority: "Low",
    created: "2024-01-13",
    updated: "2024-01-14",
  },
  {
    id: "TK-004",
    subject: "Payment processing error",
    user: "Sarah Wilson",
    status: "Open",
    priority: "Critical",
    created: "2024-01-15",
    updated: "2024-01-15",
  },
  {
    id: "TK-005",
    subject: "Mobile app crashes on startup",
    user: "David Brown",
    status: "In Progress",
    priority: "High",
    created: "2024-01-12",
    updated: "2024-01-15",
  },
];

const AdminSupport = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "In Progress":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      Open: "bg-red-100 text-red-800 border-red-200",
      "In Progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Resolved: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      variants[status as keyof typeof variants] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      Critical: "bg-red-100 text-red-800 border-red-200",
      High: "bg-orange-100 text-orange-800 border-orange-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Low: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      variants[priority as keyof typeof variants] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Support</h1>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Support Tickets</h2>
            <p className="text-gray-600">Manage customer support requests</p>
          </div>
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Open Tickets
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">+2 from yesterday</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500">-1 from yesterday</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resolved Today
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-gray-500">+5 from yesterday</p>
            </CardContent>
          </Card>
          <Card className="border border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Response Time
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
              <p className="text-xs text-gray-500">-0.3h from yesterday</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>All customer support requests</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search tickets..." className="pl-8" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(ticket.status)}
                        <span>{ticket.subject}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadge(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>{ticket.updated}</TableCell>
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

export default React.memo(AdminSupport);
