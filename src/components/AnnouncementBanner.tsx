"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X, ArrowRight } from "lucide-react";

// TAIS feature banner — visible Aug 8 → Sep 7, 2026, then self-removes.
// Article: The African Innovators Series (TAIS), published 2026-07-24.
const BANNER_START = new Date("2026-08-08T00:00:00").getTime();
const BANNER_END = new Date("2026-09-07T00:00:00").getTime();
const DISMISS_KEY = "tais-banner-dismissed";

const ARTICLE_URL =
  "https://reamby.substack.com/p/michel-wenezoui-and-the-infrastructure";

export function AnnouncementBanner() {
  const t = useTranslations("banner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect user dismiss for the whole session
    if (sessionStorage.getItem(DISMISS_KEY)) return;

    const now = Date.now();
    if (now >= BANNER_START && now < BANNER_END) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-meyng-deep px-4 py-2 flex items-center justify-between gap-4">
      <p className="text-white text-xs sm:text-sm leading-snug min-w-0 flex-1 truncate">
        <span className="font-bold text-meyng-purple-a11y mr-1">
          {t("tais.prefix")}
        </span>
        <span className="font-semibold">{t("tais.outlet")}</span>
        <span className="hidden md:inline text-white/70">
          {" — "}
          {t("tais.title")}
        </span>
        <a
          href={ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 ml-2 text-white underline underline-offset-2 decoration-white/40 hover:decoration-white transition-colors"
        >
          {t("tais.cta")}
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </a>
      </p>
      <button
        onClick={dismiss}
        aria-label={t("dismiss")}
        className="flex-shrink-0 text-white/40 hover:text-white transition-colors p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
