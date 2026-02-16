import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import AccessibilityControls from "@/components/AccessibilityControls";
import { AppShell } from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Leo Club of Pannipitiya Paradise",
  description: "Official website of Leo Club of Pannipitiya Paradise - Serving the community with passion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className}`}>
        <AuthProvider>
          <Navbar />
          <AppShell>
            {children}
          </AppShell>
          <Footer />
          <AccessibilityControls />
        </AuthProvider>
      </body>
    </html>
  );
}
