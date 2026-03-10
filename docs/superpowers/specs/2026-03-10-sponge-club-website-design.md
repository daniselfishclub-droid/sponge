# Sponge Club 공식 사이트 설계서

> 기획서 v5.0 기반 · 2026-03-10

## 1. 사이트 역할

공식 사이트는 **외부용 허브 & 아카이브**. 커리큘럼 소개, 모집 공고, 크루 후기, 데모데이 결과물 아카이브를 제공하며 누구나 접근 가능. 내부 소통은 Slack에서 처리.

**핵심 전환 목표:** 방문자 → 1기 신청자

## 2. 사이트맵

```
spongeclub.xyz
├── / (홈)           — 히어로 + 클럽 소개 + 커리큘럼 요약 + CTA
├── /about           — 탄생 배경, 클럽 철학, 운영진 소개
├── /curriculum      — 8주 커리큘럼 상세 (Layer 1-5)
├── /membership      — 멤버십 티어, 가격, 별도 구매 옵션
├── /apply           — 1기 모집 신청서 (폼)
├── /reviews         — 크루 후기 & 성과 사례
├── /demoday         — 데모데이 결과물 아카이브
└── /faq             — 자주 묻는 질문
```

공통 요소: 상단 네비게이션 바, 하단 푸터 (셀피쉬클럽 링크, SNS, 문의)

## 3. 페이지별 상세 구성

### 3.1 홈 (`/`)

| 섹션 | 내용 |
|------|------|
| Hero | 로고, 슬로건("냅다 흡수하고·냅다 만들고·냅다 세상에 내놓는다"), CTA 버튼 2개(신청하기, 커리큘럼 보기), 모집 상태 뱃지 |
| Trust Bar | B2B 검증 기업 로고 나열 (네이버, 배민, 카카오, 클리오, 달바, 아모레퍼시픽) |
| Pain Point | 3개 인용문 카드 (기획서 내 타겟 고민 3가지) |
| 커리큘럼 요약 | 5단계 플로우 (BUILD→CONNECT→LAUNCH→REACT→AMPLIFY) 시각화 |
| 타겟 오디언스 | 3개 페르소나 카드 (마케터, 비즈니스, 고객접점) |
| 하단 CTA | "1기 크루 모집중" + 정원/기간 정보 + 신청 버튼 |

### 3.2 About (`/about`)

| 섹션 | 내용 |
|------|------|
| 탄생 배경 | 기획서 01장 내용 — 왜 이 클럽이 필요한가 |
| 클럽 철학 | 흡수→압축→방출→반응 사이클 설명 |
| "냅다"란 | 핵심 키워드 설명 섹션 |
| 이기적 공유 문화 | 공유 포인트 시스템 간략 소개 |
| 운영진 소개 | 젬마(신주혜), 비비안, 다니 — 이름, 역할, 한줄 소개, 프로필 이미지 |

### 3.3 커리큘럼 (`/curriculum`)

| 섹션 | 내용 |
|------|------|
| 개요 | 8주 풀사이클, 오프라인 2회 + 온라인 6회 |
| 5 Layer 시각화 | ABSORB/BUILD → CONNECT → LAUNCH → REACT → AMPLIFY 각 카드 |
| 주차별 타임라인 | Week 1~8 상세 내용 (아코디언 or 타임라인 UI) |
| 커리큘럼 철학 | "기존 AI 교육과 가장 큰 차이는 REACT 레이어" 강조 |
| CTA | 커리큘럼 하단에 신청 버튼 |

### 3.4 멤버십 (`/membership`)

| 섹션 | 내용 |
|------|------|
| 멤버십 티어 비교표 | Sponge Crew(기본) / Core Sponge(선발) / OB Sponge(수료후) / 서포터즈(선발) |
| 가격 정보 | 8주 과정 가격대 (30-50만원), OB 멤버십 월 구독료 |
| 별도 구매 옵션 | 1:1 젬마 코칭권, VOD 단독 구매, VOD+멤버십 번들 |
| 포인트 시스템 소개 | 이기적 공유 포인트 + 등급별 혜택 (Junior→Sponge→Super→Golden) |
| 크루 전용 혜택 | AI 워크숍 & 교육 50% 할인 |
| CTA | 신청하기 버튼 |

### 3.5 신청 (`/apply`)

| 섹션 | 내용 |
|------|------|
| 모집 상태 | 현재 기수, 정원, 마감일 |
| 신청 폼 | 이름, 이메일, 현재 직무, 프로덕트 아이디어 1장, 참여 동기 |
| 안내 | 선발 프로세스, 일정, 비용 안내 |

폼 데이터는 Supabase에 저장.

### 3.6 크루 후기 (`/reviews`)

| 섹션 | 내용 |
|------|------|
| 후기 카드 리스트 | 크루 이름, 기수, 후기 텍스트, 성과 요약 |
| 필터 | 기수별 필터 (1기가 쌓이면 활성화) |

초기에는 셀피쉬 크루 파일럿 후기로 시작. Supabase에서 데이터 관리.

### 3.7 데모데이 (`/demoday`)

| 섹션 | 내용 |
|------|------|
| 갤러리 | 크루 프로젝트 카드 (제목, 크루명, 썸네일, 한줄 소개) |
| 상세 | 클릭 시 프로젝트 설명, 스크린샷, 링크 |
| 필터 | 기수별 |

1기 데모데이 이후 콘텐츠 채워짐. 초기엔 "곧 만나요" 플레이스홀더.

### 3.8 FAQ (`/faq`)

아코디언 형태. 예상 질문:
- AI를 전혀 모르는데 참여 가능한가요?
- 코딩을 할 줄 몰라도 되나요?
- 오프라인 세션은 어디서 진행되나요?
- 수료 후에도 커뮤니티에 남을 수 있나요?
- VOD만 구매할 수 있나요?
- 환불 정책은?

## 4. 디자인 방향

### 컬러 팔레트

| 용도 | 색상 | 코드 |
|------|------|------|
| 배경 (메인) | 딥 네이비/블랙 | `#0a0a1a` |
| 배경 (카드) | 다크 네이비 | `#1a1a2e` |
| 포인트 (CTA, 강조) | 골드 옐로우 | `#ffd700` |
| 보조 포인트 | 시안/민트 | `#64ffda` |
| 텍스트 (메인) | 화이트 | `#e0e0e0` |
| 텍스트 (보조) | 그레이 | `#888888` |

### 톤 & 무드

- **다크 모드 기반** — 프리미엄, 테크, AI 커뮤니티 느낌
- **스폰지 모티프** — 로고, 아이콘에 스폰지 요소 활용
- **"냅다" 에너지** — 대담한 타이포그래피, 강렬한 CTA
- 셀피쉬클럽 브랜딩과 연결되되 독립적인 아이덴티티

### 타이포그래피

- 한글: Pretendard 또는 Noto Sans KR
- 영문: Inter 또는 Poppins
- 헤드라인: Bold/Black weight, 크게
- 본문: Regular, 가독성 중심

### 반응형

- 모바일 퍼스트 (타겟이 실무자 → 모바일 유입 높음)
- 브레이크포인트: 모바일(~768px), 태블릿(769~1024px), 데스크톱(1025px~)

## 5. 기술 스택

| 구성 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | Next.js 14+ (App Router) | SSG로 빠른 로딩, SEO 최적화, Claude Code 개발 적합 |
| 스타일링 | Tailwind CSS | 다크 테마 구현 용이, 빠른 프로토타이핑 |
| DB | Supabase | 기존 인프라 활용. 신청 폼, 후기, 데모데이 데이터 |
| 배포 | Vercel | Next.js 최적 호스팅, 무료 티어로 시작 |
| 애니메이션 | Framer Motion | 스크롤 애니메이션, 페이지 전환 |
| 아이콘 | Lucide React | 경량, 일관된 아이콘 세트 |
| 폰트 | Google Fonts (Pretendard/Noto Sans KR + Inter) | 무료, CDN |

### 프로젝트 구조

```
sponge-club/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (Nav + Footer)
│   ├── page.tsx            # 홈
│   ├── about/page.tsx
│   ├── curriculum/page.tsx
│   ├── membership/page.tsx
│   ├── apply/page.tsx
│   ├── reviews/page.tsx
│   ├── demoday/page.tsx
│   └── faq/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── PainPoints.tsx
│   │   ├── CurriculumPreview.tsx
│   │   ├── TargetAudience.tsx
│   │   └── BottomCTA.tsx
│   ├── curriculum/
│   │   ├── LayerCards.tsx
│   │   └── WeeklyTimeline.tsx
│   ├── membership/
│   │   ├── TierComparison.tsx
│   │   ├── PointSystem.tsx
│   │   └── AddOnOptions.tsx
│   ├── apply/
│   │   └── ApplicationForm.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Accordion.tsx
│       └── Badge.tsx
├── lib/
│   └── supabase.ts         # Supabase 클라이언트
├── public/
│   └── images/             # 로고, 운영진 사진 등
├── tailwind.config.ts
└── package.json
```

## 6. Supabase 테이블 (초기)

### `applications` — 신청 폼

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| name | text | 이름 |
| email | text | 이메일 |
| job_title | text | 현재 직무 |
| product_idea | text | 프로덕트 아이디어 |
| motivation | text | 참여 동기 |
| cohort | int | 기수 (1) |
| status | text | 접수/검토중/합격/불합격 |
| created_at | timestamp | 신청일 |

### `reviews` — 크루 후기

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| crew_name | text | 크루 이름 |
| cohort | int | 기수 |
| content | text | 후기 내용 |
| achievement | text | 성과 요약 |
| is_published | boolean | 공개 여부 |
| created_at | timestamp | 작성일 |

### `demoday_projects` — 데모데이 프로젝트

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid | PK |
| title | text | 프로젝트명 |
| crew_name | text | 크루 이름 |
| cohort | int | 기수 |
| description | text | 프로젝트 설명 |
| thumbnail_url | text | 썸네일 URL |
| project_url | text | 프로젝트 링크 |
| created_at | timestamp | 등록일 |

## 7. MVP 범위 (초안)

**포함 (Phase 1):**
- 홈페이지 (모든 섹션)
- About 페이지
- 커리큘럼 페이지
- 멤버십 페이지
- 신청 폼 (Supabase 연동)
- FAQ 페이지
- 반응형 (모바일/데스크톱)
- SEO 메타태그

**후순위 (Phase 2 — 1기 운영 후):**
- 크루 후기 페이지 (실제 후기 생긴 후)
- 데모데이 아카이브 (데모데이 이후)
- 포인트 시스템 대시보드
- OB 멤버십 결제 연동

## 8. 필요 에셋

| 에셋 | 상태 | 비고 |
|------|------|------|
| 로고 (Sponge Club) | 필요 | 스폰지 모티프 로고 제작 필요 |
| 운영진 프로필 사진 | 필요 | 젬마, 비비안, 다니 |
| B2B 기업 로고 | 필요 | 네이버, 배민, 카카오 등 (사용 허가 확인) |
| OG 이미지 | 필요 | SNS 공유용 미리보기 이미지 |
| 파비콘 | 필요 | 스폰지 아이콘 |

로고가 없는 경우 텍스트 로고(🧽 Sponge Club)로 시작하고 추후 교체 가능.
