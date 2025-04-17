
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
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
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
          <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone-or-email">Phone or Email</Label>
              <Input
                id="phone-or-email"
                placeholder="Enter your phone or email"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="field-3d"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
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

          <div className="relative flex items-center justify-center">
            <Separator className="absolute w-full" />
            <span className="relative bg-card px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>

          <div className="grid gap-2">
            <Button variant="outline" type="button" className="field-3d">
              Continue with Google
            </Button>
            <Button variant="outline" type="button" className="field-3d">
              Continue with Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
