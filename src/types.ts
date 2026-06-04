export type DomainId =
  | "plan-manage"
  | "generative-ai"
  | "agentic"
  | "vision"
  | "nlp"
  | "knowledge-mining";

export type ExamDomain = {
  id: DomainId;
  title: string;
  weight: string;
  accent: string;
  summary: string;
  tiredSummary: string;
  learnMaterials: ResourceLink[];
  testingFocus: string[];
  services: string[];
  useWhen: string[];
  sdkConcepts: string[];
  traps: string[];
  checklist: string[];
};

export type Lesson = {
  id: string;
  domainId: DomainId;
  title: string;
  explanation: string;
  microsoftTesting: string[];
  csharp?: string;
  cheatSheet: string[];
};

export type Flashcard = {
  id: string;
  domainId: DomainId;
  front: string;
  back: string;
};

export type QuizQuestion = {
  id: string;
  domainId: DomainId;
  mode: "quick" | "scenario" | "boss";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  wrongExplanations: string[];
};

export type Lab = {
  id: string;
  domainId: DomainId;
  title: string;
  goal: string;
  steps: string[];
  expectedResult: string;
  examRelevance: string;
};

export type CheatSheet = {
  id: string;
  title: string;
  sections: { heading: string; points: string[] }[];
};

export type ServiceMatrixRow = {
  need: string;
  bestFit: string;
  alternatives: string;
  examSignal: string;
  avoid: string;
};

export type ResourceLink = {
  label: string;
  url: string;
};
