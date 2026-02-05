import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import AccessibilityControls from "@/components/AccessibilityControls";

const queensides = localFont({
  src: [
    {
      path: "../public/Fonts/QueensidesLight-ZVj3l.ttf",
      weight: '300',
      style: 'normal',
    },
    {
      path: "../public/Fonts/Queensides-3z7Ey.ttf",
      weight: '400',
      style: 'normal',
    },
    {
      path: "../public/Fonts/QueensidesMedium-x30zV.ttf",
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-queensides',
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
      <body className={`${queensides.variable} ${queensides.className}`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-20 relative z-10">
            {children}
          </main>
          <Footer />
          <AccessibilityControls />
        </AuthProvider>
      </body>
    </html>
  );
}
