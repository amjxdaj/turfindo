
import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  CalendarDays, 
  LogOut, 
  Menu, 
  BarChart3, 
  CircleDollarSign, 
  Clock, 
  MapPin,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navigation: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/turf-admin/dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    name: "Bookings",
    href: "/turf-admin/bookings",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  {
    name: "Time Slots",
    href: "/turf-admin/time-slots",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    name: "Summary",
    href: "/turf-admin/summary",
    icon: <CircleDollarSign className="h-5 w-5" />,
  },
];

const TurfAdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Implement logout logic
    navigate("/turf-admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <div className="hidden w-64 flex-col border-r border-border/40 bg-sidebar md:flex">
          <div className="flex h-16 items-center border-b border-border/40 px-6">
            <Link to="/turf-admin/dashboard" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-turf-500 to-turf-700 p-1">
                <div className="absolute inset-0 flex items-center justify-center opacity-75">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">TurfAdmin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-6">
            <nav className="space-y-1 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-border/40 p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0 sm:max-w-sm">
          <SheetHeader className="border-b border-border/40 p-6">
            <SheetTitle>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-turf-500 to-turf-700 p-1">
                  <div className="absolute inset-0 flex items-center justify-center opacity-75">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold tracking-tight">TurfAdmin</span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-81px)]">
            <div className="px-2 py-4">
              <div className="mb-4 px-4 text-sm font-medium text-muted-foreground">
                Navigation
              </div>
              <nav className="grid gap-1 px-2">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      "justify-start",
                      location.pathname === item.href && "bg-muted"
                    )}
                    onClick={() => {
                      navigate(item.href);
                      setSidebarOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="mt-2 justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </Button>
              </nav>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border/40 bg-background/80 backdrop-blur-lg">
          <div className="flex w-full items-center justify-between px-4">
            <div className="flex items-center">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                  className="mr-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-xl font-semibold">
                {navigation.find((item) => item.href === location.pathname)?.name || "Dashboard"}
              </h1>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Green Valley Turf</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/turf-admin/profile" className="cursor-pointer">Turf Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/turf-admin/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/30 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TurfAdminLayout;
