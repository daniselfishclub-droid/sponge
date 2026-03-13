"use client";

import { motion } from "framer-motion";

const layers = [
  { weeks: "W1-3", name: "BUILD", label: "냅다 만든다", color: "text-sponge-cyan", glowColor: "rgba(100,255,218,0.3)", desc: "Claude로 프로덕트 직접 개발" },
  { weeks: "W4", name: "CONNECT", label: "사람을 모은다", color: "text-sponge-gold", glowColor: "rgba(255,215,0,0.3)", desc: "CRM 설계·연동·자동화" },
  { weeks: "W5", name: "LAUNCH", label: "냅다 내놓는다", color: "text-sponge-coral", glowColor: "rgba(255,107,107,0.3)", desc: "홍보 전략 + 랜딩페이지 제작" },
  { weeks: "W6", name: "REACT", label: "반응을 본다", color: "text-sponge-gold", glowColor: "rgba(255,215,0,0.3)", desc: "고객 반응 데이터 분석·개선" },
  { weeks: "W7-8", name: "AMPLIFY", label: "냅다 전파한다", color: "text-sponge-cyan", glowColor: "rgba(100,255,218,0.3)", desc: "AI 이미지 + 숏폼 영상 제작" },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="relative py-24 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-sponge-bg via-sponge-card/20 to-sponge-bg pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sponge-cyan font-mono text-sm tracking-wider mb-3">CURRICULUM</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            8주, 풀 사이클
          </h2>
          <p className="text-sponge-muted">
            흡수 → 빌드 → 연결 → 론칭 → 반응 → 전파
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sponge-cyan/50 via-sponge-gold/50 to-sponge-cyan/50" />

          <div className="flex flex-col gap-5">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 md:left-6 top-5 w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor: layer.glowColor,
                    backgroundColor: layer.glowColor.replace("0.3", "0.15"),
                    boxShadow: `0 0 10px ${layer.glowColor}`,
                  }}
                />

                <div className="glass-card glass-card-hover rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sponge-muted font-mono text-xs bg-sponge-bg/50 px-2 py-0.5 rounded">
                      {layer.weeks}
                    </span>
                    <span className={`font-display font-bold text-lg ${layer.color}`}>
                      {layer.name}
                    </span>
                    <span className="text-sponge-muted text-sm">— {layer.label}</span>
                  </div>
                  <p className="text-sponge-muted text-sm">{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-sponge-muted text-sm font-mono">
            오프라인 2회 (킥오프 + 데모데이) + 온라인 6회
          </p>
        </motion.div>
      </div>
    </section>
  );
}
