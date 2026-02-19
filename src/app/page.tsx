"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

const products = [
  {
    icon: Languages,
    name: "SangoAI",
    tagline: "AI-Powered Language Platform",
    description:
      "Real-time translation, conversational AI, and interactive language learning for the Sango language — serving over 5 million speakers in the Central African Republic.",
    features: [
      "Multi-language AI translation",
      "Conversational chat assistant",
      "Interactive learning with quizzes",
      "Developer REST API",
    ],
    status: "Live" as const,
    url: "https://sangoai.sbs",
    demo: "translation",
  },
  {
    icon: Leaf,
    name: "KobeTrack",
    tagline: "Reducing Food Waste with AI",
    description:
      "A mobile app that uses AI to help households and businesses track fresh product inventories, predict expiry dates, and reduce food waste with smart notifications.",
    features: [
      "AI-powered expiry predictions",
      "Smart inventory tracking",
      "Waste reduction insights",
      "Recipe suggestions for expiring items",
    ],
    status: "In Development" as const,
    url: null,
    demo: "phone",
  },
  {
    icon: BookOpen,
    name: "eNdara",
    tagline: "SMS-Based Learning for All",
    description:
      "An AI-powered SMS learning platform designed for students without internet access. Quality education delivered through basic text messaging — no smartphone or data plan needed.",
    features: [
      "Works on any basic phone via SMS",
      "AI-personalized lesson progression",
      "Interactive quizzes via text",
      "Zero internet required",
    ],
    status: "In Development" as const,
    url: null,
    demo: "sms",
  },
  {
    icon: Users,
    name: "ConnectZ",
    tagline: "Smarter Project Management for NGOs",
    description:
      "A collaborative portal for NGOs and municipalities to manage projects, track outcomes, and improve impact reporting with AI-generated insights and automated analytics.",
    features: [
      "Centralized project dashboard",
      "AI-generated impact reports",
      "Multi-stakeholder collaboration",
      "Grant and donor tracking",
    ],
    status: "Coming Soon" as const,
    url: null,
    demo: "dashboard",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "AI-First",
    description:
      "Every product we build harnesses artificial intelligence to solve real problems for people who are too often overlooked by technology.",
  },
  {
    icon: Shield,
    title: "Accessibility-First",
    description:
      "We design for the hardest constraints first — no internet, no smartphone, no literacy. If it works there, it works everywhere.",
  },
  {
    icon: Zap,
    title: "Impact-Driven",
    description:
      "We measure success not in downloads, but in barriers removed, communities empowered, and lives meaningfully improved.",
  },
];

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
              AI That Matters
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          >
            We build AI for{" "}
            <span className="gradient-text">those left behind</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-meyng-silver max-w-2xl mx-auto leading-relaxed"
          >
            We fight for accessibility. We build AI products that bridge gaps in
            language, education, sustainability, and community development —
            where access is limited and impact is greatest.
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
              Explore Our Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-meyng-border hover:border-meyng-purple/50 text-meyng-light font-semibold rounded-xl transition-all duration-300"
            >
              Our Mission
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
            label="What We Build"
            title="AI Products for Real Impact"
            description="Each product tackles a specific barrier that keeps communities from reaching their potential — powered by cutting-edge artificial intelligence."
          />

          <div className="space-y-24 lg:space-y-32">
            {products.map((product, i) => {
              const Icon = product.icon;
              const isEven = i % 2 === 1;
              const statusColor =
                product.status === "Live"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : product.status === "In Development"
                    ? "bg-meyng-purple/20 text-meyng-purple border-meyng-purple/30"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/30";

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
                        Visit {product.name}
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
                    Developer API
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-meyng-light mb-4">
                  Built for developers
                </h2>
                <p className="text-meyng-silver leading-relaxed mb-6">
                  Integrate our AI capabilities directly into your applications.
                  SangoAI&apos;s REST API gives you access to state-of-the-art
                  translation and language processing — with simple, documented
                  endpoints and predictable pricing.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-meyng-purple hover:text-meyng-light transition-colors font-medium"
                >
                  Learn more
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
            label="Our Approach"
            title="Built Different"
            description="We don't just build technology. We build solutions for the people and communities that the tech industry overlooks."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
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
                    {value.title}
                  </h3>
                  <p className="text-meyng-silver text-sm leading-relaxed">
                    {value.description}
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
              Ready to build something{" "}
              <span className="gradient-text">that matters?</span>
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              Whether you are a partner, investor, or organization fighting for
              accessibility — we would love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
