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
import { FaGithub, FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "@/utils/auth";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth.login(username, password).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-full sm:w-96">
          <CardHeader>
            <CardTitle>Login to DummyData</CardTitle>
            <CardDescription>
              Welcome back! Please login to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-y-4">
            <div className="grid grid-cols-2 gap-x-4">
              <Button size="sm" variant="outline" type="button">
                <FaGithub className="mr-2 size-4" />
                GitHub
              </Button>
              <Button size="sm" variant="outline" type="button">
                <FaGoogle className="mr-2 size-4" />
                Google
              </Button>
            </div>

            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              or
            </p>

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
              <Button>Sign in</Button>
              <Button type="submit" variant="link" size="sm" asChild>
                <Link to="/signup">Don&apos;t have an account? Sign up</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default React.memo(Login);
