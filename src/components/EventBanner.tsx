"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Africa Forward Summit — May 11, 2026, Nairobi
// Banner visible from event day through two weeks after
const EVENT_START  = new Date("2026-05-11T00:00:00").getTime();
const EVENT_DAYEND = new Date("2026-05-12T00:00:00").getTime(); // "today" threshold
const EVENT_END    = new Date("2026-05-26T00:00:00").getTime(); // remove banner after 2 weeks

export function EventBanner() {
  const [visible, setVisible]   = useState(false);
  const [isToday, setIsToday]   = useState(false);

  useEffect(() => {
    // Respect user dismiss for the whole session
    if (sessionStorage.getItem("af26-dismissed")) return;

    const now = Date.now();
    if (now >= EVENT_START && now < EVENT_END) {
      setVisible(true);
      setIsToday(now < EVENT_DAYEND);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("af26-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-[#003082] px-4 py-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {isToday && (
          <span
            className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
            aria-hidden="true"
          />
        )}
        <p className="text-white text-xs sm:text-sm leading-snug">
          {isToday ? (
            <>
              <span className="font-bold text-[#FCD116] mr-1">LIVE ·</span>
              MEYNG at{" "}
              <span className="font-semibold">Africa Forward Summit</span>
              {" — University of Nairobi, Kenya · May 11 2026"}
              <span className="hidden lg:inline text-white/40 text-xs ml-2">
                · BPI France · PROPARCO · Business France
              </span>
            </>
          ) : (
            <>
              MEYNG was at{" "}
              <span className="font-semibold">Africa Forward Summit</span>
              {", Nairobi — May 2026 · "}
              <span className="text-[#FCD116]">AI &amp; Digital Technologies</span>
            </>
          )}
        </p>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="flex-shrink-0 text-white/40 hover:text-white transition-colors p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
