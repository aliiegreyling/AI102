import type { CheatSheet } from "../types";

export const cheatSheets: CheatSheet[] = [
  {
    id: "one-page-cram",
    title: "One-page AI-102 cram sheet",
    sections: [
      {
        heading: "Service picks",
        points: [
          "Generate/reason: Azure OpenAI in Foundry Models.",
          "Agent with tools: Foundry Agent Service or Microsoft Agent Framework.",
          "RAG retrieval: Azure AI Search with vector, hybrid, and semantic search.",
          "Forms and structured docs: Document Intelligence.",
          "Multimodal extraction: Content Understanding.",
          "Text analytics: Language. Audio: Speech. Translation: Translator. Images: Vision.",
        ],
      },
      {
        heading: "Exam words",
        points: [
          "Custom means train/evaluate/deploy/consume.",
          "Minimal effort means choose the purpose-built prebuilt service.",
          "Secure means managed identity, RBAC, Key Vault, private networking, and logs.",
          "Best fit means avoid bigger models or custom training when a narrow service does the job.",
        ],
      },
      {
        heading: "Deprecated/legacy",
        points: [
          "QnA Maker is legacy wording; use Azure Language custom question answering for new solutions.",
          "The December 23, 2025 guide uses Microsoft Foundry Services and Foundry Tools terminology.",
        ],
      },
    ],
  },
  {
    id: "sdk-rest",
    title: "SDK and REST quick reference",
    sections: [
      {
        heading: "Common SDK shape",
        points: [
          "Create a client with endpoint plus credential.",
          "Use DefaultAzureCredential for development and managed identity/specific credentials in production.",
          "Call a deployed model or service endpoint, not a vague product name.",
          "Handle long-running operations for document analysis, training, and batch jobs.",
        ],
      },
      {
        heading: "Common REST shape",
        points: [
          "Endpoint URL plus API version plus authenticated request.",
          "JSON body defines inputs and features.",
          "Responses include confidence, status, IDs, or operation-location depending on service.",
          "Retries, throttling, and errors matter in production design.",
        ],
      },
    ],
  },
  {
    id: "responsible-ai",
    title: "Responsible AI checklist",
    sections: [
      {
        heading: "Before launch",
        points: [
          "Document intended use, users, data sources, and failure impact.",
          "Add content filters, blocklists, prompt shields, harm detection, and fallback behavior.",
          "Test adversarial prompts, sensitive data, multilingual input, and edge cases.",
          "Make outputs explainable enough for the user to verify.",
        ],
      },
      {
        heading: "After launch",
        points: [
          "Monitor quality, latency, cost, safety events, and user feedback.",
          "Review logs with privacy controls.",
          "Keep model and index updates auditable.",
          "Provide human escalation where mistakes can harm users.",
        ],
      },
    ],
  },
  {
    id: "rag-agents",
    title: "RAG and agents checklist",
    sections: [
      {
        heading: "RAG",
        points: [
          "Chunk documents with useful metadata.",
          "Create embeddings and vector fields.",
          "Use vector or hybrid retrieval with filters.",
          "Prompt the model to answer from retrieved sources and cite them.",
          "Evaluate groundedness and handle no-answer cases.",
        ],
      },
      {
        heading: "Agents",
        points: [
          "Define model, instructions, tools, and sessions.",
          "Scope and validate tools.",
          "Log tool calls and outputs.",
          "Add approvals for destructive, costly, or sensitive actions.",
          "Test loops, tool failure, unsafe input, and multi-agent handoffs.",
        ],
      },
    ],
  },
  {
    id: "comparison",
    title: "Vision, Language, Speech, Search, and Document comparison",
    sections: [
      {
        heading: "Fast comparison",
        points: [
          "Vision sees images and video frames.",
          "Language understands text.",
          "Speech hears and speaks audio.",
          "Translator translates text/documents and Speech translates spoken language.",
          "AI Search indexes and retrieves content.",
          "Document Intelligence extracts structured document data.",
          "Content Understanding extracts structured outputs from multimodal content.",
        ],
      },
    ],
  },
];

export const sevenDayCramPlan = [
  "Day 1: Read the official study guide. Build the service selection matrix from memory.",
  "Day 2: Plan/manage deep dive: auth, monitoring, cost, content safety, containers, responsible AI.",
  "Day 3: Generative AI: RAG, embeddings, prompt flow, parameters, evaluation, tracing, Azure OpenAI C# pattern.",
  "Day 4: Agents plus AI Search: tools, sessions, guardrails, index/data source/indexer/skillset, vector and semantic search.",
  "Day 5: Vision and NLP: OCR, classification vs detection, Video Indexer, Language, Speech, Translator, CLU, CQA.",
  "Day 6: Document Intelligence and Content Understanding labs. Drill all weak-topic quiz misses.",
  "Day 7: Timed mock exam, review wrong answers, skim official docs links, pack exam-day checklist.",
];

export const examDayChecklist = [
  "Know the exam retires June 30, 2026 and prepare against the December 23, 2025 skill outline.",
  "Use the exam sandbox before exam day so the UI is familiar.",
  "Timebox case studies and flag questions where one word changes the service choice.",
  "Read for custom, minimal, secure, least effort, best fit, current, private, and compliant.",
  "Eliminate answers using deprecated services, wrong modality, or unnecessary custom training.",
  "For code snippets, look for endpoint, credential, deployment/model name, request body, and response interpretation.",
  "During review, prioritize questions you flagged because of service selection or security tradeoffs.",
];
