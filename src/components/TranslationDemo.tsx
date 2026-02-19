"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const phrases = [
  { from: "Bonjour, comment allez-vous ?", to: "Bala mo, tongana nyen ?" },
  { from: "Merci beaucoup", to: "Singila mingi" },
  { from: "Je suis heureux", to: "Mo yeke na nzoni" },
  { from: "Bienvenue chez nous", to: "Mo gue na da ti e" },
];

export function TranslationDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedFrom, setDisplayedFrom] = useState("");
  const [displayedTo, setDisplayedTo] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let fromTimeout: NodeJS.Timeout;
    let toTimeout: NodeJS.Timeout;
    let cycleTimeout: NodeJS.Timeout;

    const animatePhrase = (index: number) => {
      const phrase = phrases[index];
      setDisplayedFrom("");
      setDisplayedTo("");
      setIsTranslating(false);
      setConfidence(0);

      // Type the "from" text
      let fromIdx = 0;
      const typeFrom = () => {
        if (fromIdx <= phrase.from.length) {
          setDisplayedFrom(phrase.from.slice(0, fromIdx));
          fromIdx++;
          fromTimeout = setTimeout(typeFrom, 40);
        } else {
          setIsTranslating(true);
          // Wait a beat, then type the "to" text
          toTimeout = setTimeout(() => {
            setIsTranslating(false);
            let toIdx = 0;
            const typeTo = () => {
              if (toIdx <= phrase.to.length) {
                setDisplayedTo(phrase.to.slice(0, toIdx));
                setConfidence(Math.min(97, Math.round((toIdx / phrase.to.length) * 97)));
                toIdx++;
                toTimeout = setTimeout(typeTo, 35);
              } else {
                // Hold, then move to next phrase
                cycleTimeout = setTimeout(() => {
                  const nextIndex = (index + 1) % phrases.length;
                  setPhraseIndex(nextIndex);
                  animatePhrase(nextIndex);
                }, 2500);
              }
            };
            typeTo();
          }, 600);
        }
      };
      typeFrom();
    };

    const startTimeout = setTimeout(() => animatePhrase(0), 500);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(fromTimeout);
      clearTimeout(toTimeout);
      clearTimeout(cycleTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Browser frame */}
      <div className="rounded-xl border border-meyng-border bg-meyng-card overflow-hidden shadow-2xl shadow-meyng-purple/10">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-meyng-dark border-b border-meyng-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-meyng-silver/50 text-xs ml-2 font-mono">sangoai.sbs</span>
        </div>

        {/* Language selector */}
        <div className="flex items-center justify-center gap-3 py-3 border-b border-meyng-border">
          <span className="px-3 py-1 rounded-full bg-meyng-purple/20 text-meyng-purple text-xs font-medium">
            French
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-meyng-silver/40" />
          <span className="px-3 py-1 rounded-full bg-meyng-deep/30 text-meyng-silver text-xs font-medium">
            Sango
          </span>
        </div>

        {/* Translation panels */}
        <div className="grid grid-cols-2 divide-x divide-meyng-border min-h-[120px]">
          {/* Source */}
          <div className="p-4">
            <p className="text-meyng-light text-sm leading-relaxed">
              {displayedFrom}
              <span className="inline-block w-0.5 h-4 bg-meyng-purple animate-pulse ml-0.5 align-middle" />
            </p>
          </div>
          {/* Target */}
          <div className="p-4 bg-meyng-dark/50">
            {isTranslating ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-meyng-purple animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-meyng-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-meyng-purple animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-meyng-silver/50 text-xs">Translating...</span>
              </div>
            ) : (
              <p className="text-meyng-purple text-sm font-medium leading-relaxed">
                {displayedTo}
              </p>
            )}
          </div>
        </div>

        {/* Confidence bar */}
        {confidence > 0 && (
          <div className="px-4 py-3 border-t border-meyng-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-meyng-silver/50 text-xs">Confidence</span>
              <span className="text-meyng-purple text-xs font-mono">{confidence}%</span>
            </div>
            <div className="h-1 rounded-full bg-meyng-dark overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-meyng-deep to-meyng-purple rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
