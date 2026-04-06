"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const CONSENT_KEY = "meyng_cookie_consent";

type ConsentState = "granted" | "denied" | null;

function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "granted" || stored === "denied") return stored;
  return null;
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setVisible(false);
    // Update GA consent
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
    // GA consent stays denied (default)
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-meyng-dark/95 backdrop-blur-md p-4 md:p-6 shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{t("title")}</p>
            <p className="mt-1 text-xs text-gray-400">{t("description")}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
            >
              {t("decline")}
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg bg-meyng-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-meyng-purple/80"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
