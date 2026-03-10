"use client";

import { CalendarClock, LayoutDashboard, LogOut, Pill, PillBottle, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
    
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Medicines", href: "/dashboard/medicines", icon: PillBottle },
        { name: "Schedule", href: "/dashboard/schedule", icon: CalendarClock },
        { name: "Settings", href: "/dashboard/settings", icon: Settings }
    ]

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-105 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed md:static inset-y-0 left-0 w-56 bg-gray-100 border-r border-main/10 h-screen flex flex-col z-110 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                {/* Brand */}
                <div className="h-12 flex items-center px-7 border-b border-main/10 shrink-0">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-theme/20 p-2 rounded-xl border border-theme/40 transition-colors">
                            <Pill className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-semibold text-main font-heading tracking-tight text-md">
                            Digimeds
                        </span>
                    </Link>
                </div>
                
                {/* navigation links */}
                <nav className="flex-1 overflow-y-auto py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        // const Icon = item.icon; // Uncomment if you want to use icons later
                        
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)} // Close sidebar on mobile after clicking
                                className={`flex items-center font-medium h-10 text-xs pl-6 py-3 transition-all duration-300 relative group font-sans ${
                                    isActive
                                        ? "text-theme-bold font-bold bg-theme/20"
                                        : "text-main hover:bg-black/5 hover:text-main"
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-full bg-theme-bold/80  shadow-sm"></div>
                                )}
                                <span className="leading-none">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* <div className="pl-8 border-t border-main/10 shrink-0">
                    <button className="flex items-center gap-3 pl-3 py-4 w-full text-main hover:bg-theme/20 hover:text-red-500 hover:cursor-pointer transition-all font-medium duration-300">
                        <LogOut className="w-5 h-6" />
                        Logout
                    </button>
                </div> */}
            </aside>
        </>
    )
}