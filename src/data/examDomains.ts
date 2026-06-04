import type { ExamDomain, ResourceLink } from "../types";

export const examRetirementDate = "2026-06-30T23:59:00-06:00";

export const officialResources: ResourceLink[] = [
  {
    label: "Official AI-102 study guide, skills measured as of December 23, 2025",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102",
  },
  {
    label: "Foundry Tools overview",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services",
  },
  {
    label: "Azure OpenAI in Foundry Models overview",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/openai/overview",
  },
  {
    label: "Azure AI Foundry Agent Service",
    url: "https://learn.microsoft.com/en-us/azure/ai-foundry/agents/",
  },
  {
    label: "Microsoft Agent Framework Foundry provider",
    url: "https://learn.microsoft.com/en-us/agent-framework/agents/providers/azure-ai-foundry",
  },
  {
    label: "Azure AI Vision documentation",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/",
  },
  {
    label: "Azure Language in Foundry Tools",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview",
  },
  {
    label: "Azure Speech documentation",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/",
  },
  {
    label: "Azure AI Search overview",
    url: "https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search",
  },
  {
    label: "Azure Document Intelligence in Foundry Tools",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview",
  },
  {
    label: "Azure Content Understanding in Foundry Tools",
    url: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview",
  },
];

export const communityTips = [
  "Unofficial: Use Microsoft Learn as the source of truth and ignore exam dump sites.",
  "Unofficial: Practise navigating docs quickly; the exam is about finding the best fit under pressure.",
  "Unofficial: Timebox case studies first, then return to tricky single questions.",
  "Unofficial: Words such as custom, minimal, secure, least effort, and best fit usually decide the answer.",
  "Unofficial: Study architecture and service integration instead of memorising portal screenshots.",
];

export const examDomains: ExamDomain[] = [
  {
    id: "plan-manage",
    title: "Plan and manage an Azure AI solution",
    weight: "20-25%",
    accent: "#3b82f6",
    summary:
      "Choose the right Microsoft Foundry service, deploy resources, secure access, monitor usage, control cost, and apply responsible AI controls.",
    tiredSummary:
      "Pick the right service, lock it down, watch the bill, and do not let the model behave badly.",
    learnMaterials: [
      {
        label: "Official AI-102 study guide: Plan and manage objectives",
        url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102#plan-and-manage-an-azure-ai-solution-20-25",
      },
      {
        label: "Microsoft Foundry training hub",
        url: "https://learn.microsoft.com/en-us/training/azure/ai-foundry",
      },
      {
        label: "Get started with AI applications and agents on Azure",
        url: "https://learn.microsoft.com/en-us/training/paths/get-started-ai-apps-agents/",
      },
      {
        label: "Foundry Tools overview",
        url: "https://learn.microsoft.com/en-us/azure/ai-services/what-are-ai-services",
      },
    ],
    testingFocus: [
      "Service selection across generative AI, vision, language, speech, search, and information extraction.",
      "Creating Azure AI resources, choosing model deployment options, and integrating SDKs or REST APIs.",
      "Keys, Microsoft Entra authentication, managed identity, monitoring, diagnostics, containers, and CI/CD.",
      "Content Safety, content filters, blocklists, prompt shields, harm detection, and governance.",
    ],
    services: [
      "Microsoft Foundry resource",
      "Foundry Tools",
      "Azure AI Content Safety",
      "Azure Monitor",
      "Azure Key Vault",
      "Azure Container Apps or AKS for containerized services",
    ],
    useWhen: [
      "Use a multi-service Foundry resource when the solution uses several AI capabilities under one endpoint and billing unit.",
      "Use single-service resources when the scenario needs tighter regional, billing, or access isolation.",
      "Use managed identity and RBAC for production apps; keep account keys for quickstarts or controlled legacy flows.",
      "Use containers when data locality, disconnected operation, or edge latency is a hard requirement.",
    ],
    sdkConcepts: [
      "Endpoint plus credential is the common client pattern.",
      "Prefer DefaultAzureCredential in development and managed identity in production.",
      "REST calls usually send JSON payloads to service-specific endpoints with API versioning.",
      "Diagnostics and cost are handled at the Azure resource level, not just in application code.",
    ],
    traps: [
      "Old Cognitive Services wording can appear, but the current guide uses Microsoft Foundry and Foundry Tools terminology.",
      "QnA Maker is legacy terminology; current new work should use Azure Language custom question answering.",
      "A secure minimal-effort answer often means managed identity plus RBAC, not storing keys in app settings.",
      "Responsible AI is not only for generative AI; it includes moderation, governance, monitoring, and user impact.",
    ],
    checklist: [
      "I can map a requirement to the correct Foundry Tool.",
      "I know when to choose keys, Microsoft Entra ID, or managed identity.",
      "I can explain endpoint, region, pricing tier, and deployment model tradeoffs.",
      "I can identify monitoring, diagnostics, and cost-control choices.",
      "I can apply content safety, filters, blocklists, and prompt shields.",
    ],
  },
  {
    id: "generative-ai",
    title: "Implement generative AI solutions",
    weight: "15-20%",
    accent: "#8b5cf6",
    summary:
      "Build Foundry projects, deploy models, generate text/code/images, ground outputs with RAG, evaluate prompts and flows, and operationalize deployments.",
    tiredSummary:
      "Give the model instructions, ground it in your data, tune the knobs, check the output, and ship it with monitoring.",
    learnMaterials: [
      {
        label: "Official AI-102 study guide: Generative AI objectives",
        url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102#implement-generative-ai-solutions-1520",
      },
      {
        label: "Get started with generative AI and agents in Azure",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-with-generative-ai-and-agents/",
      },
      {
        label: "Operationalize generative AI applications (GenAIOps)",
        url: "https://learn.microsoft.com/en-us/training/paths/operationalize-gen-ai-apps/",
      },
      {
        label: "Azure OpenAI in Foundry Models overview",
        url: "https://learn.microsoft.com/en-us/azure/ai-services/openai/overview",
      },
    ],
    testingFocus: [
      "Hubs, projects, model deployment, prompt templates, prompt flow, RAG, evaluation, tracing, feedback, and SDK integration.",
      "Azure OpenAI in Foundry Models for text, code, multimodal, image generation, and embeddings.",
      "Parameters such as temperature, top-p, max tokens, system messages, and grounding data.",
      "Fine-tuning versus RAG, model monitoring, model updates, containers, and orchestration.",
    ],
    services: [
      "Microsoft Foundry",
      "Azure OpenAI in Foundry Models",
      "Azure AI Search",
      "Prompt flow",
      "Azure AI Content Safety",
      "Application Insights",
    ],
    useWhen: [
      "Use RAG when answers must use current private data without retraining a model.",
      "Use fine-tuning when you need style, format, or task behavior learned from examples, not fresh facts.",
      "Use embeddings for semantic similarity, vector search, classification-like matching, and RAG retrieval.",
      "Use DALL-E or image-capable models when the requirement is image generation or multimodal reasoning.",
    ],
    sdkConcepts: [
      "Chat uses system, user, assistant, and tool messages.",
      "Embeddings turn text into vectors for similarity search.",
      "Streaming returns partial output; tracing captures steps, latency, and tool calls.",
      "Deployment names matter; client code usually calls a deployed model, not a raw model family name.",
    ],
    traps: [
      "RAG is not fine-tuning; use RAG for changing enterprise knowledge.",
      "Lower temperature improves consistency but does not guarantee factuality.",
      "A larger model is not automatically the best fit when cost, latency, or deployment limits matter.",
      "Content filters are part of the production design, not an optional exam footnote.",
    ],
    checklist: [
      "I can design a RAG pipeline with chunking, embeddings, vector search, and grounded prompts.",
      "I can pick model parameters for deterministic versus creative output.",
      "I know how prompt templates and prompt flow support repeatable solutions.",
      "I can explain model evaluation, tracing, feedback, and monitoring.",
      "I can choose between RAG, fine-tuning, and prompt engineering.",
    ],
  },
  {
    id: "agentic",
    title: "Implement an agentic solution",
    weight: "5-10%",
    accent: "#14b8a6",
    summary:
      "Create agents that reason over goals, use tools, keep context, orchestrate workflows, and move from prototype to secure production.",
    tiredSummary:
      "An agent is a goal-chaser with tools. Make sure it has guardrails before you let it near real work.",
    learnMaterials: [
      {
        label: "Official AI-102 study guide: Agentic solution objectives",
        url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102#implement-an-agentic-solution-5-10",
      },
      {
        label: "Develop your first agent with Microsoft Foundry",
        url: "https://learn.microsoft.com/en-us/training/modules/develop-first-agent/",
      },
      {
        label: "Develop AI agents with Microsoft Foundry and Visual Studio Code",
        url: "https://learn.microsoft.com/en-us/training/modules/develop-ai-agents-azure-vs-code/",
      },
      {
        label: "Develop a multi-agent solution with Microsoft Foundry Agent Service",
        url: "https://learn.microsoft.com/en-us/training/modules/develop-multi-agent-azure-ai-foundry/",
      },
    ],
    testingFocus: [
      "Agent use cases, required resources, Foundry Agent Service, Microsoft Agent Framework, tools, workflows, and multi-agent patterns.",
      "Testing, optimizing, deploying, securing, observing, and governing agents.",
      "Distinguishing simple chat completion from agent workflows that call tools and carry state.",
    ],
    services: [
      "Microsoft Foundry Agent Service",
      "Microsoft Agent Framework",
      "Foundry Models",
      "Azure AI Search",
      "Azure Functions or Logic Apps as tools",
      "Microsoft Entra ID",
    ],
    useWhen: [
      "Use a chat model when the app only needs one-shot or conversational generation.",
      "Use an agent when the system must plan steps, call tools, or complete a goal over multiple turns.",
      "Use service-managed Foundry agents when agent definitions need portal/API versioning and hosted orchestration.",
      "Use code-first Agent Framework patterns when your app owns instructions, tools, and control flow.",
    ],
    sdkConcepts: [
      "Agents combine model, instructions, tools, and sessions.",
      "Tool calls should be typed, permissioned, logged, and validated.",
      "Sessions preserve conversation context; production systems still need explicit state strategy.",
      "Agent tests should include happy paths, tool failure, unsafe input, and loop prevention.",
    ],
    traps: [
      "Do not call every chatbot an agent; tool use and goal-directed orchestration are key.",
      "More autonomy increases risk; exam scenarios often reward scoped tools and human approval.",
      "A tool result must still be checked before being trusted by downstream actions.",
      "Multi-agent does not mean better by default; choose it for role separation or orchestration needs.",
    ],
    checklist: [
      "I can identify when an agent is justified.",
      "I know the model, instructions, tools, and session components.",
      "I can compare Foundry Agent Service and Microsoft Agent Framework patterns.",
      "I can design guardrails for tool calling and autonomous workflows.",
      "I can test and monitor an agent before production deployment.",
    ],
  },
  {
    id: "vision",
    title: "Implement computer vision solutions",
    weight: "10-15%",
    accent: "#f97316",
    summary:
      "Analyze images, extract text, train custom classification or object detection models, and use video/spatial analysis services.",
    tiredSummary:
      "Images in, useful labels/text/objects out. If generic AI is not enough, train a custom vision model.",
    learnMaterials: [
      {
        label: "Official AI-102 study guide: Computer vision objectives",
        url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102#implement-computer-vision-solutions-1015",
      },
      {
        label: "Develop computer vision solutions in Azure",
        url: "https://learn.microsoft.com/en-us/training/paths/create-computer-vision-solutions-azure-ai/",
      },
      {
        label: "Get started with computer vision in Azure",
        url: "https://learn.microsoft.com/en-us/training/modules/read-text-computer-vision/",
      },
      {
        label: "Azure AI Vision documentation",
        url: "https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/",
      },
    ],
    testingFocus: [
      "Choosing visual features, image tags, object detection, OCR, handwriting, and response interpretation.",
      "Classification versus object detection, labeling images, training, evaluating, publishing, and consuming models.",
      "Azure AI Video Indexer and spatial analysis for people presence and movement.",
    ],
    services: [
      "Azure Vision in Foundry Tools",
      "Image Analysis",
      "OCR Read",
      "Custom Vision",
      "Azure AI Video Indexer",
      "Spatial Analysis",
    ],
    useWhen: [
      "Use Image Analysis for general tags, captions, objects, and OCR in images.",
      "Use Document Intelligence when the input is a document and structure matters.",
      "Use custom image classification to label an entire image.",
      "Use custom object detection to locate multiple objects with bounding boxes.",
    ],
    sdkConcepts: [
      "Requests specify visual features; responses include tags, captions, boxes, confidence, and OCR text.",
      "Custom Vision has training and prediction endpoints.",
      "Evaluation metrics include precision, recall, average precision, and confidence thresholds.",
      "OCR returns text locations and confidence values that may need post-processing.",
    ],
    traps: [
      "Image classification answers what is in the image; object detection answers where objects are.",
      "OCR for documents with tables/forms points to Document Intelligence, not plain image OCR.",
      "Publishing a model is required before a prediction endpoint can consume it.",
      "Video Indexer is for video insights; spatial analysis is about people presence and movement.",
    ],
    checklist: [
      "I can choose image analysis features for a request.",
      "I can interpret tags, objects, captions, OCR lines, and confidence scores.",
      "I can choose classification versus object detection.",
      "I know the custom vision train, evaluate, publish, consume flow.",
      "I can select Video Indexer or spatial analysis for video scenarios.",
    ],
  },
  {
    id: "nlp",
    title: "Implement natural language processing solutions",
    weight: "15-20%",
    accent: "#22c55e",
    summary:
      "Analyze text, translate text and documents, process speech, build custom language understanding, custom question answering, and custom translation.",
    tiredSummary:
      "Text and speech problems: detect what it says, what it means, what language it is, and whether it contains sensitive info.",
    learnMaterials: [
      {
        label: "Official AI-102 study guide: NLP objectives",
        url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102#implement-natural-language-processing-solutions-1520",
      },
      {
        label: "Develop natural language solutions in Azure",
        url: "https://learn.microsoft.com/en-us/training/paths/process-translate-speech-azure-cognitive-speech-services/",
      },
      {
        label: "Get started with natural language processing in Azure",
        url: "https://learn.microsoft.com/en-us/training/modules/create-language-model-with-language-understanding/",
      },
      {
        label: "Translate text and speech with Microsoft Foundry Tools",
        url: "https://learn.microsoft.com/en-us/training/modules/translate-text-speech/",
      },
      {
        label: "Create question answering solutions with Azure Language",
        url: "https://learn.microsoft.com/en-us/training/modules/create-question-answer-solution-ai-language/",
      },
    ],
    testingFocus: [
      "Key phrases, entities, sentiment, language detection, PII, translation, speech-to-text, text-to-speech, SSML, custom speech, intent, and keyword recognition.",
      "CLU intents/entities/utterances, custom question answering, multi-turn, alternate phrasing, chit-chat, export, and multilingual solutions.",
      "Custom translation training, improvement, and publishing.",
    ],
    services: [
      "Azure Language in Foundry Tools",
      "Azure Translator in Foundry Tools",
      "Azure Speech in Foundry Tools",
      "Conversational Language Understanding",
      "Custom Question Answering",
      "Custom Translator",
    ],
    useWhen: [
      "Use Language for text analytics, PII, NER, sentiment, CLU, and custom question answering.",
      "Use Speech for audio input/output, speech translation, custom speech, SSML, and keyword recognition.",
      "Use Translator when the primary requirement is translating text or documents.",
      "Use Azure OpenAI when the task is open-ended generation, summarization, or reasoning rather than a bounded NLP feature.",
    ],
    sdkConcepts: [
      "Prebuilt Language features are request/response; custom features require train, evaluate, deploy, and consume steps.",
      "CLU predicts intents and extracts entities from utterances.",
      "Speech SDK uses audio config, speech config, recognizers, and synthesizers.",
      "SSML controls voice, style, rate, pitch, pronunciation, and pauses.",
    ],
    traps: [
      "Language and Speech are different services even when both handle words.",
      "Custom question answering replaces old QnA Maker for new projects.",
      "PII detection can identify sensitive entities; redaction/anonymization behavior depends on feature and version.",
      "CLU is for intent and entity extraction, not free-form answer generation.",
    ],
    checklist: [
      "I can select Language, Speech, Translator, or Azure OpenAI from a scenario.",
      "I can explain prebuilt versus custom NLP features.",
      "I can design CLU intents, entities, and utterances.",
      "I can configure speech-to-text, text-to-speech, and SSML basics.",
      "I can describe custom question answering lifecycle and traps.",
    ],
  },
  {
    id: "knowledge-mining",
    title: "Implement knowledge mining and information extraction solutions",
    weight: "15-20%",
    accent: "#ec4899",
    summary:
      "Build Azure AI Search indexes, skillsets, indexers, knowledge stores, vector/semantic search, Document Intelligence, and Content Understanding extraction flows.",
    tiredSummary:
      "Take messy files, extract useful structure, index it, and make it searchable or ready for automation.",
    learnMaterials: [
      {
        label: "Official AI-102 study guide: Knowledge mining and extraction objectives",
        url: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102#implement-knowledge-mining-and-information-extraction-solutions-1520",
      },
      {
        label: "Implement knowledge mining with Azure AI Search",
        url: "https://learn.microsoft.com/en-us/training/paths/implement-knowledge-mining-azure-cognitive-search/",
      },
      {
        label: "Develop AI information extraction solutions in Azure",
        url: "https://learn.microsoft.com/en-us/training/paths/extract-data-from-forms-document-intelligence/",
      },
      {
        label: "Get started with AI-powered information extraction in Azure",
        url: "https://learn.microsoft.com/en-us/training/modules/get-started-information-extraction/",
      },
      {
        label: "Create a multimodal analysis solution with Azure Content Understanding",
        url: "https://learn.microsoft.com/en-us/training/modules/analyze-content-ai/",
      },
    ],
    testingFocus: [
      "Search resources, indexes, data sources, indexers, skillsets, custom skills, projections, query syntax, filtering, sorting, wildcards, semantic, and vector search.",
      "Document Intelligence prebuilt, custom, and composed models.",
      "Content Understanding for documents, images, videos, and audio with structured outputs.",
    ],
    services: [
      "Azure AI Search",
      "Azure Document Intelligence in Foundry Tools",
      "Azure Content Understanding in Foundry Tools",
      "Azure Blob Storage",
      "Azure Functions custom skills",
      "Foundry Models embeddings",
    ],
    useWhen: [
      "Use AI Search when the solution needs indexing, querying, RAG retrieval, filtering, or semantic/vector search.",
      "Use Document Intelligence for form-like documents, invoices, receipts, IDs, layouts, custom extraction, or composed models.",
      "Use Content Understanding when multimodal files need schema-aligned extraction, classification, summarization, or analyzer workflows.",
      "Use custom skills when built-in enrichments do not satisfy the pipeline requirement.",
    ],
    sdkConcepts: [
      "Indexes define fields; data sources point to content; indexers crawl and enrich; skillsets transform content.",
      "Vector fields require embeddings and vector search configuration.",
      "Queries can combine full-text, filters, sorting, semantic ranking, and vector similarity.",
      "Document Intelligence analysis returns structured fields, confidence, spans, tables, and bounding regions.",
    ],
    traps: [
      "Azure AI Search is not the same thing as Azure OpenAI; Search retrieves, OpenAI generates.",
      "Skillsets enrich content during indexing; query-time ranking is a separate concern.",
      "Use composed models when multiple custom document types need one endpoint.",
      "Content Understanding is broader than Document Intelligence because it covers multimodal content.",
    ],
    checklist: [
      "I can create the index, data source, indexer, and skillset story end to end.",
      "I can choose vector, semantic, hybrid, or keyword search.",
      "I can explain knowledge store projections.",
      "I can choose prebuilt, custom, or composed Document Intelligence models.",
      "I can place Content Understanding in a multimodal extraction architecture.",
    ],
  },
];
