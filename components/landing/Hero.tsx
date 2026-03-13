"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["rgba(255,215,0,0.6)", "rgba(100,255,218,0.4)", "rgba(255,215,0,0.3)", "rgba(100,255,218,0.6)"];
    const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.2, 0.8, 0.4, 0.9, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function LiveCounter() {
  const [count, setCount] = useState(127);

  const tick = useCallback(() => {
    if (Math.random() > 0.7) {
      setCount((c) => c + 1);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 8000);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="mt-8 inline-flex items-center gap-3 glass-card rounded-full px-5 py-2.5"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sponge-cyan opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sponge-cyan" />
      </span>
      <span className="text-sponge-muted text-sm font-mono">
        1기 오픈 준비중 ·{" "}
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sponge-cyan"
        >
          {count}
        </motion.span>
        명 대기중
      </span>
    </motion.div>
  );
}

const taglineWords = ["냅다 흡수하고", "냅다 만들고", "냅다 세상에 내놓는다"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient-hero noise-overlay">
      <FloatingParticles />

      {/* Radial glow behind title */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sponge-gold/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sponge-muted text-xs tracking-[0.3em] uppercase mb-6 font-mono"
        >
          Selfish Club presents
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          className="text-6xl mb-6"
        >
          <span className="text-glow-gold">🧽</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight text-glow-gold"
        >
          SPONGE CLUB
        </motion.h1>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mb-4">
          {taglineWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
              className="text-lg md:text-xl text-sponge-text font-medium"
            >
              {word}
              {i < taglineWords.length - 1 && (
                <span className="ml-3 text-sponge-gold/60">·</span>
              )}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-sponge-cyan font-mono text-sm tracking-wider mb-10"
        >
          AI 마케터 양성소 커뮤니티
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#pre-register"
            className="btn-neon bg-sponge-gold text-sponge-bg px-8 py-3.5 rounded-xl font-display font-bold text-lg hover:brightness-110 transition-all duration-300"
          >
            사전 알림 신청하기
          </a>
          <a
            href="#curriculum"
            className="border border-sponge-gold/40 text-sponge-gold px-8 py-3.5 rounded-xl font-display font-bold text-lg hover:bg-sponge-gold/10 hover:border-sponge-gold/60 transition-all duration-300"
          >
            커리큘럼 보기
          </a>
        </motion.div>

        <LiveCounter />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sponge-bg to-transparent pointer-events-none" />
    </section>
  );
}
