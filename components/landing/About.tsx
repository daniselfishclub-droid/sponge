"use client";

import { motion } from "framer-motion";

const painPoints = [
  "AI 써야 한다는 건 아는데, 어디서부터 시작해야 할지 모르겠어요.",
  "직무 경계가 없어지는 느낌인데, 나만 뒤처지는 것 같아요.",
  "만드는 것도 좋은데, 고객이 실제로 반응하는지까지 보고 싶어요.",
];

const trustCompanies = ["네이버", "배달의민족", "카카오", "클리오", "달바", "아모레퍼시픽"];

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Trust bar */}
        <div className="text-center mb-16">
          <p className="text-sponge-muted text-xs tracking-widest mb-3">B2B 검증 기업</p>
          <p className="text-sponge-muted/60 text-sm">
            {trustCompanies.join(" · ")}
          </p>
        </div>

        {/* Pain points */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            이런 고민, 하고 있지 않나요?
          </h2>
          <div className="flex flex-col gap-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-sponge-card p-5 rounded-xl border-l-4 border-sponge-gold"
              >
                <p className="text-sponge-text">&ldquo;{point}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Club intro */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            그래서 만들었습니다
          </h2>
          <p className="text-sponge-muted max-w-2xl mx-auto leading-relaxed">
            단순히 AI를 배우는 과정이 아닙니다. 같은 현장에서 같은 고민을 하는 사람들이 모여,
            AI를 실제 비즈니스에 연결하는 방법을 함께 터득하는 커뮤니티입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
