# Sponge Club 사이트 페이지 확장 설계서

> 프리런칭 단계 · 2026-03-14

## 1. 목적

프리런칭 단계의 Sponge Club 사이트를 홈 랜딩 페이지에서 **풀 정보 사이트**로 확장한다. 핵심 전환 목표는 방문자 → 사전등록 신청자이며, 교육과정/멤버십/FAQ 등의 정적 정보를 통해 신뢰도를 높인다.

## 2. 스코프

**포함:**
- 7개 새 페이지: About, Curriculum, Membership, Apply, Reviews(Coming Soon), Demoday(Coming Soon), FAQ
- Navbar/Footer 개선 (전체 페이지 링크, 모바일 메뉴)
- 정적 데이터 파일 분리
- 기존 사전등록 서베이를 /apply 페이지로 이동

**미포함 (후속 서브 프로젝트):**
- 카카오 로그인/인증
- 블로그 시스템
- 챌린지 시스템
- CMS 연동

## 3. 사이트맵

```
spongeclub.xyz
├── /                 ← 홈 (기존, Navbar/Footer 개선)
├── /about            ← 탄생 배경, 클럽 철학, 운영진 소개
├── /curriculum       ← 8주 커리큘럼 상세 (5 Layer)
├── /membership       ← 멤버십 티어, 가격, 포인트 시스템
├── /apply            ← 사전등록 서베이 (기존 PreRegister 이동)
├── /reviews          ← Coming Soon 플레이스홀더
├── /demoday          ← Coming Soon 플레이스홀더
└── /faq              ← 아코디언 FAQ
```

홈에서 PreRegisterSection을 제거하고 CTA 버튼으로 /apply 링크.

## 4. 컴포넌트 구조

```
components/
├── layout/
│   ├── Navbar.tsx        ← 수정: 전체 페이지 링크, 모바일 햄버거 메뉴
│   └── Footer.tsx        ← 수정: SNS 링크, 문의 정보 추가
├── landing/              ← 기존 홈 컴포넌트 (유지)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Curriculum.tsx
│   ├── Target.tsx
│   └── ComingSoon.tsx
├── about/
│   ├── BackStory.tsx       ← 탄생 배경 섹션
│   ├── Philosophy.tsx      ← 클럽 철학 + "냅다"란
│   └── TeamMembers.tsx     ← 운영진 소개 카드 (젬마, 비비안, 다니)
├── curriculum/
│   ├── LayerCards.tsx      ← BUILD→CONNECT→LAUNCH→REACT→AMPLIFY 5단계 카드
│   └── WeeklyTimeline.tsx  ← Week 1-8 아코디언 타임라인
├── membership/
│   ├── TierComparison.tsx  ← 4개 티어 비교표 (Crew/Core/OB/서포터즈)
│   ├── PointSystem.tsx     ← 이기적 공유 포인트 등급 시스템
│   └── AddOnOptions.tsx    ← 별도 구매 (1:1 코칭, VOD, 번들)
├── apply/
│   └── ApplicationForm.tsx ← 기존 PreRegister 컴포넌트 리팩터
├── shared/
│   ├── ComingSoonPage.tsx  ← Reviews/Demoday 공통 플레이스홀더
│   └── Accordion.tsx       ← FAQ + 커리큘럼 공용 아코디언
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    └── Badge.tsx
```

## 5. 데이터 구조

프리런칭이므로 콘텐츠는 코드 내 정적 파일로 관리. 나중에 CMS 전환 시 data 레이어만 교체.

```
data/
├── survey-questions.ts     ← 기존 (유지)
├── curriculum.ts           ← 8주 커리큘럼 데이터 (주차, 제목, 설명, Layer 매핑)
├── team-members.ts         ← 운영진 정보 (이름, 역할, 한줄 소개)
├── membership-tiers.ts     ← 4개 티어 비교 데이터 + 별도 구매 옵션
├── faq.ts                  ← FAQ 질문/답변 배열
└── site-config.ts          ← 모집 상태, 현재 기수, 가격, 마감일 등
```

Supabase는 기존 사전등록 수집(`pre_registrations` 테이블)에만 사용. 변경 없음.

## 6. 디자인 시스템

기존 설계서(2026-03-10)의 디자인 방향을 그대로 적용.

### 컬러 팔레트
| 용도 | 코드 |
|------|------|
| 배경 (메인) | `#0a0a1a` |
| 배경 (카드) | `#1a1a2e` |
| 포인트 (CTA) | `#ffd700` |
| 보조 포인트 | `#64ffda` |
| 텍스트 (메인) | `#e0e0e0` |
| 텍스트 (보조) | `#888888` |

### 타이포그래피
- 한글: Pretendard / Noto Sans KR
- 영문: Inter
- 헤드라인: Bold/Black weight

### 반응형
- 모바일 퍼스트 (768px / 1024px 브레이크포인트)

### 공통 UI 패턴
- CTA 버튼: 골드 배경, 라운드, hover 밝아짐 — 모든 페이지 하단
- 섹션 레이아웃: max-w-6xl, py-20
- 카드: 다크 네이비 배경, 골드/시안 포인트
- 아코디언: FAQ + 커리큘럼 공용
- 애니메이션: Framer Motion fade-in + hover scale

## 7. 페이지별 상세

### 7.1 홈 (`/`) — 수정
- PreRegisterSection 제거, 하단 CTA에서 /apply로 링크
- Navbar에 전체 페이지 링크 추가

### 7.2 About (`/about`)
- BackStory: 기획서 01장 — 왜 이 클럽이 필요한가
- Philosophy: 흡수→압축→방출→반응 사이클 + "냅다"란
- TeamMembers: 운영진 3인 카드 (프로필 이미지 없으면 텍스트 아바타)

### 7.3 Curriculum (`/curriculum`)
- LayerCards: 5단계 플로우 시각화 (ABSORB/BUILD → CONNECT → LAUNCH → REACT → AMPLIFY)
- WeeklyTimeline: Week 1-8 아코디언 (클릭 시 상세 내용 펼침)
- 하단 CTA: /apply 링크

### 7.4 Membership (`/membership`)
- TierComparison: 4개 티어 카드/표 (Sponge Crew, Core Sponge, OB Sponge, 서포터즈)
- PointSystem: 등급별 혜택 (Junior→Sponge→Super→Golden)
- AddOnOptions: 1:1 코칭, VOD 단독, VOD+멤버십 번들
- 하단 CTA: /apply 링크

### 7.5 Apply (`/apply`)
- 기존 PreRegister 컴포넌트 재활용 (서베이 5문항 + 이메일 수집)
- 페이지 상단에 모집 상태/기수/마감 정보 표시

### 7.6 Reviews (`/reviews`)
- ComingSoonPage 컴포넌트: "1기 크루의 생생한 후기, 곧 만나요" + 사전등록 CTA

### 7.7 Demoday (`/demoday`)
- ComingSoonPage 컴포넌트: "1기 데모데이 결과물, 곧 공개됩니다" + 사전등록 CTA

### 7.8 FAQ (`/faq`)
- Accordion 컴포넌트로 6개 질문/답변 렌더링
- 질문: AI 초보 가능 여부, 코딩 필요 여부, 오프라인 장소, 수료 후 커뮤니티, VOD 구매, 환불 정책

## 8. 기술 스택

변경 없음. 기존 스택 유지:
- Next.js (App Router) + Tailwind CSS + Framer Motion
- Supabase (사전등록 데이터만)
- Vercel 배포
- Lucide React (아이콘)
