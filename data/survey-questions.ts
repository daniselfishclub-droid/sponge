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
