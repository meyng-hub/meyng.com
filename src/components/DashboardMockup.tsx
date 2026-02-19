"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, Users, FolderOpen, Sparkles } from "lucide-react";

const barData = [
  { label: "Q1", height: 45 },
  { label: "Q2", height: 65 },
  { label: "Q3", height: 80 },
  { label: "Q4", height: 55 },
];

const projects = [
  { name: "Water Access", status: "On Track", progress: 78 },
  { name: "School Build", status: "At Risk", progress: 42 },
  { name: "Health Clinic", status: "Complete", progress: 100 },
];

export function DashboardMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Dashboard frame */}
      <div className="rounded-xl border border-meyng-border bg-meyng-card overflow-hidden shadow-2xl shadow-meyng-purple/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-meyng-dark border-b border-meyng-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-meyng-silver/50 text-xs ml-2 font-mono">connectz.app/dashboard</span>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-10 bg-meyng-dark/80 border-r border-meyng-border py-4 flex flex-col items-center gap-4">
            <BarChart3 className="w-4 h-4 text-meyng-purple" />
            <Users className="w-4 h-4 text-meyng-silver/30" />
            <FolderOpen className="w-4 h-4 text-meyng-silver/30" />
          </div>

          {/* Main content */}
          <div className="flex-1 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-meyng-light text-xs font-bold">Impact Overview</h4>
              <span className="text-meyng-silver/40 text-[10px]">2025-2026</span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Projects", value: "12" },
                { label: "Partners", value: "28" },
                { label: "Impact", value: "94%" },
              ].map((stat) => (
                <div key={stat.label} className="p-2 rounded-lg bg-meyng-dark/50 text-center">
                  <p className="text-meyng-purple text-sm font-bold">{stat.value}</p>
                  <p className="text-meyng-silver/40 text-[9px]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="mb-4">
              <p className="text-meyng-silver/50 text-[10px] mb-2">Quarterly Impact Score</p>
              <div className="flex items-end gap-2 h-16">
                {barData.map((bar, i) => (
                  <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      className="w-full rounded-t bg-gradient-to-t from-meyng-deep to-meyng-purple"
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${bar.height}%` } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                    />
                    <span className="text-meyng-silver/30 text-[8px]">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects table */}
            <div>
              <p className="text-meyng-silver/50 text-[10px] mb-2">Active Projects</p>
              <div className="space-y-1.5">
                {projects.map((project) => {
                  const statusColor =
                    project.status === "Complete"
                      ? "text-green-400"
                      : project.status === "At Risk"
                        ? "text-amber-400"
                        : "text-meyng-purple";
                  return (
                    <div
                      key={project.name}
                      className="flex items-center justify-between py-1.5 px-2 rounded bg-meyng-dark/30"
                    >
                      <span className="text-meyng-light text-[10px]">{project.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] ${statusColor}`}>{project.status}</span>
                        <div className="w-12 h-1 rounded-full bg-meyng-dark overflow-hidden">
                          <motion.div
                            className="h-full bg-meyng-purple rounded-full"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${project.progress}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI insight */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-3 p-2 rounded-lg bg-meyng-purple/10 border border-meyng-purple/20"
            >
              <div className="flex items-start gap-1.5">
                <Sparkles className="w-3 h-3 text-meyng-purple mt-0.5 flex-shrink-0" />
                <p className="text-meyng-purple text-[9px] leading-relaxed">
                  AI Insight: &quot;School Build&quot; project is 15% behind schedule. Consider reallocating resources from completed projects.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
