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

  const stats: Stat[] = [
    { value: 4, suffix: "", label: t("products") },
    { value: 3, suffix: "", label: t("industries") },
    { value: 5, suffix: "M+", label: t("lives") },
    { value: 3, suffix: "+", label: t("countries") },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
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
