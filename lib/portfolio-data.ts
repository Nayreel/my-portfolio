// lib/portfolio-data.ts

export interface PortfolioFile {
  id: string;
  name: string;
  path: string;
  folder: string;
  icon: string;
  language: string;
  description: string;
  code: string;
  previewType:
    | "bio"
    | "projects"
    | "experience"
    | "skills"
    | "contact"
    | "resume"
    | "config"
    | "playground"
    | "package";
  metadata?: {
    lines?: number;
    size?: string;
    lastModified?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category:
    | "AI & ML"
    | "Full-Stack Web"
    | "Cloud & Systems"
    | "Developer Tools";
  tags: string[];
  metrics: { label: string; value: string }[];
  featured: boolean;
  githubUrl: string;
  liveUrl: string;
  stars: number;
  forks: number;
  highlightCode: string;
  demoComponent?: string;
  imageColor: string;
  accent: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  technologies: string[];
  logoText: string;
  badgeColor: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    experience: string;
    favorite?: boolean;
  }[];
}

export const DEVELOPER_PROFILE = {
  name: "Lee Ryan Garcia",
  title: "Senior Full-Stack & AI Systems Engineer",
  handle: "alexvance.dev",
  email: "alex.vance.dev@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://x.com",
  location: "San Francisco, CA (Open to Remote)",
  status: "Available for high-impact opportunities & consulting",
  bio: "Architecting scalable web applications, real-time distributed systems, and agentic AI pipelines with Next.js, TypeScript, Go, and LLMs. Passionate about developer tooling, sub-millisecond UX, and human-AI interfaces.",
  stats: [
    { label: "Years Experience", value: "7+" },
    { label: "Production Apps Shipped", value: "34+" },
    { label: "GitHub Stars", value: "4.8k+" },
    { label: "System Uptime Managed", value: "99.99%" },
  ],
  education: [
    {
      degree: "B.S. in Computer Science & AI",
      school: "UC Berkeley",
      period: "2015 - 2019",
      honors: "Magna Cum Laude, Dean's Honors List",
    },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "antigravity-os",
    title: "Antigravity OS & Agentic Workspace",
    tagline:
      "Next-gen developer cockpit with real-time multi-agent reasoning and browser execution",
    description:
      "An AI-powered development environment featuring autonomous multi-step code reasoning, live in-browser terminal runtime, dynamic AST visualizers, and zero-latency collaborative canvas.",
    category: "Developer Tools",
    tags: [
      "Next.js 15",
      "TypeScript",
      "WebContainers",
      "Gemini 2.5/3.7",
      "Tailwind CSS",
      "WebSockets",
    ],
    metrics: [
      { label: "Active Devs", value: "18,400+" },
      { label: "Latency", value: "<120ms" },
      { label: "GitHub Stars", value: "2.3k" },
    ],
    featured: true,
    githubUrl: "https://github.com/alexvance/antigravity-os",
    liveUrl: "https://antigravity-os.demo.dev",
    stars: 2310,
    forks: 342,
    imageColor: "from-blue-600/30 via-indigo-600/20 to-purple-600/30",
    accent: "#38bdf8",
    highlightCode: `// Antigravity Agent Runtime Dispatcher
export async function dispatchAgentWorkflow(task: DevTask): Promise<ExecutionResult> {
  const orchestrator = new AgentOrchestrator({
    model: 'gemini-3.7-flash',
    tools: [astRefactorTool, terminalExecTool, testRunnerTool],
  });
  
  const reasoningPlan = await orchestrator.createExecutionGraph(task);
  return await orchestrator.executeParallel(reasoningPlan);
}`,
  },
  {
    id: "neural-flow-agents",
    title: "NeuralFlow - Multi-Agent Engine",
    tagline:
      "High-throughput graph orchestrator for autonomous AI workflows with human-in-the-loop validation",
    description:
      "Built a distributed orchestration engine handling 50k+ daily autonomous tasks. Implemented state checkpointing, semantic vector routing, and interactive visual debugging tree.",
    category: "AI & ML",
    tags: [
      "Go",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Vector DB",
      "Docker",
    ],
    metrics: [
      { label: "Tasks / Day", value: "52,000+" },
      { label: "Token Efficiency", value: "+38%" },
      { label: "GitHub Stars", value: "1.5k" },
    ],
    featured: true,
    githubUrl: "https://github.com/alexvance/neural-flow",
    liveUrl: "https://neuralflow.ai",
    stars: 1540,
    forks: 189,
    imageColor: "from-emerald-600/30 via-teal-600/20 to-cyan-600/30",
    accent: "#34d399",
    highlightCode: `// NeuralFlow DAG node execution
func (dag *WorkflowDAG) ExecuteNode(ctx context.Context, node *TaskNode) (*NodeResult, error) {
    span, ctx := tracer.StartSpanFromContext(ctx, "dag.node.eval")
    defer span.Finish()
    
    inputs := dag.resolveStateInputs(node.Dependencies)
    return node.Evaluator.Run(ctx, inputs)
}`,
  },
  {
    id: "hyper-scale-db",
    title: "HyperScale Synapse DB",
    tagline:
      "Edge-replicated key-value & time-series cache with sub-millisecond p99 latency",
    description:
      "Architected a lightweight in-memory storage layer designed for real-time multiplayer states, WebRTC signaling, and high-frequency telemetry streaming across 14 edge POPs.",
    category: "Cloud & Systems",
    tags: ["Rust", "TypeScript", "WebRTC", "Fly.io", "eBPF", "Raft Consensus"],
    metrics: [
      { label: "p99 Read Latency", value: "0.84ms" },
      { label: "Throughput", value: "240k req/s" },
      { label: "Edge Nodes", value: "14 POPs" },
    ],
    featured: true,
    githubUrl: "https://github.com/alexvance/hyperscale-synapse",
    liveUrl: "https://synapsedb.dev",
    stars: 870,
    forks: 94,
    imageColor: "from-amber-600/30 via-orange-600/20 to-red-600/30",
    accent: "#fbbf24",
    highlightCode: `// Rust Raft Log Replicator
pub async fn replicate_entry(&self, entry: LogEntry) -> Result<Index, RaftError> {
    let quorum = (self.peers.len() / 2) + 1;
    let acks = self.broadcast_append_entries(&entry).await?;
    if acks.len() >= quorum {
        self.commit_index.store(entry.index, Ordering::Release);
        Ok(entry.index)
    } else {
        Err(RaftError::QuorumFailed)
    }
}`,
  },
  {
    id: "creative-vision-ui",
    title: "VisionCraft Studio",
    tagline:
      "Generative UI studio transforming wireframes and voice into production React apps",
    description:
      "Visual design canvas that compiles multimodal design instructions into strict TypeScript Next.js components with automatic accessibility checks and Tailwind styling.",
    category: "Full-Stack Web",
    tags: [
      "React 19",
      "Next.js",
      "Tailwind CSS",
      "Canvas API",
      "Gemini Multimodal",
    ],
    metrics: [
      { label: "Components Gen", value: "120k+" },
      { label: "User Rating", value: "4.9/5" },
      { label: "Stars", value: "980" },
    ],
    featured: false,
    githubUrl: "https://github.com/alexvance/visioncraft-studio",
    liveUrl: "https://visioncraft.studio",
    stars: 980,
    forks: 112,
    imageColor: "from-purple-600/30 via-pink-600/20 to-rose-600/30",
    accent: "#e879f9",
    highlightCode: `export function compileVisualNodeToAST(node: CanvasElement): ReactASTNode {
  return {
    type: 'JSXElement',
    name: node.semanticTag,
    attributes: computeTailwindClasses(node.styleProperties),
    children: node.nestedChildren.map(compileVisualNodeToAST)
  };
}`,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Lead Software & AI Systems Engineer",
    company: "Aether AI Labs",
    location: "San Francisco, CA",
    period: "2023 - Present",
    type: "Full-Time",
    highlights: [
      "Led team of 8 engineers building next-generation Agentic IDE infrastructure and autonomous coding copilots.",
      "Engineered real-time code analysis pipeline processing 2M+ lines/second with zero UI stuttering.",
      "Reduced model inference latency by 45% via dynamic prompt caching and speculative token decoding.",
      "Architected enterprise RBAC security protocols and multi-tenant sandboxed execution clusters on Kubernetes.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "Kubernetes",
      "Gemini API",
      "Go",
      "Docker",
    ],
    logoText: "⚡ AE",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    role: "Senior Full-Stack Engineer",
    company: "Veloce Cloud Platform",
    location: "San Francisco, CA",
    period: "2021 - 2023",
    type: "Full-Time",
    highlights: [
      "Redesigned the core web console and deployment pipeline, cutting page load time from 3.2s to 420ms.",
      "Developed interactive terminal and metrics telemetry dashboards streaming 100k+ events/sec via WebSockets.",
      "Mentored 6 junior/mid-level engineers and established TypeScript & Next.js frontend engineering guidelines.",
      "Pioneered automated end-to-end testing suite achieving 92% code coverage across critical billing flows.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
    ],
    logoText: "☁️ VC",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    role: "Software Engineer",
    company: "Nexus Interactive",
    location: "San Jose, CA",
    period: "2019 - 2021",
    type: "Full-Time",
    highlights: [
      "Built collaborative rich-text and visual diagramming canvas used by 250,000+ monthly active creators.",
      "Engineered CRDT operational transformation algorithms for conflict-free multi-user document editing.",
      "Integrated payment gateways and billing webhooks processing over $12M in annual recurring revenue.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "WebSockets",
      "CRDTs",
      "Node.js",
      "AWS",
      "Jest",
    ],
    logoText: "🔷 NX",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    icon: "Code2",
    skills: [
      {
        name: "TypeScript / JavaScript",
        level: 98,
        experience: "7+ yrs",
        favorite: true,
      },
      {
        name: "React 19 & Next.js App Router",
        level: 96,
        experience: "6+ yrs",
        favorite: true,
      },
      { name: "Python (FastAPI, PyTorch)", level: 88, experience: "5+ yrs" },
      { name: "Go (Golang)", level: 85, experience: "4+ yrs" },
      { name: "Rust", level: 78, experience: "2+ yrs" },
      {
        name: "HTML5 / Modern CSS / Tailwind CSS v4",
        level: 96,
        experience: "7+ yrs",
      },
    ],
  },
  {
    category: "AI, Agents & ML",
    icon: "Bot",
    skills: [
      {
        name: "Gemini API (3.7 / 2.5 / Flash)",
        level: 96,
        experience: "2+ yrs",
        favorite: true,
      },
      {
        name: "Autonomous Agent Architectures",
        level: 92,
        experience: "2+ yrs",
        favorite: true,
      },
      { name: "RAG & Vector Embeddings", level: 90, experience: "2+ yrs" },
      {
        name: "Prompt Engineering & Function Calling",
        level: 95,
        experience: "3+ yrs",
      },
      {
        name: "LangChain / LlamaIndex / GenAI SDK",
        level: 88,
        experience: "2+ yrs",
      },
      {
        name: "Multimodal Processing (Audio/Vision)",
        level: 86,
        experience: "2+ yrs",
      },
    ],
  },
  {
    category: "Backend & Systems",
    icon: "Server",
    skills: [
      { name: "Node.js / Express / Fastify", level: 94, experience: "7+ yrs" },
      {
        name: "PostgreSQL & Drizzle / Prisma ORM",
        level: 90,
        experience: "6+ yrs",
        favorite: true,
      },
      { name: "Redis & In-Memory Caching", level: 88, experience: "5+ yrs" },
      {
        name: "WebSockets & WebRTC Signaling",
        level: 90,
        experience: "4+ yrs",
      },
      { name: "REST / GraphQL / gRPC APIs", level: 92, experience: "6+ yrs" },
      {
        name: "Cloud SQL & Firebase Firestore",
        level: 88,
        experience: "4+ yrs",
      },
    ],
  },
  {
    category: "DevOps & Tooling",
    icon: "Wrench",
    skills: [
      { name: "Docker & Containerization", level: 90, experience: "5+ yrs" },
      { name: "Kubernetes & Cloud Run / GCP", level: 85, experience: "4+ yrs" },
      { name: "CI/CD (GitHub Actions)", level: 92, experience: "6+ yrs" },
      {
        name: "Git, Monaco Editor & ASTs",
        level: 94,
        experience: "7+ yrs",
        favorite: true,
      },
      { name: "Vite, Turbopack, Webpack", level: 90, experience: "5+ yrs" },
      {
        name: "Linux Systems & Bash Scripting",
        level: 88,
        experience: "7+ yrs",
      },
    ],
  },
];

export const PORTFOLIO_FILES: PortfolioFile[] = [
  {
    id: "bio.tsx",
    name: "bio.tsx",
    path: "about/bio.tsx",
    folder: "about",
    icon: "FileCode2",
    language: "typescript",
    description: "Personal intro, core philosophy, and high-level background",
    previewType: "bio",
    metadata: { lines: 68, size: "2.4 KB", lastModified: "Today" },
    code: `import { DeveloperProfile, CoreSkillset, EngineeringPhilosophy } from '@/types/portfolio';

export const AlexVanceProfile: DeveloperProfile = {
  name: "Lee Ryan Garcia",
  title: "Senior Full-Stack & AI Systems Engineer",
  location: "San Francisco, CA (Open to Worldwide Remote)",
  status: "Available for high-impact roles & technical consulting",
  
  philosophy: {
    firstPrinciples: "Build tools that amplify human creativity and developer speed.",
    craftsmanship: "Pixel-perfect polish meets sub-100ms system latency.",
    architecture: "Modular, deterministic, and self-healing agentic systems."
  },

  highlights: [
    "7+ years architecting scalable full-stack web applications & distributed backends",
    "Specialized in AI-assisted developer environments, agentic DAGs & LLM tooling",
    "Shipped software powering 50k+ daily autonomous tasks with 99.99% reliability",
    "Passionate open-source contributor and UI/UX design enthusiast"
  ],

  contact: {
    email: "alex.vance.dev@gmail.com",
    github: "github.com/alexvance",
    linkedin: "linkedin.com/in/alexvance-dev"
  }
};

export default function AboutHero() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Crafting Next-Gen Developer & AI Experiences
      </h1>
      <p className="text-muted-foreground leading-relaxed text-base">
        Welcome to my Google Antigravity-powered interactive portfolio. Explore my code, 
        inspect live components, talk to my AI copilot, or test terminal commands below!
      </p>
    </section>
  );
}`,
  },
  {
    id: "projects.tsx",
    name: "featured-projects.tsx",
    path: "projects/featured-projects.tsx",
    folder: "projects",
    icon: "Rocket",
    language: "typescript",
    description: "Showcase of flagship open-source and production systems",
    previewType: "projects",
    metadata: { lines: 94, size: "4.1 KB", lastModified: "2 days ago" },
    code: `import { Project } from '@/lib/portfolio-data';

export const FlagshipProjects: Project[] = [
  {
    id: "antigravity-os",
    name: "Antigravity OS & Agentic Workspace",
    tech: ["Next.js 15", "TypeScript", "Gemini 3.7", "WebContainers", "Tailwind CSS"],
    stars: 2310,
    highlights: "Real-time AI IDE with autonomous code reasoning and sandboxed execution.",
    status: "Active & Production-Ready"
  },
  {
    id: "neural-flow-agents",
    name: "NeuralFlow Engine",
    tech: ["Go", "Python", "FastAPI", "Vector DB", "PostgreSQL"],
    stars: 1540,
    highlights: "Distributed multi-agent DAG runner handling 52,000+ daily complex jobs.",
    status: "Open Source"
  },
  {
    id: "hyper-scale-db",
    name: "HyperScale Synapse DB",
    tech: ["Rust", "TypeScript", "WebRTC", "Raft Consensus", "Fly.io"],
    stars: 870,
    highlights: "Sub-millisecond p99 latency edge state replicator across 14 locations.",
    status: "Beta"
  }
];

export function ProjectRenderer({ project }: { project: Project }) {
  return (
    <article className="border border-border/40 rounded-xl p-6 bg-card/50 backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{project.name}</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
          ★ {project.stars}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{project.highlights}</p>
    </article>
  );
}`,
  },
  {
    id: "experience.tsx",
    name: "career-history.tsx",
    path: "experience/career-history.tsx",
    folder: "experience",
    icon: "Briefcase",
    language: "typescript",
    description: "Professional timeline, leadership roles, and company impact",
    previewType: "experience",
    metadata: { lines: 82, size: "3.6 KB", lastModified: "3 days ago" },
    code: `import { ExperienceRecord } from '@/types/career';

export const CareerTimeline: ExperienceRecord[] = [
  {
    company: "Aether AI Labs",
    role: "Lead Software & AI Systems Engineer",
    period: "2023 - Present (SF, CA)",
    impact: [
      "Led team of 8 engineers building enterprise Agentic IDE and code-gen pipeline",
      "Decreased AI inference latency by 45% using speculative token streaming",
      "Engineered real-time AST analyzer processing 2M+ lines/second"
    ]
  },
  {
    company: "Veloce Cloud Platform",
    role: "Senior Full-Stack Engineer",
    period: "2021 - 2023 (SF, CA)",
    impact: [
      "Redesigned core web console, slashing load time from 3.2s to 420ms",
      "Engineered WebSocket telemetry dashboard streaming 100k+ events/sec",
      "Mentored junior engineers and created frontend architecture standards"
    ]
  },
  {
    company: "Nexus Interactive",
    role: "Software Engineer",
    period: "2019 - 2021 (San Jose, CA)",
    impact: [
      "Built collaborative canvas used by 250,000+ monthly active creators",
      "Engineered CRDT operational transformation algorithms for live co-editing"
    ]
  }
];`,
  },
  {
    id: "tech-stack.json",
    name: "tech-stack.json",
    path: "skills/tech-stack.json",
    folder: "skills",
    icon: "FileJson",
    language: "json",
    description:
      "Proficiencies, toolchains, databases, and architectural skills",
    previewType: "skills",
    metadata: { lines: 52, size: "1.9 KB", lastModified: "1 week ago" },
    code: `{
  "developer": "Lee Ryan Garcia",
  "skillMatrix": {
    "languages": [
      { "name": "TypeScript", "proficiency": 0.98, "years": 7 },
      { "name": "JavaScript (ESNext)", "proficiency": 0.98, "years": 7 },
      { "name": "Python", "proficiency": 0.88, "years": 5 },
      { "name": "Go", "proficiency": 0.85, "years": 4 },
      { "name": "Rust", "proficiency": 0.78, "years": 2 },
      { "name": "SQL / PostgreSQL", "proficiency": 0.92, "years": 6 }
    ],
    "ai_and_agents": [
      { "name": "Gemini 3.7 / 2.5 / Flash SDK", "proficiency": 0.96 },
      { "name": "Multi-Agent Graph Orchestration", "proficiency": 0.92 },
      { "name": "Vector Databases & Semantic Search", "proficiency": 0.90 },
      { "name": "Multimodal Input & Tool Calling", "proficiency": 0.95 }
    ],
    "frontend": [
      "Next.js 15 (App Router)",
      "React 19",
      "Tailwind CSS v4",
      "Framer Motion / Motion",
      "Monaco Editor & ASTs",
      "WebSockets / WebRTC"
    ],
    "backend_and_cloud": [
      "Node.js / Express / Fastify",
      "PostgreSQL / Drizzle ORM",
      "Redis / Memory Caching",
      "Docker / Kubernetes",
      "Google Cloud Platform (Cloud Run, Cloud SQL)",
      "CI/CD GitHub Actions"
    ]
  }
}`,
  },
  {
    id: "get-in-touch.tsx",
    name: "get-in-touch.tsx",
    path: "contact/get-in-touch.tsx",
    folder: "contact",
    icon: "Mail",
    language: "typescript",
    description: "Interactive contact channel and meeting scheduling",
    previewType: "contact",
    metadata: { lines: 64, size: "2.8 KB", lastModified: "Yesterday" },
    code: `import { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Calendar } from 'lucide-react';

export default function ContactModule() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', projectType: 'Full-time Role' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Connects to Next.js API or triggers interactive dispatch
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-card border border-border/50">
      <h2 className="text-2xl font-bold text-foreground">Let's Build Something Exceptional</h2>
      <p className="text-muted-foreground text-sm mt-1">
        Whether you have a groundbreaking AI project, a senior engineering role, or just want to chat tech.
      </p>
      {/* Interactive Form Component */}
    </div>
  );
}`,
  },
  {
    id: "resume.md",
    name: "resume.md",
    path: "resume/resume.md",
    folder: "resume",
    icon: "FileText",
    language: "markdown",
    description: "Complete formal curriculum vitae and achievement summary",
    previewType: "resume",
    metadata: { lines: 110, size: "4.8 KB", lastModified: "This week" },
    code: `# Lee Ryan Garcia
**Senior Full-Stack & AI Systems Engineer**
📍 San Francisco, CA | ✉️ alex.vance.dev@gmail.com | 🌐 alexvance.dev

---

## 🎯 Executive Summary
Full-Stack & Systems Engineer with 7+ years of experience architecting high-throughput web applications, AI-agent copilots, and real-time distributed platforms. Deep expertise in Next.js, TypeScript, Go, Python, and modern LLM orchestration.

---

## 💼 Work Experience

### Lead Software & AI Systems Engineer | Aether AI Labs (2023 - Present)
- Architected enterprise Agentic IDE supporting 50k+ daily autonomous tasks.
- Decreased LLM streaming latency by 45% via speculative token caching.
- Maintained 99.99% system availability across global Kubernetes clusters.

### Senior Full-Stack Engineer | Veloce Cloud Platform (2021 - 2023)
- Modernized core developer console, improving web vitals by 65%.
- Implemented real-time WebSocket telemetry engine handling 100k+ events/s.

### Software Engineer | Nexus Interactive (2019 - 2021)
- Built interactive canvas engine used by 250,000+ monthly active creators.
- Spearheaded CRDT-based operational transformation for collaborative documents.

---

## 🎓 Education
**UC Berkeley** — B.S. in Computer Science & AI (2015 - 2019)
*Magna Cum Laude, Dean's Honors List*

---

## 🛠️ Core Competencies
- **Languages:** TypeScript, JavaScript, Python, Go, Rust, SQL, HTML/CSS
- **Frameworks:** Next.js (App Router), React 19, FastAPI, Express, Tailwind CSS
- **AI / LLMs:** Gemini 3.7/2.5 SDK, Multi-Agent DAGs, RAG, Semantic Embeddings
- **Infrastructure:** Docker, Kubernetes, GCP, PostgreSQL, Redis, WebSockets, CI/CD`,
  },
  {
    id: "playground.tsx",
    name: "interactive-playground.tsx",
    path: "playground/interactive-playground.tsx",
    folder: "playground",
    icon: "Zap",
    language: "typescript",
    description:
      "Interactive code runner, zero-g physics switch, and bug hunter minigame",
    previewType: "playground",
    metadata: { lines: 75, size: "3.2 KB", lastModified: "Just now" },
    code: `// Google Antigravity IDE Interactive Playground
export interface PlaygroundFeatures {
  zeroGravityPhysics: boolean;
  liveCodeEvaluator: boolean;
  geminiLiveCopilot: boolean;
  terminalCommandRunner: boolean;
}

export function activateAntigravityMode() {
  console.log("🚀 Anti-Gravity engine ignited! Float away...");
  window.dispatchEvent(new CustomEvent('toggle-antigravity'));
}`,
  },
  {
    id: "package.json",
    name: "package.json",
    path: "package.json",
    folder: "root",
    icon: "Package",
    language: "json",
    description: "Project metadata, dependencies, and execution scripts",
    previewType: "package",
    metadata: { lines: 35, size: "1.1 KB", lastModified: "Aug 2026" },
    code: `{
  "name": "alex-vance-antigravity-portfolio",
  "version": "2.5.0",
  "private": true,
  "description": "Google Antigravity IDE Themed Next.js Developer Portfolio",
  "author": "Lee Ryan Garcia <alex.vance.dev@gmail.com>",
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.553.0",
    "motion": "^12.23.24",
    "next": "^15.4.9",
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "tailwind-merge": "^3.3.1",
    "canvas-confetti": "^1.9.4"
  }
}`,
  },
  {
    id: "antigravity.config.ts",
    name: "antigravity.config.ts",
    path: "antigravity.config.ts",
    folder: "root",
    icon: "Settings",
    language: "typescript",
    description: "Antigravity IDE theme, model settings, and layout parameters",
    previewType: "config",
    metadata: { lines: 30, size: "1.0 KB", lastModified: "Today" },
    code: `export const antigravityConfig = {
  ideName: "Antigravity IDE",
  engineVersion: "v0.9.4-preview",
  theme: {
    mode: "dark-nebula",
    accentColor: "#38bdf8", // Cyan-400
    editorFont: "JetBrains Mono, Fira Code, monospace",
    lineHeight: 1.6,
    minimap: true,
    bracketPairColorization: true,
  },
  aiAssistant: {
    defaultModel: "gemini-3.7-flash",
    temperature: 0.7,
    streamTokens: true,
    capabilities: ["code-explanation", "project-deepdive", "live-demo-trigger", "resume-query"]
  }
};`,
  },
];

export const TERMINAL_COMMANDS_HELP = [
  { cmd: "help", desc: "List all available terminal commands" },
  { cmd: "bio", desc: "Print executive background & developer profile" },
  { cmd: "projects", desc: "List flagship projects and tech stacks" },
  { cmd: "skills", desc: "Display core proficiencies and experience levels" },
  { cmd: "experience", desc: "View career history and leadership milestones" },
  { cmd: "contact", desc: "Get email, GitHub, LinkedIn & booking info" },
  { cmd: "cat resume.md", desc: "Print markdown resume content to console" },
  {
    cmd: "antigravity --fly",
    desc: "Toggle zero-gravity floating elements mode",
  },
  { cmd: "theme [cyan|emerald|purple|amber]", desc: "Switch IDE accent color" },
  { cmd: "neofetch", desc: "Display developer system specs and stats" },
  { cmd: "npm run test", desc: "Execute automated portfolio test suite" },
  {
    cmd: "npm run build",
    desc: "Trigger simulated production build + confetti",
  },
  { cmd: "clear", desc: "Clear terminal buffer" },
];
