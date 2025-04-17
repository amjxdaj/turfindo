
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Trophy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock booking data - in a real app, this would come from navigation state or API
const bookingData = {
  turf: {
    id: 1,
    name: "Green Valley Turf",
    address: "123 Sports Lane, Downtown",
    image: "https://images.unsplash.com/photo-1486882430381-e76d701e0a3e?q=80&w=2340&auto=format&fit=crop",
  },
  slot: {
    id: 4,
    time: "8:00 PM",
    date: "April 18, 2025",
  },
  price: 1200,
  earnedPoints: 10,
};

const BookingSummary: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const handleConfirmBooking = () => {
    // Validate phone
    if (!phone || phone.length !== 10) {
      setIsPhoneValid(false);
      return;
    }
    
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/");
  };

  return (
    <div className="container max-w-md px-4 py-8 md:py-12">
      <div className="mb-6">
        <Button variant="ghost" className="mb-2" asChild>
          <Link to={`/turfs/${bookingData.turf.id}`}>
            <span aria-hidden="true">&larr;</span>
            <span className="ml-2">Back to turf</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Booking Summary</h1>
      </div>

      <Card className="card-3d">
        <CardHeader className="pb-0">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img
              src={bookingData.turf.image}
              alt={bookingData.turf.name}
              className="h-full w-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div>
            <h2 className="text-xl font-semibold">{bookingData.turf.name}</h2>
            <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{bookingData.turf.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 rounded-lg border border-border p-4">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Date</span>
              <div className="mt-1 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{bookingData.slot.date}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Time</span>
              <div className="mt-1 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">{bookingData.slot.time}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between py-2">
              <span>Price per hour</span>
              <span className="font-medium">₹{bookingData.price}</span>
            </div>
            <div className="flex items-center justify-between py-2 text-primary">
              <div className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4" />
                <span>Points earned</span>
              </div>
              <span className="font-medium">+{bookingData.earnedPoints}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between py-2 text-lg font-bold">
              <span>Total</span>
              <span>₹{bookingData.price}</span>
            </div>
          </div>

          <div className="pt-2">
            <Label htmlFor="phone" className="text-base">
              Phone Number
              <span className="ml-1 text-destructive">*</span>
            </Label>
            <div className="mt-1.5">
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className={cn(
                  "field-3d",
                  !isPhoneValid && "border-destructive focus-visible:ring-destructive"
                )}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setIsPhoneValid(true);
                }}
                maxLength={10}
              />
              {!isPhoneValid && (
                <p className="mt-1 text-xs text-destructive">
                  Please enter a valid 10-digit phone number
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="button-3d w-full" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-6 w-6 text-primary" />
              </div>
            </DialogTitle>
            <DialogDescription className="pt-4 text-center text-xl font-bold text-foreground">
              Booking Confirmed!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-center text-muted-foreground">
              Your booking for {bookingData.turf.name} on {bookingData.slot.date} at {bookingData.slot.time} has been confirmed.
            </p>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="font-medium">Booking ID: #TRF{Math.floor(Math.random() * 10000)}</p>
              <p className="mt-1 text-sm text-muted-foreground">A confirmation has been sent to your phone</p>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleCloseSuccess}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingSummary;
