import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Winstead",
  description: "Find Curated Properties Across the Globe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <main className="bg-black text-white">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
