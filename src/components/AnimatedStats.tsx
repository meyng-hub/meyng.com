"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    setDisplayValue(0);
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v)),
      onComplete: () => setHasAnimated(true),
    });

    return () => controls.stop();
  }, [isInView, value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function AnimatedStats() {
  const t = useTranslations("stats");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // NO UPTIME STAT. It read "99% API Uptime" until 2026-08-08 and was never
  // measured: there is no synthetic canary, no status page, no retained alarm
  // history, and the sangoai-health-check Lambda no longer exists (SangoAI
  // docs/metrics/GROUND-TRUTH-2026-07-29.md §8 records uptime as NOT
  // INSTRUMENTED). Do not re-add a figure here — any value would be invented.
  // To claim uptime, instrument it first (CloudWatch Synthetics canary or an
  // external monitor with an exportable log), then publish the measured number
  // with its window.
  const stats: Stat[] = [
    { value: 3, suffix: "", label: t("languages") },
    { value: 8, suffix: "+", label: t("endpoints") },
    // Conservative FLOOR, not a snapshot — deliberately matches the "500+ Words"
    // wording in traction.vocab. The verified count is a moving number and has
    // FALLEN before (the 2026-07 gloss audit withdrew entries), so a precise
    // figure here goes stale silently: this read a hardcoded 611 until
    // 2026-08-08, when the live count was 607. The stats API cannot be called
    // from this origin (Access-Control-Allow-Origin is https://sangoai.sbs
    // only), so a live value is not available here — keep the floor.
    { value: 500, suffix: "+", label: t("vocab") },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="text-center"
        >
          <p className="text-3xl md:text-4xl font-extrabold text-meyng-light mb-1">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="text-meyng-silver text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
