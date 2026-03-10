"use client";

import { BellIcon, ChevronRight, Menu, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';

const LOGGING: boolean = false;

export default function DashHeader({ setIsOpen }: { setIsOpen: (val: boolean) => void }) {
    const pathname = usePathname();
    const paths = pathname.split('/').filter((path) => path);
    
    const { data: session } = useSession();
    
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getInitials = (name?: string | null) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };


    LOGGING && console.log("pathname: ", pathname);
    LOGGING && console.log("paths: ", paths);

  return (
  <header className='h-12 border-b px-4 md:px-8 border-main/10 flex items-center justify-between top-0 z-20 shrink-0'>
    
    <div className='flex items-center gap-3'>
        {/* Hamburger Menu  */}
        <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden text-main hover:text-theme-bold transition-colors"
        >
            <Menu className="w-3 h-3 font-bold hover:cursor-pointer" />
        </button>

        <div className='flex items-center gap-2 text-xs font-medium font-sans'>
            {paths.map((path, idx) => {
                const title = path.charAt(0).toUpperCase() + path.slice(1);
                const isLast = idx === paths.length - 1;
                const href = "/" + paths.slice(0, idx + 1).join("/");

                return (
                <div key={path} className='flex items-center gap-2'>
                  <Link
                    href={href}
                    className={`transition-colors duration-300 ${isLast ? "text-theme-bold font-bold" : "text-main/80 hover:text-theme-bold"}`}
                  >
                    {title}
                  </Link>
                  {!isLast && <ChevronRight className="w-4 h-4 text-main/50 text-xs" />}
                </div>
                )
            })}
        </div>
    </div>

    <div className="flex items-center gap-5">
        <button className="p-2 rounded-xl text-[#a9a9a9] hover:bg-theme/10 hover:text-[#a9a9a9] hover:cursor-pointer transition-colors relative">
          <BellIcon className="w-4 h-4 text-[#a9a9a9]" fill='#A9A9A9'/>
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-warning rounded-full"></span>
        </button>
        
        {/* Profile Dropdown Container */}
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-7 h-7 rounded-full bg-[#A9A9A9] flex items-center justify-center text-gray-50 font-bold text-xs border border-[#a9a9a9] hover:cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all"
            >
                {getInitials(session?.user?.name)}
            </button>

            {/* The Dropdown Card */}
            {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-cream/40 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-main/10 py-2 z-50 transform opacity-100 scale-100 transition-all origin-top-right">
                    
                    {/* User Info Section */}
                    <div className="px-4 py-2 border-b border-main/5 mb-1.5">
                        <p className="text-sm font-bold text-main truncate">
                            {session?.user?.name || 'Loading...'}
                        </p>
                        <p className="text-[10px] text-main/60 truncate font-medium mt-0.5">
                            {session?.user?.email}
                        </p>
                    </div>

                    {/* Actions Section */}
                    <div className="px-2">
                        <button
                            onClick={() => signOut({ callbackUrl: '/login' })}
                            className="w-full flex items-center gap-2 px-2 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg hover:cursor-pointer transition-colors text-left"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  </header>
  )
}