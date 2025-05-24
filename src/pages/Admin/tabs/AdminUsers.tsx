import React from "react";
import { useState, useEffect } from "react";
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
  UserCheck,
  EyeClosed,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IUser } from "@/types/api";
import axios from "axios";
import { API_ENPOINTS, API_URL } from "@/constants/api";
import toast from "react-hot-toast";
import TabLoader from "../components/TabLoader";

const AdminUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [originalUseres, setOriginalUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}${API_ENPOINTS.users}?limit=0`)
      .then((res) => {
        setUsers(res.data.users);
        setOriginalUsers(res.data.users);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.success("User deleted successfully");
  };

  const handleSearch = () => {
    if (!search.trim()) {
      setUsers(originalUseres);
      return;
    }

    setUsers((prev) =>
      prev.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) &&
          user.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  if (loading) {
    return <TabLoader />;
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Users</h1>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600">Manage your platform users</p>
          </div>
          <Button className="bg-black hover:bg-gray-800">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card className="border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Users ({users.length})</CardTitle>
                <CardDescription>
                  A list of all registered users
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users by name or username"
                  className="pl-8"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch();
                  }}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <UserTable
                    user={user}
                    key={user.id}
                    onDelete={() => handleDelete(user.id)}
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

export default React.memo(AdminUsers);

function UserTable({ user, onDelete }: { user: IUser; onDelete?: () => void }) {
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    if (hide) {
      setHide(false);
      toast.success(`User "${user.username}" is now visible`);
    } else {
      setHide(true);
      toast.success(`User "${user.username}" is now hidden`);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              className="grayscale"
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">ID: {user.id}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone}</TableCell>
      <TableCell>
        <div>
          <div className="font-medium">{user.company.name}</div>
          <div className="text-sm text-gray-500">{user.company.department}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          className={
            Math.random() > 0.5
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {Math.random() > 0.5 ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
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
          <Button variant="ghost" size="sm">
            <UserCheck className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
