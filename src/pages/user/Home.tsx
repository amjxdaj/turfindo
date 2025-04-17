
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Star, Clock, CircleDollarSign } from "lucide-react";

// Mock data for the turfs
const turfsMockData = [
  {
    id: 1,
    name: "Green Valley Turf",
    image: "https://images.unsplash.com/photo-1486882430381-e76d701e0a3e?q=80&w=2340&auto=format&fit=crop",
    availableSlots: ["8:00 PM", "9:00 PM"],
    rating: 4.7,
    distance: "1.2 km",
    startingPrice: 1200,
  },
  {
    id: 2,
    name: "Urban Soccer Ground",
    image: "https://images.unsplash.com/photo-1554620121-59e7f3f6e3a4?q=80&w=2340&auto=format&fit=crop",
    availableSlots: ["6:00 PM", "7:00 PM", "8:00 PM"],
    rating: 4.5,
    distance: "2.5 km",
    startingPrice: 1500,
  },
  {
    id: 3,
    name: "Premier Football Arena",
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2340&auto=format&fit=crop",
    availableSlots: ["5:00 PM", "9:00 PM"],
    rating: 4.9,
    distance: "3.8 km",
    startingPrice: 1800,
  },
  {
    id: 4,
    name: "Sunshine Sports Park",
    image: "https://images.unsplash.com/photo-1575361204282-a3cd95ab4eef?q=80&w=2340&auto=format&fit=crop",
    availableSlots: ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
    rating: 4.3,
    distance: "4.1 km",
    startingPrice: 1100,
  },
];

// Available time slots
const timeSlots = [
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

const Home: React.FC = () => {
  const [location, setLocation] = useState("Current Location");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("All Time Slots");

  const filteredTurfs = selectedTimeSlot === "All Time Slots"
    ? turfsMockData
    : turfsMockData.filter(turf => turf.availableSlots.includes(selectedTimeSlot));

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="mb-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Find Turfs Near You</h1>
          <p className="text-muted-foreground">
            Book your favorite turf and play your heart out!
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="field-3d">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Current Location">Current Location</SelectItem>
                <SelectItem value="Downtown">Downtown</SelectItem>
                <SelectItem value="Uptown">Uptown</SelectItem>
                <SelectItem value="Midtown">Midtown</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Time Slot</label>
            <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
              <SelectTrigger className="field-3d">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Time Slots">All Time Slots</SelectItem>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Turfs Nearby</h2>
        <p className="text-sm text-muted-foreground">
          {filteredTurfs.length} turfs found {selectedTimeSlot !== "All Time Slots" && `for ${selectedTimeSlot}`}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTurfs.map((turf) => (
          <Card key={turf.id} className="turf-card overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={turf.image}
                alt={turf.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{turf.name}</h3>
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {turf.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4 pt-0">
              <div className="flex flex-wrap gap-y-2">
                <div className="flex w-1/2 items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{turf.distance}</span>
                </div>
                <div className="flex w-1/2 items-center gap-1.5 text-sm text-muted-foreground">
                  <CircleDollarSign className="h-3.5 w-3.5" />
                  <span>₹{turf.startingPrice}/hr</span>
                </div>
                <div className="mt-1 flex w-full items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {turf.availableSlots.join(", ")}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="button-3d w-full">
                <Link to={`/turfs/${turf.id}`}>Book Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
