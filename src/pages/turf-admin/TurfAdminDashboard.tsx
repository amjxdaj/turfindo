
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  CircleDollarSign,
  Users,
  TrendingUp,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data
const stats = [
  {
    name: "Total Bookings",
    value: 167,
    change: 12.5,
    increasing: true,
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    name: "Total Revenue",
    value: "₹32,450",
    change: 8.2,
    increasing: true,
    icon: <CircleDollarSign className="h-5 w-5" />,
  },
  {
    name: "New Users",
    value: 52,
    change: -4.3,
    increasing: false,
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "Growth Rate",
    value: "15.2%",
    change: 2.3,
    increasing: true,
    icon: <TrendingUp className="h-5 w-5" />,
  },
];

const upcomingBookings = [
  {
    id: "B12345",
    userName: "Rahul Sharma",
    phone: "9876543210",
    date: "Today",
    time: "5:00 PM - 6:00 PM",
    status: "confirmed",
  },
  {
    id: "B12346",
    userName: "Priya Singh",
    phone: "9876543211",
    date: "Today",
    time: "7:00 PM - 8:00 PM",
    status: "confirmed",
  },
  {
    id: "B12347",
    userName: "Amit Kumar",
    phone: "9876543212",
    date: "Tomorrow",
    time: "6:00 PM - 7:00 PM",
    status: "pending",
  },
  {
    id: "B12348",
    userName: "Neha Gupta",
    phone: "9876543213",
    date: "Tomorrow",
    time: "8:00 PM - 9:00 PM",
    status: "confirmed",
  },
];

const TurfAdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="card-3d">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {stat.icon}
                </div>
                <div className="flex items-center">
                  <span
                    className={cn(
                      "flex items-center text-sm font-medium",
                      stat.increasing ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {stat.increasing ? (
                      <ChevronUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="mr-1 h-4 w-4" />
                    )}
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-3d overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>
              Your next scheduled bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative max-h-[400px] overflow-auto">
              <table className="w-full">
                <thead className="sticky top-0 bg-background text-left">
                  <tr className="border-b border-border/40">
                    <th className="whitespace-nowrap px-6 py-3 text-sm font-medium">
                      User
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-sm font-medium">
                      Time
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-sm font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-border/40 last:border-0"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <div className="font-medium">{booking.userName}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.phone}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <div className="font-medium">{booking.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.time}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>
              Revenue breakdown for April 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="mb-2 text-sm font-medium">Total Earned</div>
                <div className="flex items-baseline justify-between">
                  <div className="text-3xl font-bold">₹32,450</div>
                  <div className="flex items-center text-sm text-green-600">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    8.2% from last month
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-border py-2">
                  <span>Platform commission (10%)</span>
                  <span className="font-medium">₹3,245</span>
                </div>
                <div className="flex items-center justify-between border-b border-border py-2">
                  <span>Your revenue</span>
                  <span className="font-medium">₹29,205</span>
                </div>
                <div className="flex items-center justify-between border-b border-border py-2">
                  <span>Total bookings</span>
                  <span className="font-medium">167</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Average booking value</span>
                  <span className="font-medium">₹194</span>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-center">
                  <div className="text-sm font-medium text-muted-foreground">
                    Next payout date
                  </div>
                  <div className="mt-1 text-lg font-bold">May 1, 2025</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TurfAdminDashboard;
