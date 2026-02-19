"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Languages,
  Leaf,
  BookOpen,
  Users,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";

const products = [
  {
    icon: Languages,
    name: "SangoAI",
    tagline: "AI for the Sango Language",
    description:
      "The first AI-powered language platform for Sango, the national language of the Central African Republic spoken by over 5 million people. SangoAI provides real-time translation, conversational AI chat, interactive language learning with quizzes and flashcards, and a developer API for third-party integrations.",
    features: [
      "French-Sango and English-Sango translation",
      "AI chat assistant fluent in Sango",
      "Interactive learning with quizzes and vocabulary",
      "Developer REST API for integration",
      "Progressive Web App (PWA) support",
    ],
    status: "Live" as const,
    url: "https://sangoai.sbs",
  },
  {
    icon: Leaf,
    name: "KobeTrack",
    tagline: "Reducing Food Waste with AI",
    description:
      "A mobile application that leverages AI to help households, restaurants, and small businesses track and manage their fresh product inventories. KobeTrack uses intelligent expiry predictions and smart notifications to reduce food waste, save money, and promote sustainable consumption habits.",
    features: [
      "AI-powered expiry date predictions",
      "Smart inventory management",
      "Waste reduction analytics and insights",
      "Recipe suggestions based on expiring items",
      "Barcode scanning for quick product entry",
    ],
    status: "In Development" as const,
    url: null,
  },
  {
    icon: BookOpen,
    name: "eNdara",
    tagline: "SMS-Based Learning for All",
    description:
      "An innovative SMS-based learning platform designed to bring quality education to students and learners who lack internet access in rural Africa. eNdara uses AI to personalize lesson delivery, adapt to student progress, and provide interactive assessments entirely through basic text messaging.",
    features: [
      "Works on any basic phone via SMS",
      "AI-personalized lesson progression",
      "Interactive quizzes via text messages",
      "Multi-language support including local languages",
      "Offline-first: zero internet required",
    ],
    status: "In Development" as const,
    url: null,
  },
  {
    icon: Users,
    name: "ConnectZ",
    tagline: "Smarter Project Management for NGOs",
    description:
      "A collaborative portal designed for NGOs and municipalities to manage projects, track outcomes, and improve impact reporting. ConnectZ uses AI to aggregate data from multiple sources, generate automated reports, and provide actionable insights for better decision-making and donor engagement.",
    features: [
      "Centralized project dashboard",
      "AI-generated impact reports",
      "Multi-stakeholder collaboration tools",
      "Data visualization and analytics",
      "Grant and donor management tracking",
    ],
    status: "Coming Soon" as const,
    url: null,
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Products"
            title="AI Solutions Built for Impact"
            description="From preserving endangered languages to reducing food waste, every product we build addresses a real challenge facing communities across Africa."
          />
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <div key={product.name}>
                <ProductCard
                  icon={product.icon}
                  name={product.name}
                  tagline={product.tagline}
                  description={product.description}
                  features={product.features}
                  status={product.status}
                  index={i}
                />
                {product.url && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="mt-4 pl-8"
                  >
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-meyng-purple hover:text-meyng-light transition-colors text-sm font-medium"
                    >
                      Visit {product.name}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </motion.div>
                )}
              </div>
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
              Interested in partnering on a product?
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              We are always looking for partners, collaborators, and
              organizations who share our vision of using AI for positive impact
              in Africa.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
