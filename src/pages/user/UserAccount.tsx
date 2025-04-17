
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy } from "lucide-react";

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "9876543210",
  loyaltyPoints: 120,
};

const UserAccount: React.FC = () => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success toast or message
    }, 1000);
  };

  return (
    <div className="container max-w-4xl px-4 py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-bold">My Account</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="profile" className="flex-1 sm:flex-none">Profile</TabsTrigger>
          <TabsTrigger value="bookings" className="flex-1 sm:flex-none">Bookings</TabsTrigger>
          <TabsTrigger value="loyalty" className="flex-1 sm:flex-none">Loyalty Points</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="field-3d"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="field-3d"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="field-3d"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="button-3d" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>
                View all your past and upcoming bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Please check the Bookings page for your booking history
                </p>
                <Button asChild className="mt-4">
                  <a href="/bookings">View Bookings</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loyalty">
          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Loyalty Points</CardTitle>
              <CardDescription>
                Track your earned points and rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-xl bg-primary/10 p-6 text-center">
                <div className="mb-3 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <Trophy className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  {userData.loyaltyPoints} Points
                </h3>
                <p className="mt-1 text-muted-foreground">
                  You're on your way to earning rewards!
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium">How to earn points</h4>
                  <Separator className="my-2" />
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    <li>Book a turf: 10 points per booking</li>
                    <li>Complete 5 bookings: 50 bonus points</li>
                    <li>Review a turf after playing: 5 points</li>
                    <li>Refer a friend: 20 points</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium">Redeem points</h4>
                  <Separator className="my-2" />
                  <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                    <li>100 points: ₹100 discount on your next booking</li>
                    <li>200 points: Free 1-hour booking</li>
                    <li>500 points: Premium turf access for 2 hours</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAccount;
