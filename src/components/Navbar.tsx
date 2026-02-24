"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const newLocale = locale === "en" ? "fr" : "en";
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="px-3 py-1.5 rounded-lg border border-meyng-border text-meyng-silver hover:text-meyng-purple hover:border-meyng-purple/50 transition-colors text-sm font-medium"
      aria-label={locale === "en" ? "Passer en français" : "Switch to English"}
    >
      {locale === "en" ? "FR" : "EN"}
    </button>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/products" as const, label: t("products") },
    { href: "/about" as const, label: t("about") },
    { href: "/contact" as const, label: t("contact") },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-meyng-dark/90 backdrop-blur-xl border-b border-meyng-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-full.png"
              alt="MEYNG — AI-powered accessibility products"
              width={140}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 text-sm font-medium tracking-wide uppercase ${
                  isActive(link.href)
                    ? "text-meyng-purple"
                    : "text-meyng-silver hover:text-meyng-purple"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-meyng-purple hover:bg-meyng-deep active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-meyng-purple/25 hover:shadow-xl hover:shadow-meyng-purple/30"
            >
              {t("getInTouch")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-meyng-light p-2 -mr-2 rounded-lg"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 md:hidden"
              style={{ top: "80px" }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-meyng-dark/95 backdrop-blur-xl border-b border-meyng-border relative z-10"
            >
              <div className="px-6 py-4 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-3 rounded-lg transition-colors text-base ${
                      isActive(link.href)
                        ? "text-meyng-purple font-medium bg-meyng-purple/10"
                        : "text-meyng-silver hover:text-meyng-purple active:bg-meyng-purple/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-4">
                  <LanguageSwitcher />
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-center px-6 py-3 bg-meyng-purple active:scale-[0.98] text-white font-semibold rounded-lg transition-transform"
                  >
                    {t("getInTouch")}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
