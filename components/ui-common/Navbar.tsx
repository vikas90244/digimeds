import Link from 'next/link';
import { Pill, ArrowRight } from 'lucide-react';
function Navbar() {
  return (
          <div
      className="fixed top-6 inset-x-0 flex justify-center z-50 pointer-events-none px-4"
      >
        <nav
        className="pointer-events-auto flex items-center gap-4 sm:gap-6 px-6 py-3 bg-white/80
         backdrop-blur-xl border border-main/10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
         transition-all hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
        >
          <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-cream/50 p-1.5 rounded-full border border-theme/30 group-hover:bg-theme/20 transition-colors">
          <Pill className="w-5 h-5 text-primary group-hover:rotate-180 transition-transform duration-300" />
          </div>
          <span
          className="font-bold text-main font-heading hidden sm:block tracking-tight"
          >
            Digimeds
          </span>
          </Link>
          <div className="w-[1px] h-4 bg-main/10 hidden sm:block"></div>

          <div className="flex items-center gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium text-main/60 hover:text-main transition-colors">
            Features
          </Link>
          <Link href="#workflow" className="text-sm font-medium text-main/60 hover:text-main transition-colors hidden md:block">
            Workflow
          </Link>
        </div>

        {/* Primary Call to Action */}
        <Link 
          href="/dashboard" 
          className="ml-2 px-5 py-2 rounded-full bg-main text-white text-sm font-medium hover:bg-main/90 hover:scale-105 transition-all shadow-md shadow-main/10 flex items-center gap-1.5"
        >
          Dashboard <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        </nav>
      </div>
  )
}

export default Navbar