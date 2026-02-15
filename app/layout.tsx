import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ['400', '500', '700']
});


export const metadata: Metadata = {
  title: "Smart Bookmark",
  description: "Save the resource you need. Own Your Knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased dark`}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
