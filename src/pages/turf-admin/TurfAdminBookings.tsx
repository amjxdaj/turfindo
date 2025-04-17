
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Phone, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock booking data
const bookingsData = [
  {
    id: "B1234",
    userName: "Rahul Sharma",
    phone: "9876543210",
    date: "April 18, 2025",
    time: "5:00 PM - 6:00 PM",
    status: "pending", // pending, approved, rejected
  },
  {
    id: "B1235",
    userName: "Priya Singh",
    phone: "9876543211",
    date: "April 18, 2025",
    time: "7:00 PM - 8:00 PM",
    status: "pending",
  },
  {
    id: "B1236",
    userName: "Amit Kumar",
    phone: "9876543212",
    date: "April 19, 2025",
    time: "6:00 PM - 7:00 PM",
    status: "approved",
  },
  {
    id: "B1237",
    userName: "Neha Gupta",
    phone: "9876543213",
    date: "April 19, 2025",
    time: "8:00 PM - 9:00 PM",
    status: "approved",
  },
  {
    id: "B1238",
    userName: "Vijay Verma",
    phone: "9876543214",
    date: "April 20, 2025",
    time: "7:00 PM - 8:00 PM",
    status: "rejected",
  },
];

const TurfAdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState(bookingsData);
  const [selectedBooking, setSelectedBooking] = useState<typeof bookingsData[0] | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const pendingBookings = bookings.filter((booking) => booking.status === "pending");
  const approvedBookings = bookings.filter((booking) => booking.status === "approved");
  const rejectedBookings = bookings.filter((booking) => booking.status === "rejected");

  const handleApproveBooking = (bookingId: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "approved" } : booking
      )
    );
  };

  const handleRejectBooking = (bookingId: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: "rejected" } : booking
      )
    );
    setRejectReason("");
    setIsRejectDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>Manage Bookings</CardTitle>
          <CardDescription>
            Review and manage all turf booking requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="mb-6 w-full justify-start">
              <TabsTrigger value="pending" className="flex-1 sm:flex-none">
                Pending
                {pendingBookings.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {pendingBookings.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex-1 sm:flex-none">
                Approved
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex-1 sm:flex-none">
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {pendingBookings.length > 0 ? (
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onApprove={() => handleApproveBooking(booking.id)}
                      onReject={() => {
                        setSelectedBooking(booking);
                        setIsRejectDialogOpen(true);
                      }}
                      onViewDetails={() => {
                        setSelectedBooking(booking);
                        setIsDetailsDialogOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No pending bookings" />
              )}
            </TabsContent>

            <TabsContent value="approved">
              {approvedBookings.length > 0 ? (
                <div className="space-y-4">
                  {approvedBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      isApproved
                      onViewDetails={() => {
                        setSelectedBooking(booking);
                        setIsDetailsDialogOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No approved bookings" />
              )}
            </TabsContent>

            <TabsContent value="rejected">
              {rejectedBookings.length > 0 ? (
                <div className="space-y-4">
                  {rejectedBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      isRejected
                      onViewDetails={() => {
                        setSelectedBooking(booking);
                        setIsDetailsDialogOpen(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No rejected bookings" />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Booking ID: {selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{selectedBooking.userName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedBooking.phone}</span>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">{selectedBooking.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{selectedBooking.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span>Status:</span>
                <Badge
                  className={cn(
                    selectedBooking.status === "approved" && "bg-green-600",
                    selectedBooking.status === "rejected" && "bg-destructive",
                    selectedBooking.status === "pending" && "bg-yellow-600"
                  )}
                >
                  {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailsDialogOpen(false)}
            >
              Close
            </Button>
            {selectedBooking?.status === "pending" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsDetailsDialogOpen(false);
                    setIsRejectDialogOpen(true);
                  }}
                >
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    handleApproveBooking(selectedBooking.id);
                    setIsDetailsDialogOpen(false);
                  }}
                >
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Booking Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this booking.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (optional)</Label>
              <Input
                id="reason"
                placeholder="Enter reason for rejection"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
              className="sm:mt-0"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (selectedBooking) {
                  handleRejectBooking(selectedBooking.id);
                }
              }}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Booking Card Component
interface BookingCardProps {
  booking: typeof bookingsData[0];
  isApproved?: boolean;
  isRejected?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  onViewDetails: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  isApproved,
  isRejected,
  onApprove,
  onReject,
  onViewDetails,
}) => {
  return (
    <Card className={cn(
      "overflow-hidden",
      isApproved && "border-green-600/20",
      isRejected && "border-destructive/20"
    )}>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold">{booking.userName}</h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" />
              <span>{booking.phone}</span>
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
            {(isApproved || isRejected) && (
              <Badge
                className={cn(
                  isApproved && "bg-green-600",
                  isRejected && "bg-destructive"
                )}
              >
                {isApproved ? "Approved" : "Rejected"}
              </Badge>
            )}
            
            <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
              <Button
                variant="outline"
                onClick={onViewDetails}
              >
                View Details
              </Button>
              
              {!isApproved && !isRejected && (
                <>
                  <Button
                    variant="destructive"
                    onClick={onReject}
                    className="md:order-2"
                  >
                    <X className="mr-1.5 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    onClick={onApprove}
                    className="md:order-1"
                  >
                    <Check className="mr-1.5 h-4 w-4" />
                    Approve
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Empty State Component
interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-muted/30 py-12">
    <div className="mb-4 rounded-full bg-muted p-3">
      <Calendar className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-medium">{message}</h3>
    <p className="mt-1 text-muted-foreground">
      All your bookings will appear here
    </p>
  </div>
);

export default TurfAdminBookings;
