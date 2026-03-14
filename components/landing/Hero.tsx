"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

// SSR 비활성화 (Three.js는 브라우저에서만 동작)
const BallpitBackground = dynamic(
  () => import("./BallpitBackground").then((mod) => mod.BallpitBackground),
  { ssr: false }
);

function LiveCounter() {
  const [count, setCount] = useState(127);
  const containerRef = useRef<HTMLDivElement>(null);

  // 젤리 물리: 마우스 위치 기반 스쿼시 & 스트레치
  const mouseY = useMotionValue(0);
  const smoothY = useSpring(mouseY, { damping: 15, stiffness: 300, mass: 0.8 });
  const scaleX = useTransform(smoothY, [-40, 0, 40], [0.95, 1, 1.05]);
  const scaleY = useTransform(smoothY, [-40, 0, 40], [1.08, 1, 0.92]);

  const tick = useCallback(() => {
    if (Math.random() > 0.7) {
      setCount((c) => c + 1);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(tick, 8000);
    return () => clearInterval(interval);
  }, [tick]);

  // 마우스 드래그/움직임으로 젤리 스쿼시
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    mouseY.set(e.clientY - centerY);
  };

  const handlePointerLeave = () => {
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, type: "spring", damping: 12, stiffness: 200 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="mt-10 cursor-pointer"
    >
      <motion.div
        style={{ scaleX, scaleY }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scaleX: 1.1, scaleY: 0.85 }}
        transition={{ type: "spring", damping: 10, stiffness: 400 }}
        className="relative glass-card rounded-2xl px-8 py-5 border border-sponge-cyan/20 overflow-hidden group"
      >
        {/* 배경 글로우 */}
        <div className="absolute inset-0 bg-gradient-to-r from-sponge-cyan/5 via-transparent to-sponge-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center gap-4">
          {/* 라이브 인디케이터 */}
          <div className="flex flex-col items-center gap-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sponge-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sponge-cyan" />
            </span>
            <span className="text-[10px] text-sponge-cyan font-mono uppercase tracking-wider">Live</span>
          </div>

          {/* 구분선 */}
          <div className="w-px h-10 bg-white/10" />

          {/* 카운터 */}
          <div className="flex flex-col">
            <span className="text-sponge-muted text-xs font-mono tracking-wider uppercase">
              1기 오픈 대기중
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <motion.span
                key={count}
                initial={{ opacity: 0, y: -10, scale: 1.2 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 300 }}
                className="text-3xl font-display font-black text-sponge-cyan"
                style={{ textShadow: "0 0 12px rgba(100,255,218,0.4)" }}
              >
                {count}
              </motion.span>
              <span className="text-sponge-text text-sm font-medium">명 대기중</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const taglineWords = ["냅다 흡수하고", "냅다 만들고", "냅다 세상에 내놓는다"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Ballpit 배경 */}
      <BallpitBackground
        count={120}
        colors={["#ffd700", "#64ffda", "#1e3a5f"]}
        gravity={1.2}
        friction={0.99}
        wallBounce={0.85}
        maxVelocity={0.5}
        followCursor={true}
        minSize={0.3}
        maxSize={0.8}
        lightIntensity={250}
        ambientColor="#0a0a1a"
        ambientIntensity={0.6}
      />

      {/* 어두운 오버레이 (텍스트 가독성) */}
      <div className="absolute inset-0 bg-sponge-bg/40 pointer-events-none z-[1]" />

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
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          style={{ textShadow: "0 0 10px rgba(255,215,0,0.2), 0 0 20px rgba(255,215,0,0.1)" }}
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

      {/* 하단 페이드 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sponge-bg to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
