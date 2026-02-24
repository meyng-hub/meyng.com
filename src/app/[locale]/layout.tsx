import type { Metadata } from "next";
import { Montserrat, Questrial } from "next/font/google";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Providers } from "@/components/Providers";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

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

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://meyng.com"),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
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
      title: t("title"),
      description: t("ogDescription"),
      url: "https://meyng.com",
      siteName: "MEYNG",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: `https://meyng.com/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "MEYNG — AI That Matters",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
      images: [`https://meyng.com/${locale}/twitter-image`],
    },
    icons: {
      icon: "/favicon.png",
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://meyng.com/${locale}`,
      languages: {
        en: "https://meyng.com/en",
        fr: "https://meyng.com/fr",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${questrial.variable} antialiased bg-meyng-dark text-meyng-light`}
      >
        {/* Skip-to-content link for keyboard navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-meyng-purple focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          {locale === "fr"
            ? "Aller au contenu principal"
            : "Skip to main content"}
        </a>
        <GoogleAnalytics />
        <Providers locale={locale} messages={messages}>
          <Navbar />
          <main id="main-content" role="main">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
