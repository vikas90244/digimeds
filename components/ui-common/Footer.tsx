import { Pill } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 pt-10 pb-5 border-t border-main/5 bg-cream text-center">
      <div className="flex items-center justify-center gap-2 mb-3 opacity-60 hover:opacity-100 transition-opacity">
        <Pill className="w-5 h-5 text-primary" />
        <span className="text-lg font-bold text-main font-heading tracking-tight">Digimeds</span>
      </div>
      <p className="text-main font-medium text-sm">
        &copy; {new Date().getFullYear()} Digimeds. Clarity in your medicine management.
      </p>
    </footer>
  );
}