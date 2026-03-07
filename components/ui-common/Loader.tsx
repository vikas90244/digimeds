import { Pill } from "lucide-react";

export default function Loader({
  fullPage = false,
}: {
  label?: string;
  fullPage?: boolean;
}) {
  return (
    <div 
      className={`flex flex-col items-center justify-center ${
        fullPage 
          ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm" 
          : "w-full min-h-[40vh]"
      }`}
    >
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-theme/20 border-t-main animate-spin"></div>
        
        <Pill className="w-5 h-5 text-primary animate-pulse" />
      </div>

      {/* {label && (
        <p className="text-sm font-medium text-main/50 animate-pulse font-sans tracking-wide">
          {label}
        </p>
      )} */}
    </div>
  );
}