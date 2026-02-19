import type { Metadata } from "next";
import { Montserrat, Questrial } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "MEYNG | AI-Powered Solutions for Africa",
    template: "%s | MEYNG",
  },
  description:
    "MEYNG builds AI-driven products that bridge gaps in language, education, food sustainability, and community development across Africa.",
  keywords: [
    "MEYNG",
    "AI",
    "Africa",
    "SangoAI",
    "language technology",
    "food waste",
    "education",
    "NGO",
  ],
  openGraph: {
    title: "MEYNG | AI-Powered Solutions for Africa",
    description:
      "Building AI products that create real impact across the African continent.",
    url: "https://meyng.com",
    siteName: "MEYNG",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MEYNG | AI-Powered Solutions for Africa",
    description:
      "Building AI products that create real impact across the African continent.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${questrial.variable} antialiased bg-meyng-dark text-meyng-light`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
