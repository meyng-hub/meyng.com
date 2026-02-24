"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    // Responsive particle count and connection distance
    const screenWidth = window.innerWidth;
    const count = screenWidth < 768 ? 25 : screenWidth < 1024 ? 45 : 80;
    const connectionDist = screenWidth < 768 ? 80 : 120;

    interface Particle {
      x: number;
      y: number;
      baseRadius: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    for (let i = 0; i < count; i++) {
      const baseRadius = Math.random() * 2 + 0.5;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        baseRadius,
        radius: baseRadius,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const animate = () => {
      const currentW = canvas.offsetWidth;
      const currentH = canvas.offsetHeight;
      ctx.clearRect(0, 0, currentW, currentH);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulse) * 0.5;

        if (p.x < 0) p.x = currentW;
        if (p.x > currentW) p.x = 0;
        if (p.y < 0) p.y = currentH;
        if (p.y > currentH) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(p.radius, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(112, 101, 239, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(40, 32, 140, ${0.15 * (1 - dist / connectionDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [isMounted, prefersReduced]);

  // If reduced motion preferred, render nothing (hero gradient provides visual backdrop)
  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
      aria-hidden="true"
    />
  );
}
