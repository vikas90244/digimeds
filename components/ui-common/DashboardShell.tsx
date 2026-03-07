"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import DashHeader from "./DashHeader";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden relative z-10">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <DashHeader setIsOpen={setIsSidebarOpen} />
        
        <main className="flex-1 relative overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}