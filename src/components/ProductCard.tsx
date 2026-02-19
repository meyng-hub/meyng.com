"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ProductCardProps {
  icon: LucideIcon;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: "Live" | "In Development" | "Coming Soon";
  index: number;
}

export function ProductCard({
  icon: Icon,
  name,
  tagline,
  description,
  features,
  status,
  index,
}: ProductCardProps) {
  const statusColor = {
    Live: "bg-green-500/20 text-green-400 border-green-500/30",
    "In Development": "bg-meyng-purple/20 text-meyng-purple border-meyng-purple/30",
    "Coming Soon": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-meyng-card rounded-2xl border border-meyng-border p-8 hover:border-meyng-purple/40 transition-all duration-500"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-meyng-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Icon + Status */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 rounded-xl bg-meyng-deep/40 flex items-center justify-center">
            <Icon className="w-7 h-7 text-meyng-purple" />
          </div>
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full border ${statusColor[status]}`}
          >
            {status}
          </span>
        </div>

        {/* Name + Tagline */}
        <h3 className="text-2xl font-bold text-meyng-light mb-1">{name}</h3>
        <p className="text-meyng-purple text-sm font-medium mb-4">{tagline}</p>

        {/* Description */}
        <p className="text-meyng-silver text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-meyng-silver/80 text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-meyng-purple flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
