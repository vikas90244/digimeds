import { Calendar, Box, ScanLine } from "lucide-react";

export default function Features() {
  return (
    <section id="features" className="relative z-10 pt-12 pb-28 border-t border-main/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          {/* <h2 className="text-3xl md:text-5xl font-bold text-main mb-6 font-heading tracking-tight">
            Features
          </h2> */}
          <p className="text-lg md:text-xl text-main max-w-2xl mx-auto font-medium">
            A clean, clutter-free approach to managing your health essentials.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/*  Expiry */}
          <div className="group bg-white p-10 rounded-lg border border-main/15 hover:border-theme/20
           hover:cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] 
           hover:shadow-[0_20px_40px_rgba(167,214,233,0.1)] cursor-default">

            <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-6 border 
            border-theme/20 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6 text-primary" />
            </div>

            <h3 className="text-xl font-bold text-main mb-3 font-heading">Expiry Tracking</h3>
            <p className="text-main leading-relaxed text-sm font-medium">
              Automatically organize medications by expiration date. Get gentle warnings before things go bad.
            </p>
          </div>

          {/* Inventory */}
          <div className="group bg-white p-10 rounded-lg border border-main/15 hover:border-theme/20 
          hover:cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)] 
          hover:shadow-[0_20px_40px_rgba(167,214,233,0.1)] cursor-default">
            <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-6 border
             border-theme/20 group-hover:scale-110 transition-transform duration-300">
              <Box className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-main mb-3 font-heading">Inventory Control</h3>
            <p className="text-main leading-relaxed text-sm font-medium">
              Know exactly how many painkillers or vitamins you have left without digging through the cabinet.
            </p>
          </div>

          {/*  Scanning  */}
          <div className="group bg-white p-10 rounded-lg border border-main/15 hover:border-theme/20
           hover:cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.02)]
            hover:shadow-[0_20px_40px_rgba(167,214,233,0.1)] relative overflow-hidden cursor-default">
            <div className="absolute top-6 right-6 bg-theme/30 text-main text-xs font-semibold px-3 py-1 rounded-full border border-theme/50">
              coming soon
            </div>
            <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-6 border 
            border-theme/20 group-hover:scale-110 transition-transform duration-300">
              <ScanLine className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-main mb-3 font-heading">Smart Scanning</h3>
            <p className="text-main leading-relaxed text-sm font-medium">
              Skip the typing. Use your camera to instantly scan labels and extract details automatically.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}