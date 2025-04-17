
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

const TurfAdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/turf-admin/dashboard");
    }, 1000);
  };

  return (
    <div className="container flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="card-3d mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <div className="relative h-10 w-10 overflow-hidden rounded-md bg-gradient-to-br from-turf-500 to-turf-700 p-1.5">
                <div className="absolute inset-0 flex items-center justify-center opacity-75">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight">TurfVerse</span>
            </div>
          </div>
          <CardTitle className="text-center text-2xl">Turf Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your turf dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field-3d"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/turf-admin/forgot-password"
                  className="text-xs text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field-3d"
                required
              />
            </div>
            <Button type="submit" className="button-3d w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-center text-sm text-muted-foreground">
            Don't have a turf admin account?{" "}
            <Link
              to="/turf-admin/register"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Register Now
            </Link>
          </div>
          <div className="w-full text-center">
            <Link
              to="/"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Back to user portal
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TurfAdminLogin;
