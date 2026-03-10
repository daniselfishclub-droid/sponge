# Sponge Club 사전 알림 신청 랜딩페이지 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 스폰지 클럽 사전 알림 신청 랜딩페이지를 만든다. 방문자가 서베이 질문에 답하고 알림을 신청하면 Supabase에 저장된다.

**Architecture:** Next.js App Router + Tailwind CSS로 다크 테마 싱글페이지 랜딩을 구축. 서베이 + 알림 신청 폼은 Supabase `pre_registrations` 테이블에 저장. 향후 카카오 로그인, 교육과정 안내, 블로그 페이지 확장이 가능하도록 프로젝트 구조를 설계.

**Tech Stack:** Next.js 14+ (App Router), Tailwind CSS, Supabase, Framer Motion, Vercel

---

## File Structure

```
sponge-club/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (메타데이터, 폰트, 다크테마)
│   ├── page.tsx                # 랜딩페이지 (섹션 조합)
│   ├── globals.css             # Tailwind + 커스텀 CSS
│   └── api/
│       └── pre-register/
│           └── route.ts        # 사전 알림 신청 API
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # 상단 네비게이션
│   │   └── Footer.tsx          # 하단 푸터
│   ├── landing/
│   │   ├── Hero.tsx            # 히어로 섹션
│   │   ├── About.tsx           # 클럽 소개 섹션
│   │   ├── Curriculum.tsx      # 커리큘럼 요약 섹션
│   │   ├── Target.tsx          # 타겟 오디언스 섹션
│   │   └── ComingSoon.tsx      # 향후 기능 예고 (교육과정, 블로그, 카카오)
│   └── pre-register/
│       ├── PreRegisterSection.tsx  # 서베이 + 알림 신청 전체 섹션
│       ├── SurveyStep.tsx         # 서베이 질문 UI (단계별)
│       ├── SignupForm.tsx         # 이름/이메일/전화번호 폼
│       └── SuccessMessage.tsx     # 신청 완료 메시지
├── lib/
│   └── supabase.ts             # Supabase 클라이언트
├── data/
│   └── survey-questions.ts     # 서베이 질문 데이터
├── public/
│   └── images/                 # 로고, OG 이미지
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Chunk 1: 프로젝트 초기화 + 레이아웃

### Task 1: Next.js 프로젝트 생성 및 의존성 설치

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `next.config.ts`, `tsconfig.json`, `app/globals.css`, `.gitignore`

- [ ] **Step 1: Next.js 프로젝트 생성**

```bash
cd "/Users/songda-eun/Desktop/claude project/sponge club"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src=false --import-alias="@/*" --use-npm
```

- [ ] **Step 2: 추가 의존성 설치**

```bash
npm install @supabase/supabase-js framer-motion lucide-react
```

- [ ] **Step 3: Tailwind 커스텀 테마 설정**

`tailwind.config.ts`에 Sponge Club 다크 테마 컬러 추가:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sponge: {
          bg: "#0a0a1a",
          card: "#1a1a2e",
          gold: "#ffd700",
          cyan: "#64ffda",
          text: "#e0e0e0",
          muted: "#888888",
          accent: "#1e3a5f",
        },
      },
      fontFamily: {
        sans: ['"Pretendard"', '"Noto Sans KR"', "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: globals.css 설정**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

body {
  background-color: #0a0a1a;
  color: #e0e0e0;
}

::selection {
  background-color: #ffd700;
  color: #0a0a1a;
}
```

- [ ] **Step 5: 개발 서버 실행 확인**

```bash
npm run dev
```
Expected: localhost:3000에 Next.js 기본 페이지 표시

- [ ] **Step 6: git init + 첫 커밋**

```bash
git init
git add .
git commit -m "chore: init Next.js project with Tailwind + Supabase deps"
```

---

### Task 2: 루트 레이아웃 + Navbar + Footer

**Files:**
- Modify: `app/layout.tsx`
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Navbar 컴포넌트 생성**

`components/layout/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-sponge-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧽</span>
          <span className="font-bold text-lg text-white">Sponge Club</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-sponge-muted hover:text-white transition">소개</a>
          <a href="#curriculum" className="text-sm text-sponge-muted hover:text-white transition">커리큘럼</a>
          <a href="#pre-register" className="text-sm bg-sponge-gold text-sponge-bg px-4 py-2 rounded-lg font-bold hover:brightness-110 transition">
            사전 알림 신청
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-sponge-bg border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          <a href="#about" className="text-sm text-sponge-muted" onClick={() => setIsOpen(false)}>소개</a>
          <a href="#curriculum" className="text-sm text-sponge-muted" onClick={() => setIsOpen(false)}>커리큘럼</a>
          <a href="#pre-register" className="text-sm bg-sponge-gold text-sponge-bg px-4 py-2 rounded-lg font-bold text-center" onClick={() => setIsOpen(false)}>
            사전 알림 신청
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Footer 컴포넌트 생성**

`components/layout/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="bg-sponge-bg border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl">🧽</span>
          <span className="font-bold text-white">Sponge Club</span>
        </div>
        <p className="text-sponge-muted text-sm mb-2">
          SELFISH CLUB presents
        </p>
        <p className="text-sponge-muted text-xs">
          냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sponge-muted text-xs">
          <a href="https://instagram.com/selfishclub" target="_blank" rel="noopener" className="hover:text-white transition">Instagram</a>
          <a href="mailto:contact@selfishclub.xyz" className="hover:text-white transition">문의하기</a>
        </div>
        <p className="text-sponge-muted/50 text-xs mt-8">
          © 2025 Selfish Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: 루트 레이아웃 구성**

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sponge Club — AI를 냅다 흡수해서, 비즈니스에 냅다 꽂아 넣는 사람들",
  description: "무언가를 팔기 위해 고민하는 마케터, 비즈니스 실무자를 위한 AI 커뮤니티. 8주간 AI를 흡수하고, 만들고, 세상에 내놓는 풀 사이클을 경험합니다.",
  openGraph: {
    title: "Sponge Club — AI 마케팅 커뮤니티",
    description: "냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-sponge-bg text-sponge-text antialiased">
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: 빈 홈페이지 확인**

`app/page.tsx`를 임시로:

```tsx
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-sponge-gold">🧽 Sponge Club</h1>
    </div>
  );
}
```

- [ ] **Step 5: 브라우저에서 Navbar + Footer 확인**

```bash
npm run dev
```
Expected: 다크 배경, 상단 네비게이션, 하단 푸터, 가운데 로고 표시

- [ ] **Step 6: 커밋**

```bash
git add components/layout/ app/layout.tsx app/page.tsx app/globals.css
git commit -m "feat: add root layout with Navbar and Footer"
```

---

## Chunk 2: 랜딩페이지 섹션 (Hero + About + Curriculum + Target + ComingSoon)

### Task 3: Hero 섹션

**Files:**
- Create: `components/landing/Hero.tsx`

- [ ] **Step 1: Hero 컴포넌트 생성**

`components/landing/Hero.tsx`:

```tsx
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
```

- [ ] **Step 2: 커밋**

```bash
git add components/landing/Hero.tsx
git commit -m "feat: add Hero section with animation"
```

---

### Task 4: About + Curriculum + Target + ComingSoon 섹션

**Files:**
- Create: `components/landing/About.tsx`
- Create: `components/landing/Curriculum.tsx`
- Create: `components/landing/Target.tsx`
- Create: `components/landing/ComingSoon.tsx`

- [ ] **Step 1: About 섹션**

`components/landing/About.tsx`:

```tsx
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
                <p className="text-sponge-text">"{point}"</p>
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
```

- [ ] **Step 2: Curriculum 섹션**

`components/landing/Curriculum.tsx`:

```tsx
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
```

- [ ] **Step 3: Target 섹션**

`components/landing/Target.tsx`:

```tsx
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
```

- [ ] **Step 4: ComingSoon 섹션 (향후 기능 예고)**

`components/landing/ComingSoon.tsx`:

```tsx
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
```

- [ ] **Step 5: 커밋**

```bash
git add components/landing/
git commit -m "feat: add About, Curriculum, Target, ComingSoon sections"
```

---

## Chunk 3: 서베이 + 사전 알림 신청 (핵심 기능)

### Task 5: 서베이 질문 데이터 정의

**Files:**
- Create: `data/survey-questions.ts`

- [ ] **Step 1: 서베이 질문 데이터 파일 생성**

`data/survey-questions.ts`:

```typescript
export interface SurveyQuestion {
  id: string;
  question: string;
  type: "single" | "multiple" | "text";
  options?: string[];
  required: boolean;
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "current_role",
    question: "현재 어떤 일을 하고 계신가요?",
    type: "single",
    options: [
      "마케터 / 콘텐츠 담당",
      "기획자 / PM",
      "디자이너",
      "개발자",
      "사업가 / 창업자",
      "프리랜서",
      "직장인 (사이드 프로젝트 준비중)",
      "기타",
    ],
    required: true,
  },
  {
    id: "ai_experience",
    question: "AI 도구 활용 경험이 어느 정도인가요?",
    type: "single",
    options: [
      "거의 써본 적 없어요",
      "ChatGPT 정도는 써봤어요",
      "다양한 AI 도구를 업무에 활용 중이에요",
      "AI로 프로덕트를 만들어 본 적 있어요",
    ],
    required: true,
  },
  {
    id: "interest_areas",
    question: "가장 관심 있는 영역을 모두 선택해주세요",
    type: "multiple",
    options: [
      "AI로 콘텐츠 제작 (이미지, 영상, 카피)",
      "AI로 프로덕트/서비스 직접 개발",
      "CRM & 마케팅 자동화",
      "고객 반응 데이터 분석",
      "AI 비즈니스 모델 설계",
      "브랜딩 & 홍보 전략",
    ],
    required: true,
  },
  {
    id: "biggest_challenge",
    question: "AI를 활용할 때 가장 큰 어려움은 무엇인가요?",
    type: "single",
    options: [
      "어디서부터 시작해야 할지 모르겠음",
      "배워도 실제 업무에 적용이 어려움",
      "혼자 하니까 방향을 잡기 어려움",
      "만들기까지는 되는데 고객에게 전달하는 게 어려움",
      "최신 트렌드를 따라가기 벅참",
    ],
    required: true,
  },
  {
    id: "expectation",
    question: "Sponge Club에서 가장 기대하는 것은?",
    type: "single",
    options: [
      "AI 도구 활용법을 체계적으로 배우고 싶다",
      "내 프로덕트/서비스를 직접 만들고 싶다",
      "같은 고민을 하는 사람들과 네트워킹하고 싶다",
      "실제 비즈니스 성과를 만들고 싶다",
      "론칭 후 고객 반응까지 보는 풀 사이클을 경험하고 싶다",
    ],
    required: true,
  },
];
```

- [ ] **Step 2: 커밋**

```bash
git add data/survey-questions.ts
git commit -m "feat: define survey questions data"
```

---

### Task 6: Supabase 연동 + API Route

**Files:**
- Create: `lib/supabase.ts`
- Create: `app/api/pre-register/route.ts`
- Create: `.env.local` (git 무시)

- [ ] **Step 1: 환경변수 파일 생성**

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

`.gitignore`에 `.env.local` 이미 포함 확인.

- [ ] **Step 2: Supabase 클라이언트 생성**

`lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

- [ ] **Step 3: Supabase에 pre_registrations 테이블 생성**

Supabase 대시보드 SQL Editor에서 실행:

```sql
CREATE TABLE pre_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  survey_responses JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 활성화
ALTER TABLE pre_registrations ENABLE ROW LEVEL SECURITY;

-- anon은 INSERT만 가능
CREATE POLICY "Allow anonymous insert" ON pre_registrations
  FOR INSERT TO anon WITH CHECK (true);
```

- [ ] **Step 4: API Route 생성**

`app/api/pre-register/route.ts`:

```typescript
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, surveyResponses } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "이름과 이메일은 필수입니다." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("pre_registrations")
      .insert({
        name,
        email,
        phone: phone || null,
        survey_responses: surveyResponses || {},
      })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "이미 등록된 이메일입니다." },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Pre-registration error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 5: 커밋**

```bash
git add lib/supabase.ts app/api/pre-register/route.ts
git commit -m "feat: add Supabase client and pre-register API route"
```

---

### Task 7: 서베이 UI + 알림 신청 폼 컴포넌트

**Files:**
- Create: `components/pre-register/SurveyStep.tsx`
- Create: `components/pre-register/SignupForm.tsx`
- Create: `components/pre-register/SuccessMessage.tsx`
- Create: `components/pre-register/PreRegisterSection.tsx`

- [ ] **Step 1: SurveyStep 컴포넌트**

`components/pre-register/SurveyStep.tsx`:

```tsx
"use client";

import { SurveyQuestion } from "@/data/survey-questions";
import { Check } from "lucide-react";

interface SurveyStepProps {
  question: SurveyQuestion;
  answer: string | string[];
  onAnswer: (questionId: string, answer: string | string[]) => void;
  stepNumber: number;
  totalSteps: number;
}

export default function SurveyStep({
  question,
  answer,
  onAnswer,
  stepNumber,
  totalSteps,
}: SurveyStepProps) {
  const handleSingleSelect = (option: string) => {
    onAnswer(question.id, option);
  };

  const handleMultiSelect = (option: string) => {
    const current = Array.isArray(answer) ? answer : [];
    const updated = current.includes(option)
      ? current.filter((a) => a !== option)
      : [...current, option];
    onAnswer(question.id, updated);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-1 bg-sponge-card rounded-full overflow-hidden">
          <div
            className="h-full bg-sponge-gold rounded-full transition-all duration-300"
            style={{ width: `${((stepNumber + 1) / (totalSteps + 1)) * 100}%` }}
          />
        </div>
        <span className="text-sponge-muted text-xs">
          {stepNumber + 1} / {totalSteps + 1}
        </span>
      </div>

      {/* Question */}
      <h3 className="text-xl font-bold text-white">{question.question}</h3>
      {question.type === "multiple" && (
        <p className="text-sponge-muted text-sm">복수 선택 가능</p>
      )}

      {/* Options */}
      <div className="flex flex-col gap-3">
        {question.options?.map((option) => {
          const isSelected = question.type === "multiple"
            ? (Array.isArray(answer) ? answer : []).includes(option)
            : answer === option;

          return (
            <button
              key={option}
              onClick={() =>
                question.type === "multiple"
                  ? handleMultiSelect(option)
                  : handleSingleSelect(option)
              }
              className={`text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-sponge-gold bg-sponge-gold/10 text-white"
                  : "border-white/10 bg-sponge-card hover:border-white/20 text-sponge-text"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{option}</span>
                {isSelected && <Check size={16} className="text-sponge-gold shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: SignupForm 컴포넌트**

`components/pre-register/SignupForm.tsx`:

```tsx
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
        <div className="flex-1 h-1 bg-sponge-card rounded-full overflow-hidden">
          <div className="h-full bg-sponge-gold rounded-full transition-all duration-300 w-full" />
        </div>
        <span className="text-sponge-muted text-xs">{totalSteps + 1} / {totalSteps + 1}</span>
      </div>

      <h3 className="text-xl font-bold text-white">마지막! 알림 받을 정보를 남겨주세요</h3>
      <p className="text-sponge-muted text-sm">1기 오픈 소식을 가장 먼저 전해드릴게요.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-sponge-muted mb-1">이름 *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="홍길동"
            className="w-full bg-sponge-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-sponge-muted/50 focus:outline-none focus:border-sponge-gold transition"
          />
        </div>
        <div>
          <label className="block text-sm text-sponge-muted mb-1">이메일 *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@example.com"
            className="w-full bg-sponge-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-sponge-muted/50 focus:outline-none focus:border-sponge-gold transition"
          />
        </div>
        <div>
          <label className="block text-sm text-sponge-muted mb-1">전화번호 (선택)</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            className="w-full bg-sponge-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-sponge-muted/50 focus:outline-none focus:border-sponge-gold transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !name || !email}
          className="w-full bg-sponge-gold text-sponge-bg py-3 rounded-xl font-bold text-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "신청 중..." : "🧽 사전 알림 신청하기"}
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 3: SuccessMessage 컴포넌트**

`components/pre-register/SuccessMessage.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export default function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <PartyPopper className="w-12 h-12 text-sponge-gold mx-auto mb-4" />
      <h3 className="text-2xl font-bold text-white mb-2">신청 완료!</h3>
      <p className="text-sponge-muted mb-4">
        1기 오픈 소식을 가장 먼저 전해드릴게요.
      </p>
      <p className="text-sponge-muted text-sm">
        냅다 흡수할 준비, 되셨나요? 🧽
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 4: PreRegisterSection (전체 조합)**

`components/pre-register/PreRegisterSection.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { surveyQuestions } from "@/data/survey-questions";
import SurveyStep from "./SurveyStep";
import SignupForm from "./SignupForm";
import SuccessMessage from "./SuccessMessage";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PreRegisterSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");

  const totalQuestions = surveyQuestions.length;
  const isLastSurveyStep = currentStep === totalQuestions;
  const isSurveyStep = currentStep < totalQuestions;

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const canProceed = () => {
    if (!isSurveyStep) return true;
    const q = surveyQuestions[currentStep];
    const a = answers[q.id];
    if (!q.required) return true;
    if (q.type === "multiple") return Array.isArray(a) && a.length > 0;
    return !!a;
  };

  const handleNext = () => {
    if (canProceed() && currentStep <= totalQuestions) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (data: { name: string; email: string; phone: string }) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/pre-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          surveyResponses: answers,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "오류가 발생했습니다.");
        return;
      }

      setIsComplete(true);
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="pre-register" className="py-20 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <p className="text-sponge-gold text-sm font-bold mb-2">사전 알림 신청</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            1기 오픈 알림을 받아보세요
          </h2>
          <p className="text-sponge-muted text-sm">
            간단한 설문에 참여하고, 오픈 소식을 가장 먼저 받아보세요.
          </p>
        </div>

        <div className="bg-sponge-card rounded-2xl p-6 md:p-8 border border-white/5">
          {isComplete ? (
            <SuccessMessage />
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSurveyStep ? (
                    <SurveyStep
                      question={surveyQuestions[currentStep]}
                      answer={answers[surveyQuestions[currentStep].id] || (surveyQuestions[currentStep].type === "multiple" ? [] : "")}
                      onAnswer={handleAnswer}
                      stepNumber={currentStep}
                      totalSteps={totalQuestions}
                    />
                  ) : (
                    <SignupForm
                      onSubmit={handleSubmit}
                      isLoading={isLoading}
                      totalSteps={totalQuestions}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {error && (
                <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
              )}

              {/* Navigation */}
              {isSurveyStep && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1 text-sponge-muted text-sm hover:text-white transition disabled:opacity-30"
                  >
                    <ChevronLeft size={16} /> 이전
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center gap-1 bg-sponge-gold/20 text-sponge-gold px-4 py-2 rounded-lg text-sm font-bold hover:bg-sponge-gold/30 transition disabled:opacity-30"
                  >
                    다음 <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: 커밋**

```bash
git add components/pre-register/
git commit -m "feat: add survey + pre-register form components"
```

---

## Chunk 4: 페이지 조합 + 최종 확인

### Task 8: 홈페이지에 모든 섹션 조합

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: page.tsx에 모든 섹션 조합**

`app/page.tsx`:

```tsx
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Curriculum from "@/components/landing/Curriculum";
import Target from "@/components/landing/Target";
import ComingSoon from "@/components/landing/ComingSoon";
import PreRegisterSection from "@/components/pre-register/PreRegisterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Curriculum />
      <Target />
      <PreRegisterSection />
      <ComingSoon />
    </>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
npm run build
```
Expected: 빌드 성공, 에러 없음

- [ ] **Step 3: 개발 서버에서 전체 플로우 확인**

```bash
npm run dev
```

확인 항목:
1. 히어로 섹션 애니메이션 정상
2. 스크롤 시 각 섹션 표시
3. "사전 알림 신청하기" 클릭 → 해당 섹션으로 스크롤
4. 서베이 5개 질문 순서대로 진행
5. 이전/다음 버튼 동작
6. 마지막 단계에서 이름/이메일 입력 후 신청
7. 모바일 반응형 확인 (개발자 도구)
8. Navbar 모바일 메뉴 토글

- [ ] **Step 4: 커밋**

```bash
git add app/page.tsx
git commit -m "feat: assemble landing page with all sections"
```

---

### Task 9: Supabase 연동 테스트 + .env 설정

- [ ] **Step 1: Supabase 프로젝트 URL/Key를 .env.local에 입력**

사용자에게 Supabase 프로젝트 정보 확인 요청:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

- [ ] **Step 2: Supabase에서 SQL 실행하여 테이블 생성**

위 Task 6 Step 3의 SQL을 Supabase 대시보드에서 실행.

- [ ] **Step 3: 사전 알림 신청 E2E 테스트**

1. 서베이 질문 5개 모두 응답
2. 이름/이메일 입력 후 신청
3. Supabase 대시보드에서 `pre_registrations` 테이블 확인
4. 동일 이메일로 재신청 시 "이미 등록된 이메일" 에러 확인

- [ ] **Step 4: 최종 커밋**

```bash
git add -A
git commit -m "feat: complete pre-launch landing page with survey + notification signup"
```

---

## Summary

| Task | 내용 | 예상 파일 수 |
|------|------|-------------|
| 1 | 프로젝트 초기화 + Tailwind 설정 | 5 |
| 2 | 루트 레이아웃 + Navbar + Footer | 3 |
| 3 | Hero 섹션 | 1 |
| 4 | About + Curriculum + Target + ComingSoon | 4 |
| 5 | 서베이 질문 데이터 | 1 |
| 6 | Supabase 연동 + API Route | 3 |
| 7 | 서베이 UI + 알림 신청 폼 | 4 |
| 8 | 페이지 조합 + 빌드 확인 | 1 |
| 9 | Supabase 연동 테스트 | 0 (설정) |
