"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Target,
  Eye,
  Lightbulb,
  Shield,
  Trophy,
  Globe,
  Code2,
  Cpu,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const advantageKeys = [
  "technical",
  "cultural",
  "firstMover",
  "partnerships",
] as const;
const advantageIcons = [Cpu, Lightbulb, Trophy, Globe];

const milestoneKeys = [
  "founded",
  "sangoaiLaunch",
  "apiPublished",
  "metaLive",
] as const;

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label={t("sectionLabel")}
            title={t("sectionTitle")}
            description={t("sectionDescription")}
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-meyng-card rounded-2xl border border-meyng-border p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-meyng-deep/40 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-meyng-purple" />
              </div>
              <h3 className="text-2xl font-bold text-meyng-light mb-4">
                {t("missionTitle")}
              </h3>
              <p className="text-meyng-silver leading-relaxed">
                {t("missionDescription")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-meyng-card rounded-2xl border border-meyng-border p-10"
            >
              <div className="w-14 h-14 rounded-xl bg-meyng-deep/40 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-meyng-purple" />
              </div>
              <h3 className="text-2xl font-bold text-meyng-light mb-4">
                {t("visionTitle")}
              </h3>
              <p className="text-meyng-silver leading-relaxed">
                {t("visionDescription")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Why African Languages */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
                  {t("sectionLabel")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-meyng-light mb-4">
                {t("whyTitle")}
              </h2>
              <p className="text-meyng-silver leading-relaxed mb-6">
                {t("whyDescription")}
              </p>

              <ul className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-meyng-silver text-sm">
                      {t(`whyPoints.${i}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Market visualization */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "2,000+", label: "Languages", color: "text-meyng-purple" },
                { value: "1.4B", label: "Speakers", color: "text-emerald-400" },
                { value: "<5%", label: "Have NLP", color: "text-red-400" },
                { value: "$4.8B", label: "Market", color: "text-amber-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-meyng-card rounded-2xl border border-meyng-border p-6 text-center"
                >
                  <p className={`text-2xl md:text-3xl font-extrabold ${stat.color} mb-1`}>
                    {stat.value}
                  </p>
                  <p className="text-meyng-silver/60 text-xs">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Competitive Advantage */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading label={t("valuesLabel")} title={t("valuesTitle")} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantageKeys.map((key, i) => {
              const Icon = advantageIcons[i];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-meyng-deep/30 border border-meyng-purple/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-meyng-purple" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-meyng-light mb-2">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-meyng-silver text-sm leading-relaxed">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Team / Founder */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading label={t("teamLabel")} title={t("teamTitle")} />

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-meyng-card rounded-2xl border border-meyng-border p-8 md:p-10 text-center"
            >
              {/* Avatar placeholder */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-meyng-purple to-meyng-deep mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">MW</span>
              </div>

              <h3 className="text-xl font-bold text-meyng-light mb-1">
                {t("founder.name")}
              </h3>
              <p className="text-meyng-purple text-sm font-medium mb-4">
                {t("founder.role")}
              </p>
              <p className="text-meyng-silver text-sm leading-relaxed max-w-lg mx-auto mb-6">
                {t("founder.bio")}
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-meyng-silver/70 text-xs">
                  <Code2 className="w-4 h-4" />
                  <span>{t("founderJobTitle")}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-meyng-silver/30" />
                <div className="flex items-center gap-2 text-meyng-silver/70 text-xs">
                  <Globe className="w-4 h-4" />
                  <span>{t("founderLocation")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading label={t("journeyLabel")} title={t("journeyTitle")} />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-meyng-purple via-meyng-deep to-transparent" />

            {milestoneKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse md:text-right"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-meyng-purple -translate-x-1/2 mt-2 ring-4 ring-meyng-dark" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <span className="text-meyng-purple text-sm font-semibold">
                    {t(`${key}.year`)}
                  </span>
                  <h3 className="text-lg font-bold text-meyng-light mt-1">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="text-meyng-silver text-sm mt-2 leading-relaxed">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
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
              {t("ctaTitle")}
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              {t("ctaDescription")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-meyng-purple/25 hover:shadow-xl hover:shadow-meyng-purple/30"
            >
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
