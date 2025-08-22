import { ReactNode } from 'react';

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import BottomNav from "./BottomNav";

interface MobileLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  onLogout?: () => void;
}

const MobileLayout = ({ children, showHeader = true, title, onLogout }: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      {showHeader && (
  <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-center flex-1">
              {title || "Bunko"}
            </h1>
          </div>
        </header>
      )}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground px-4 py-6 max-w-md mx-auto w-full" style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
        {children}
      </div>
      <BottomNav />
    </div>
  );
};

export default MobileLayout;