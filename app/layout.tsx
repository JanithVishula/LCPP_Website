import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
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
      <body className={montserrat.className}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
