
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { CircleDollarSign, Calendar, TrendingUp } from "lucide-react";

// Mock data for charts
const dailyData = [
  { name: "Mon", bookings: 4, revenue: 4800 },
  { name: "Tue", bookings: 3, revenue: 3600 },
  { name: "Wed", bookings: 5, revenue: 6000 },
  { name: "Thu", bookings: 7, revenue: 8400 },
  { name: "Fri", bookings: 9, revenue: 10800 },
  { name: "Sat", bookings: 12, revenue: 14400 },
  { name: "Sun", bookings: 8, revenue: 9600 },
];

const monthlyData = [
  { name: "Jan", bookings: 120, revenue: 144000 },
  { name: "Feb", bookings: 100, revenue: 120000 },
  { name: "Mar", bookings: 140, revenue: 168000 },
  { name: "Apr", bookings: 167, revenue: 200400 },
];

const pieData = [
  { name: "5:00 PM - 6:00 PM", value: 15 },
  { name: "6:00 PM - 7:00 PM", value: 25 },
  { name: "7:00 PM - 8:00 PM", value: 35 },
  { name: "8:00 PM - 9:00 PM", value: 20 },
  { name: "9:00 PM - 10:00 PM", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const TurfAdminSummary: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Summary</h1>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="daily" className="flex-1 sm:flex-none">Daily</TabsTrigger>
          <TabsTrigger value="weekly" className="flex-1 sm:flex-none">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1 sm:flex-none">Monthly</TabsTrigger>
          <TabsTrigger value="yearly" className="flex-1 sm:flex-none">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <SummaryCard
              title="Total Bookings"
              value="8"
              description="Today"
              icon={<Calendar className="h-5 w-5" />}
              change={{ value: "+2", increasing: true }}
            />
            <SummaryCard
              title="Total Revenue"
              value="₹9,600"
              description="Today"
              icon={<CircleDollarSign className="h-5 w-5" />}
              change={{ value: "+₹2,400", increasing: true }}
            />
            <SummaryCard
              title="Commission"
              value="₹960"
              description="Platform fee (10%)"
              icon={<TrendingUp className="h-5 w-5" />}
            />
          </div>

          <Card className="card-3d">
            <CardHeader>
              <CardTitle>Daily Bookings & Revenue</CardTitle>
              <CardDescription>
                Last 7 days performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dailyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="bookings" fill="#8884d8" name="Bookings" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (₹)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Time Slot Distribution</CardTitle>
                <CardDescription>
                  Bookings by time slot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="card-3d">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Today's breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 rounded-lg border border-border p-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Gross Revenue</p>
                      <p className="text-xl font-bold">₹9,600</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Platform Fee</p>
                      <p className="text-xl font-bold">₹960</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Net Earnings</p>
                      <p className="text-xl font-bold text-green-600">₹8,640</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Utilization</p>
                      <p className="text-xl font-bold">80%</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border p-4">
                    <h3 className="text-lg font-medium">Next Payout</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">April 30, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-medium">₹29,205</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          <div className="rounded-lg border border-border p-8 text-center">
            <h3 className="text-xl font-medium">Weekly Summary View</h3>
            <p className="mt-2 text-muted-foreground">
              This section displays weekly statistics and charts
            </p>
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="rounded-lg border border-border p-8 text-center">
            <h3 className="text-xl font-medium">Monthly Summary View</h3>
            <p className="mt-2 text-muted-foreground">
              This section displays monthly statistics and charts
            </p>
          </div>
        </TabsContent>

        <TabsContent value="yearly">
          <div className="rounded-lg border border-border p-8 text-center">
            <h3 className="text-xl font-medium">Yearly Summary View</h3>
            <p className="mt-2 text-muted-foreground">
              This section displays yearly statistics and charts
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Summary Card Component
interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    increasing: boolean;
  };
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
  icon,
  change,
}) => {
  return (
    <Card className="card-3d">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            {icon}
          </div>
          {change && (
            <div
              className={`text-sm font-medium ${
                change.increasing ? "text-green-600" : "text-red-600"
              }`}
            >
              {change.value}
            </div>
          )}
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TurfAdminSummary;
