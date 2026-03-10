"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sponge-bg via-sponge-card/30 to-sponge-bg" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sponge-muted text-sm tracking-[0.2em] mb-4"
        >
          SELFISH CLUB presents
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-white mb-4"
        >
          <span className="text-sponge-gold">🧽</span> Sponge Club
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-sponge-text mb-2"
        >
          냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sponge-muted mb-8"
        >
          무언가를 팔기 위해 고민하는 사람들을 위한 AI 커뮤니티
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#pre-register"
            className="bg-sponge-gold text-sponge-bg px-8 py-3 rounded-lg font-bold text-lg hover:brightness-110 transition"
          >
            사전 알림 신청하기
          </a>
          <a
            href="#curriculum"
            className="border border-sponge-gold text-sponge-gold px-8 py-3 rounded-lg font-bold text-lg hover:bg-sponge-gold/10 transition"
          >
            커리큘럼 보기
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 inline-flex items-center gap-2 bg-sponge-card/50 px-4 py-2 rounded-full"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sponge-muted text-sm">1기 오픈 준비중 · 사전 알림 신청 받는 중</span>
        </motion.div>
      </div>
    </section>
  );
}
