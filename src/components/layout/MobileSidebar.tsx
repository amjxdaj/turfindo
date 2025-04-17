
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Calendar, MapPin, User, Settings, LogIn, HelpCircle, Clock, Star } from "lucide-react";

interface NavItem {
  icon: React.FC<{ className?: string }>;
  label: string;
  href: string;
}

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  userLoggedIn?: boolean;
}

const userNavItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: MapPin, label: "Find Turfs", href: "/turfs" },
  { icon: Calendar, label: "My Bookings", href: "/bookings" },
  { icon: User, label: "My Account", href: "/account" },
  { icon: Star, label: "Reviews", href: "/reviews" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const guestNavItems: NavItem[] = [
  { icon: Home, label: "Home", href: "/" },
  { icon: MapPin, label: "Find Turfs", href: "/turfs" },
  { icon: LogIn, label: "Log In", href: "/login" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

const MobileSidebar: React.FC<MobileSidebarProps> = ({ 
  open, 
  onClose, 
  userLoggedIn = false 
}) => {
  const navItems = userLoggedIn ? userNavItems : guestNavItems;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border/40 p-6">
          <SheetTitle>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-md bg-gradient-to-br from-turf-500 to-turf-700 p-1">
                <div className="absolute inset-0 flex items-center justify-center opacity-75">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">TurfVerse</span>
            </div>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-81px)]">
          <div className="px-2 py-4">
            <div className="mb-4 px-4 text-sm font-medium text-muted-foreground">
              Navigation
            </div>
            <nav className="grid gap-1 px-2">
              {navItems.map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="justify-start"
                  onClick={onClose}
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
              {userLoggedIn && (
                <Button
                  variant="ghost"
                  className="mt-2 justify-start text-destructive hover:text-destructive"
                >
                  <LogIn className="mr-2 h-4 w-4 rotate-180" />
                  Log Out
                </Button>
              )}
            </nav>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
