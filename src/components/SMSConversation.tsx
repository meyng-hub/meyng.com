"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";

interface Message {
  sender: "ai" | "student";
  text: string;
}

const conversation: Message[] = [
  { sender: "ai", text: "Welcome to eNdara! Today: Math Lesson 3. What is 15 x 7?" },
  { sender: "student", text: "105" },
  { sender: "ai", text: "Correct! Great job. Next: What is the square root of 144?" },
  { sender: "student", text: "12" },
  { sender: "ai", text: "Perfect! You scored 100%. Lesson 4 unlocked. Reply START to continue." },
];

export function SMSConversation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timers: NodeJS.Timeout[] = [];
    conversation.forEach((msg, i) => {
      // Show typing indicator before AI messages
      if (msg.sender === "ai" && i > 0) {
        timers.push(setTimeout(() => setIsTyping(true), 800 + i * 1200 - 400));
      }
      timers.push(
        setTimeout(() => {
          setIsTyping(false);
          setVisibleMessages(i + 1);
        }, 800 + i * 1200)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-[300px] mx-auto"
    >
      {/* Phone frame */}
      <div className="rounded-2xl border border-meyng-border bg-meyng-card overflow-hidden shadow-2xl shadow-meyng-purple/10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-meyng-deep/40 border-b border-meyng-border">
          <div>
            <span className="text-meyng-light text-sm font-bold">eNdara</span>
            <span className="text-meyng-silver/50 text-[10px] ml-2">SMS</span>
          </div>
          <WifiOff className="w-3.5 h-3.5 text-meyng-silver/30" />
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 min-h-[280px] bg-meyng-dark/50">
          {conversation.slice(0, visibleMessages).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                  msg.sender === "ai"
                    ? "bg-meyng-card border border-meyng-border text-meyng-light rounded-bl-sm"
                    : "bg-meyng-purple/20 text-meyng-purple border border-meyng-purple/20 rounded-br-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="px-3 py-2 rounded-xl bg-meyng-card border border-meyng-border rounded-bl-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-meyng-silver/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-meyng-silver/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-meyng-silver/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input area */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-meyng-border">
          <div className="flex-1 px-3 py-2 rounded-lg bg-meyng-dark text-meyng-silver/30 text-xs">
            Type your answer...
          </div>
          <div className="w-7 h-7 rounded-lg bg-meyng-purple/20 flex items-center justify-center">
            <span className="text-meyng-purple text-xs">&#x2191;</span>
          </div>
        </div>
      </div>

      {/* No internet badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30"
      >
        <Wifi className="w-3 h-3 text-green-400" />
        <span className="text-green-400 text-[10px] font-semibold whitespace-nowrap">No internet required</span>
      </motion.div>
    </motion.div>
  );
}
