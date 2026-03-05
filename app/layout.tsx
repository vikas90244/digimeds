import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import bg from "@/public/bg/bg.png";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Digimeds",
  description: "Medicine inventory and expiry tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} antialiased`}>
          <div className="fixed inset-0 z-0 pointer-events-none">
              <Image
                  src={bg}
                  fill
                  alt="Medical pattern background"
                  className="opacity-10 object-cover" 
                  priority 
                />
          </div>
      
        {children}
      </body>
    </html>
  );
}