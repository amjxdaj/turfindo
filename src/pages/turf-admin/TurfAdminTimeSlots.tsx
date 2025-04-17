
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarIcon, Clock, User, Phone, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Time slots data
const timeSlots = [
  "5:00 PM - 6:00 PM",
  "6:00 PM - 7:00 PM",
  "7:00 PM - 8:00 PM",
  "8:00 PM - 9:00 PM",
  "9:00 PM - 10:00 PM",
];

// Generate mock data for the next 7 days
const generateMockData = () => {
  const data: Record<string, Record<string, string>> = {};
  const now = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    const dateKey = format(date, "yyyy-MM-dd");
    
    data[dateKey] = {};
    timeSlots.forEach((slot) => {
      // Randomly set slots as 'available', 'booked', or 'blocked'
      const rand = Math.random();
      let status;
      if (rand < 0.6) {
        status = "available";
      } else if (rand < 0.9) {
        status = "booked";
      } else {
        status = "blocked";
      }
      data[dateKey][slot] = status;
    });
  }
  
  return data;
};

const TurfAdminTimeSlots: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlotData, setTimeSlotData] = useState(generateMockData());
  const [manualBookingOpen, setManualBookingOpen] = useState(false);
  const [manualBooking, setManualBooking] = useState({
    name: "",
    phone: "",
    date: new Date(),
    timeSlot: "",
  });

  const currentDateKey = date ? format(date, "yyyy-MM-dd") : "";
  const slotsForSelectedDate = currentDateKey ? (timeSlotData[currentDateKey] || {}) : {};

  const handleSlotChange = (slot: string, newStatus: string) => {
    if (!currentDateKey) return;

    setTimeSlotData((prev) => ({
      ...prev,
      [currentDateKey]: {
        ...prev[currentDateKey],
        [slot]: newStatus,
      },
    }));
  };

  const handleManualBookingSubmit = () => {
    if (!manualBooking.timeSlot || !manualBooking.name || !manualBooking.phone) return;

    const bookingDateKey = format(manualBooking.date, "yyyy-MM-dd");

    setTimeSlotData((prev) => ({
      ...prev,
      [bookingDateKey]: {
        ...prev[bookingDateKey],
        [manualBooking.timeSlot]: "booked",
      },
    }));

    setManualBookingOpen(false);
    setManualBooking({
      name: "",
      phone: "",
      date: new Date(),
      timeSlot: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Time Slot Manager</h1>
        <Button onClick={() => setManualBookingOpen(true)}>
          <Plus className="mr-1.5 h-4 w-4" />
          Add Manual Booking
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-3d md:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
            <CardDescription>
              Choose a date to manage time slots
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6 pt-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto"
              disabled={{ before: new Date() }}
            />
          </CardContent>
        </Card>

        <Card className="card-3d md:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? format(date, "MMMM d, yyyy") : "Select a date"}
            </CardTitle>
            <CardDescription>
              Manage available and blocked time slots
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6 pt-2">
            <div className="space-y-4">
              {Object.keys(slotsForSelectedDate).length > 0 ? (
                timeSlots.map((slot) => (
                  <TimeSlotItem
                    key={slot}
                    slot={slot}
                    status={slotsForSelectedDate[slot] || "available"}
                    onChange={(newStatus) => handleSlotChange(slot, newStatus)}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="mb-2 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No time slots available</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Please select a date to view and manage time slots
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manual Booking Dialog */}
      <Dialog open={manualBookingOpen} onOpenChange={setManualBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Manual Booking</DialogTitle>
            <DialogDescription>
              Enter customer details to add an offline booking
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                placeholder="Enter customer name"
                value={manualBooking.name}
                onChange={(e) =>
                  setManualBooking({ ...manualBooking, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={manualBooking.phone}
                onChange={(e) =>
                  setManualBooking({ ...manualBooking, phone: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {manualBooking.date ? (
                      format(manualBooking.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={manualBooking.date}
                    onSelect={(date) =>
                      setManualBooking({
                        ...manualBooking,
                        date: date || new Date(),
                      })
                    }
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>Time Slot</Label>
              <Select
                value={manualBooking.timeSlot}
                onValueChange={(value) =>
                  setManualBooking({ ...manualBooking, timeSlot: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setManualBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleManualBookingSubmit}>Add Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Time Slot Item Component
interface TimeSlotItemProps {
  slot: string;
  status: string;
  onChange: (status: string) => void;
}

const TimeSlotItem: React.FC<TimeSlotItemProps> = ({ slot, status, onChange }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "h-3 w-3 rounded-full",
            status === "available" && "bg-green-500",
            status === "booked" && "bg-red-500",
            status === "blocked" && "bg-gray-500"
          )}
        />
        <span className="font-medium">{slot}</span>
      </div>
      
      <div className="flex items-center gap-3">
        {status === "booked" && (
          <div className="mr-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span>Customer Booking</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button
            variant={status === "available" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange("available")}
            className={status === "available" ? "bg-green-600" : ""}
          >
            Available
          </Button>
          <Button
            variant={status === "blocked" ? "default" : "outline"}
            size="sm"
            onClick={() => onChange("blocked")}
            disabled={status === "booked"}
            className={status === "blocked" ? "bg-gray-600" : ""}
          >
            Block
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TurfAdminTimeSlots;
