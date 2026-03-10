import { BookOpen, PenTool, MessageCircle } from "lucide-react";

const features = [
  { icon: BookOpen, title: "교육과정 안내", desc: "다양한 AI 마케팅 교육 프로그램" },
  { icon: PenTool, title: "블로그 & 인사이트", desc: "크루들의 실전 노하우와 성과 공유" },
  { icon: MessageCircle, title: "카카오 간편 가입", desc: "카카오 계정으로 쉽고 빠르게" },
];

export default function ComingSoon() {
  return (
    <section className="py-16 px-4 bg-sponge-card/30">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sponge-cyan text-sm font-mono mb-2">COMING SOON</p>
        <h2 className="text-xl font-bold text-white mb-8">곧 만나볼 수 있어요</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-sponge-card/50 rounded-xl p-5 border border-white/5">
              <f.icon className="w-6 h-6 text-sponge-muted mx-auto mb-3" />
              <h3 className="font-bold text-white text-sm mb-1">{f.title}</h3>
              <p className="text-sponge-muted text-xs">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
