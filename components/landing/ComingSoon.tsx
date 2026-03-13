"use client";

import { motion } from "framer-motion";
import { BookOpen, PenTool, MessageCircle } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "교육과정 안내",
    desc: "다양한 AI 마케팅 교육 프로그램",
    color: "text-sponge-cyan",
  },
  {
    icon: PenTool,
    title: "블로그 & 인사이트",
    desc: "크루들의 실전 노하우와 성과 공유",
    color: "text-sponge-gold",
  },
  {
    icon: MessageCircle,
    title: "카카오 간편 가입",
    desc: "카카오 계정으로 쉽고 빠르게",
    color: "text-sponge-coral",
  },
];

export default function ComingSoon() {
  return (
    <section className="relative py-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-sponge-bg via-sponge-card/20 to-sponge-bg pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sponge-cyan font-mono text-sm tracking-wider mb-3">COMING SOON</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-10">
            곧 만나볼 수 있어요
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card glass-card-hover rounded-xl p-6 group"
            >
              <div className={`${f.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <f.icon className="w-7 h-7 mx-auto" />
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-2">{f.title}</h3>
              <p className="text-sponge-muted text-xs">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
