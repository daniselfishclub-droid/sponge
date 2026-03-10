"use client";

import { motion } from "framer-motion";

const layers = [
  { weeks: "W1-3", name: "BUILD", label: "냅다 만든다", color: "text-blue-400", desc: "Claude로 프로덕트 직접 개발" },
  { weeks: "W4", name: "CONNECT", label: "사람을 모은다", color: "text-green-400", desc: "CRM 설계·연동·자동화" },
  { weeks: "W5", name: "LAUNCH", label: "냅다 내놓는다", color: "text-yellow-400", desc: "홍보 전략 + 랜딩페이지 제작" },
  { weeks: "W6", name: "REACT", label: "반응을 본다", color: "text-red-400", desc: "고객 반응 데이터 분석·개선" },
  { weeks: "W7-8", name: "AMPLIFY", label: "냅다 전파한다", color: "text-purple-400", desc: "AI 이미지 + 숏폼 영상 제작" },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="py-20 px-4 bg-sponge-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">8주, 풀 사이클</h2>
          <p className="text-sponge-muted">흡수 → 빌드 → 연결 → 론칭 → 반응 → 전파</p>
        </div>

        <div className="grid gap-4">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sponge-card rounded-xl p-5 flex items-center gap-4"
            >
              <div className="text-sponge-cyan text-xs font-mono w-12 shrink-0">{layer.weeks}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-bold ${layer.color}`}>{layer.name}</span>
                  <span className="text-sponge-muted text-sm">— {layer.label}</span>
                </div>
                <p className="text-sponge-muted text-sm">{layer.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sponge-muted text-sm">
            오프라인 2회 (킥오프 + 데모데이) + 온라인 6회
          </p>
        </div>
      </div>
    </section>
  );
}
