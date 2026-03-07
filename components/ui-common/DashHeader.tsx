"use client";

import { BellIcon, ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOGGING: boolean = false;

export default function DashHeader({ setIsOpen }: { setIsOpen: (val: boolean) => void }) {

    const pathname = usePathname();
    const paths = pathname.split('/').filter((path) => path);
    
    LOGGING && console.log("pathname: ", pathname);
    LOGGING && console.log("paths: ", paths);

  return (
  <header className='h-12 border-b px-4 md:px-8 border-main/10 flex items-center justify-between top-0 z-20 shrink-0'>
    
    <div className='flex items-center gap-3'>
        {/* Hamburger Menu (Mobile Only) */}
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
        
        <div className="w-7 h-7 rounded-full bg-[#A9A9A9] flex items-center justify-center text-gray-50 font-bold text-xs border border-[#a9a9a9]">
          VS
        </div>
    </div>
  </header>
  )
}