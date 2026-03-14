# 🧽 클로드 코드로 웹사이트 만들고 배포하기 — Sponge Club 빌드 일지

> **비개발자가 Claude Code만으로 AI 마케터 커뮤니티 사이트를 만들고 Vercel에 배포한 전체 과정**
>
> 작성일: 2026-03-14

---

## 📖 목차

1. [시작하기 전에 — 이 글의 대상](#시작하기-전에)
2. [마켓플레이스 vs 플러그인 vs 스킬 — 뭐가 다른 거야?](#마켓플레이스-vs-플러그인-vs-스킬)
3. [플러그인 & 스킬 설치하는 3가지 방법](#설치-방법)
4. [스킬 사용법 — `/`로 소환하기](#스킬-사용법)
5. [Sponge Club 프로젝트 전체 타임라인](#프로젝트-타임라인)
6. [Phase 1: 기획 — 요구사항을 구체화하기](#phase-1-기획)
7. [Phase 2: 디자인 — 네온 펑크 에너지](#phase-2-디자인)
8. [Phase 3: 구현 — 랜딩 페이지 만들기](#phase-3-구현)
9. [Phase 4: 배포 — GitHub → Vercel](#phase-4-배포)
10. [삽질 기록 & 해결법](#삽질-기록)
11. [사용한 스킬 & 플러그인 총정리](#사용한-도구-정리)

---

<a id="시작하기-전에"></a>
## 🙋 시작하기 전에 — 이 글의 대상

- **코딩을 잘 몰라도** 괜찮아요
- **Claude Code**(클로드 코드)를 사용해본 적 있거나, 막 시작하려는 분
- "AI로 웹사이트를 만들 수 있다는데, 진짜 어디까지 되는 거야?" 궁금한 분
- 플러그인? 스킬? MCP? 용어가 헷갈리는 분

이 글은 **실제 프로젝트를 처음부터 배포까지 진행한 과정**을 그대로 기록한 글이에요. 어려웠던 부분, 삽질한 부분도 솔직하게 담았어요.

---

<a id="마켓플레이스-vs-플러그인-vs-스킬"></a>
## 🧩 마켓플레이스 vs 플러그인 vs 스킬 — 뭐가 다른 거야?

Claude Code를 쓰다 보면 "플러그인", "스킬", "마켓플레이스"라는 단어가 자주 나와요. 처음엔 진짜 헷갈립니다. 정리하면 이래요:

### 마켓플레이스 (Marketplace)

> **스킬과 플러그인을 모아놓은 앱스토어 같은 곳**

- Claude Code 안에서 `/` 를 누르면 볼 수 있어요
- 공식적으로 검증된 도구들이 모여 있어요
- 여기서 바로 설치할 수도 있어요

### 플러그인 (Plugin)

> **여러 개의 스킬을 묶어놓은 패키지** (폴더처럼 생각하면 돼요)

- 하나의 플러그인 안에 여러 스킬이 들어있어요
- 예시: `superpowers` 플러그인 → 안에 `brainstorming`, `debugging`, `writing-plans` 등 여러 스킬이 포함
- 예시: `clarify` 플러그인 → 안에 `vague`, `unknown`, `metamedium` 스킬이 포함
- GitHub 저장소 형태로 배포돼요

### 스킬 (Skill)

> **Claude Code에게 특정 능력을 부여하는 개별 기능**

- 플러그인 안의 개별 기능 하나하나가 스킬
- `/스킬이름` 으로 소환해서 사용해요
- 예시: `/clarify:vague` → 애매한 요구사항을 구체화하는 질문을 해줌
- 예시: `/frontend-design` → 고퀄리티 디자인으로 프론트엔드를 만들어줌

### 한눈에 비교

| | 마켓플레이스 | 플러그인 | 스킬 |
|---|---|---|---|
| 비유 | 앱스토어 | 앱 번들 (모음집) | 개별 앱 |
| 설치 단위 | - | 플러그인 단위로 설치 | 플러그인 안에 포함됨 |
| 사용 방법 | 검색 & 설치 | GitHub URL로 설치 | `/이름`으로 소환 |
| 예시 | Claude Code 내 스킬 탭 | superpowers, clarify | brainstorming, vague |

---

<a id="설치-방법"></a>
## 📥 플러그인 & 스킬 설치하는 3가지 방법

### 방법 1: Claude Code UI에서 설치 (가장 쉬움 ✅)

```
Claude Code 실행 → 좌측 하단 '+' 버튼 → '플러그인' → '플러그인 추가'
```

1. Claude Code를 열어요
2. 좌측 하단의 **`+` 버튼**을 눌러요
3. **"플러그인"** 항목을 선택해요
4. **"플러그인 추가"** 를 눌러요
5. 마켓플레이스에서 원하는 플러그인을 검색하고 설치!

> 💡 **Tip**: 이게 제일 간단한 방법이에요. 마켓플레이스에 있는 건 이렇게 설치하세요.

### 방법 2: GitHub URL을 Claude Code에게 직접 전달

마켓플레이스에 없는 플러그인이나, GitHub에서 발견한 플러그인을 설치할 때:

```
나: "https://github.com/obra/superpowers 이거 설치해줘"
```

이렇게 **GitHub URL을 그대로 채팅창에 붙여넣고 "설치해줘"** 라고 하면 됩니다.

Claude Code가 알아서:
1. 저장소를 클론하고
2. 필요한 파일을 `.claude/` 폴더에 복사하고
3. 설정을 잡아줍니다

> ⚠️ **내가 겪은 문제**: 처음에 `npx skills add` 명령어로 설치하려고 했는데, 명령어가 **무한 로딩**에 빠져서 진행이 안 됐어요. 결국 Claude Code가 직접 `git clone`으로 저장소를 복제한 뒤 수동으로 파일을 복사하는 방식으로 해결했어요.

### 방법 3: npx skills 명령어 (터미널)

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

터미널에서 직접 실행하는 방법이에요. 특정 스킬만 골라서 설치할 수 있어요.

> ⚠️ 이 방법은 가끔 타임아웃이 나거나 응답이 안 올 수 있어요. 그럴 땐 **방법 2**를 추천!

### 설치 확인하기

설치가 완료되면 프로젝트 안에 이런 구조가 생겨요:

```
프로젝트/
└── .claude/
    └── skills/
        └── frontend-design/
            ├── SKILL.md      ← 스킬의 "설명서"
            └── LICENSE.txt
```

---

<a id="스킬-사용법"></a>
## ⚡ 스킬 사용법 — `/`로 소환하기

설치한 스킬을 사용하는 건 정말 간단해요!

### 기본 소환법

채팅창에 `/`를 입력하면 사용 가능한 스킬 목록이 나와요:

```
/clarify:vague          → 애매한 요구사항 구체화
/superpowers:brainstorming   → 기능 브레인스토밍
/frontend-design        → 고퀄리티 프론트엔드 디자인
```

### 실제 사용 예시

**1단계: 요구사항 구체화** (`/clarify:vague`)
```
나: /clarify:vague
나: AI 마케터 교육 커뮤니티 사이트를 만들고 싶어.
    교육, 블로그, 리뷰, 챌린지, 설문조사, 카카오 로그인이 필요해.

Claude: 8개의 객관식 질문으로 요구사항을 명확하게 정리해줌
        → 사전 등록 랜딩 vs 풀 사이트?
        → 라이브 세션 vs 녹화?
        → 결제 시스템 필요?
        → ...등등
```

**2단계: 브레인스토밍** (`/superpowers:brainstorming`)
```
나: /superpowers:brainstorming
나: 위 요구사항 전체 반영해서 구현하고 싶어

Claude: 전체 프로젝트 구조와 기능을 브레인스토밍
        → 3단계 Phase로 나눠서 구현 계획 수립
        → Phase 1: 사전 등록 랜딩 페이지
        → Phase 2: 상세 페이지 (About, Curriculum, Reviews, FAQ)
        → Phase 3: 핵심 기능 (카카오 로그인, 블로그, 챌린지)
```

**3단계: 디자인 방향 결정** (`frontend-design` 스킬)
```
나: 디자인에 대해 논의하고 싶어
나: frontend-design 스킬 설치해줘

Claude: frontend-design 스킬을 활용해 3개 디자인 방향 제안 (ASCII 프리뷰 포함)
        → A. 네온 펑크 에너지 ✅ (선택)
        → B. 오가닉 그로우스
        → C. 미니멀 프로페셔널
```

**4단계: 구현** (스킬이 자동으로 적용됨)
```
나: 일단 여기까지 만들어줘

Claude: frontend-design 스킬을 활용해서
        → 컴포넌트 설계
        → 디자인 시스템 구축
        → 코드 작성
        → 실시간 프리뷰 확인
```

> 💡 **핵심**: 스킬은 **한번 설치하면 Claude Code가 알아서 적절한 타이밍에 활용**해요. `/`로 명시적으로 소환할 수도 있고, 관련 작업을 하면 자동으로 적용되기도 해요.

---

<a id="프로젝트-타임라인"></a>
## 🗺️ Sponge Club 프로젝트 전체 타임라인

```
📋 요구사항 정리     →  🧠 브레인스토밍     →  🎨 디자인 결정     →  💻 코드 구현     →  🚀 배포
   /clarify:vague       /brainstorming       frontend-design       frontend-design       GitHub + Vercel
   (10분)               (10분)               (15분)               (30분)                  (5분)
```

**총 소요 시간: 약 1시간 10분** (삽질 시간 제외)

---

<a id="phase-1-기획"></a>
## Phase 1: 기획 — 요구사항을 구체화하기

### 처음에 내가 가진 건 이것뿐이었어요:

> "AI 마케터 교육 커뮤니티인 '스펀지 클럽'을 만들고 싶어.
> 교육 코스, 블로그, 리뷰, 챌린지, 설문조사, 카카오 로그인이 필요해."

이걸로 바로 코드를 짜면? → 중간에 백번 뒤집어엎게 됩니다 😅

### `/clarify:vague` 스킬로 요구사항 명확하게 만들기

이 스킬을 사용하면 Claude가 **8개의 객관식 질문**을 던져서, 애매했던 부분을 하나씩 잡아줘요:

| 질문 | 내가 선택한 답 |
|---|---|
| 사전 등록 vs 풀 런칭? | **사전 등록 랜딩** (먼저 만들고 확장) |
| 교육 형태? | **라이브 세션 + 과제** (8주 프로그램) |
| 결제 방식? | **개별 코스 결제** (나중에 구현) |
| 기술 스택? | **Next.js + Supabase** |
| 챌린지 타입? | **미션 기반 + 레벨/뱃지 시스템** 둘 다 |
| 블로그 작성자? | **관리자 + 멤버** 모두 가능 |
| 설문 내용? | **관심 분야 + 기대사항** |
| 톤앤매너? | **친근하고 에너지 넘치는** 느낌 |

이 과정을 거치니까 "뭘 만들어야 하는지"가 확 명확해졌어요.

---

<a id="phase-2-디자인"></a>
## Phase 2: 디자인 — 네온 펑크 에너지

### `frontend-design` 스킬 설치

Anthropic 공식 스킬 저장소에서 프론트엔드 디자인 전문 스킬을 설치했어요:

```
나: npx skills add https://github.com/anthropics/skills --skill frontend-design 설치해줘
```

> ⚠️ 여기서 npx 명령어가 무한 로딩에 빠졌어요. Claude Code가 직접 `git clone`으로 해결!

### 3가지 디자인 방향 제안

`frontend-design` 스킬을 설치한 뒤 디자인 논의를 시작하니까 Claude가 3가지 디자인 콘셉트를 제안했어요:

**A. 네온 펑크 에너지 (Neon Punk Energy)** ✅ 선택!
- 다크 네이비 배경
- 네온 골드 & 사이안 글로우 효과
- 글래스모피즘 카드
- 파티클 애니메이션

**B. 오가닉 그로우스**
- 자연 친화적 톤
- 부드러운 그라디언트

**C. 미니멀 프로페셔널**
- 깔끔한 화이트 기반
- 비즈니스 톤

### 선택한 디자인 시스템

```
🎨 컬러 팔레트
━━━━━━━━━━━━━━━━━━━━━━━━━━━
배경:     다크 네이비 (#0a0e1a)
메인:     네온 골드 (#fbbf24)
포인트:   사이안 (#22d3ee)
액센트:   코랄 (#f97316)

🔤 폰트
━━━━━━━━━━━━━━━━━━━━━━━━━━━
타이틀:   Outfit (영문)
모노:     Space Mono (라벨)
본문:     Pretendard (한글)

✨ 이펙트
━━━━━━━━━━━━━━━━━━━━━━━━━━━
글래스모피즘:  backdrop-blur + 반투명 테두리
네온 글로우:   text-shadow & box-shadow
메쉬 그라디언트: 배경 효과
파티클 시스템:  Framer Motion 애니메이션
```

---

<a id="phase-3-구현"></a>
## Phase 3: 구현 — 랜딩 페이지 만들기

### 기술 스택

| 영역 | 기술 | 역할 |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) | 페이지 라우팅 & SSR |
| UI | React 19 + Tailwind CSS 4 | 컴포넌트 & 스타일링 |
| 애니메이션 | Framer Motion | 인터랙션 효과 |
| 백엔드 | Supabase | DB & 인증 (추후) |
| 아이콘 | Lucide React | 아이콘 시스템 |

### 만들어진 페이지 구성

Claude Code가 만든 랜딩 페이지의 전체 섹션:

```
┌─────────────────────────────────┐
│  🧭 Navbar (스크롤 시 블러 효과)   │
├─────────────────────────────────┤
│                                 │
│  🌟 Hero Section                │
│  "AI 마케터의 성장은              │
│   스펀지처럼 빨라야 하니까"        │
│  [사전 등록하기] [커리큘럼 보기]    │
│  ✨ 파티클 애니메이션 배경         │
│  📊 실시간 대기 인원 카운터        │
│                                 │
├─────────────────────────────────┤
│  😰 Pain Points (공감 섹션)       │
│  "이런 고민, 있지 않나요?"         │
│  글래스 카드 4개                  │
│  + 신뢰 기업 바                  │
├─────────────────────────────────┤
│  📚 Curriculum (8주 커리큘럼)      │
│  타임라인 레이아웃                 │
│  네온 컬러로 구분된 5단계           │
├─────────────────────────────────┤
│  🎯 Target (이런 분을 찾아요)      │
│  3개 페르소나 글래스 카드           │
├─────────────────────────────────┤
│  📝 Pre-Register (사전 등록)       │
│  6단계 설문 + 회원가입 폼          │
│  글로우 프로그레스 바              │
├─────────────────────────────────┤
│  🔮 Coming Soon (예정 기능)       │
│  블로그, 챌린지, 리뷰 미리보기     │
├─────────────────────────────────┤
│  🦶 Footer                      │
│  골드 그라디언트 액센트 라인        │
└─────────────────────────────────┘
```

### 만들어진 파일들

```
app/
├── globals.css          ← 디자인 시스템 (컬러, 폰트, 유틸리티 클래스)
├── layout.tsx           ← 루트 레이아웃
└── page.tsx             ← 메인 페이지

components/
├── landing/
│   ├── Hero.tsx         ← 히어로 섹션 (파티클 + 카운터)
│   ├── About.tsx        ← 공감 포인트 섹션
│   ├── Curriculum.tsx   ← 8주 커리큘럼 타임라인
│   ├── Target.tsx       ← 타겟 고객 카드
│   └── ComingSoon.tsx   ← 예정 기능
├── pre-register/
│   ├── PreRegisterSection.tsx  ← 사전 등록 컨테이너
│   ├── SurveyStep.tsx          ← 설문 질문 UI
│   ├── SignupForm.tsx           ← 회원가입 폼
│   └── SuccessMessage.tsx       ← 완료 메시지
└── layout/
    ├── Navbar.tsx       ← 스크롤 반응형 네비게이션
    └── Footer.tsx       ← 푸터
```

---

<a id="phase-4-배포"></a>
## Phase 4: 배포 — GitHub → Vercel

### Step 1: GitHub 계정 준비

아직 GitHub 계정이 없다면:
1. [github.com](https://github.com) 접속
2. **Sign up** → 이메일, 비밀번호 설정
3. 가입 완료!

### Step 2: GitHub 저장소 만들기

1. [github.com/new](https://github.com/new) 접속 (로그인 상태에서)
2. **Repository name**: `sponge` 입력 (원하는 이름으로)
3. **Private** 선택 (비공개로 시작하는 게 안전해요)
4. ⚠️ **나머지는 아무것도 체크하지 마세요!** (README, .gitignore 등 전부 체크 해제)
   - 이미 로컬에 코드가 있으니까, 빈 저장소로 만들어야 해요
5. **Create repository** 클릭

### Step 3: Claude Code에서 코드 푸시하기

GitHub 저장소를 만들었으면, **Claude Code 채팅창**에서 이렇게 말하면 끝:

```
나: GitHub에 저장소 만들었어. 이름은 sponge, 계정은 daniselfishclub-droid
```

그러면 Claude Code가 알아서 실행해요:
```bash
# 1. GitHub 저장소를 연결하고
$ git remote add origin https://github.com/daniselfishclub-droid/sponge.git

# 2. 코드를 올림
$ git push -u origin main
→ 푸시 완료!
```

> 💡 **포인트**: 터미널을 직접 열 필요 없이, Claude Code한테 말하기만 하면 돼요!
>
> ⚠️ GitHub 인증이 안 되어 있으면 처음 한 번은 맥 터미널에서 `git push`를 직접 실행해야 할 수도 있어요. 브라우저 팝업으로 GitHub 로그인하면 이후부턴 자동이에요.

### Step 3: Vercel 가입 & GitHub 연결

1. [vercel.com](https://vercel.com) 접속
2. **Sign Up** → **Continue with GitHub** 선택
3. GitHub 계정으로 로그인하면 자동 연결 완료!

> 💡 이미 Vercel 계정이 있으면 이 단계는 건너뛰세요.

### Step 4: 프로젝트 Import & 배포

1. [vercel.com/new](https://vercel.com/new) 접속 (또는 대시보드에서 **Add New → Project**)
2. **Import Git Repository** 화면이 나와요
3. GitHub 저장소 목록에서 `sponge` 찾기 → **Import** 클릭
4. 설정 화면이 나오는데, **아무것도 안 건드려도 돼요!**
   - Project Name: 자동으로 `sponge` (원하면 변경 가능)
   - Framework Preset: **Next.js** 자동 인식됨
   - Root Directory: `./` 그대로
   - Build Settings: 그대로
5. **Deploy** 버튼 클릭!
6. 빌드 로그가 쭉 올라가면서 2-3분 후 → **🎉 "Congratulations!"** 화면이 뜸
7. 배포된 URL이 바로 나와요

**👉 실제 배포된 사이트: [https://sponge-club.vercel.app](https://sponge-club.vercel.app)**

### 배포 후 자동 업데이트

이게 제일 편한 부분이에요. 한번 연결하면:

```
코드 수정 → GitHub에 push → Vercel이 자동으로 감지 → 재배포
```

즉, 앞으로 Claude Code에서 코드 수정하고 `git push`만 하면 사이트가 자동으로 업데이트돼요. 터미널 한 번도 안 열어도 됩니다!

---

<a id="삽질-기록"></a>
## 🔧 삽질 기록 & 해결법

솔직하게 기록합니다. 삽질도 경험이니까요 😂

### 삽질 1: npx skills 명령어 무한 로딩

**문제**: `npx skills add https://github.com/anthropics/skills --skill frontend-design` 실행했는데, 아무 반응 없이 멈춤

**원인**: npx 패키지 다운로드 과정에서 타임아웃

**해결**: Claude Code가 직접 git clone으로 저장소를 받아서 `.claude/skills/` 폴더에 수동 복사
```bash
git clone --depth 1 https://github.com/anthropics/skills.git
cp -r skills/frontend-design .claude/skills/
```

### 삽질 2: 개발 서버가 안 뜸

**문제**: `npm run dev` 실행했는데 포트 3000에 접속이 안 됨

**원인**: `node_modules` 캐시가 꼬여서 Next.js가 제대로 빌드되지 않음

**해결**: 완전 초기화 후 재설치
```bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
# → 40초 후 정상 작동!
```

### 삽질 3: 프리뷰 포트 충돌

**문제**: Claude Code의 preview_start 기능 사용 시 "Port 3000 is in use" 에러

**원인**: 수동으로 띄운 dev 서버가 이미 3000 포트를 점유

**해결**: `.claude/launch.json`에 `"autoPort": true` 추가
```json
{
  "dev_server": {
    "command": "npm run dev",
    "port": 3000,
    "autoPort": true
  }
}
```

### 삽질 4: Vercel CLI 로그인 불가

**문제**: Claude Code 안에서 `npx vercel login` 실행 → 브라우저 인증이 필요해서 실패

**원인**: Claude Code의 터미널은 인터랙티브 브라우저 연동이 안 됨

**해결**: CLI 배포 대신 **GitHub 연동 + Vercel 웹 대시보드**로 배포 방식 변경

---

<a id="사용한-도구-정리"></a>
## 🛠️ 사용한 스킬 & 플러그인 총정리

### 플러그인 (설치한 것)

| 플러그인 | 출처 | 포함된 주요 스킬 |
|---|---|---|
| **superpowers** | [github.com/obra/superpowers](https://github.com/obra/superpowers) | brainstorming, debugging, writing-plans, executing-plans, verification 등 |
| **clarify** | 별도 설치 | vague, unknown, metamedium |
| **frontend-design** | [github.com/anthropics/skills](https://github.com/anthropics/skills) | frontend-design |

### 실제 사용한 스킬과 역할

| 스킬 | 언제 사용? | 역할 |
|---|---|---|
| `/clarify:vague` | 프로젝트 시작 | 8개 질문으로 애매한 요구사항 → 명확한 스펙 |
| `/superpowers:brainstorming` | 프로젝트 기획 | 전체 기능 브레인스토밍 + 3단계 Phase 수립 |
| `frontend-design` | 디자인 + 구현 | 3가지 디자인 방향 제안 + 고퀄리티 UI 코드 생성 |

### MCP 서버 (연동된 외부 서비스)

| MCP | 역할 |
|---|---|
| Claude Preview | 코드 실시간 프리뷰 & 스크린샷 |
| Supabase | DB & 인증 (설정 완료, 추후 활용) |
| Notion | 프로젝트 문서 관리 |
| Slack | 팀 커뮤니케이션 |
| Google Calendar | 일정 관리 |

---

## 💡 배운 점 & 팁

### 1. 스킬 설치가 안 되면 당황하지 말기
`npx skills add`가 안 되면 → GitHub URL을 채팅창에 붙여넣고 "설치해줘"라고 하면 됨. Claude Code가 알아서 해결해요.

### 2. 기획 → 디자인 → 구현 순서를 지키기
"일단 만들어줘"보다 `/clarify:vague`로 요구사항 정리 → `/brainstorming`으로 방향 결정 → 구현 순서가 훨씬 효율적이에요.

### 3. 문제가 생기면 Claude Code에게 맡기기
포트 충돌, node_modules 에러 등 → "문제 해결해줘"라고 하면 Claude Code가 원인 분석 + 해결까지 해줘요.

### 4. 배포는 GitHub + Vercel 웹이 가장 편함
터미널 없이도 GitHub 저장소 만들고 → Vercel 웹에서 Import → 자동 배포. 이후 코드 수정은 Claude Code → git push → 자동 재배포.

### 5. `/` 명령어를 적극적으로 활용하기
어떤 스킬이 있는지 모르겠으면 `/`를 눌러보세요. 생각보다 다양한 기능이 있어요!

---

## 🚀 다음 단계 (Phase 2 & 3)

현재 Phase 1 (사전 등록 랜딩 페이지)이 완성 & 배포되었어요.

앞으로 추가할 것들:

**Phase 2: 상세 페이지**
- About 페이지 (커뮤니티 소개)
- Curriculum 상세 페이지
- Reviews 페이지
- FAQ 페이지

**Phase 3: 핵심 기능**
- 카카오 로그인 연동
- 블로그 시스템
- 챌린지 & 레벨/뱃지 시스템
- 결제 시스템

---

> 📝 이 글은 실제 Sponge Club 프로젝트를 진행하면서 작성되었습니다.
> Claude Code + 스킬/플러그인만으로 기획부터 배포까지 가능하다는 걸 보여주고 싶었어요.
>
> 궁금한 점이 있으면 편하게 물어보세요! 🧽✨
