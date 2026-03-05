import Link from "next/link";
import Image from "next/image";
import { 
  Pill, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import bg from "@/public/bg/bg.png";
import Navbar from "@/components/ui-common/Navbar";
import Hero from "@/components/ui-common/Hero";
import Features from "@/components/ui-common/Features";
import Footer from "@/components/ui-common/Footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen font-sans text-main selection:bg-theme selection:text-main overflow-x-hidden">
      
    
      {/* top wrapper */}
      <Navbar />
      {/* Hero section */}
      <main>
        <Hero />
        <Features />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}