"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Leaf, Bell, TrendingDown } from "lucide-react";

const inventory = [
  { name: "Tomatoes", days: 1, color: "bg-red-500", status: "Expiring tomorrow" },
  { name: "Bananas", days: 3, color: "bg-amber-500", status: "3 days left" },
  { name: "Milk", days: 2, color: "bg-amber-500", status: "2 days left" },
  { name: "Spinach", days: 5, color: "bg-green-500", status: "5 days left" },
  { name: "Chicken", days: 0, color: "bg-red-600", status: "Expires today!" },
];

export function PhoneMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showNotification, setShowNotification] = useState(false);
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timers: NodeJS.Timeout[] = [];
    inventory.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleItems(i + 1), 300 + i * 200));
    });
    timers.push(setTimeout(() => setShowNotification(true), 300 + inventory.length * 200 + 500));

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-[280px] mx-auto"
    >
      {/* Phone frame */}
      <div className="rounded-[2.5rem] border-2 border-meyng-border bg-meyng-card p-2 shadow-2xl shadow-meyng-purple/10 transition-all duration-300 hover:shadow-meyng-purple/20 hover:border-meyng-purple/20">
        {/* Inner screen */}
        <div className="rounded-[2rem] bg-meyng-dark overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1">
            <span className="text-meyng-silver/50 text-[10px] font-mono">9:41</span>
            <div className="w-20 h-5 rounded-full bg-meyng-card" />
            <div className="flex gap-1">
              <div className="w-3 h-1.5 rounded-sm bg-meyng-silver/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-meyng-silver/30" />
            </div>
          </div>

          {/* App header */}
          <div className="px-4 pt-2 pb-3">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-meyng-light text-sm font-bold">Obêtrack</span>
            </div>
            <p className="text-meyng-silver/60 text-[10px]">Your fresh inventory</p>
          </div>

          {/* Waste reduction stat */}
          <div className="mx-4 mb-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 text-xs font-semibold">32% less waste this month</span>
            </div>
          </div>

          {/* Inventory list */}
          <div className="px-4 space-y-2 pb-4">
            {inventory.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={i < visibleItems ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-meyng-card/50"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-meyng-light text-xs">{item.name}</span>
                </div>
                <span className={`text-[10px] ${item.days <= 1 ? "text-red-400" : "text-meyng-silver/60"}`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom nav */}
          <div className="flex justify-around py-3 border-t border-meyng-border">
            {["Home", "Scan", "Stats"].map((label) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded bg-meyng-silver/10" />
                <span className="text-meyng-silver/40 text-[8px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notification popup */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute -top-4 right-0 sm:-right-4 bg-meyng-card border border-amber-500/30 rounded-xl p-3 shadow-lg shadow-amber-500/10 max-w-[200px]"
        >
          <div className="flex items-start gap-2">
            <Bell className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-meyng-light text-[10px] font-semibold">2 items expiring tomorrow</p>
              <p className="text-meyng-silver/50 text-[9px] mt-0.5">Tap to view suggestions</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
