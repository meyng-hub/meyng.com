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
  Globe,
  Zap,
} from "lucide-react";
import { ParticleField } from "@/components/ParticleField";
import { SectionHeading } from "@/components/SectionHeading";

const products = [
  {
    icon: Languages,
    name: "SangoAI",
    description:
      "AI-powered translation, chat, and language learning for the Sango language, serving over 5 million speakers in the Central African Republic.",
    status: "Live",
  },
  {
    icon: Leaf,
    name: "KobeTrack",
    description:
      "A mobile app that reduces food waste by helping users track and manage fresh product inventories with intelligent expiry predictions.",
    status: "In Development",
  },
  {
    icon: BookOpen,
    name: "eNdara",
    description:
      "An SMS-based learning platform bringing education to students and learners without internet access in rural Africa.",
    status: "In Development",
  },
  {
    icon: Users,
    name: "ConnectZ",
    description:
      "A collaborative portal enabling NGOs and municipalities to manage projects and improve impact reporting with data-driven insights.",
    status: "Coming Soon",
  },
];

const values = [
  {
    icon: Sparkles,
    title: "AI-First",
    description:
      "Every product we build harnesses artificial intelligence to solve real, tangible problems facing communities across Africa.",
  },
  {
    icon: Globe,
    title: "Africa-Focused",
    description:
      "We design solutions for the unique challenges of the African continent, from connectivity gaps to underserved languages.",
  },
  {
    icon: Zap,
    title: "Impact-Driven",
    description:
      "We measure success not just in users, but in lives improved, waste reduced, and communities empowered.",
  },
];

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
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
              AI-Powered Solutions for Africa
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
          >
            Connecting for{" "}
            <span className="gradient-text">Success</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-meyng-silver max-w-2xl mx-auto leading-relaxed"
          >
            We build AI-driven products that bridge gaps in language, education,
            food sustainability, and community development across the African
            continent.
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
              Learn About Us
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

      {/* ============ PRODUCTS PREVIEW ============ */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="What We Build"
            title="AI Products for Real Impact"
            description="Each product addresses a specific challenge facing communities across Africa, powered by cutting-edge artificial intelligence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, i) => {
              const Icon = product.icon;
              const statusColor =
                product.status === "Live"
                  ? "text-green-400"
                  : product.status === "In Development"
                    ? "text-meyng-purple"
                    : "text-amber-400";
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-meyng-card rounded-2xl border border-meyng-border p-8 hover:border-meyng-purple/40 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-meyng-purple/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-meyng-deep/40 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-meyng-purple" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-meyng-light">
                          {product.name}
                        </h3>
                        <span className={`text-xs font-medium ${statusColor}`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-meyng-silver text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-meyng-purple hover:text-meyng-light transition-colors font-medium"
            >
              View all products
              <ArrowRight className="w-4 h-4" />
            </Link>
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
            description="We don't just build technology. We build solutions designed for the realities of the African continent."
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
              Ready to build the future{" "}
              <span className="gradient-text">together?</span>
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              Whether you are a partner, investor, or organization looking to
              leverage AI for impact, we would love to hear from you.
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
