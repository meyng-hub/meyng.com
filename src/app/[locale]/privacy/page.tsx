"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/SectionHeading";

export default function PrivacyPage() {
  const t = useTranslations("privacy");

  const sections = [
    {
      title: t("collectTitle"),
      description: t("collectDescription"),
      items: [0, 1, 2].map((i) => t(`collectItems.${i}`)),
    },
    {
      title: t("useTitle"),
      description: t("useDescription"),
      items: [0, 1, 2, 3].map((i) => t(`useItems.${i}`)),
    },
    {
      title: t("sharingTitle"),
      description: t("sharingDescription"),
    },
    {
      title: t("cookiesTitle"),
      description: t("cookiesDescription"),
    },
    {
      title: t("securityTitle"),
      description: t("securityDescription"),
    },
    {
      title: t("rightsTitle"),
      description: t("rightsDescription"),
    },
    {
      title: t("contactTitle"),
      description: t("contactDescription"),
    },
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
                {"items" in section && section.items && (
                  <ul className="mt-3 space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-meyng-silver text-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-meyng-purple mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
