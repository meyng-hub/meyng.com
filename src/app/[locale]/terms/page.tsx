"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

export default function TermsPage() {
  const t = useTranslations("terms");

  const sections = [
    { title: t("acceptanceTitle"), description: t("acceptanceDescription") },
    { title: t("useTitle"), description: t("useDescription") },
    { title: t("ipTitle"), description: t("ipDescription") },
    { title: t("productsTitle"), description: t("productsDescription") },
    { title: t("disclaimerTitle"), description: t("disclaimerDescription") },
    { title: t("liabilityTitle"), description: t("liabilityDescription") },
    { title: t("governingTitle"), description: t("governingDescription") },
    { title: t("changesTitle"), description: t("changesDescription") },
    { title: t("contactTitle"), description: t("contactDescription") },
  ];

  return (
    <>
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading label={t("sectionLabel")} title={t("title")} />
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <p className="text-meyng-silver/60 text-sm">{t("lastUpdated")}</p>
            <p className="text-meyng-silver leading-relaxed">{t("intro")}</p>

            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-meyng-light mb-3">
                  {section.title}
                </h2>
                <p className="text-meyng-silver leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
