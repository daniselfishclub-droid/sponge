"use client";

import { motion } from "framer-motion";

const targets = [
  {
    emoji: "🧽",
    title: "마케터 & 콘텐츠",
    desc: "AI로 더 빠르게 만들고 싶은 실무자. 브랜드 비주얼, 영상, 카피를 AI로 혼자 해내고 싶은 분",
    accent: "sponge-gold",
  },
  {
    emoji: "💼",
    title: "비즈니스 & 사이드",
    desc: "AI를 실제 업무와 매출에 연결하고 싶은 분. 사이드 프로젝트를 AI로 현실화하고 싶은 직장인",
    accent: "sponge-cyan",
  },
  {
    emoji: "🎯",
    title: "고객 접점 담당자",
    desc: "론칭에서 끝나지 않고 실제 유저 데이터까지 보고 싶은 분. 고객 반응을 기반으로 개선하는 사이클",
    accent: "sponge-coral",
  },
];

export default function Target() {
  return (
    <section className="relative py-24 px-4 mesh-gradient-section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sponge-gold font-mono text-sm tracking-wider mb-3">WHO IS IT FOR</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            이런 분들을 위한 클럽
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {targets.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card glass-card-hover rounded-xl p-6 relative overflow-hidden group"
            >
              {/* Accent glow on hover */}
              <div
                className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-${t.accent}/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div className="text-4xl mb-4">{t.emoji}</div>
                <h3 className="font-display font-bold text-white text-lg mb-3">{t.title}</h3>
                <p className="text-sponge-muted text-sm leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
