"use client";

import { motion } from "framer-motion";

const painPoints = [
  {
    text: "AI 써야 한다는 건 아는데, 어디서부터 시작해야 할지 모르겠어요.",
    icon: "🤯",
  },
  {
    text: "직무 경계가 없어지는 느낌인데, 나만 뒤처지는 것 같아요.",
    icon: "😰",
  },
  {
    text: "만드는 것도 좋은데, 고객이 실제로 반응하는지까지 보고 싶어요.",
    icon: "📊",
  },
];

const trustCompanies = ["네이버", "배달의민족", "카카오", "클리오", "달바", "아모레퍼시픽"];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 mesh-gradient-section">
      <div className="max-w-4xl mx-auto">
        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sponge-muted text-xs tracking-[0.2em] uppercase font-mono mb-4">
            B2B 검증 기업
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {trustCompanies.map((company, i) => (
              <motion.span
                key={company}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-sponge-muted/50 text-sm font-medium hover:text-sponge-gold/70 transition-colors duration-300"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Pain points */}
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-white mb-10 text-center"
          >
            이런 고민, 하고 있지 않나요?
          </motion.h2>
          <div className="flex flex-col gap-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="glass-card glass-card-hover rounded-xl p-6 flex items-start gap-4 border-l-2 border-sponge-gold/50"
              >
                <span className="text-2xl shrink-0">{point.icon}</span>
                <p className="text-sponge-text text-base leading-relaxed">
                  &ldquo;{point.text}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Club intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-5">
            그래서 만들었습니다
          </h2>
          <p className="text-sponge-muted max-w-2xl mx-auto leading-relaxed text-base">
            단순히 AI를 배우는 과정이 아닙니다. 같은 현장에서 같은 고민을 하는 사람들이 모여,
            AI를 실제 비즈니스에 연결하는 방법을 함께 터득하는{" "}
            <span className="text-sponge-cyan font-medium">커뮤니티</span>입니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
