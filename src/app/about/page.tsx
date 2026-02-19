"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We push the boundaries of what AI can achieve, especially for underserved markets and communities that traditional tech overlooks.",
  },
  {
    icon: Heart,
    title: "Social Impact",
    description:
      "Technology must serve people. Every product we build is measured by its ability to create meaningful, positive change in real lives.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description:
      "We build transparent, responsible AI. Our users and partners trust us because we prioritize ethical practices and data privacy.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We believe in the power of collaboration. Our products are built with and for the communities they serve, not just about them.",
  },
];

const milestones = [
  {
    year: "2024",
    title: "MEYNG Founded",
    description:
      "Established with a mission to build AI-driven products for the African continent.",
  },
  {
    year: "2025",
    title: "SangoAI Launched",
    description:
      "First AI-powered language platform for Sango goes live, serving 5M+ speakers.",
  },
  {
    year: "2025",
    title: "KobeTrack & eNdara",
    description:
      "Development begins on food waste reduction and SMS-based education platforms.",
  },
  {
    year: "2026",
    title: "Expanding Impact",
    description:
      "ConnectZ in development. Pursuing grants and partnerships to scale across Africa.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="About MEYNG"
            title="AI for Africa, Built in Africa"
            description="We are a technology company dedicated to building artificial intelligence products that address the unique challenges of the African continent."
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
                Our Mission
              </h3>
              <p className="text-meyng-silver leading-relaxed">
                To harness the power of artificial intelligence to create
                accessible, impactful products that bridge gaps in language
                preservation, education access, food sustainability, and
                community development across Africa. We believe AI should be a
                force for equity, not exclusion.
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
                Our Vision
              </h3>
              <p className="text-meyng-silver leading-relaxed">
                A future where every African community has access to
                AI-powered tools that enhance their daily lives, whether it is
                communicating in their native language, learning without internet
                access, reducing food waste, or managing community projects with
                data-driven insights.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Core Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="What Drives Us"
            title="Our Core Values"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
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
                      {value.title}
                    </h3>
                    <p className="text-meyng-silver text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Journey"
            title="Building Step by Step"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-meyng-purple via-meyng-deep to-transparent" />

            {milestones.map((milestone, i) => (
              <motion.div
                key={`${milestone.year}-${milestone.title}`}
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
                    {milestone.year}
                  </span>
                  <h3 className="text-lg font-bold text-meyng-light mt-1">
                    {milestone.title}
                  </h3>
                  <p className="text-meyng-silver text-sm mt-2 leading-relaxed">
                    {milestone.description}
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
              Join us on this journey
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              We are looking for partners, investors, and talented individuals
              who share our passion for using AI to create real impact in Africa.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20"
            >
              Let&apos;s Talk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
