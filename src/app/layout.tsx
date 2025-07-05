
import Footer from "@/Components/Footer/footer"
import Header from "@/Components/Header/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/Components/Toast/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sellr - Create Account",
  description: "Sign up for Sellr platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add Header component */}
        <Header />
        {children}
        {/* Add ToastProvider for toast notifications */}
        <ToastProvider 
          position="top-right"
          richColors={true}
          closeButton={true}
          expand={true}
          duration={4000}
          theme="light"
        />
        <Footer />
      </body>
    </html>
  );
}