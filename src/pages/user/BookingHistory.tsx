
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Calendar, Clock, AlertCircle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock booking data
const bookingsData = [
  {
    id: "B1234",
    turf: {
      id: 1,
      name: "Green Valley Turf",
      address: "123 Sports Lane, Downtown",
    },
    date: "April 18, 2025",
    time: "8:00 PM",
    price: 1200,
    points: 10,
    status: "upcoming", // upcoming, completed, cancelled
    isPastCancellationWindow: false,
  },
  {
    id: "B1235",
    turf: {
      id: 2,
      name: "Urban Soccer Ground",
      address: "456 Play Street, Uptown",
    },
    date: "April 20, 2025",
    time: "7:00 PM",
    price: 1500,
    points: 10,
    status: "upcoming",
    isPastCancellationWindow: false,
  },
  {
    id: "B1230",
    turf: {
      id: 3,
      name: "Premier Football Arena",
      address: "789 Goal Avenue, Midtown",
    },
    date: "April 10, 2025",
    time: "6:00 PM",
    price: 1800,
    points: 10,
    status: "completed",
    isPastCancellationWindow: true,
  },
  {
    id: "B1229",
    turf: {
      id: 1,
      name: "Green Valley Turf",
      address: "123 Sports Lane, Downtown",
    },
    date: "April 5, 2025",
    time: "5:00 PM",
    price: 1200,
    points: 0, // No points for cancelled booking
    status: "cancelled",
    isPastCancellationWindow: true,
  },
];

const BookingHistory: React.FC = () => {
  const [selectedBooking, setSelectedBooking] = useState<typeof bookingsData[0] | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const upcomingBookings = bookingsData.filter(booking => booking.status === "upcoming");
  const pastBookings = bookingsData.filter(booking => booking.status === "completed" || booking.status === "cancelled");

  const handleViewDetails = (booking: typeof bookingsData[0]) => {
    setSelectedBooking(booking);
  };

  const handleCancelBooking = () => {
    // In a real app, make API call to cancel booking
    setShowCancelDialog(false);
    setSelectedBooking(null);
    // Update booking status and show success message
  };

  return (
    <div className="container max-w-4xl px-4 py-8 md:py-12">
      <h1 className="mb-6 text-3xl font-bold">My Bookings</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="upcoming" className="flex-1 sm:flex-none">
            Upcoming
            {upcomingBookings.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {upcomingBookings.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1 sm:flex-none">
            Past
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="card-3d overflow-hidden">
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold">{booking.turf.name}</h3>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{booking.turf.address}</span>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Date</span>
                            <div className="mt-1 flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="font-medium">{booking.date}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Time</span>
                            <div className="mt-1 flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">{booking.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <div className="text-lg font-bold">₹{booking.price}</div>
                          <div className="flex items-center gap-1 text-sm text-primary">
                            <Trophy className="h-3.5 w-3.5" />
                            <span>+{booking.points} points</span>
                          </div>
                        </div>
                        
                        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
                          <Button
                            variant="outline"
                            className="md:order-1"
                            onClick={() => handleViewDetails(booking)}
                          >
                            View Details
                          </Button>
                          <Button
                            variant="destructive"
                            disabled={booking.isPastCancellationWindow}
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowCancelDialog(true);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium">No upcoming bookings</h3>
                <p className="mt-1 text-muted-foreground">
                  You don't have any bookings scheduled
                </p>
                <Button className="mt-6" asChild>
                  <a href="/">Find Turfs</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastBookings.length > 0 ? (
            <div className="space-y-4">
              {pastBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className={cn(
                    "card-3d overflow-hidden",
                    booking.status === "cancelled" && "border-destructive/30"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{booking.turf.name}</h3>
                          {booking.status === "cancelled" && (
                            <Badge variant="destructive">Cancelled</Badge>
                          )}
                          {booking.status === "completed" && (
                            <Badge variant="outline" className="border-primary text-primary">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{booking.turf.address}</span>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Date</span>
                            <div className="mt-1 flex items-center gap-1.5">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span className="font-medium">{booking.date}</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Time</span>
                            <div className="mt-1 flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">{booking.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <div className="text-lg font-bold">₹{booking.price}</div>
                          {booking.points > 0 && (
                            <div className="flex items-center gap-1 text-sm text-primary">
                              <Trophy className="h-3.5 w-3.5" />
                              <span>+{booking.points} points</span>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          variant="outline"
                          onClick={() => handleViewDetails(booking)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-muted p-3">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-medium">No past bookings</h3>
                <p className="mt-1 text-muted-foreground">
                  You haven't made any bookings yet
                </p>
                <Button className="mt-6" asChild>
                  <a href="/">Find Turfs</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Details Dialog */}
      {selectedBooking && !showCancelDialog && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Booking ID: {selectedBooking.id}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{selectedBooking.turf.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedBooking.turf.address}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-border p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Date</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedBooking.date}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Time</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{selectedBooking.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border border-border p-4">
                <div className="flex justify-between py-1">
                  <span>Price</span>
                  <span className="font-medium">₹{selectedBooking.price}</span>
                </div>
                {selectedBooking.points > 0 && (
                  <div className="flex justify-between py-1 text-primary">
                    <span>Points earned</span>
                    <span className="font-medium">+{selectedBooking.points}</span>
                  </div>
                )}
              </div>
              
              {selectedBooking.status === "upcoming" && (
                <div className="flex items-start gap-2 rounded-lg bg-muted p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div className="text-sm">
                    <p className="font-medium">Cancellation Policy</p>
                    <p className="mt-1 text-muted-foreground">
                      You can cancel this booking up to 1 hour before the scheduled time for a full refund.
                    </p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedBooking(null)}
                className="sm:mt-0"
              >
                Close
              </Button>
              {selectedBooking.status === "upcoming" && !selectedBooking.isPastCancellationWindow && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowCancelDialog(true);
                  }}
                >
                  Cancel Booking
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              You will receive a full refund as per our cancellation policy.
            </p>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              className="sm:mt-0"
            >
              Go Back
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancelBooking}
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingHistory;
