"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Contact"
            title="Let's Connect"
            description="Have a question, partnership idea, or want to learn more about what we're building? We'd love to hear from you."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-xl font-bold text-meyng-light mb-6">
                  Get in Touch
                </h3>
                <p className="text-meyng-silver text-sm leading-relaxed mb-8">
                  Whether you are an investor, partner, NGO, or simply curious
                  about our work, reach out. We respond to every message.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-meyng-deep/30 border border-meyng-purple/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-meyng-purple" />
                  </div>
                  <div>
                    <p className="text-meyng-light font-medium text-sm">
                      Email
                    </p>
                    <a
                      href="mailto:contact@meyng.com"
                      className="text-meyng-silver text-sm hover:text-meyng-purple transition-colors"
                    >
                      contact@meyng.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-meyng-deep/30 border border-meyng-purple/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-meyng-purple" />
                  </div>
                  <div>
                    <p className="text-meyng-light font-medium text-sm">
                      Location
                    </p>
                    <p className="text-meyng-silver text-sm">
                      Paris, France
                    </p>
                  </div>
                </div>
              </div>

              {/* Inquiry types */}
              <div className="pt-4">
                <p className="text-meyng-light font-medium text-sm mb-3">
                  We are open to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Partnerships & collaborations",
                    "Investment inquiries",
                    "Grant & funding opportunities",
                    "Product feedback",
                    "Media & press inquiries",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-meyng-silver text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-meyng-purple" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form
                action="https://formspree.io/f/placeholder"
                method="POST"
                className="bg-meyng-card rounded-2xl border border-meyng-border p-8 space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-meyng-light text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-meyng-dark border border-meyng-border rounded-lg text-meyng-light text-sm placeholder-meyng-silver/50 focus:outline-none focus:border-meyng-purple/50 focus:ring-1 focus:ring-meyng-purple/25 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-meyng-light text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-meyng-dark border border-meyng-border rounded-lg text-meyng-light text-sm placeholder-meyng-silver/50 focus:outline-none focus:border-meyng-purple/50 focus:ring-1 focus:ring-meyng-purple/25 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-meyng-light text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-meyng-dark border border-meyng-border rounded-lg text-meyng-light text-sm focus:outline-none focus:border-meyng-purple/50 focus:ring-1 focus:ring-meyng-purple/25 transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="investment">Investment</option>
                    <option value="grant">Grant / Funding</option>
                    <option value="product">Product Feedback</option>
                    <option value="media">Media / Press</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-meyng-light text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-meyng-dark border border-meyng-border rounded-lg text-meyng-light text-sm placeholder-meyng-silver/50 focus:outline-none focus:border-meyng-purple/50 focus:ring-1 focus:ring-meyng-purple/25 transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-meyng-purple hover:bg-meyng-deep text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-meyng-purple/20"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-meyng-silver/50 text-xs text-center">
                  We typically respond within 24-48 hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
