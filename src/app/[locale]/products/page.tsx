"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ExternalLink,
  Code,
  Cpu,
  Globe,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { TranslationDemo } from "@/components/TranslationDemo";
import { SMSConversation } from "@/components/SMSConversation";
import { PhoneMockup } from "@/components/PhoneMockup";
import { APIShowcase } from "@/components/APIShowcase";
import { productKeys, productMeta, statusColorMap } from "@/data/products";

const techCards = [
  { icon: Code, color: "text-meyng-purple" },
  { icon: Cpu, color: "text-emerald-400" },
  { icon: Globe, color: "text-blue-400" },
  { icon: MessageSquare, color: "text-amber-400" },
] as const;

function ProductDemoPreview({ type }: { type: string }) {
  switch (type) {
    case "translation":
      return <TranslationDemo />;
    case "sms":
      return <SMSConversation />;
    case "phone":
      return <PhoneMockup />;
    default:
      return null;
  }
}

export default function TechnologyPage() {
  const t = useTranslations();

  const products = productMeta.map((meta, i) => ({
    ...meta,
    tagline: t(`products.${productKeys[i]}Full.tagline`),
    description: t(`products.${productKeys[i]}Full.description`),
    features: Array.from(
      {
        length:
          productKeys[i] === "sangoai"
            ? 7
            : productKeys[i] === "endara"
              ? 6
              : 6,
      },
      (_, j) => t(`products.${productKeys[i]}Full.features.${j}`),
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

      {/* Technology Infrastructure Overview */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["api", "nlp", "model", "deploy"] as const).map((key, i) => {
              const Icon = techCards[i].icon;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-meyng-card rounded-2xl border border-meyng-border p-6 hover:border-meyng-purple/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-meyng-deep/40 flex items-center justify-center mb-4">
                    <Icon className={`w-5 h-5 ${techCards[i].color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-meyng-light mb-2">
                    {t(`techStack.${key}.title`)}
                  </h3>
                  <p className="text-meyng-silver text-xs leading-relaxed">
                    {t(`techStack.${key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Product Sections */}
      <section className="py-24 lg:py-32">
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
                          className="flex items-start gap-2 text-meyng-silver/80 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
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

      {/* API Showcase */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-meyng-purple" />
                  <span className="text-meyng-purple text-sm font-semibold uppercase tracking-widest">
                    {t("api.label")}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-meyng-light mb-4">
                  {t("api.title")}
                </h2>
                <p className="text-meyng-silver leading-relaxed mb-6">
                  {t("api.description")}
                </p>
                <a
                  href="https://sangoai.sbs/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-meyng-purple hover:text-meyng-light transition-colors font-medium"
                >
                  {t("api.cta")}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
            <div>
              <APIShowcase />
            </div>
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
              className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-meyng-purple/25 hover:shadow-xl hover:shadow-meyng-purple/30"
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
