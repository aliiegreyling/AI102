import type { ServiceMatrixRow } from "../types";

export const serviceMatrix: ServiceMatrixRow[] = [
  {
    need: "Generate text, code, summaries, or multimodal reasoning",
    bestFit: "Azure OpenAI in Foundry Models",
    alternatives: "Prompt flow for repeatable workflows; fine-tuning for learned behavior",
    examSignal: "Generate, summarize, reason, chat, code, image generation, multimodal",
    avoid: "Do not choose Language prebuilt features for open-ended generation.",
  },
  {
    need: "Ground answers in private enterprise documents",
    bestFit: "Azure AI Search plus Azure OpenAI RAG",
    alternatives: "Document Intelligence or Content Understanding before indexing",
    examSignal: "Citations, current data, private data, searchable corpus, semantic/vector search",
    avoid: "Do not fine-tune just to inject frequently changing facts.",
  },
  {
    need: "Extract fields, tables, and layout from forms",
    bestFit: "Azure Document Intelligence in Foundry Tools",
    alternatives: "Content Understanding for broader multimodal extraction",
    examSignal: "Invoices, receipts, IDs, forms, layout, custom/composed model",
    avoid: "Do not use plain OCR when key-value structure is required.",
  },
  {
    need: "Classify or extract data from documents, images, audio, and video",
    bestFit: "Azure Content Understanding in Foundry Tools",
    alternatives: "Document Intelligence for document-only form extraction",
    examSignal: "Multimodal, analyzer, structured output, schema, confidence scores",
    avoid: "Do not force a document-only service onto audio/video.",
  },
  {
    need: "Detect text entities, sentiment, language, key phrases, or PII",
    bestFit: "Azure Language in Foundry Tools",
    alternatives: "Azure OpenAI for generated summaries or reasoning over the text",
    examSignal: "NER, PII, sentiment, key phrases, detect language, CLU, custom NER",
    avoid: "Do not use Speech unless the input or output is audio.",
  },
  {
    need: "Speech-to-text, text-to-speech, speech translation, keyword recognition",
    bestFit: "Azure Speech in Foundry Tools",
    alternatives: "Language after transcription; Translator for text/document translation",
    examSignal: "Audio, transcription, voice, SSML, custom speech, pronunciation, wake word",
    avoid: "Do not use Language directly on raw audio.",
  },
  {
    need: "Image tags, captions, OCR, object detection, custom image models",
    bestFit: "Azure Vision in Foundry Tools and Custom Vision",
    alternatives: "Document Intelligence for document OCR and layout",
    examSignal: "Image features, tags, captions, objects, bounding boxes, classification",
    avoid: "Do not use image classification when bounding boxes are required.",
  },
  {
    need: "Video insights or people movement",
    bestFit: "Azure AI Video Indexer or Spatial Analysis",
    alternatives: "Content Understanding for multimodal structured extraction",
    examSignal: "Video, live stream, transcript, scene, people presence, movement",
    avoid: "Do not choose static Image Analysis for video-wide insights.",
  },
  {
    need: "FAQ-style answers from curated Q&A",
    bestFit: "Azure Language custom question answering",
    alternatives: "RAG with Azure AI Search and Azure OpenAI for richer grounded chat",
    examSignal: "Question-answer pairs, multi-turn, active learning, alternate phrasing",
    avoid: "Do not use old QnA Maker for new solutions.",
  },
  {
    need: "Goal-driven workflow that uses tools",
    bestFit: "Microsoft Foundry Agent Service or Microsoft Agent Framework",
    alternatives: "Plain chat completion for simple response-only scenarios",
    examSignal: "Agent, tools, autonomous, multi-step, workflow, multi-agent, hosted agent",
    avoid: "Do not overbuild with agents when a single model call satisfies the requirement.",
  },
];
