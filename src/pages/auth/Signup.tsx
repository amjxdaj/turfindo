
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

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
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
          <CardTitle className="text-center text-2xl">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="field-3d"
                required
              />
            </div>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="field-3d"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field-3d"
                required
              />
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
            <Button type="submit" className="button-3d w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
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
              Sign up with Google
            </Button>
            <Button variant="outline" type="button" className="field-3d">
              Sign up with Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
