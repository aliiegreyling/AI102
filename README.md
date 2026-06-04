# AI-102 Exam Ready Study Guide

A local, interactive React + TypeScript study platform for Microsoft Exam AI-102: Designing and Implementing a Microsoft Azure AI Solution.

This app is aligned to the official Microsoft Learn AI-102 study guide and skills measured as of December 23, 2025. AI-102 retires on June 30, 2026. Community tips are marked as unofficial and the app does not include exam dumps.

## Features

- Dashboard with progress, weakest topics, XP, badges, streak, readiness score, and retirement countdown.
- Topic pages for all six AI-102 domains.
- Expandable lessons with simple explanations, testing focus, C# snippets, traps, and cheat summaries.
- 60 flashcards, 10 per major exam domain.
- 60 quiz questions, 10 per major exam domain, including scenario and boss-fight questions.
- Timed 25-minute mixed mock exam mode with wrong-option explanations.
- Cheat sheets, service selection matrix, SDK/REST reference, Responsible AI checklist, RAG/Agents checklist, and exam day checklist.
- Labs with goal, steps, expected result, and exam relevance.
- Dark/light mode and local storage progress tracking.

## Setup

```bash
npm install
npm run dev
```

Then open the local Vite URL, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## Source of truth

Use official Microsoft Learn documentation as the source of truth:

- AI-102 study guide: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102
- Foundry Tools: https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services
- Azure OpenAI in Foundry Models: https://learn.microsoft.com/en-us/azure/ai-services/openai/overview
- Azure AI Foundry Agent Service: https://learn.microsoft.com/en-us/azure/ai-foundry/agents/
- Azure AI Search: https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search
- Azure Document Intelligence: https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview
- Azure Content Understanding: https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview

## Data model

Structured seed content lives in:

- `src/data/examDomains.ts`
- `src/data/lessons.ts`
- `src/data/flashcards.ts`
- `src/data/quizzes.ts`
- `src/data/labs.ts`
- `src/data/cheatSheets.ts`
- `src/data/serviceMatrix.ts`

Progress is stored locally in `localStorage` under `ai102-progress`.
