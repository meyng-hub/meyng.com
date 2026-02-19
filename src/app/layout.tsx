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
    default: "MEYNG | AI That Matters",
    template: "%s | MEYNG",
  },
  description:
    "MEYNG builds AI-driven products that fight for accessibility — bridging gaps in language, education, food sustainability, and community development for underserved communities worldwide.",
  keywords: [
    "MEYNG",
    "AI",
    "accessibility",
    "impact",
    "SangoAI",
    "language technology",
    "food waste",
    "education",
    "NGO",
    "global",
  ],
  openGraph: {
    title: "MEYNG | AI That Matters",
    description:
      "We build AI products that fight for accessibility — for those left behind.",
    url: "https://meyng.com",
    siteName: "MEYNG",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MEYNG | AI That Matters",
    description:
      "We build AI products that fight for accessibility — for those left behind.",
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
