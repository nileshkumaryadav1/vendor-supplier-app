// app/layout.js or app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import MobileNavbar from "@/components/nav/MobileNav";
import Footer from "@/components/nav/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "RawEase – Streamlining Raw Material Access",
  description: "Connecting street food vendors with affordable, trusted raw material suppliers.",
  keywords: ["RawEase", "raw material", "vendors", "hackathon", "suppliers", "Next.js"],
  authors: [{ name: "Your Team Name", url: "https://yourprojectlink.com" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased min-h-screen bg-white text-black">
        <Navbar />
        <MobileNavbar />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
