"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Zap,
  Globe,
  Code,
  Cpu,
  Server,
  Database,
  MessageSquare,
  ExternalLink,
  CheckCircle,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedStats } from "@/components/AnimatedStats";
import { TranslationDemo } from "@/components/TranslationDemo";
import { APIShowcase } from "@/components/APIShowcase";

const tractionItems = [
  { icon: Server, colorClass: "text-green-400" },
  { icon: Database, colorClass: "text-blue-400" },
  { icon: Globe, colorClass: "text-amber-400" },
  { icon: MessageSquare, colorClass: "text-emerald-400" },
] as const;

const techKeys = ["api", "nlp", "model", "deploy"] as const;
const techIcons = [Code, Cpu, Globe, MessageSquare];

const languageRoadmap = [
  {
    key: "sango",
    color: "bg-emerald-500",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
    live: true,
  },
  {
    key: "lingala",
    color: "bg-blue-500",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    live: false,
  },
  {
    key: "wolof",
    color: "bg-blue-500",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
    live: false,
  },
  {
    key: "bambara",
    color: "bg-slate-500",
    borderColor: "border-slate-500/30",
    textColor: "text-slate-400",
    live: false,
  },
  {
    key: "kirundi",
    color: "bg-slate-500",
    borderColor: "border-slate-500/30",
    textColor: "text-slate-400",
    live: false,
  },
] as const;

const valueKeys = ["firstMover", "production", "scalable"] as const;
const valueIcons = [Trophy, Target, TrendingUp];

export default function Home() {
  const t = useTranslations();

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
              <Zap className="w-4 h-4" />
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
            className="mt-6 text-lg md:text-xl text-meyng-silver max-w-3xl mx-auto leading-relaxed"
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
              href="/contact"
              className="group w-full sm:w-auto px-8 py-4 bg-meyng-purple hover:bg-meyng-deep active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-meyng-purple/25 hover:shadow-xl hover:shadow-meyng-purple/30 flex items-center justify-center gap-2"
            >
              {t("hero.cta1")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto text-center px-8 py-4 border border-meyng-border hover:border-meyng-purple/50 hover:bg-meyng-purple/5 active:scale-[0.98] text-meyng-light font-semibold rounded-xl transition-all duration-200"
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

      {/* ============ TRACTION BAR ============ */}
      <section className="py-8 border-y border-meyng-border bg-meyng-card/50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(["api", "vocab", "hf", "whatsapp"] as const).map((key, i) => {
              const Icon = tractionItems[i].icon;
              const colorClass = tractionItems[i].colorClass;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                  <div>
                    <p className={`text-sm font-semibold ${colorClass}`}>
                      {t(`traction.${key}`)}
                    </p>
                    <p className="text-xs text-meyng-silver/60">
                      {t(`traction.${key}Sub`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="py-16 border-b border-meyng-border">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimatedStats />
        </div>
      </section>

      {/* ============ FLAGSHIP: SANGOAI ============ */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("flagship.sectionLabel")}
            title={t("flagship.sectionTitle")}
            description={t("flagship.sectionDescription")}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ul className="space-y-4 mb-8">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-meyng-silver">
                      {t(`flagship.features.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://sangoai.sbs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-meyng-purple hover:bg-meyng-deep active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-meyng-purple/25"
                >
                  {t("flagship.visitSite")}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href="https://sangoai.sbs/developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-meyng-border hover:border-meyng-purple/50 text-meyng-light font-semibold rounded-xl transition-all duration-200"
                >
                  {t("flagship.tryApi")}
                  <Code className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Demo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <TranslationDemo />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ============ MARKET OPPORTUNITY ============ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("market.sectionLabel")}
            title={t("market.sectionTitle")}
            description={t("market.sectionDescription")}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(
              [
                {
                  key: "languages",
                  value: "2,000+",
                  color: "text-meyng-purple",
                },
                { key: "speakers", value: "1.4B+", color: "text-emerald-400" },
                { key: "nlpCoverage", value: "<5%", color: "text-red-400" },
                { key: "tam", value: "$4.8B", color: "text-amber-400" },
              ] as const
            ).map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-meyng-card rounded-2xl border border-meyng-border p-6 text-center"
              >
                <p
                  className={`text-3xl md:text-4xl font-extrabold ${item.color} mb-2`}
                >
                  {item.value}
                </p>
                <p className="text-meyng-light text-sm font-semibold mb-1">
                  {t(`market.${item.key}`)}
                </p>
                <p className="text-meyng-silver/60 text-xs">
                  {t(`market.${item.key}Sub`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ============ TECHNOLOGY STACK ============ */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("techStack.sectionLabel")}
            title={t("techStack.sectionTitle")}
            description={t("techStack.sectionDescription")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techKeys.map((key, i) => {
              const Icon = techIcons[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-meyng-card rounded-2xl border border-meyng-border p-8 hover:border-meyng-purple/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-meyng-deep/40 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-meyng-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-meyng-light mb-3">
                    {t(`techStack.${key}.title`)}
                  </h3>
                  <p className="text-meyng-silver text-sm leading-relaxed">
                    {t(`techStack.${key}.description`)}
                  </p>
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

      {/* ============ LANGUAGE ROADMAP ============ */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("roadmap.sectionLabel")}
            title={t("roadmap.sectionTitle")}
            description={t("roadmap.sectionDescription")}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {languageRoadmap.map((lang, i) => (
              <motion.div
                key={lang.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-meyng-card rounded-2xl border ${lang.borderColor} p-6 text-center relative overflow-hidden`}
              >
                {lang.live && (
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                )}
                <p className={`text-lg font-bold ${lang.textColor} mb-1`}>
                  {t(`roadmap.${lang.key}`)}
                </p>
                <p className="text-meyng-silver text-xs mb-2">
                  {t(`roadmap.${lang.key}Speakers`)}
                </p>
                <span
                  className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                    lang.live
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-meyng-deep/30 text-meyng-silver/60"
                  }`}
                >
                  {t(`roadmap.${lang.key}Status`)}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center text-meyng-silver/60 text-sm mt-8"
          >
            {t("roadmap.total")}
          </motion.p>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ============ WHY MEYNG ============ */}
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
                  whileHover={{ y: -4 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-meyng-card rounded-2xl border border-meyng-border p-8 text-center hover:border-meyng-purple/30 transition-colors cursor-default"
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

      {/* ============ BUILT ON ============ */}
      <section className="py-16 border-y border-meyng-border bg-meyng-card/30">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <p className="text-center text-meyng-silver/50 text-xs uppercase tracking-widest mb-8">
            {t("builtOn.title")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(["cloud", "ai", "research", "messaging"] as const).map(
              (key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-meyng-light font-bold text-lg mb-1">
                    {t(`builtOn.${key}`)}
                  </p>
                  <p className="text-meyng-silver/50 text-xs">
                    {t(`builtOn.${key}Sub`)}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-meyng-purple/25 hover:shadow-xl hover:shadow-meyng-purple/30"
              >
                {t("cta.button")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
