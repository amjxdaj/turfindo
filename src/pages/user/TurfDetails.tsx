
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Info, Map } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock turf data
const turfData = {
  id: 1,
  name: "Green Valley Turf",
  image: "https://images.unsplash.com/photo-1486882430381-e76d701e0a3e?q=80&w=2340&auto=format&fit=crop",
  address: "123 Sports Lane, Downtown",
  description: "Premium turf with floodlights and amenities like changing rooms and refreshments.",
  rating: 4.7,
  reviewCount: 124,
  timeSlots: [
    { id: 1, time: "5:00 PM", available: false },
    { id: 2, time: "6:00 PM", available: false },
    { id: 3, time: "7:00 PM", available: true },
    { id: 4, time: "8:00 PM", available: true },
    { id: 5, time: "9:00 PM", available: true },
  ],
  pricePerHour: 1200,
};

const TurfDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  // In a real app, fetch turf data based on ID
  const turf = turfData;

  const handleSlotSelection = (slotId: number) => {
    if (turf.timeSlots.find(slot => slot.id === slotId)?.available) {
      setSelectedSlot(slotId === selectedSlot ? null : slotId);
    }
  };

  const selectedSlotTime = selectedSlot 
    ? turf.timeSlots.find(slot => slot.id === selectedSlot)?.time 
    : null;

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-6">
        <Button variant="ghost" className="mb-2" asChild>
          <Link to="/">
            <span aria-hidden="true">&larr;</span>
            <span className="ml-2">Back to turfs</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{turf.name}</h1>
        <div className="mt-2 flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{turf.address}</span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 overflow-hidden rounded-xl">
            <img
              src={turf.image}
              alt={turf.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{turf.rating}</span>
              </div>
              <span className="text-muted-foreground">({turf.reviewCount} reviews)</span>
            </div>

            <div>
              <h2 className="text-xl font-semibold">About this turf</h2>
              <p className="mt-2 text-muted-foreground">{turf.description}</p>
            </div>
          </div>

          <Card className="card-3d mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Google Maps Embed
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => window.open("https://maps.google.com", "_blank")}>
                View on Google Maps
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="card-3d mb-6 sticky top-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Choose Time Slot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {turf.timeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={cn(
                      "time-slot",
                      slot.available ? "time-slot-available" : "time-slot-booked",
                      selectedSlot === slot.id && "time-slot-selected"
                    )}
                    onClick={() => handleSlotSelection(slot.id)}
                  >
                    {slot.time}
                  </div>
                ))}
              </div>

              {selectedSlot && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border border-border p-4">
                    <div className="mb-2 text-sm text-muted-foreground">Selected Slot:</div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium">{selectedSlotTime}</div>
                      <div className="text-lg font-bold">₹{turf.pricePerHour}</div>
                    </div>
                  </div>

                  <Button className="button-3d w-full" asChild>
                    <Link 
                      to={{
                        pathname: "/booking-summary",
                        search: `?turf=${turf.id}&slot=${selectedSlot}`
                      }}
                    >
                      Book Now
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
