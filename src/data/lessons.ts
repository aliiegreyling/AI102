import type { Lesson } from "../types";

export const lessons: Lesson[] = [
  {
    id: "pm-services",
    domainId: "plan-manage",
    title: "Choose the right Foundry service",
    explanation:
      "Start every architecture question by naming the user need: generate, retrieve, see, listen, translate, extract, or classify. Then choose the narrowest service that satisfies it with the least custom work.",
    microsoftTesting: [
      "Whether you can distinguish Language, Speech, Vision, Azure OpenAI, AI Search, Document Intelligence, and Content Understanding.",
      "Whether you recognize legacy wording and map it to current services.",
    ],
    csharp: `var endpoint = new Uri("https://<resource>.cognitiveservices.azure.com/");
var credential = new AzureKeyCredential("<key>");
// Most Azure AI SDK clients follow endpoint + credential construction.`,
    cheatSheet: [
      "Need generation or reasoning: Azure OpenAI in Foundry Models.",
      "Need retrieval or RAG grounding: Azure AI Search.",
      "Need document fields: Document Intelligence.",
      "Need multimodal extraction: Content Understanding.",
    ],
  },
  {
    id: "pm-secure",
    domainId: "plan-manage",
    title: "Secure, monitor, and govern AI resources",
    explanation:
      "Production AI solutions need identity, network controls, diagnostics, cost controls, and responsible AI policies. The exam often asks for the most secure or least operationally risky answer.",
    microsoftTesting: [
      "Keys versus Microsoft Entra ID and managed identity.",
      "Monitoring, diagnostic settings, resource costs, content safety, prompt shields, and governance.",
    ],
    csharp: `var credential = new DefaultAzureCredential();
// In production prefer a specific managed identity credential where possible.`,
    cheatSheet: [
      "Use Key Vault or managed identity instead of hard-coded keys.",
      "Turn on diagnostics and monitor consumption.",
      "Add content filtering, blocklists, and harm detection where users can submit content.",
    ],
  },
  {
    id: "gen-rag",
    domainId: "generative-ai",
    title: "Build a grounded RAG solution",
    explanation:
      "RAG retrieves relevant chunks from trusted data and injects them into the model prompt. It is the exam's favorite pattern for enterprise answers that must stay current without retraining.",
    microsoftTesting: [
      "Chunking, embeddings, vector indexes, hybrid retrieval, grounded prompts, citations, and evaluation.",
      "RAG versus fine-tuning versus prompt engineering.",
    ],
    csharp: `var messages = new[]
{
    new { role = "system", content = "Answer only from the supplied sources." },
    new { role = "user", content = "Sources: ...\\nQuestion: ..." }
};`,
    cheatSheet: [
      "Private facts change often: RAG.",
      "Output style needs examples: fine-tuning may help.",
      "Bad answers need structure: improve prompts and evaluation first.",
    ],
  },
  {
    id: "gen-operate",
    domainId: "generative-ai",
    title: "Operate generative AI in production",
    explanation:
      "Operational generative AI is about repeatability: prompt templates, parameters, tracing, evaluations, user feedback, monitoring, scaling, and cost.",
    microsoftTesting: [
      "Temperature, top-p, max tokens, model deployments, tracing, monitoring, diagnostics, and feedback loops.",
      "How prompt flow and Foundry projects support model evaluation and application integration.",
    ],
    csharp: `// Pseudocode shape: call a deployed model, not just a model family.
var deploymentName = "gpt-4o-mini-prod";
var prompt = "Summarize this support ticket in JSON.";`,
    cheatSheet: [
      "Lower temperature for repeatability.",
      "Trace multi-step flows.",
      "Monitor latency, failures, token usage, and content filter events.",
    ],
  },
  {
    id: "agent-basics",
    domainId: "agentic",
    title: "Agent anatomy",
    explanation:
      "An agent combines a model, instructions, tools, and state so it can complete a goal. The exam wants you to know when that extra autonomy is useful and when plain chat is enough.",
    microsoftTesting: [
      "The role and use cases of agents.",
      "Foundry Agent Service, Microsoft Agent Framework, tools, sessions, multi-agent workflows, and deployment.",
    ],
    csharp: `var project = new AIProjectClient(
    new Uri("<foundry-project-endpoint>"),
    new DefaultAzureCredential());
// Microsoft Agent Framework can wrap Foundry project endpoints as agents.`,
    cheatSheet: [
      "Need tool use and goal completion: agent.",
      "Need simple response: chat completion.",
      "Need versioned hosted agent definitions: Foundry Agent Service.",
    ],
  },
  {
    id: "agent-guardrails",
    domainId: "agentic",
    title: "Design agent guardrails",
    explanation:
      "Agents can take actions, so their tools need permissions, input validation, audit logs, limits, and human approval for risky operations.",
    microsoftTesting: [
      "Secure and observable tool calling.",
      "Testing, optimizing, deploying, and governing autonomous workflows.",
    ],
    cheatSheet: [
      "Scope tools tightly.",
      "Validate tool arguments.",
      "Log decisions and tool outputs.",
      "Add human approval for destructive or costly actions.",
    ],
  },
  {
    id: "vision-analysis",
    domainId: "vision",
    title: "Analyze images and OCR",
    explanation:
      "Image Analysis returns visual features such as tags, captions, objects, and text. Ask what the application needs to know, then select only the required features.",
    microsoftTesting: [
      "Visual features, request construction, response interpretation, OCR, and handwriting.",
      "When OCR should move from Vision to Document Intelligence.",
    ],
    csharp: `var features = VisualFeatures.Caption | VisualFeatures.Tags | VisualFeatures.Objects;
// Send only the features required by the scenario.`,
    cheatSheet: [
      "General image: Vision.",
      "Form or table document: Document Intelligence.",
      "Need boxes: object detection or OCR line geometry.",
    ],
  },
  {
    id: "vision-custom-video",
    domainId: "vision",
    title: "Custom vision and video",
    explanation:
      "Classification labels a whole image. Object detection finds and locates objects. Video Indexer extracts video insights; spatial analysis detects people presence and movement.",
    microsoftTesting: [
      "Classification versus object detection.",
      "Label, train, evaluate, publish, and consume custom models.",
      "Video Indexer versus spatial analysis.",
    ],
    cheatSheet: [
      "Whole image label: classification.",
      "Coordinates: object detection.",
      "Video metadata: Video Indexer.",
      "People movement: spatial analysis.",
    ],
  },
  {
    id: "nlp-text",
    domainId: "nlp",
    title: "Analyze text and translate",
    explanation:
      "Azure Language handles bounded NLP tasks such as key phrases, entities, sentiment, language detection, and PII. Translator handles translation. Azure OpenAI handles open-ended generation.",
    microsoftTesting: [
      "Service selection among Language, Translator, Speech, and Azure OpenAI.",
      "Prebuilt versus custom features.",
    ],
    csharp: `var credential = new AzureKeyCredential("<key>");
var client = new TextAnalyticsClient(new Uri("<endpoint>"), credential);
var result = await client.RecognizePiiEntitiesAsync("Call Alex at 555-0100");`,
    cheatSheet: [
      "Sensitive text: PII detection.",
      "Intent and slots: CLU.",
      "FAQ knowledge base: custom question answering.",
      "Translate document: Translator.",
    ],
  },
  {
    id: "nlp-speech-custom",
    domainId: "nlp",
    title: "Speech and custom language models",
    explanation:
      "Speech SDK turns audio into text and text into audio. SSML controls voice output. Custom Language and Speech features require a lifecycle: create, train, evaluate, deploy, and consume.",
    microsoftTesting: [
      "Speech-to-text, text-to-speech, speech translation, SSML, custom speech, intent, and keyword recognition.",
      "CLU, custom question answering, multi-turn, alternate phrasing, chit-chat, export, and multilingual solutions.",
    ],
    csharp: `var config = SpeechConfig.FromSubscription("<key>", "<region>");
using var synthesizer = new SpeechSynthesizer(config);
await synthesizer.SpeakSsmlAsync("<speak version='1.0'><voice name='en-US-AvaNeural'>Hello</voice></speak>");`,
    cheatSheet: [
      "Audio input: Speech.",
      "Voice style/rate/pitch: SSML.",
      "Intent prediction: CLU.",
      "Knowledge-base answers: custom question answering, not old QnA Maker.",
    ],
  },
  {
    id: "km-search",
    domainId: "knowledge-mining",
    title: "Build Azure AI Search pipelines",
    explanation:
      "AI Search has a resource, index, data source, indexer, and optional skillset. For RAG, add embeddings and vector or hybrid search so the model receives grounded context.",
    microsoftTesting: [
      "Index fields, data sources, indexers, skillsets, custom skills, knowledge store projections, and query syntax.",
      "Semantic, vector, hybrid, filtering, sorting, and wildcards.",
    ],
    csharp: `// Query shape: search text plus optional filter, orderby, semantic, or vector query.
var searchText = "policy renewal";
var filter = "category eq 'insurance'";`,
    cheatSheet: [
      "Index defines searchable fields.",
      "Indexer pulls data.",
      "Skillset enriches data.",
      "Vector search finds semantic similarity.",
    ],
  },
  {
    id: "km-extract",
    domainId: "knowledge-mining",
    title: "Extract information from documents and multimodal content",
    explanation:
      "Document Intelligence extracts structured fields from documents. Content Understanding handles broader multimodal content and can output schema-aligned results for automation or agents.",
    microsoftTesting: [
      "Prebuilt, custom, and composed Document Intelligence models.",
      "OCR pipelines, classification, summarization, entities, tables, images, and multimodal ingestion with Content Understanding.",
    ],
    csharp: `var client = new DocumentAnalysisClient(
    new Uri("<endpoint>"),
    new AzureKeyCredential("<key>"));
// Analyze with prebuilt or custom model IDs depending on the scenario.`,
    cheatSheet: [
      "Invoice/receipt/ID/layout: Document Intelligence.",
      "Multiple custom document types: composed model.",
      "Documents plus images/video/audio: Content Understanding.",
      "Searchable enriched corpus: AI Search plus skillsets.",
    ],
  },
];
