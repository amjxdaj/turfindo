import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import TurfAdminLayout from "./components/layout/TurfAdminLayout";

// User Pages
import Home from "./pages/user/Home";
import TurfDetails from "./pages/user/TurfDetails";
import BookingSummary from "./pages/user/BookingSummary";
import UserAccount from "./pages/user/UserAccount";
import BookingHistory from "./pages/user/BookingHistory";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Turf Admin Pages
import TurfAdminLogin from "./pages/turf-admin/TurfAdminLogin";
import TurfAdminDashboard from "./pages/turf-admin/TurfAdminDashboard";
import TurfAdminBookings from "./pages/turf-admin/TurfAdminBookings";
import TurfAdminTimeSlots from "./pages/turf-admin/TurfAdminTimeSlots";
import TurfAdminSummary from "./pages/turf-admin/TurfAdminSummary";

// Super Admin Pages
import SuperAdminLogin from "./pages/super-admin/SuperAdminLogin";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import ManageUsers from "./pages/super-admin/ManageUsers";
import ManageTurfAdmins from "./pages/super-admin/ManageTurfAdmins";
import ManageTurfs from "./pages/super-admin/ManageTurfs";
import PlatformStats from "./pages/super-admin/PlatformStats";
import FraudLogs from "./pages/super-admin/FraudLogs";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Update App.tsx to include TurfAdminLayout wrapper around Turf Admin routes

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route element={<AppLayout userLoggedIn={false} />}>
            <Route path="/" element={<Home />} />
            <Route path="/turfs/:id" element={<TurfDetails />} />
            <Route path="/booking-summary" element={<BookingSummary />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Authenticated User Routes */}
          <Route element={<AppLayout userLoggedIn={true} />}>
            <Route path="/account" element={<UserAccount />} />
            <Route path="/bookings" element={<BookingHistory />} />
          </Route>

          {/* Turf Admin Routes */}
          <Route path="/turf-admin/login" element={<TurfAdminLogin />} />
          <Route element={<TurfAdminLayout />}>
            <Route path="/turf-admin/dashboard" element={<TurfAdminDashboard />} />
            <Route path="/turf-admin/bookings" element={<TurfAdminBookings />} />
            <Route path="/turf-admin/time-slots" element={<TurfAdminTimeSlots />} />
            <Route path="/turf-admin/summary" element={<TurfAdminSummary />} />
          </Route>

          {/* Super Admin Routes */}
          <Route path="/super-admin">
            <Route path="login" element={<SuperAdminLogin />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="turf-admins" element={<ManageTurfAdmins />} />
            <Route path="turfs" element={<ManageTurfs />} />
            <Route path="stats" element={<PlatformStats />} />
            <Route path="fraud-logs" element={<FraudLogs />} />
          </Route>

          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
