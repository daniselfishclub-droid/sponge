"use client";

import { motion } from "framer-motion";

const targets = [
  { emoji: "🧽", title: "마케터 & 콘텐츠", desc: "AI로 더 빠르게 만들고 싶은 실무자. 브랜드 비주얼, 영상, 카피를 AI로 혼자 해내고 싶은 분" },
  { emoji: "💼", title: "비즈니스 & 사이드", desc: "AI를 실제 업무와 매출에 연결하고 싶은 분. 사이드 프로젝트를 AI로 현실화하고 싶은 직장인" },
  { emoji: "🎯", title: "고객 접점 담당자", desc: "론칭에서 끝나지 않고 실제 유저 데이터까지 보고 싶은 분. 고객 반응을 기반으로 개선하는 사이클" },
];

export default function Target() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          이런 분들을 위한 클럽
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {targets.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sponge-card rounded-xl p-6"
            >
              <div className="text-3xl mb-3">{t.emoji}</div>
              <h3 className="font-bold text-white mb-2">{t.title}</h3>
              <p className="text-sponge-muted text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
