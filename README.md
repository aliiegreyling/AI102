# AI-102 Practice Quiz (React + Vite)

An interactive practice quiz for the **Microsoft AI-102: Designing & Implementing a Microsoft Azure AI Solution** exam — 331 questions across the six official skills-measured domains, with verified answers, explanations, and Microsoft Learn links.

> ⚠️ The AI-102 exam retires **30 June 2026**. Answers were cross-checked against Microsoft documentation; where a source's marked answer conflicted with the docs, the documented answer is used and noted in the explanation.

## Prerequisites

- **Node.js 18+** (includes npm). Check with `node -v`. If you don't have it, install from https://nodejs.org.

## Run it

```bash
cd ai-102-quiz
npm install      # first time only — downloads dependencies
npm run dev      # starts the dev server and opens http://localhost:5173
```

To create a production build (a static site in `dist/` you can host anywhere):

```bash
npm run build
npm run preview  # serve the built site locally to check it
```

## Features

- **Six domain filters** (Plan & Manage, Generative AI, Agentic, Computer Vision, NLP & Speech, Knowledge Mining & Doc Intelligence).
- **Auto-graded** single-choice, multi-select, and yes/no questions with instant feedback.
- **Real drag-and-drop ordering** questions — reorder tiles by dragging or with the ▲▼ buttons, then *Check order* grades each position.
- **Reveal cards** for hotspot / matching / simulation questions (self-assess against the model answer).
- Every question links to **Microsoft Learn**.
- Filters: only unanswered, only incorrect, only flagged, only auto-graded, only drag & drop.
- Shuffle, flag for review, jump-to, score/accuracy tracking.
- Progress is saved in your browser (localStorage).
- Keyboard: `←` / `→` navigate, `F` flag.

## Project structure

```
ai-102-quiz/
├── index.html              # Vite entry HTML
├── package.json            # scripts + dependencies
├── vite.config.js
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # state, filtering, navigation, persistence
    ├── quiz.css            # dark theme styles
    ├── utils.js            # shuffle / permutation / option helpers + constants
    ├── data/
    │   └── questions.json  # the 331-question bank (edit here to add/fix questions)
    └── components/
        ├── Controls.jsx    # domain chips, filters, stats bar
        ├── QuestionCard.jsx# renders MC, reveal, and the answer/explanation block
        └── DragOrder.jsx   # interactive drag-and-drop ordering
```

## Editing the questions

Each entry in `src/data/questions.json` looks like:

```jsonc
{
  "id": 5,
  "domain": "Plan & Manage",
  "type": "single",              // single | multi | yesno | hotspot | sequence
  "page": 3,                      // page in the source PDF (reference only)
  "label": "Topic 1 Q#5",
  "question": "…full question…",
  "options": ["A. …", "B. …"],   // for MC; for reveal types these are the choices
  "correct": ["C"],              // letters for MC; empty for sequence/hotspot
  "order": ["step 1", "step 2"], // ONLY for drag-and-drop: the correct sequence
  "correctText": "…model answer…",
  "explanation": "…why…",
  "mlUrl": "https://learn.microsoft.com/…",
  "mlTitle": "Microsoft Learn",
  "mc": true,                    // true => auto-graded multiple choice
  "autograded": true             // true for MC and drag-order questions
}
```

Save the file and the dev server hot-reloads automatically.
