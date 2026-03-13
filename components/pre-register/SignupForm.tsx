"use client";

import { useState } from "react";

interface SignupFormProps {
  onSubmit: (data: { name: string; email: string; phone: string }) => void;
  isLoading: boolean;
  totalSteps: number;
}

export default function SignupForm({ onSubmit, isLoading, totalSteps }: SignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, phone });
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1 bg-sponge-bg rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sponge-gold to-sponge-cyan rounded-full transition-all duration-500 w-full" />
        </div>
        <span className="text-sponge-muted text-xs font-mono">{totalSteps + 1}/{totalSteps + 1}</span>
      </div>

      <h3 className="text-xl font-display font-bold text-white">마지막! 알림 받을 정보를 남겨주세요</h3>
      <p className="text-sponge-muted text-sm">1기 오픈 소식을 가장 먼저 전해드릴게요.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-sponge-muted mb-1.5 font-mono">이름 *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            className="w-full bg-sponge-bg/50 border border-white/8 rounded-xl px-4 py-3 text-white placeholder:text-sponge-muted/40 focus:outline-none focus:border-sponge-gold/60 focus:box-glow-gold transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm text-sponge-muted mb-1.5 font-mono">이메일 *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@example.com"
            className="w-full bg-sponge-bg/50 border border-white/8 rounded-xl px-4 py-3 text-white placeholder:text-sponge-muted/40 focus:outline-none focus:border-sponge-gold/60 focus:box-glow-gold transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm text-sponge-muted mb-1.5 font-mono">전화번호 (선택)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            className="w-full bg-sponge-bg/50 border border-white/8 rounded-xl px-4 py-3 text-white placeholder:text-sponge-muted/40 focus:outline-none focus:border-sponge-gold/60 focus:box-glow-gold transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !name || !email}
          className="w-full btn-neon bg-sponge-gold text-sponge-bg py-3.5 rounded-xl font-display font-bold text-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
        >
          {isLoading ? "신청 중..." : "🧽 사전 알림 신청하기"}
        </button>
      </form>
    </div>
  );
}
