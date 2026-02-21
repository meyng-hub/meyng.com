"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Languages,
  Leaf,
  BookOpen,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { TranslationDemo } from "@/components/TranslationDemo";
import { PhoneMockup } from "@/components/PhoneMockup";
import { SMSConversation } from "@/components/SMSConversation";
import { DashboardMockup } from "@/components/DashboardMockup";

const productKeys = ["sangoai", "obetrack", "endara", "connectz"] as const;

const productMeta = [
  { icon: Languages, name: "SangoAI", url: "https://sangoai.sbs", demo: "translation", statusKey: "live" },
  { icon: Leaf, name: "Obêtrack", url: null, demo: "phone", statusKey: "inDevelopment" },
  { icon: BookOpen, name: "eNdara", url: null, demo: "sms", statusKey: "inDevelopment" },
  { icon: Users, name: "ConnectZ", url: null, demo: "dashboard", statusKey: "comingSoon" },
];

function ProductDemoPreview({ type }: { type: string }) {
  switch (type) {
    case "translation":
      return <TranslationDemo />;
    case "phone":
      return <PhoneMockup />;
    case "sms":
      return <SMSConversation />;
    case "dashboard":
      return <DashboardMockup />;
    default:
      return null;
  }
}

export default function ProductsPage() {
  const t = useTranslations();

  const statusColorMap: Record<string, string> = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    inDevelopment: "bg-meyng-purple/20 text-meyng-purple border-meyng-purple/30",
    comingSoon: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  const products = productMeta.map((meta, i) => ({
    ...meta,
    tagline: t(`products.${productKeys[i]}Full.tagline`),
    description: t(`products.${productKeys[i]}Full.description`),
    features: Array.from(
      { length: i === 0 || i === 1 || i === 2 || i === 3 ? 5 : 4 },
      (_, j) => t(`products.${productKeys[i]}Full.features.${j}`)
    ),
    status: t(`common.${meta.statusKey}`),
  }));

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("products.sectionLabel")}
            title={t("products.sectionTitle")}
            description={t("products.sectionDescription")}
          />
        </div>
      </section>

      {/* Product Sections */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24 lg:space-y-32">
            {products.map((product, i) => {
              const Icon = product.icon;
              const isEven = i % 2 === 1;
              const statusColor = statusColorMap[productMeta[i].statusKey];

              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col ${isEven ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-16`}
                >
                  {/* Info side */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-xl bg-meyng-deep/40 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-meyng-purple" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-meyng-light">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-meyng-purple text-sm font-medium mb-2">
                      {product.tagline}
                    </p>

                    <span
                      className={`inline-block text-xs font-medium px-3 py-1 rounded-full border mb-5 ${statusColor}`}
                    >
                      {product.status}
                    </span>

                    <p className="text-meyng-silver leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-meyng-silver/80 text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-meyng-purple flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {product.url && (
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-meyng-purple hover:text-meyng-light transition-colors text-sm font-medium"
                      >
                        {t("products.visit", { name: product.name })}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Demo side */}
                  <div className="flex-1 w-full flex justify-center">
                    <ProductDemoPreview type={product.demo} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-meyng-light mb-6">
              {t("products.ctaTitle")}
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              {t("products.ctaDescription")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20"
            >
              {t("products.ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
