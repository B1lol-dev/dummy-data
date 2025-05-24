import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/utils/auth";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth
      .adminLogin(username, password)
      .then((data) => {
        toast.success(`Welcome back, ${data.firstName}!`);
        navigate("/admin");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        toast.error("Username or password is incorrect");
      });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-full sm:w-96">
          <CardHeader>
            <CardTitle>Login to Admin Dashboard</CardTitle>
            <CardDescription>
              Please login to access the admin dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-y-4">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Your username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your password"
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <div className="grid w-full gap-y-4">
              <Button type="submit">Sign in</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default React.memo(AdminLogin);
