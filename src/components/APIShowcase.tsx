"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Terminal, Copy, Check } from "lucide-react";

const curlCommand = `curl -X POST https://api.sangoai.sbs/v1/translate \\
  -H "X-API-Key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Hello, how are you?",
       "source": "en",
       "target": "sg"}'`;

const jsonResponse = `{
  "translation": "Bala mo, tongana nyen ?",
  "confidence": 0.97,
  "source_lang": "en",
  "target_lang": "sg",
  "model": "sango-v2"
}`;

export function APIShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [showResponse, setShowResponse] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setShowResponse(true);
      let idx = 0;
      const typeResponse = () => {
        if (idx <= jsonResponse.length) {
          setDisplayedResponse(jsonResponse.slice(0, idx));
          idx++;
          setTimeout(typeResponse, 15);
        }
      };
      typeResponse();
    }, 1500);

    return () => clearTimeout(timer);
  }, [isInView]);

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand.replace(/\\\n/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Terminal window */}
      <div className="rounded-xl border border-meyng-border bg-meyng-card overflow-hidden shadow-2xl shadow-meyng-purple/10">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-meyng-dark border-b border-meyng-border">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <Terminal className="w-3.5 h-3.5 text-meyng-silver/40 ml-2" />
            <span className="text-meyng-silver/50 text-xs font-mono">terminal</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-meyng-silver/40 hover:text-meyng-purple transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Code area */}
        <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
          {/* Command */}
          <div className="mb-4">
            <span className="text-green-400">$</span>{" "}
            <span className="text-meyng-light">{curlCommand.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <><br />&nbsp;&nbsp;</>}
                {line.split(" ").map((word, j) => {
                  if (word.startsWith('"') || word.startsWith("'")) return <span key={j} className="text-amber-300">{word} </span>;
                  if (word.startsWith("-")) return <span key={j} className="text-cyan-400">{word} </span>;
                  if (word.startsWith("http")) return <span key={j} className="text-meyng-purple">{word} </span>;
                  return <span key={j}>{word} </span>;
                })}
              </span>
            ))}</span>
          </div>

          {/* Response */}
          {showResponse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-meyng-silver/40">{"// Response"}</span>
              <pre className="text-meyng-purple mt-1">{displayedResponse}</pre>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
