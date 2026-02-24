"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, MapPin, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const FORMSPREE_URL =
  process.env.NEXT_PUBLIC_FORMSPREE_URL || "https://formspree.io/f/xdkodznp";

const inquiryKeys = [
  "partnerships",
  "investment",
  "grants",
  "feedback",
  "media",
] as const;

const MAX_MESSAGE_LENGTH = 2000;

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  // Field-level validation
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function validateField(name: string, value: string): string {
    switch (name) {
      case "name":
        return value.trim().length === 0 ? t("validationNameRequired") : "";
      case "email":
        if (value.trim().length === 0) return t("validationEmailRequired");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return t("validationEmailInvalid");
        return "";
      case "message":
        if (value.trim().length === 0) return t("validationMessageRequired");
        if (value.trim().length < 10)
          return t("validationMessageMinLength");
        return "";
      default:
        return "";
    }
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessageLength(e.target.value.length);
    if (touched.message) {
      setFieldErrors((prev) => ({
        ...prev,
        message: validateField("message", e.target.value),
      }));
    }
  }

  function inputClassName(name: string) {
    const hasError = touched[name] && fieldErrors[name];
    return `w-full px-4 py-3 bg-meyng-dark border ${
      hasError ? "border-red-500/50" : "border-meyng-border"
    } rounded-lg text-meyng-light text-sm placeholder-meyng-silver/50 focus:outline-none focus:border-meyng-purple/50 focus:ring-1 focus:ring-meyng-purple/25 transition-colors`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setFieldErrors({});
        setTouched({});
        setMessageLength(0);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

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
                  {t("getInTouch")}
                </h3>
                <p className="text-meyng-silver text-sm leading-relaxed mb-8">
                  {t("contactIntro")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-meyng-deep/30 border border-meyng-purple/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-meyng-purple" />
                  </div>
                  <div>
                    <p className="text-meyng-light font-medium text-sm">
                      {t("email")}
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
                      {t("location")}
                    </p>
                    <p className="text-meyng-silver text-sm">
                      {t("locationValue")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Inquiry types */}
              <div className="pt-4">
                <p className="text-meyng-light font-medium text-sm mb-3">
                  {t("openTo")}
                </p>
                <ul className="space-y-2">
                  {inquiryKeys.map((key) => (
                    <li
                      key={key}
                      className="flex items-center gap-2 text-meyng-silver text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-meyng-purple" />
                      {t(key)}
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
                onSubmit={handleSubmit}
                noValidate
                className="bg-meyng-card rounded-2xl border border-meyng-border p-5 sm:p-8 space-y-5 sm:space-y-6"
              >
                {submitted && (
                  <div
                    role="alert"
                    className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    {t("formSuccess")}
                  </div>
                )}
                {error && (
                  <div
                    role="alert"
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  >
                    {t("formError")}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-meyng-light text-sm font-medium mb-2"
                    >
                      {t("formName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      aria-required="true"
                      aria-invalid={
                        touched.name && !!fieldErrors.name ? true : undefined
                      }
                      aria-describedby={
                        touched.name && fieldErrors.name
                          ? "name-error"
                          : undefined
                      }
                      onBlur={handleBlur}
                      className={inputClassName("name")}
                      placeholder={t("formNamePlaceholder")}
                    />
                    {touched.name && fieldErrors.name && (
                      <p
                        id="name-error"
                        className="mt-1.5 text-red-400 text-xs"
                        role="alert"
                      >
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-meyng-light text-sm font-medium mb-2"
                    >
                      {t("formEmail")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-required="true"
                      aria-invalid={
                        touched.email && !!fieldErrors.email ? true : undefined
                      }
                      aria-describedby={
                        touched.email && fieldErrors.email
                          ? "email-error"
                          : undefined
                      }
                      onBlur={handleBlur}
                      className={inputClassName("email")}
                      placeholder={t("formEmailPlaceholder")}
                    />
                    {touched.email && fieldErrors.email && (
                      <p
                        id="email-error"
                        className="mt-1.5 text-red-400 text-xs"
                        role="alert"
                      >
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-meyng-light text-sm font-medium mb-2"
                  >
                    {t("formSubject")}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-meyng-dark border border-meyng-border rounded-lg text-meyng-light text-sm focus:outline-none focus:border-meyng-purple/50 focus:ring-1 focus:ring-meyng-purple/25 transition-colors"
                  >
                    <option value="general">{t("subjectGeneral")}</option>
                    <option value="partnership">
                      {t("subjectPartnership")}
                    </option>
                    <option value="investment">
                      {t("subjectInvestment")}
                    </option>
                    <option value="grant">{t("subjectGrant")}</option>
                    <option value="product">{t("subjectProduct")}</option>
                    <option value="media">{t("subjectMedia")}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-meyng-light text-sm font-medium mb-2"
                  >
                    {t("formMessage")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    aria-invalid={
                      touched.message && !!fieldErrors.message
                        ? true
                        : undefined
                    }
                    aria-describedby={
                      touched.message && fieldErrors.message
                        ? "message-error"
                        : undefined
                    }
                    rows={6}
                    maxLength={MAX_MESSAGE_LENGTH}
                    onBlur={handleBlur}
                    onChange={handleMessageChange}
                    className={`${inputClassName("message")} resize-none`}
                    placeholder={t("formMessagePlaceholder")}
                  />
                  <div className="flex justify-between items-center mt-1.5">
                    {touched.message && fieldErrors.message ? (
                      <p
                        id="message-error"
                        className="text-red-400 text-xs"
                        role="alert"
                      >
                        {fieldErrors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-meyng-silver/40 text-xs">
                      {messageLength}/{MAX_MESSAGE_LENGTH}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending || submitted}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-meyng-purple hover:bg-meyng-deep active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-meyng-purple/25 hover:shadow-xl hover:shadow-meyng-purple/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-meyng-purple disabled:hover:shadow-none disabled:active:scale-100"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t("formSending")}
                    </>
                  ) : (
                    <>
                      {t("formSubmit")}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-meyng-silver/50 text-xs text-center">
                  {t("formResponseTime")}
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
