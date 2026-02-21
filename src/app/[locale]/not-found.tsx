"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <section className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-8xl md:text-9xl font-extrabold gradient-text">
            404
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-meyng-light mt-4 mb-4">
            {t("title")}
          </h1>
          <p className="text-meyng-silver leading-relaxed mb-10">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20"
            >
              <Home className="w-4 h-4" />
              {t("backHome")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-meyng-border hover:border-meyng-purple/50 text-meyng-light font-semibold rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("contact")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
