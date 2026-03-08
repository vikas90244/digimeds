import type { Metadata } from "next";
import Image from "next/image";
import bg from "@/public/bg/bg.png";
import DashboardShell from "@/components/ui-common/DashboardShell";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Dashboard | Digimeds",
  description: "Manage your medicine inventory",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-gray-50 text-main font-sans h-screen w-screen overflow-hidden">
        {/* Background Layer */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
            <Image
                src={bg}
                fill
                alt="Medical pattern background"
                className="opacity-10 object-cover"
                priority
            />
        </div>
        <Toaster />
        {/* Responsive Shell */}
        <DashboardShell>
            {children}
        </DashboardShell>
    </div>
  );
}