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
  Sparkles,
  Shield,
  Zap,
  Code,
  ExternalLink,
} from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedStats } from "@/components/AnimatedStats";
import { TranslationDemo } from "@/components/TranslationDemo";
import { PhoneMockup } from "@/components/PhoneMockup";
import { SMSConversation } from "@/components/SMSConversation";
import { DashboardMockup } from "@/components/DashboardMockup";
import { APIShowcase } from "@/components/APIShowcase";

const productKeys = ["sangoai", "kobetrack", "endara", "connectz"] as const;

const productMeta = [
  { icon: Languages, name: "SangoAI", url: "https://sangoai.sbs", demo: "translation", statusKey: "live" },
  { icon: Leaf, name: "KobeTrack", url: null, demo: "phone", statusKey: "inDevelopment" },
  { icon: BookOpen, name: "eNdara", url: null, demo: "sms", statusKey: "inDevelopment" },
  { icon: Users, name: "ConnectZ", url: null, demo: "dashboard", statusKey: "comingSoon" },
];

const valueKeys = ["aiFirst", "accessibilityFirst", "impactDriven"] as const;
const valueIcons = [Sparkles, Shield, Zap];

function ProductDemo({ type }: { type: string }) {
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

export default function Home() {
  const t = useTranslations();

  const products = productMeta.map((meta, i) => ({
    ...meta,
    tagline: t(`products.${productKeys[i]}.tagline`),
    description: t(`products.${productKeys[i]}.description`),
    features: [0, 1, 2, 3].map((j) => t(`products.${productKeys[i]}.features.${j}`)),
    status: t(`common.${meta.statusKey}`),
  }));

  const statusColorMap: Record<string, string> = {
    live: "bg-green-500/20 text-green-400 border-green-500/30",
    inDevelopment: "bg-meyng-purple/20 text-meyng-purple border-meyng-purple/30",
    comingSoon: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ParticleField />
          <div className="absolute inset-0 bg-gradient-to-b from-meyng-dark/50 via-meyng-dark/80 to-meyng-dark" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-meyng-deep/30 border border-meyng-purple/20 text-meyng-purple text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          >
            {t("hero.title")}{" "}
            <span className="gradient-text">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-meyng-silver max-w-2xl mx-auto leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/products"
              className="group px-8 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20 flex items-center gap-2"
            >
              {t("hero.cta1")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-meyng-border hover:border-meyng-purple/50 text-meyng-light font-semibold rounded-xl transition-all duration-300"
            >
              {t("hero.cta2")}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-meyng-purple/40 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-meyng-purple" />
          </motion.div>
        </motion.div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-16 border-y border-meyng-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimatedStats />
        </div>
      </section>

      {/* ============ PRODUCT SHOWCASES ============ */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("homeProducts.sectionLabel")}
            title={t("homeProducts.sectionTitle")}
            description={t("homeProducts.sectionDescription")}
          />

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
                  {/* Text side */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-meyng-deep/40 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-meyng-purple" />
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
                        {t("products.sangoai.tagline") ? `Visit ${product.name}` : product.name}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Demo side */}
                  <div className="flex-1 w-full flex justify-center">
                    <ProductDemo type={product.demo} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ============ API SHOWCASE ============ */}
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
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-meyng-purple hover:text-meyng-light transition-colors font-medium"
                >
                  {t("api.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <div>
              <APIShowcase />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ============ VALUES ============ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("values.sectionLabel")}
            title={t("values.sectionTitle")}
            description={t("values.sectionDescription")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueKeys.map((key, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-meyng-deep/30 border border-meyng-purple/20 flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-meyng-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-meyng-light mb-3">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-meyng-silver text-sm leading-relaxed">
                    {t(`values.${key}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ============ CTA ============ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-meyng-light mb-6">
              {t("cta.title")}{" "}
              <span className="gradient-text">{t("cta.titleHighlight")}</span>
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              {t("cta.description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
