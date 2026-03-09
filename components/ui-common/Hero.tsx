import Link from "next/link";
import { Pill, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative z-10  pt-48 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
      
      {/*  Subtle Tagline Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream border
       border-theme/30 shadow-sm text-main font-medium text-sm mb-8">
        <Sparkles className="w-4 h-4 text-primary" />
        <span>Your Smart Home Pharmacy</span>
      </div>
      
      {/*  Massive, Clean Headline */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-main tracking-tight mb-8 font-heading leading-[1.1]">
        Master Your <br className="hidden md:block"/>
        <span className="text-theme">Medicine Cabinet.</span>
      </h1>
      
      {/* Subtext */}
      <p className="text-md md:text-lg text-main max-w-2xl mb-12 leading-relaxed font-medium">
        Never guess what's in stock. Track expiry dates, manage inventory, and get smart reminders—elegantly and simply.
      </p>
      
      {/* Calls to Action */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
        <Link 
          href="/register" 
          className="px-8 py-2 rounded-full bg-cream text-main font-medium text-sm hover:scale-105
           hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto group"
        >
          <Pill className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
          Get Started 
        </Link>
        
        <Link 
          href="#features" 
          className="px-8 py-2 rounded-full bg-white text-main font-medium text-sm hover:bg-theme 
          border border-main/10 hover:border-theme/50 transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
        >
          Explore Features
        </Link>
      </div>

    </section>
  );
}