import { useEffect, useMemo, useState } from "react";
import { cheatSheets, examDayChecklist, sevenDayCramPlan } from "./data/cheatSheets";
import { communityTips, examDomains, examRetirementDate, officialResources } from "./data/examDomains";
import { flashcards } from "./data/flashcards";
import { labs } from "./data/labs";
import { lessons } from "./data/lessons";
import { quizzes } from "./data/quizzes";
import { serviceMatrix } from "./data/serviceMatrix";
import type { DomainId, ExamDomain, QuizQuestion } from "./types";

type View = "dashboard" | "topic" | "exam" | "cheats" | "labs" | "resources";
type Theme = "light" | "dark";

type ProgressState = {
  completedLessons: string[];
  quizResults: Record<string, { correct: boolean; attempts: number }>;
  labDone: string[];
  xp: number;
  lastStudyDate: string;
  streak: number;
};

const initialProgress: ProgressState = {
  completedLessons: [],
  quizResults: {},
  labDone: [],
  xp: 0,
  lastStudyDate: "",
  streak: 0,
};

const progressMessages = [
  "Bru, you're cooking.",
  "Nice. The weak topics are starting to sweat.",
  "Good rhythm. Keep the case-study brain switched on.",
  "Eish, revise this again before you trust it.",
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem("ai102-progress");
    return raw ? { ...initialProgress, ...JSON.parse(raw) } : initialProgress;
  } catch {
    return initialProgress;
  }
}

function daysBetween(a: string, b: string) {
  const first = new Date(`${a}T00:00:00`);
  const second = new Date(`${b}T00:00:00`);
  return Math.round((second.getTime() - first.getTime()) / 86_400_000);
}

function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    localStorage.setItem("ai102-progress", JSON.stringify(progress));
  }, [progress]);

  const recordStudy = (xp = 5) => {
    setProgress((current) => {
      const today = todayKey();
      const gap = current.lastStudyDate ? daysBetween(current.lastStudyDate, today) : 99;
      const streak = current.lastStudyDate === today ? current.streak : gap === 1 ? current.streak + 1 : 1;
      return { ...current, lastStudyDate: today, streak, xp: current.xp + xp };
    });
  };

  const completeLesson = (id: string) => {
    setProgress((current) => {
      if (current.completedLessons.includes(id)) return current;
      return { ...current, completedLessons: [...current.completedLessons, id] };
    });
    recordStudy(10);
  };

  const recordQuiz = (questionId: string, correct: boolean) => {
    setProgress((current) => {
      const previous = current.quizResults[questionId] ?? { correct: false, attempts: 0 };
      return {
        ...current,
        quizResults: {
          ...current.quizResults,
          [questionId]: { correct: previous.correct || correct, attempts: previous.attempts + 1 },
        },
      };
    });
    recordStudy(correct ? 12 : 4);
  };

  const toggleLab = (id: string) => {
    setProgress((current) => {
      const done = current.labDone.includes(id);
      return { ...current, labDone: done ? current.labDone.filter((labId) => labId !== id) : [...current.labDone, id] };
    });
    recordStudy(15);
  };

  const resetProgress = () => setProgress(initialProgress);

  return { progress, completeLesson, recordQuiz, toggleLab, resetProgress };
}

function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedDomain, setSelectedDomain] = useState<DomainId>("plan-manage");
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("ai102-theme") as Theme) || "dark");
  const progressApi = useProgress();
  const { progress } = progressApi;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ai102-theme", theme);
  }, [theme]);

  const stats = useMemo(() => calculateStats(progress), [progress]);
  const activeDomain = examDomains.find((domain) => domain.id === selectedDomain) ?? examDomains[0];

  const navigateTopic = (domainId: DomainId) => {
    setSelectedDomain(domainId);
    setView("topic");
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">AI</div>
          <div>
            <strong>AI-102 Exam Ready</strong>
            <span>Microsoft Learn aligned</span>
          </div>
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          {[
            ["dashboard", "Dashboard"],
            ["exam", "Exam mode"],
            ["cheats", "Cheat sheets"],
            ["labs", "Labs"],
            ["resources", "Resources"],
          ].map(([key, label]) => (
            <button key={key} className={view === key ? "active" : ""} onClick={() => setView(key as View)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="domain-nav">
          <p>Exam domains</p>
          {examDomains.map((domain) => (
            <button key={domain.id} onClick={() => navigateTopic(domain.id)} className={selectedDomain === domain.id && view === "topic" ? "active" : ""}>
              <span style={{ background: domain.accent }} />
              {domain.title}
            </button>
          ))}
        </div>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </aside>

      <main>
        <header className="topbar">
          <div>
            <p className="eyebrow">Skills measured as of December 23, 2025</p>
            <h1>{viewTitle(view, activeDomain)}</h1>
          </div>
          <div className="pill-group">
            <span className="pill">XP {progress.xp}</span>
            <span className="pill">Streak {progress.streak}d</span>
            <span className="pill danger">Retires {countdownLabel()}</span>
          </div>
        </header>

        {view === "dashboard" && <Dashboard stats={stats} progress={progress} onTopic={navigateTopic} onReset={progressApi.resetProgress} />}
        {view === "topic" && <TopicPage domain={activeDomain} progressApi={progressApi} />}
        {view === "exam" && <ExamMode recordQuiz={progressApi.recordQuiz} />}
        {view === "cheats" && <CheatSheets />}
        {view === "labs" && <Labs progress={progress} toggleLab={progressApi.toggleLab} />}
        {view === "resources" && <Resources />}
      </main>
    </div>
  );
}

function calculateStats(progress: ProgressState) {
  const totalLessons = lessons.length;
  const lessonScore = progress.completedLessons.length / totalLessons;
  const correctQuestions = Object.values(progress.quizResults).filter((result) => result.correct).length;
  const quizScore = correctQuestions / quizzes.length;
  const labScore = progress.labDone.length / labs.length;
  const readiness = Math.round((lessonScore * 0.3 + quizScore * 0.5 + labScore * 0.2) * 100);
  const domainScores = examDomains.map((domain) => {
    const domainLessons = lessons.filter((lesson) => lesson.domainId === domain.id);
    const domainQuestions = quizzes.filter((question) => question.domainId === domain.id);
    const lessonDone = domainLessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length;
    const quizDone = domainQuestions.filter((question) => progress.quizResults[question.id]?.correct).length;
    const score = Math.round(((lessonDone / domainLessons.length) * 0.4 + (quizDone / domainQuestions.length) * 0.6) * 100);
    return { ...domain, score };
  });
  const weakest = [...domainScores].sort((a, b) => a.score - b.score).slice(0, 3);
  return { readiness, correctQuestions, domainScores, weakest };
}

function countdownLabel() {
  const diff = new Date(examRetirementDate).getTime() - Date.now();
  const days = Math.max(0, Math.ceil(diff / 86_400_000));
  return `${days} days`;
}

function viewTitle(view: View, domain: ExamDomain) {
  if (view === "topic") return domain.title;
  if (view === "exam") return "Timed exam mode";
  if (view === "cheats") return "Cheat sheets";
  if (view === "labs") return "Hands-on labs";
  if (view === "resources") return "Official resources";
  return "Dashboard";
}

function Dashboard({
  stats,
  progress,
  onTopic,
  onReset,
}: {
  stats: ReturnType<typeof calculateStats>;
  progress: ProgressState;
  onTopic: (domainId: DomainId) => void;
  onReset: () => void;
}) {
  const message = progress.xp < 60 ? progressMessages[0] : stats.readiness < 45 ? progressMessages[3] : progressMessages[1];
  const badges = [
    progress.xp >= 100 && "First 100 XP",
    progress.streak >= 3 && "Three-day streak",
    stats.correctQuestions >= 20 && "Quiz grinder",
    progress.labDone.length >= 3 && "Lab builder",
    stats.readiness >= 80 && "Exam-ready energy",
  ].filter(Boolean);

  return (
    <section className="stack">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Retirement countdown: {countdownLabel()}</p>
          <h2>{message}</h2>
          <p>
            This app is aligned to the official AI-102 skills measured as of December 23, 2025. Community tips are clearly marked as unofficial and there are no exam dumps here.
          </p>
        </div>
        <div className="readiness-ring" style={{ "--score": `${stats.readiness}%` } as React.CSSProperties}>
          <strong>{stats.readiness}%</strong>
          <span>readiness</span>
        </div>
      </div>

      <div className="metric-grid">
        <Metric label="Overall progress" value={`${stats.readiness}%`} />
        <Metric label="Correct questions" value={`${stats.correctQuestions}/${quizzes.length}`} />
        <Metric label="Study streak" value={`${progress.streak} days`} />
        <Metric label="Labs done" value={`${progress.labDone.length}/${labs.length}`} />
      </div>

      <div className="two-col">
        <Panel title="Weakest topics">
          {stats.weakest.map((domain) => (
            <button className="weak-row" key={domain.id} onClick={() => onTopic(domain.id)}>
              <span style={{ background: domain.accent }} />
              <strong>{domain.title}</strong>
              <em>{domain.score}%</em>
            </button>
          ))}
        </Panel>
        <Panel title="Badges">
          {badges.length ? (
            <div className="badge-grid">
              {badges.map((badge) => (
                <span className="badge" key={badge as string}>{badge}</span>
              ))}
            </div>
          ) : (
            <p className="muted">Earn badges by completing lessons, quizzes, streaks, and labs.</p>
          )}
        </Panel>
      </div>

      <Panel title="Domain progress">
        <div className="domain-progress-grid">
          {stats.domainScores.map((domain) => (
            <button key={domain.id} className="domain-card" onClick={() => onTopic(domain.id)}>
              <span className="domain-accent" style={{ background: domain.accent }} />
              <strong>{domain.title}</strong>
              <small>{domain.weight}</small>
              <ProgressBar value={domain.score} />
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="7-day cram plan">
        <ol className="clean-list">
          {sevenDayCramPlan.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </Panel>
      <button className="ghost-button" onClick={onReset}>Reset local progress</button>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-bar" aria-label={`Progress ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

function TopicPage({
  domain,
  progressApi,
}: {
  domain: ExamDomain;
  progressApi: ReturnType<typeof useProgress>;
}) {
  const domainLessons = lessons.filter((lesson) => lesson.domainId === domain.id);
  const domainCards = flashcards.filter((card) => card.domainId === domain.id);
  const domainQuiz = quizzes.filter((question) => question.domainId === domain.id);
  const [mode, setMode] = useState<"lessons" | "flashcards" | "quiz" | "scenario" | "checklist">("lessons");

  return (
    <section className="stack">
      <div className="topic-hero" style={{ borderColor: domain.accent }}>
        <div>
          <p className="eyebrow">{domain.weight} of exam</p>
          <h2>{domain.summary}</h2>
          <p>{domain.tiredSummary}</p>
        </div>
        <div className="mini-card">
          <strong>What Microsoft is testing</strong>
          <ul>{domain.testingFocus.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>

      <Panel title="Microsoft Learn materials for this domain">
        <div className="learn-link-grid">
          {domain.learnMaterials.map((resource) => (
            <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">
              <span>Microsoft Learn</span>
              <strong>{resource.label}</strong>
            </a>
          ))}
        </div>
      </Panel>

      <div className="segmented">
        {["lessons", "flashcards", "quiz", "scenario", "checklist"].map((item) => (
          <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item as typeof mode)}>
            {item}
          </button>
        ))}
      </div>

      {mode === "lessons" && (
        <div className="lesson-grid">
          {domainLessons.map((lesson) => (
            <details className="lesson" key={lesson.id} open>
              <summary>
                <span>{lesson.title}</span>
                <button onClick={(event) => { event.preventDefault(); progressApi.completeLesson(lesson.id); }}>
                  {progressApi.progress.completedLessons.includes(lesson.id) ? "Done" : "Mark done"}
                </button>
              </summary>
              <p>{lesson.explanation}</p>
              <h3>What Microsoft is testing here</h3>
              <ul>{lesson.microsoftTesting.map((item) => <li key={item}>{item}</li>)}</ul>
              {lesson.csharp && <CodeBlock code={lesson.csharp} />}
              <h3>Cheat-sheet summary</h3>
              <ul>{lesson.cheatSheet.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
          ))}
        </div>
      )}

      {mode === "flashcards" && <Flashcards cards={domainCards} />}
      {mode === "quiz" && <QuestionRunner questions={domainQuiz.filter((question) => question.mode !== "scenario")} recordQuiz={progressApi.recordQuiz} />}
      {mode === "scenario" && <QuestionRunner questions={domainQuiz.filter((question) => question.mode !== "quick")} recordQuiz={progressApi.recordQuiz} />}
      {mode === "checklist" && <DomainChecklist domain={domain} />}
    </section>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="code-block">
      <code>{code}</code>
    </pre>
  );
}

function Flashcards({ cards }: { cards: typeof flashcards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];
  return (
    <div className="flashcard-wrap">
      <button className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
        <span>{flipped ? card.back : card.front}</span>
        <small>{flipped ? "Answer" : "Question"} · tap to flip</small>
      </button>
      <div className="card-controls">
        <button onClick={() => { setIndex((index + cards.length - 1) % cards.length); setFlipped(false); }}>Previous</button>
        <span>{index + 1}/{cards.length}</span>
        <button onClick={() => { setIndex((index + 1) % cards.length); setFlipped(false); }}>Next</button>
      </div>
    </div>
  );
}

function QuestionRunner({ questions, recordQuiz }: { questions: QuizQuestion[]; recordQuiz: (id: string, correct: boolean) => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const question = questions[index];
  const answered = selected !== null;
  const correct = selected === question.correctIndex;

  const answer = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    recordQuiz(question.id, optionIndex === question.correctIndex);
  };

  return (
    <div className="question-card">
      <div className="question-meta">
        <span>{question.mode}</span>
        <span>{index + 1}/{questions.length}</span>
      </div>
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, optionIndex) => (
          <button
            key={option}
            className={answered ? optionIndex === question.correctIndex ? "correct" : optionIndex === selected ? "wrong" : "" : ""}
            onClick={() => answer(optionIndex)}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && (
        <div className={`answer-box ${correct ? "correct" : "wrong"}`}>
          <strong>{correct ? "Correct" : "Revise this one"}</strong>
          <p>{question.explanation}</p>
          <ul>
            {question.wrongExplanations.map((item, itemIndex) => (
              <li key={`${question.id}-${itemIndex}`}>{question.options[itemIndex]}: {item}</li>
            ))}
          </ul>
          <button onClick={() => { setIndex((index + 1) % questions.length); setSelected(null); }}>Next question</button>
        </div>
      )}
    </div>
  );
}

function DomainChecklist({ domain }: { domain: ExamDomain }) {
  return (
    <div className="two-col">
      <Panel title="Key services to know">
        <ul>{domain.services.map((item) => <li key={item}>{item}</li>)}</ul>
      </Panel>
      <Panel title="When to use which service">
        <ul>{domain.useWhen.map((item) => <li key={item}>{item}</li>)}</ul>
      </Panel>
      <Panel title="SDK/API/REST concepts">
        <ul>{domain.sdkConcepts.map((item) => <li key={item}>{item}</li>)}</ul>
      </Panel>
      <Panel title="Common exam traps">
        <ul>{domain.traps.map((item) => <li key={item}>{item}</li>)}</ul>
      </Panel>
      <Panel title="Confidence checklist">
        <ul>{domain.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
      </Panel>
      <Panel title="Microsoft Learn materials">
        <div className="resource-list">
          {domain.learnMaterials.map((resource) => (
            <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">
              {resource.label}
            </a>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ExamMode({ recordQuiz }: { recordQuiz: (id: string, correct: boolean) => void }) {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const mixed = useMemo(() => [...quizzes].sort((a, b) => a.id.localeCompare(b.id)).filter((_, index) => index % 2 === 0).slice(0, 30), []);

  useEffect(() => {
    if (!started || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((current) => current - 1), 1000);
    return () => window.clearInterval(timer);
  }, [started, seconds]);

  return (
    <section className="stack">
      <div className="exam-banner">
        <div>
          <p className="eyebrow">Practice assessment style, no real exam dumps</p>
          <h2>{formatSeconds(seconds)}</h2>
          <p>30 mixed quick, scenario, and boss-fight questions. Review wrong answers immediately and read why each option fails.</p>
        </div>
        <button onClick={() => setStarted(true)}>{started ? "Timer running" : "Start 25-minute mock"}</button>
      </div>
      {started ? <QuestionRunner questions={mixed} recordQuiz={recordQuiz} /> : <Panel title="Case-study timing tip"><p>Read the scenario once, skim the questions, then revisit only the facts each question needs. Keep moving when a choice is merely plausible but not the best fit.</p></Panel>}
    </section>
  );
}

function formatSeconds(seconds: number) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function CheatSheets() {
  return (
    <section className="stack">
      <Panel title="Service selection matrix">
        <div className="matrix">
          {serviceMatrix.map((row) => (
            <article key={row.need}>
              <h3>{row.need}</h3>
              <p><strong>Best fit:</strong> {row.bestFit}</p>
              <p><strong>Alternatives:</strong> {row.alternatives}</p>
              <p><strong>Exam signal:</strong> {row.examSignal}</p>
              <p><strong>Avoid:</strong> {row.avoid}</p>
            </article>
          ))}
        </div>
      </Panel>
      {cheatSheets.map((sheet) => (
        <Panel key={sheet.id} title={sheet.title}>
          {sheet.sections.map((section) => (
            <div className="sheet-section" key={section.heading}>
              <h3>{section.heading}</h3>
              <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          ))}
        </Panel>
      ))}
      <Panel title="Exam day checklist">
        <ul>{examDayChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
      </Panel>
    </section>
  );
}

function Labs({ progress, toggleLab }: { progress: ProgressState; toggleLab: (id: string) => void }) {
  return (
    <section className="lab-grid">
      {labs.map((lab) => {
        const domain = examDomains.find((domain) => domain.id === lab.domainId);
        return (
          <article className="lab-card" key={lab.id}>
            <span className="domain-chip" style={{ borderColor: domain?.accent }}>{domain?.title}</span>
            <h2>{lab.title}</h2>
            <p>{lab.goal}</p>
            <h3>Steps</h3>
            <ol>{lab.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            <p><strong>Expected result:</strong> {lab.expectedResult}</p>
            <p><strong>Exam relevance:</strong> {lab.examRelevance}</p>
            <button onClick={() => toggleLab(lab.id)}>{progress.labDone.includes(lab.id) ? "Completed" : "Mark lab complete"}</button>
          </article>
        );
      })}
    </section>
  );
}

function Resources() {
  return (
    <section className="stack">
      <Panel title="Official Microsoft Learn resources">
        <div className="resource-list">
          {officialResources.map((resource) => (
            <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">{resource.label}</a>
          ))}
        </div>
      </Panel>
      <Panel title="Community tips, marked unofficial">
        <ul>{communityTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
      </Panel>
    </section>
  );
}

export default App;
