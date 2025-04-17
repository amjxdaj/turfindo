
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";

interface AppLayoutProps {
  userLoggedIn?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ userLoggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header 
        userLoggedIn={userLoggedIn} 
        onOpenMobileMenu={() => setMobileMenuOpen(true)} 
      />
      <MobileSidebar 
        open={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        userLoggedIn={userLoggedIn} 
      />
      <main className="flex-1 bg-background">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
