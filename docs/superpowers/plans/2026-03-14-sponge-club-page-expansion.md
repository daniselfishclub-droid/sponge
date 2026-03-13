# Sponge Club 사이트 페이지 확장 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Sponge Club pre-launch site from a single landing page to a full 8-page informational site with About, Curriculum, Membership, Apply, Reviews (Coming Soon), Demoday (Coming Soon), and FAQ pages.

**Architecture:** Static pages built as Next.js App Router routes. Content lives in TypeScript data files under `data/`. Existing Supabase integration for pre-registration unchanged. Shared components (Accordion, ComingSoonPage) reused across pages.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS 4, Framer Motion, Lucide React, Supabase (existing)

**Spec:** `docs/superpowers/specs/2026-03-14-sponge-club-page-expansion-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `data/site-config.ts` | Global site config (cohort, status, dates, prices) |
| `data/curriculum.ts` | 8-week curriculum data with Layer mapping |
| `data/team-members.ts` | Team member profiles (name, role, bio) |
| `data/membership-tiers.ts` | 4 tier comparison + add-on options |
| `data/faq.ts` | FAQ question/answer pairs |
| `components/shared/Accordion.tsx` | Reusable accordion (FAQ + curriculum) |
| `components/shared/ComingSoonPage.tsx` | Placeholder page with CTA |
| `components/shared/SectionCTA.tsx` | Reusable bottom CTA linking to /apply |
| `components/about/BackStory.tsx` | Origin story section |
| `components/about/Philosophy.tsx` | Club philosophy + "냅다" explanation |
| `components/about/TeamMembers.tsx` | Team member cards |
| `components/curriculum/LayerCards.tsx` | 5-layer visual flow |
| `components/curriculum/WeeklyTimeline.tsx` | Week 1-8 accordion timeline |
| `components/membership/TierComparison.tsx` | 4-tier comparison table/cards |
| `components/membership/PointSystem.tsx` | Point system grade visualization |
| `components/membership/AddOnOptions.tsx` | 1:1 coaching, VOD, bundle cards |
| `app/about/page.tsx` | About page route |
| `app/curriculum/page.tsx` | Curriculum page route |
| `app/membership/page.tsx` | Membership page route |
| `app/apply/page.tsx` | Apply page route (uses existing PreRegister) |
| `app/reviews/page.tsx` | Reviews Coming Soon page |
| `app/demoday/page.tsx` | Demoday Coming Soon page |
| `app/faq/page.tsx` | FAQ page route |

### Modified Files
| File | Change |
|------|--------|
| `components/layout/Navbar.tsx` | Add all page links, improve mobile menu |
| `components/layout/Footer.tsx` | Add page links, SNS, contact info |
| `app/page.tsx` | Remove PreRegisterSection, add CTA to /apply |
| `components/landing/Hero.tsx` | Update CTA links (anchor → /apply, /curriculum) |

---

## Chunk 1: Foundation — Data Files + Shared Components

### Task 1: Create site-config data file

**Files:**
- Create: `data/site-config.ts`

- [ ] **Step 1: Create the site config file**

```typescript
// data/site-config.ts
export const siteConfig = {
  cohort: 1,
  status: "pre-launch" as const, // "pre-launch" | "recruiting" | "closed"
  siteName: "Sponge Club",
  tagline: "냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다",
  description: "무언가를 팔기 위해 고민하는 마케터, 비즈니스 실무자를 위한 AI 커뮤니티",
  duration: "8주",
  format: "오프라인 2회 (킥오프 + 데모데이) + 온라인 6회",
  priceRange: "30~50만원",
  obMonthly: "월 구독료 별도",
  contact: {
    email: "contact@selfishclub.xyz",
    instagram: "https://instagram.com/selfishclub",
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add data/site-config.ts
git commit -m "feat: add site-config data file"
```

### Task 2: Create FAQ data file

**Files:**
- Create: `data/faq.ts`

- [ ] **Step 1: Create the FAQ data file**

```typescript
// data/faq.ts
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "AI를 전혀 모르는데 참여 가능한가요?",
    answer: "네, 가능합니다! Sponge Club은 AI 전문가를 위한 과정이 아니라, AI를 실무에 활용하고 싶은 분들을 위한 커뮤니티입니다. ChatGPT를 한 번도 써보지 않은 분도 참여할 수 있도록 기초부터 시작합니다.",
  },
  {
    question: "코딩을 할 줄 몰라도 되나요?",
    answer: "네, 코딩 경험이 전혀 없어도 됩니다. Claude를 활용한 노코드/로우코드 방식으로 프로덕트를 만들기 때문에, 코딩 지식 없이도 실제 서비스를 만들 수 있습니다.",
  },
  {
    question: "오프라인 세션은 어디서 진행되나요?",
    answer: "서울 강남 일대에서 진행됩니다. 정확한 장소는 기수 시작 전에 안내드립니다. 킥오프와 데모데이 총 2회가 오프라인이며, 나머지 6회는 온라인으로 진행됩니다.",
  },
  {
    question: "수료 후에도 커뮤니티에 남을 수 있나요?",
    answer: "네! 수료 후 OB Sponge 멤버십에 가입하면 커뮤니티에 계속 참여할 수 있습니다. OB 멤버십은 월 구독 형태이며, Slack 접근, 월간 세미나, AI 워크숍 할인 등의 혜택이 제공됩니다.",
  },
  {
    question: "VOD만 구매할 수 있나요?",
    answer: "네, VOD 단독 구매가 가능합니다. 다만 Sponge Club의 핵심 가치는 커뮤니티와 실전 프로젝트에 있기 때문에, 풀 과정 참여를 추천드립니다.",
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer: "과정 시작 전까지 100% 환불 가능합니다. 과정 시작 후에는 진행된 주차에 비례하여 환불 금액이 산정됩니다. 자세한 내용은 신청 시 안내됩니다.",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add data/faq.ts
git commit -m "feat: add FAQ data file"
```

### Task 3: Create curriculum data file

**Files:**
- Create: `data/curriculum.ts`

- [ ] **Step 1: Create the curriculum data file**

```typescript
// data/curriculum.ts
export interface CurriculumWeek {
  week: number;
  layer: string;
  layerColor: string;
  title: string;
  description: string;
  details: string[];
  isOffline: boolean;
}

export interface Layer {
  name: string;
  label: string;
  color: string;
  weeks: string;
  description: string;
  icon: string; // emoji
}

export const layers: Layer[] = [
  { name: "BUILD", label: "냅다 만든다", color: "text-blue-400", weeks: "W1-3", description: "Claude로 프로덕트 직접 개발", icon: "🔨" },
  { name: "CONNECT", label: "사람을 모은다", color: "text-green-400", weeks: "W4", description: "CRM 설계·연동·자동화", icon: "🔗" },
  { name: "LAUNCH", label: "냅다 내놓는다", color: "text-yellow-400", weeks: "W5", description: "홍보 전략 + 랜딩페이지 제작", icon: "🚀" },
  { name: "REACT", label: "반응을 본다", color: "text-red-400", weeks: "W6", description: "고객 반응 데이터 분석·개선", icon: "📊" },
  { name: "AMPLIFY", label: "냅다 전파한다", color: "text-purple-400", weeks: "W7-8", description: "AI 이미지 + 숏폼 영상 제작", icon: "📣" },
];

export const weeklySchedule: CurriculumWeek[] = [
  {
    week: 1,
    layer: "BUILD",
    layerColor: "text-blue-400",
    title: "킥오프 + AI 프로덕트 기획",
    description: "만들고 싶은 프로덕트를 정의하고, AI 활용 전략을 세웁니다.",
    details: [
      "오프라인 킥오프 (팀빌딩 + 아이디어 피칭)",
      "Claude 기초 활용법 (프롬프트 엔지니어링)",
      "프로덕트 아이디어 1장 작성",
    ],
    isOffline: true,
  },
  {
    week: 2,
    layer: "BUILD",
    layerColor: "text-blue-400",
    title: "프로덕트 프로토타입 제작",
    description: "Claude를 활용해 실제 동작하는 프로토타입을 만듭니다.",
    details: [
      "Claude Code로 웹/앱 프로토타입 제작",
      "노코드/로우코드 도구 활용법",
      "MVP 핵심 기능 구현",
    ],
    isOffline: false,
  },
  {
    week: 3,
    layer: "BUILD",
    layerColor: "text-blue-400",
    title: "프로덕트 완성 + 테스트",
    description: "프로토타입을 고도화하고, 사용자 테스트를 진행합니다.",
    details: [
      "프로덕트 디자인 개선 (AI 이미지 활용)",
      "기능 완성 및 버그 수정",
      "동료 크루 피드백 세션",
    ],
    isOffline: false,
  },
  {
    week: 4,
    layer: "CONNECT",
    layerColor: "text-green-400",
    title: "CRM 설계 · 자동화",
    description: "만든 프로덕트에 고객을 연결하는 시스템을 구축합니다.",
    details: [
      "CRM 채널 설계 (카카오, 이메일, 인스타)",
      "자동화 워크플로우 구축 (n8n)",
      "고객 여정 맵 작성",
    ],
    isOffline: false,
  },
  {
    week: 5,
    layer: "LAUNCH",
    layerColor: "text-yellow-400",
    title: "론칭 전략 + 랜딩페이지",
    description: "프로덕트를 세상에 내놓기 위한 모든 준비를 합니다.",
    details: [
      "랜딩페이지 제작 (AI 카피라이팅)",
      "홍보 전략 수립 (SNS, 커뮤니티)",
      "론칭 D-day 실행",
    ],
    isOffline: false,
  },
  {
    week: 6,
    layer: "REACT",
    layerColor: "text-red-400",
    title: "고객 반응 분석 · 개선",
    description: "실제 고객 데이터를 분석하고, 프로덕트를 개선합니다.",
    details: [
      "유입 데이터 분석 (GA, 자체 분석)",
      "고객 피드백 수집 및 분석",
      "A/B 테스트 · 개선 사이클",
    ],
    isOffline: false,
  },
  {
    week: 7,
    layer: "AMPLIFY",
    layerColor: "text-purple-400",
    title: "AI 비주얼 콘텐츠 제작",
    description: "AI로 브랜드 비주얼과 마케팅 콘텐츠를 대량 생산합니다.",
    details: [
      "AI 이미지 생성 (Midjourney, DALL-E 등)",
      "브랜드 비주얼 시스템 구축",
      "인스타그램/SNS 콘텐츠 제작",
    ],
    isOffline: false,
  },
  {
    week: 8,
    layer: "AMPLIFY",
    layerColor: "text-purple-400",
    title: "데모데이 + 숏폼 영상",
    description: "최종 결과물을 발표하고, 영상 콘텐츠로 확산합니다.",
    details: [
      "오프라인 데모데이 (프로젝트 발표)",
      "AI 숏폼 영상 제작 (릴스/틱톡)",
      "수료식 + 네트워킹",
    ],
    isOffline: true,
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add data/curriculum.ts
git commit -m "feat: add curriculum data file with 8-week schedule"
```

### Task 4: Create team-members data file

**Files:**
- Create: `data/team-members.ts`

- [ ] **Step 1: Create the team members data file**

```typescript
// data/team-members.ts
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initial: string; // text avatar fallback
}

export const teamMembers: TeamMember[] = [
  {
    name: "젬마 (신주혜)",
    role: "클럽장 · AI 마케팅 리드",
    bio: "셀피쉬클럽 대표. AI를 활용한 마케팅 자동화와 커뮤니티 운영의 전문가. 마케터가 AI로 더 이기적으로 일하는 세상을 만들고 있습니다.",
    initial: "G",
  },
  {
    name: "비비안",
    role: "커리큘럼 디자이너",
    bio: "교육 설계 전문가. 실무에서 바로 쓸 수 있는 커리큘럼을 설계하고, 크루들의 프로젝트가 실제 성과로 이어지도록 돕습니다.",
    initial: "V",
  },
  {
    name: "다니",
    role: "테크 리드 · 프로덕트 빌더",
    bio: "AI 프로덕트 개발 담당. Claude Code부터 자동화 워크플로우까지, 마케터가 기술의 벽 없이 만들 수 있도록 기술적 기반을 만듭니다.",
    initial: "D",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add data/team-members.ts
git commit -m "feat: add team-members data file"
```

### Task 5: Create membership-tiers data file

**Files:**
- Create: `data/membership-tiers.ts`

- [ ] **Step 1: Create the membership tiers data file**

```typescript
// data/membership-tiers.ts
export interface MembershipTier {
  name: string;
  subtitle: string;
  description: string;
  features: string[];
  highlight: boolean; // visually emphasize this tier
}

export const membershipTiers: MembershipTier[] = [
  {
    name: "Sponge Crew",
    subtitle: "기본 참여",
    description: "8주 풀 사이클 커리큘럼에 참여하는 기본 멤버십",
    features: [
      "8주 커리큘럼 전체 참여",
      "오프라인 킥오프 + 데모데이",
      "온라인 6회 세션",
      "Slack 커뮤니티 접근",
      "크루 전용 리소스 제공",
    ],
    highlight: false,
  },
  {
    name: "Core Sponge",
    subtitle: "선발 멤버",
    description: "심화 프로젝트 + 1:1 멘토링이 포함된 선발 멤버십",
    features: [
      "Sponge Crew 모든 혜택",
      "1:1 젬마 코칭 2회",
      "심화 프로젝트 피드백",
      "네트워킹 우선 참여",
      "수료 후 OB 1개월 무료",
    ],
    highlight: true,
  },
  {
    name: "OB Sponge",
    subtitle: "수료 후 멤버십",
    description: "수료 후 커뮤니티에 계속 참여하는 월 구독 멤버십",
    features: [
      "Slack 커뮤니티 유지",
      "월간 세미나 참여",
      "AI 워크숍/교육 50% 할인",
      "신규 기수 크루와 네트워킹",
      "포인트 시스템 계속 적립",
    ],
    highlight: false,
  },
  {
    name: "서포터즈",
    subtitle: "선발 홍보대사",
    description: "Sponge Club을 알리고 성장시키는 선발 홍보대사",
    features: [
      "과정 참여비 전액 지원",
      "Sponge Crew 모든 혜택",
      "SNS/블로그 콘텐츠 제작 미션",
      "클럽 운영 참여 기회",
      "수료 후 OB 3개월 무료",
    ],
    highlight: false,
  },
];

export interface AddOnOption {
  name: string;
  description: string;
  priceLabel: string;
}

export const addOnOptions: AddOnOption[] = [
  {
    name: "1:1 젬마 코칭권",
    description: "AI 마케팅 전략 또는 프로덕트 방향성에 대한 1:1 심층 코칭",
    priceLabel: "별도 문의",
  },
  {
    name: "VOD 단독 구매",
    description: "8주 커리큘럼 녹화 영상만 구매 (커뮤니티 미포함)",
    priceLabel: "별도 문의",
  },
  {
    name: "VOD + 멤버십 번들",
    description: "VOD 시청 + 3개월 OB 멤버십이 포함된 번들 패키지",
    priceLabel: "별도 문의",
  },
];

export interface PointGrade {
  name: string;
  minPoints: number;
  color: string;
  benefits: string[];
}

export const pointGrades: PointGrade[] = [
  { name: "Junior", minPoints: 0, color: "text-gray-400", benefits: ["기본 커뮤니티 접근"] },
  { name: "Sponge", minPoints: 100, color: "text-blue-400", benefits: ["기본 혜택 + 월간 세미나 무료"] },
  { name: "Super Sponge", minPoints: 300, color: "text-sponge-cyan", benefits: ["Sponge 혜택 + 워크숍 30% 할인"] },
  { name: "Golden Sponge", minPoints: 500, color: "text-sponge-gold", benefits: ["모든 혜택 + 신규 기수 할인 + VIP 네트워킹"] },
];
```

- [ ] **Step 2: Commit**

```bash
git add data/membership-tiers.ts
git commit -m "feat: add membership tiers and point system data"
```

### Task 6: Create shared Accordion component

**Files:**
- Create: `components/shared/Accordion.tsx`

- [ ] **Step 1: Create the Accordion component**

```tsx
// components/shared/Accordion.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="bg-sponge-card rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left"
          >
            <span className="font-bold text-white text-sm md:text-base pr-4">{item.title}</span>
            <ChevronDown
              size={20}
              className={`text-sponge-muted shrink-0 transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-5 pb-5 text-sponge-muted text-sm leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/Accordion.tsx
git commit -m "feat: add shared Accordion component"
```

### Task 7: Create shared ComingSoonPage component

**Files:**
- Create: `components/shared/ComingSoonPage.tsx`

- [ ] **Step 1: Create the ComingSoonPage component**

```tsx
// components/shared/ComingSoonPage.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock } from "lucide-react";

interface ComingSoonPageProps {
  title: string;
  description: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg"
      >
        <Clock className="w-12 h-12 text-sponge-cyan mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-sponge-muted mb-8">{description}</p>
        <Link
          href="/apply"
          className="inline-block bg-sponge-gold text-sponge-bg px-8 py-3 rounded-lg font-bold text-lg hover:brightness-110 transition"
        >
          사전 알림 신청하기
        </Link>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/ComingSoonPage.tsx
git commit -m "feat: add shared ComingSoonPage component"
```

### Task 8: Create shared SectionCTA component

**Files:**
- Create: `components/shared/SectionCTA.tsx`

- [ ] **Step 1: Create the SectionCTA component**

```tsx
// components/shared/SectionCTA.tsx
import Link from "next/link";

interface SectionCTAProps {
  text?: string;
  href?: string;
}

export default function SectionCTA({
  text = "사전 알림 신청하기",
  href = "/apply",
}: SectionCTAProps) {
  return (
    <div className="text-center mt-16">
      <Link
        href={href}
        className="inline-block bg-sponge-gold text-sponge-bg px-8 py-3 rounded-lg font-bold text-lg hover:brightness-110 transition"
      >
        {text}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/shared/SectionCTA.tsx
git commit -m "feat: add shared SectionCTA component"
```

---

## Chunk 2: Page Components + Routes

### Task 9: Create About page components + route

**Files:**
- Create: `components/about/BackStory.tsx`
- Create: `components/about/Philosophy.tsx`
- Create: `components/about/TeamMembers.tsx`
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create BackStory component**

```tsx
// components/about/BackStory.tsx
"use client";

import { motion } from "framer-motion";

export default function BackStory() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sponge-cyan text-sm font-mono mb-4">WHY SPONGE CLUB?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">왜 이 클럽이 필요한가</h2>
          <div className="space-y-6 text-sponge-muted leading-relaxed">
            <p>
              AI가 일상이 된 시대. 하지만 대부분의 마케터와 실무자에게 AI는 여전히
              &ldquo;써야 하는 것&rdquo;이지 &ldquo;쓰고 있는 것&rdquo;이 아닙니다.
            </p>
            <p>
              수많은 AI 교육이 있지만, 대부분은 &ldquo;도구 사용법&rdquo;에서 멈춥니다.
              정작 중요한 건 AI로 무언가를 만들고, 그것을 고객에게 전달하고,
              반응을 보고 개선하는 <span className="text-white font-bold">풀 사이클</span>인데 말이죠.
            </p>
            <p>
              Sponge Club은 이 간극을 채우기 위해 만들어졌습니다.
              혼자 배우는 게 아니라, 같은 고민을 하는 사람들과 함께
              실제 비즈니스 성과를 만들어가는 커뮤니티입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Philosophy component**

```tsx
// components/about/Philosophy.tsx
"use client";

import { motion } from "framer-motion";

const cycles = [
  { emoji: "🧽", label: "흡수", desc: "최신 AI 도구와 전략을 냅다 빨아들인다" },
  { emoji: "🗜️", label: "압축", desc: "핵심만 추려 실무에 맞게 가공한다" },
  { emoji: "💥", label: "방출", desc: "프로덕트를 만들어 세상에 냅다 내놓는다" },
  { emoji: "🔄", label: "반응", desc: "고객 반응을 보고 다시 흡수한다" },
];

export default function Philosophy() {
  return (
    <section className="py-20 px-4 bg-sponge-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            &ldquo;냅다&rdquo;의 철학
          </h2>
          <p className="text-sponge-muted max-w-2xl mx-auto">
            스폰지처럼 냅다 흡수하고, 냅다 만들고, 냅다 세상에 내놓는다.
            망설이지 않고 실행하는 것. 그것이 Sponge Club의 핵심입니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4">
          {cycles.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sponge-card rounded-xl p-6 text-center"
            >
              <div className="text-3xl mb-3">{c.emoji}</div>
              <h3 className="font-bold text-white mb-2">{c.label}</h3>
              <p className="text-sponge-muted text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create TeamMembers component**

```tsx
// components/about/TeamMembers.tsx
"use client";

import { motion } from "framer-motion";
import { teamMembers } from "@/data/team-members";

export default function TeamMembers() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">운영진 소개</h2>
          <p className="text-sponge-muted">Sponge Club을 만들고 이끄는 사람들</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sponge-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-sponge-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sponge-gold text-2xl font-bold">{member.initial}</span>
              </div>
              <h3 className="font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sponge-cyan text-sm mb-3">{member.role}</p>
              <p className="text-sponge-muted text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create About page route**

```tsx
// app/about/page.tsx
import { Metadata } from "next";
import BackStory from "@/components/about/BackStory";
import Philosophy from "@/components/about/Philosophy";
import TeamMembers from "@/components/about/TeamMembers";
import SectionCTA from "@/components/shared/SectionCTA";

export const metadata: Metadata = {
  title: "소개 — Sponge Club",
  description: "Sponge Club의 탄생 배경, 클럽 철학, 그리고 운영진을 소개합니다.",
};

export default function AboutPage() {
  return (
    <>
      <BackStory />
      <Philosophy />
      <TeamMembers />
      <SectionCTA />
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/about/ app/about/
git commit -m "feat: add About page with BackStory, Philosophy, TeamMembers"
```

### Task 10: Create Curriculum page components + route

**Files:**
- Create: `components/curriculum/LayerCards.tsx`
- Create: `components/curriculum/WeeklyTimeline.tsx`
- Create: `app/curriculum/page.tsx`

- [ ] **Step 1: Create LayerCards component**

```tsx
// components/curriculum/LayerCards.tsx
"use client";

import { motion } from "framer-motion";
import { layers } from "@/data/curriculum";

export default function LayerCards() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sponge-cyan text-sm font-mono mb-2">5 LAYERS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            8주, 풀 사이클 커리큘럼
          </h2>
          <p className="text-sponge-muted">흡수 → 빌드 → 연결 → 론칭 → 반응 → 전파</p>
        </div>

        <div className="grid gap-4">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sponge-card rounded-xl p-6 flex items-start gap-4"
            >
              <div className="text-3xl">{layer.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sponge-cyan text-xs font-mono">{layer.weeks}</span>
                  <span className={`font-bold text-lg ${layer.color}`}>{layer.name}</span>
                </div>
                <p className="text-white font-medium mb-1">{layer.label}</p>
                <p className="text-sponge-muted text-sm">{layer.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create WeeklyTimeline component**

```tsx
// components/curriculum/WeeklyTimeline.tsx
"use client";

import { motion } from "framer-motion";
import { weeklySchedule } from "@/data/curriculum";
import Accordion from "@/components/shared/Accordion";

export default function WeeklyTimeline() {
  const items = weeklySchedule.map((week) => ({
    title: `Week ${week.week} — ${week.title}${week.isOffline ? " 🏢 오프라인" : ""}`,
    content: (
      <div>
        <p className="mb-3">{week.description}</p>
        <ul className="list-disc list-inside space-y-1 text-sponge-muted text-sm">
          {week.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <section className="py-20 px-4 bg-sponge-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">주차별 상세 커리큘럼</h2>
          <p className="text-sponge-muted">오프라인 2회 (킥오프 + 데모데이) + 온라인 6회</p>
        </motion.div>

        <Accordion items={items} />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Curriculum page route**

```tsx
// app/curriculum/page.tsx
import { Metadata } from "next";
import LayerCards from "@/components/curriculum/LayerCards";
import WeeklyTimeline from "@/components/curriculum/WeeklyTimeline";
import SectionCTA from "@/components/shared/SectionCTA";

export const metadata: Metadata = {
  title: "커리큘럼 — Sponge Club",
  description: "8주 풀 사이클 커리큘럼. BUILD → CONNECT → LAUNCH → REACT → AMPLIFY 5단계로 AI 프로덕트를 만들고 론칭합니다.",
};

export default function CurriculumPage() {
  return (
    <>
      <LayerCards />
      <WeeklyTimeline />
      <SectionCTA />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/curriculum/ app/curriculum/
git commit -m "feat: add Curriculum page with LayerCards and WeeklyTimeline"
```

### Task 11: Create Membership page components + route

**Files:**
- Create: `components/membership/TierComparison.tsx`
- Create: `components/membership/PointSystem.tsx`
- Create: `components/membership/AddOnOptions.tsx`
- Create: `app/membership/page.tsx`

- [ ] **Step 1: Create TierComparison component**

```tsx
// components/membership/TierComparison.tsx
"use client";

import { motion } from "framer-motion";
import { membershipTiers } from "@/data/membership-tiers";
import { Check } from "lucide-react";

export default function TierComparison() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sponge-cyan text-sm font-mono mb-2">MEMBERSHIP</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">멤버십 티어</h2>
          <p className="text-sponge-muted">나에게 맞는 멤버십을 선택하세요</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {membershipTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-sponge-card rounded-xl p-6 ${
                tier.highlight ? "ring-2 ring-sponge-gold" : ""
              }`}
            >
              {tier.highlight && (
                <p className="text-sponge-gold text-xs font-bold mb-2">RECOMMENDED</p>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
              <p className="text-sponge-cyan text-sm mb-3">{tier.subtitle}</p>
              <p className="text-sponge-muted text-sm mb-4">{tier.description}</p>
              <ul className="space-y-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-sponge-text">
                    <Check size={14} className="text-sponge-gold shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create PointSystem component**

```tsx
// components/membership/PointSystem.tsx
"use client";

import { motion } from "framer-motion";
import { pointGrades } from "@/data/membership-tiers";

export default function PointSystem() {
  return (
    <section className="py-20 px-4 bg-sponge-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">이기적 공유 포인트</h2>
          <p className="text-sponge-muted">공유할수록 쌓이는 포인트. 등급이 올라갈수록 더 많은 혜택.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4">
          {pointGrades.map((grade, i) => (
            <motion.div
              key={grade.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sponge-card rounded-xl p-5 text-center"
            >
              <p className={`text-2xl font-bold mb-2 ${grade.color}`}>{grade.name}</p>
              <p className="text-sponge-muted text-xs mb-3">{grade.minPoints}P+</p>
              <ul className="space-y-1">
                {grade.benefits.map((b) => (
                  <li key={b} className="text-sponge-muted text-xs">{b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create AddOnOptions component**

```tsx
// components/membership/AddOnOptions.tsx
"use client";

import { motion } from "framer-motion";
import { addOnOptions } from "@/data/membership-tiers";

export default function AddOnOptions() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">별도 구매 옵션</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {addOnOptions.map((opt, i) => (
            <motion.div
              key={opt.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-sponge-card rounded-xl p-6"
            >
              <h3 className="font-bold text-white mb-2">{opt.name}</h3>
              <p className="text-sponge-muted text-sm mb-3">{opt.description}</p>
              <p className="text-sponge-gold text-sm font-bold">{opt.priceLabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Membership page route**

```tsx
// app/membership/page.tsx
import { Metadata } from "next";
import TierComparison from "@/components/membership/TierComparison";
import PointSystem from "@/components/membership/PointSystem";
import AddOnOptions from "@/components/membership/AddOnOptions";
import SectionCTA from "@/components/shared/SectionCTA";

export const metadata: Metadata = {
  title: "멤버십 — Sponge Club",
  description: "Sponge Club 멤버십 티어와 이기적 공유 포인트 시스템을 알아보세요.",
};

export default function MembershipPage() {
  return (
    <>
      <TierComparison />
      <PointSystem />
      <AddOnOptions />
      <SectionCTA />
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/membership/ app/membership/
git commit -m "feat: add Membership page with tiers, points, and add-ons"
```

### Task 12: Create Apply, Reviews, Demoday, FAQ pages

**Files:**
- Create: `app/apply/page.tsx`
- Create: `app/reviews/page.tsx`
- Create: `app/demoday/page.tsx`
- Create: `app/faq/page.tsx`

- [ ] **Step 1: Create Apply page**

```tsx
// app/apply/page.tsx
import { Metadata } from "next";
import PreRegisterSection from "@/components/pre-register/PreRegisterSection";

export const metadata: Metadata = {
  title: "사전 알림 신청 — Sponge Club",
  description: "Sponge Club 1기 오픈 알림을 가장 먼저 받아보세요. 간단한 설문과 함께 사전 등록하세요.",
};

export default function ApplyPage() {
  return <PreRegisterSection />;
}
```

- [ ] **Step 2: Create Reviews Coming Soon page**

```tsx
// app/reviews/page.tsx
import { Metadata } from "next";
import ComingSoonPage from "@/components/shared/ComingSoonPage";

export const metadata: Metadata = {
  title: "크루 후기 — Sponge Club",
  description: "Sponge Club 크루들의 생생한 후기와 성과 사례를 만나보세요.",
};

export default function ReviewsPage() {
  return (
    <ComingSoonPage
      title="크루 후기, 곧 만나요"
      description="1기 크루들의 생생한 후기와 성과 사례가 이곳에 채워집니다. 사전 알림을 신청하고 가장 먼저 만나보세요."
    />
  );
}
```

- [ ] **Step 3: Create Demoday Coming Soon page**

```tsx
// app/demoday/page.tsx
import { Metadata } from "next";
import ComingSoonPage from "@/components/shared/ComingSoonPage";

export const metadata: Metadata = {
  title: "데모데이 — Sponge Club",
  description: "Sponge Club 데모데이 결과물을 확인하세요.",
};

export default function DemodayPage() {
  return (
    <ComingSoonPage
      title="데모데이 결과물, 곧 공개됩니다"
      description="1기 크루들이 8주간 만든 프로젝트가 이곳에서 공개됩니다. 사전 알림을 신청하고 가장 먼저 확인하세요."
    />
  );
}
```

- [ ] **Step 4: Create FAQ page**

```tsx
// app/faq/page.tsx
import { Metadata } from "next";
import Accordion from "@/components/shared/Accordion";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "자주 묻는 질문 — Sponge Club",
  description: "Sponge Club에 대해 자주 묻는 질문과 답변을 확인하세요.",
};

export default function FAQPage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sponge-cyan text-sm font-mono mb-2">FAQ</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">자주 묻는 질문</h1>
          <p className="text-sponge-muted">궁금한 점이 있으신가요?</p>
        </div>

        <Accordion
          items={faqItems.map((item) => ({
            title: item.question,
            content: item.answer,
          }))}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add app/apply/ app/reviews/ app/demoday/ app/faq/
git commit -m "feat: add Apply, Reviews, Demoday (Coming Soon), and FAQ pages"
```

---

## Chunk 3: Update Existing Components

### Task 13: Update Navbar with all page links

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Replace Navbar with full navigation**

Replace the entire content of `components/layout/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "소개" },
  { href: "/curriculum", label: "커리큘럼" },
  { href: "/membership", label: "멤버십" },
  { href: "/reviews", label: "후기" },
  { href: "/demoday", label: "데모데이" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-sponge-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧽</span>
          <span className="font-bold text-lg text-white">Sponge Club</span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? "text-white font-medium"
                  : "text-sponge-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="text-sm bg-sponge-gold text-sponge-bg px-4 py-2 rounded-lg font-bold hover:brightness-110 transition"
          >
            사전 알림 신청
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-sponge-bg border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${
                pathname === link.href ? "text-white font-medium" : "text-sponge-muted"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="text-sm bg-sponge-gold text-sponge-bg px-4 py-2 rounded-lg font-bold text-center"
            onClick={() => setIsOpen(false)}
          >
            사전 알림 신청
          </Link>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: update Navbar with all page links and active state"
```

### Task 14: Update Footer with page links and more info

**Files:**
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Replace Footer with expanded version**

Replace the entire content of `components/layout/Footer.tsx`:

```tsx
import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "소개" },
  { href: "/curriculum", label: "커리큘럼" },
  { href: "/membership", label: "멤버십" },
  { href: "/faq", label: "FAQ" },
  { href: "/apply", label: "사전 알림 신청" },
];

export default function Footer() {
  return (
    <footer className="bg-sponge-bg border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧽</span>
              <span className="font-bold text-white">Sponge Club</span>
            </div>
            <p className="text-sponge-muted text-sm">
              냅다 흡수하고 · 냅다 만들고 · 냅다 세상에 내놓는다
            </p>
            <p className="text-sponge-muted text-xs mt-2">SELFISH CLUB presents</p>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-bold text-sm mb-3">바로가기</p>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sponge-muted text-sm hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-bold text-sm mb-3">문의</p>
            <div className="flex flex-col gap-2 text-sponge-muted text-sm">
              <a href="mailto:contact@selfishclub.xyz" className="hover:text-white transition">
                contact@selfishclub.xyz
              </a>
              <a
                href="https://instagram.com/selfishclub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Instagram @selfishclub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-sponge-muted/50 text-xs">
            © 2025 Selfish Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: update Footer with page links and contact info"
```

### Task 15: Update Home page — remove PreRegister, update CTAs

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/landing/Hero.tsx`

- [ ] **Step 1: Update Home page to remove PreRegisterSection and add CTA**

Replace `app/page.tsx`:

```tsx
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Curriculum from "@/components/landing/Curriculum";
import Target from "@/components/landing/Target";
import ComingSoon from "@/components/landing/ComingSoon";
import SectionCTA from "@/components/shared/SectionCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Curriculum />
      <Target />
      <SectionCTA text="🧽 사전 알림 신청하기" />
      <ComingSoon />
    </>
  );
}
```

- [ ] **Step 2: Update Hero CTA links**

In `components/landing/Hero.tsx`, change the anchor hrefs from `#pre-register` and `#curriculum` to proper route links.

Find and replace in the Hero component:
- Change `href="#pre-register"` to `href="/apply"`
- Change `href="#curriculum"` to `href="/curriculum"`
- Add `import Link from "next/link";` at top
- Replace the two `<a>` CTA tags with `<Link>` tags

The two CTA buttons become:

```tsx
<Link
  href="/apply"
  className="bg-sponge-gold text-sponge-bg px-8 py-3 rounded-lg font-bold text-lg hover:brightness-110 transition"
>
  사전 알림 신청하기
</Link>
<Link
  href="/curriculum"
  className="border border-sponge-gold text-sponge-gold px-8 py-3 rounded-lg font-bold text-lg hover:bg-sponge-gold/10 transition"
>
  커리큘럼 보기
</Link>
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx components/landing/Hero.tsx
git commit -m "feat: update Home page - remove inline PreRegister, add route links"
```

### Task 16: Build verification

- [ ] **Step 1: Run the build to verify no errors**

```bash
cd "/Users/songda-eun/Desktop/claude project/sponge club" && npm run build
```

Expected: Build succeeds with no errors. All new routes should appear in the build output.

- [ ] **Step 2: Run dev server and verify pages load**

```bash
npm run dev
```

Verify each route loads without errors:
- `/` — Home with updated CTA links
- `/about` — BackStory + Philosophy + TeamMembers
- `/curriculum` — LayerCards + WeeklyTimeline accordion
- `/membership` — TierComparison + PointSystem + AddOnOptions
- `/apply` — PreRegisterSection (existing survey)
- `/reviews` — Coming Soon page
- `/demoday` — Coming Soon page
- `/faq` — Accordion FAQ

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: build and runtime fixes for page expansion"
```
