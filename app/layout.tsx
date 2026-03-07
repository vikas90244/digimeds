import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/QueryProvider";


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
        <QueryProvider>
              {children}
        </QueryProvider>
      </body>
    </html>
  );
}