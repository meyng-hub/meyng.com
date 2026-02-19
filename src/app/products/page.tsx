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
import { TranslationDemo } from "@/components/TranslationDemo";
import { PhoneMockup } from "@/components/PhoneMockup";
import { SMSConversation } from "@/components/SMSConversation";
import { DashboardMockup } from "@/components/DashboardMockup";

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
    demo: "translation",
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
    demo: "phone",
  },
  {
    icon: BookOpen,
    name: "eNdara",
    tagline: "SMS-Based Learning for All",
    description:
      "An innovative SMS-based learning platform designed to bring quality education to students and learners who lack internet access. eNdara uses AI to personalize lesson delivery, adapt to student progress, and provide interactive assessments entirely through basic text messaging — no smartphone or data plan needed.",
    features: [
      "Works on any basic phone via SMS",
      "AI-personalized lesson progression",
      "Interactive quizzes via text messages",
      "Multi-language support including local languages",
      "Offline-first: zero internet required",
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
    demo: "dashboard",
  },
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
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Our Products"
            title="AI Solutions Built for Impact"
            description="From preserving endangered languages to reducing food waste, every product we build addresses a real barrier that keeps underserved communities from reaching their potential."
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
                        Visit {product.name}
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
              Interested in partnering on a product?
            </h2>
            <p className="text-meyng-silver text-lg mb-10 max-w-xl mx-auto">
              We are always looking for partners, collaborators, and
              organizations who share our vision of using AI to create real-world
              impact where it matters most.
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
