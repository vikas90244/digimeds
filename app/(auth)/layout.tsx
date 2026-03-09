import Image from "next/image";
import bg from "@/public/bg/bg.png";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Register or Login | Digimeds",
  description: "Manage your medicine inventory",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
       <div className="relative min-h-screen min-w-screen flex items-center justify-center">
             <div className="fixed inset-0 z-0 opacity-70 0 pointer-events-none">
                <Image
                    src={bg}
                    fill
                    alt="Medical pattern background"
                    className="opacity-10 object-cover"
                    priority
                />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}