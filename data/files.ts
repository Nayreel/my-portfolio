import { PortfolioFile, TerminalCommandHelp } from "./types";

export const PORTFOLIO_FILES: PortfolioFile[] = [
  {
    id: "bio.tsx",
    name: "bio.tsx",
    path: "about/bio.tsx",
    folder: "about",
    icon: "FileCode2",
    language: "typescript",
    description:
      "Personal intro, engineering pillars, and background of Lee Ryan M. Garcia",
    previewType: "bio",
    metadata: { lines: 72, size: "2.6 KB", lastModified: "Today" },
    code: `import { DeveloperProfile } from '@/data';

export const LeeRyanProfile: DeveloperProfile = {
  name: "Lee Ryan M. Garcia",
  title: "Software Engineer | Full-Stack & Automation Developer",
  location: "Olongapo City, Zambales, Philippines",
  status: "Available for Software Engineering & Automation Opportunities",
  
  philosophy: {
    automationFirst: "Automate repetitive processes with n8n and robust ERP/CRM integrations.",
    craftsmanship: "Deliver responsive, high-performance web applications with Next.js and Tailwind CSS.",
    reliability: "Build scalable systems that streamline business operations and customer satisfaction."
  },

  highlights: [
    "Software Engineer at JAV Resource Corp creating n8n workflows for Odoo, Strapi, and Next.js e-commerce",
    "Technical Support Representative at Buwelo with expertise in Azure, Microsoft 365, and SaaS systems",
    "Frontend Developer at Hokei Subic Corporation building real-time applications with Next.js & Socket.io",
    "BSIT Graduate (Cum Laude, Dean's Lister) from Gordon College with recognized Capstone project"
  ],

  contact: {
    email: "leeryan307@gmail.com",
    phone: "+63 929-834-1434",
    github: "github.com/Nayreel",
    linkedin: "linkedin.com/in/el015"
  }
};

export default function AboutHero() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Building Scalable Web Applications & Automated Workflows
      </h1>
      <p className="text-zinc-400 leading-relaxed text-base">
        Welcome to my interactive developer portfolio styled as a full-featured IDE. 
        Explore my production projects, inspect the source code, run commands in the terminal, 
        or chat with my Gemini AI Assistant!
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
    description:
      "Showcase of AI Energy Shop, Feedback Fusion, Iontana, and client projects",
    previewType: "projects",
    metadata: { lines: 98, size: "4.4 KB", lastModified: "Today" },
    code: `import { Project } from '@/data';

export const FlagshipProjects: Project[] = [
  {
    id: 0,
    name: "AI Energy Shop",
    role: "Software Engineer",
    tech: ["Next.js", "n8n", "Tailwind CSS", "Redux"],
    url: "https://aienergyshop.com.au",
    highlights: "Australian solar & battery e-commerce platform with automated ERP/CRM sync.",
    status: "Production Live"
  },
  {
    id: 1,
    name: "Feedback Fusion",
    role: "Capstone Project (Cum Laude)",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tableau"],
    url: "https://feedbackfusion.vercel.app",
    highlights: "Customer feedback sentiment analysis & QR generator pitched at PSC8 & IRCITE.",
    status: "Award-Winning Capstone"
  },
  {
    id: 2,
    name: "Iontana",
    role: "Project with Client",
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Shadcn UI", "n8n", "VAPI"],
    url: "https://www.iontana.com",
    highlights: "Scalable modern website integrated with VAPI real-time AI Voice Support.",
    status: "Production Live"
  }
];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-border/40 rounded-xl p-6 bg-card/50 backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sky-400 text-xs">
          Visit Live Site ↗
        </a>
      </div>
      <p className="text-sm text-zinc-400 mt-2">{project.des || project.description}</p>
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
    description:
      "Professional timeline at JAV Resource Corp, Buwelo, and Hokei Subic",
    previewType: "experience",
    metadata: { lines: 85, size: "3.8 KB", lastModified: "Today" },
    code: `import { ExperienceRecord } from '@/types/career';

export const CareerTimeline: ExperienceRecord[] = [
  {
    company: "JAV Resource Corporation",
    role: "Software Engineer",
    period: "Nov. 2025 – Present (Olongapo City, Philippines)",
    impact: [
      "Design and implement automated workflows with n8n to integrate Odoo and Strapi CRM",
      "Develop and maintain scalable Next.js e-commerce website for online ordering",
      "Optimize website features to enhance system reliability and customer experience"
    ]
  },
  {
    company: "Buwelo - An Exactstar Company",
    role: "Technical Support Representative (CSR - Cloud Technical Support)",
    period: "Oct. 2024 – Oct. 2025 (SBFZ Subic Bay, Philippines)",
    impact: [
      "Provided remote technical support for cloud SaaS apps using Remote Desktop, M365, Zendesk, and Azure",
      "Diagnosed and resolved networking, software, printer, and Microsoft/cloud account issues"
    ]
  },
  {
    company: "Hokei Subic Corporation",
    role: "Frontend Developer",
    period: "Feb. 2024 – July 2024 (SBFZ Subic Bay, Philippines)",
    impact: [
      "Developed responsive web applications using Next.js, Tailwind CSS, and Socket.io with REST APIs",
      "Promoted from intern to full-time frontend developer through strong coding performance and delivery"
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
      "Engineering stack in Next.js, TypeScript, PostgreSQL, NestJS, n8n, and Docker",
    previewType: "skills",
    metadata: { lines: 52, size: "1.9 KB", lastModified: "Today" },
    code: `{
  "developer": "Lee Ryan M. Garcia",
  "title": "Software Engineer",
  "engineeringStack": {
    "frontend": [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "shadcn/ui",
      "GSAP Animations",
      "Aceternity UI",
      "HTML5 & CSS3",
      "Redux"
    ],
    "backendAndData": [
      "Node.js",
      "Express.js",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "MongoDB",
      "MySQL",
      "Socket.io (WebSockets)",
      "Redis"
    ],
    "apisAndAutomation": [
      "REST APIs",
      "GraphQL",
      "n8n Workflow Automation",
      "Webhooks & Event Streams",
      "Odoo ERP",
      "Strapi CRM",
      "VAPI AI Voice",
      "Shopify API",
      "Cloudinary"
    ],
    "infrastructureAndDevOps": [
      "Git & GitHub",
      "GitHub Actions (CI/CD)",
      "Docker",
      "Vercel",
      "Railway",
      "Render",
      "Microsoft Azure",
      "Postman"
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
    description: "Direct contact channels, email dispatch, and LinkedIn links",
    previewType: "contact",
    metadata: { lines: 66, size: "2.9 KB", lastModified: "Today" },
    code: `import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

export default function ContactModule() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    roleType: 'Software Engineer Role'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-card border border-border/50">
      <h2 className="text-2xl font-bold text-white">Let's Connect & Build Together</h2>
      <p className="text-zinc-400 text-sm mt-1">
        Reach out for Software Engineering opportunities, n8n automation, or web application development.
      </p>
      <div className="mt-4 space-y-2 text-xs text-zinc-300">
        <p>✉️ Email: leeryan307@gmail.com</p>
        <p>📞 Phone: +63 929-834-1434</p>
        <p>📍 Location: Olongapo City, Zambales, Philippines</p>
        <p>💼 LinkedIn: linkedin.com/in/el015</p>
      </div>
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
    description: "Official Curriculum Vitae of Lee Ryan M. Garcia",
    previewType: "resume",
    metadata: { lines: 115, size: "5.1 KB", lastModified: "Today" },
    code: `# LEE RYAN M. GARCIA
**Software Engineer | Full-Stack & Automation Developer**
📍 Olongapo City, Zambales, Philippines | 📞 +63 929-834-1434 | ✉️ leeryan307@gmail.com | 💼 [linkedin.com/in/el015](https://linkedin.com/in/el015) | 🌐 [github.com/Nayreel](https://github.com/Nayreel)

---

## 🎯 Professional Summary
Software Engineer with strong experience in building scalable web applications with Next.js, automating business workflows using n8n, integrating ERP/CRM systems (Odoo, Strapi), and delivering high-performance full-stack solutions. Proven background in technical support, cloud services (Azure, M365), and real-time frontend architectures.

---

## 💼 Experience

### Software Engineer | JAV Resource Corp
*Olongapo City, Philippines | Nov. 2025 – Present*
- Design and implement automated workflows with n8n to integrate Odoo and Strapi CRM, ensuring seamless data synchronization across platforms.
- Help develop and maintain a scalable Next.js e-commerce website that enables customers to conveniently place orders online, supporting sales operations and expanding digital sales channels.
- Develop and optimize website features that improve reliability, customer experience, and the overall online ordering process.

### Technical Support Representative (CSR - Cloud Technical Support) | Buwelo - An Exactstar Company
*SBFZ Subic Bay, Philippines | Oct. 2024 – Oct. 2025*
- Assisted customers via phone call by fixing technical problems through remote access, using tools like Remote Desktop, Microsoft 365, Zendesk, and Azure for cloud-based applications.
- Applied problem-solving and logical thinking to fix issues with networks, printers, software (installing/updating), and both Microsoft and cloud accounts.

### Frontend Developer | Hokei Subic Corporation
*SBFZ Subic Bay, Philippines | Feb. 2024 – July 2024*
- Developed responsive web applications using Next.js, Tailwind CSS, and Socket.io with REST API methods.
- Promoted from intern to full-time frontend developer by demonstrating strong coding skills, problem-solving abilities, and delivering features on time.
- Integrated frontend interfaces with server-side machine learning components.

---

## 🎓 Education

### Gordon College
**Bachelor of Science in Information Technology (BSIT)**  
*Olongapo City, Philippines | Graduated July 2024*
- **Awards:** Cum Laude, Dean’s Lister
- **Relevant Coursework:** Web Development, System Administration, Networking
- **Capstone Title:** Feedback Fusion: Empowering Feedback Management with Consumer Insights Using Tableau

---

## 🏆 Conferences & Competitions
- **Philippine Startup Challenge 8 (PSC8) - Regional Pitching Competition** (Oct 04, 2023) — Pitched capstone project (Feedback Fusion) hosted by the ICT Industry Development Bureau.
- **International Research Conference on Information Technology Education (IRCITE) - Poster Presentation** (March 08, 2024) — Invited by PSITE-Central Luzon to showcase capstone research.

---

## 🛠️ Skills & Tech Stack
- **Frontend:** HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, GSAP, Shadcn UI, Aceternity UI, Redux
- **Backend & Databases:** MongoDB, MySQL, PostgreSQL, Prisma, Node.js, NestJS, Express.js, Socket.io
- **APIs & Integrations:** GraphQL, REST API, Shopify, n8n, Cloudinary, VAPI
- **DevOps & Infrastructure:** Docker, Git, GitHub Actions, Microsoft Azure, Vercel, Railway, Render, DigitalOcean
- **Tools & Software:** Visual Studio Code, Cursor, GitHub, Postman, MongoDB Compass, Trello, Figma, Docker Desktop
- **Languages:** English, Tagalog`,
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
    metadata: { lines: 42, size: "1.4 KB", lastModified: "Today" },
    code: `{
  "name": "lee-ryan-garcia-portfolio",
  "version": "2.0.0",
  "private": true,
  "description": "Interactive IDE-themed developer portfolio for Lee Ryan M. Garcia built with Next.js 16 and React 19.",
  "author": "Lee Ryan M. Garcia <leeryan307@gmail.com>",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "lucide-react": "^1.34.0",
    "motion": "^13.1.1",
    "next": "16.3.2",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-resizable-panels": "^4.12.3",
    "shadcn": "^4.19.0",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "16.3.2",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.9.3"
  }
}`,
  },
  {
    id: "config.ts",
    name: "config.ts",
    path: "config.ts",
    folder: "root",
    icon: "Settings",
    language: "typescript",
    description: "Portfolio IDE workspace settings, developer profile configuration, and AI assistant parameters",
    previewType: "config",
    metadata: { lines: 45, size: "1.5 KB", lastModified: "Today" },
    code: `export interface IDEConfig {
  workspace: {
    name: string;
    version: string;
    developer: string;
    role: string;
    environment: "production" | "development";
    liveUrl: string;
    repository: string;
  };
  theme: {
    defaultMode: string;
    accentColors: Record<string, string>;
    editor: {
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
      tabSize: number;
      minimap: boolean;
      bracketPairColorization: boolean;
      smoothScrolling: boolean;
    };
  };
  features: {
    terminal: boolean;
    aiAssistant: boolean;
    gravityPhysics: boolean;
    gitStats: boolean;
    soundEffects: boolean;
  };
  aiAssistant: {
    provider: string;
    model: string;
    temperature: number;
    capabilities: string[];
  };
}

export const portfolioConfig: IDEConfig = {
  workspace: {
    name: "Portfolio IDE",
    version: "2.4.0-production",
    developer: "Lee Ryan M. Garcia",
    role: "Full-Stack Developer & Automation Engineer",
    environment: "production",
    liveUrl: "https://leeryan.dev",
    repository: "https://github.com/Nayreel/my-portfolio",
  },
  theme: {
    defaultMode: "dark-nebula",
    accentColors: {
      cyan: "#38bdf8",
      emerald: "#10b981",
      purple: "#a855f7",
      amber: "#f59e0b",
      rose: "#f43f5e",
    },
    editor: {
      fontFamily: "JetBrains Mono, Fira Code, monospace",
      fontSize: 13,
      lineHeight: 1.6,
      tabSize: 2,
      minimap: true,
      bracketPairColorization: true,
      smoothScrolling: true,
    },
  },
  features: {
    terminal: true,
    aiAssistant: true,
    gravityPhysics: true,
    gitStats: true,
    soundEffects: false,
  },
  aiAssistant: {
    provider: "Google AI",
    model: "gemini-3.7-flash",
    temperature: 0.7,
    capabilities: [
      "code-explanation",
      "project-deepdive",
      "tech-stack-analysis",
      "interactive-qa",
      "resume-query",
    ],
  },
};`,
  },
];

export const TERMINAL_COMMANDS_HELP: TerminalCommandHelp[] = [
  { cmd: "help", desc: "List all available terminal commands" },
  { cmd: "bio", desc: "Print Lee Ryan Garcia developer profile & bio" },
  { cmd: "projects", desc: "List all 9 featured & client projects" },
  { cmd: "skills", desc: "Display frontend, backend & automation skills" },
  { cmd: "experience", desc: "View career history (JAV, Buwelo, Hokei)" },
  { cmd: "conferences", desc: "View research conferences & PSC8 pitch events" },
  { cmd: "contact", desc: "Get email, phone, GitHub, LinkedIn info" },
  { cmd: "cat resume.md", desc: "Print formal CV markdown to terminal" },
  { cmd: "cat package.json", desc: "Display dependencies & scripts" },
  { cmd: "cat config.ts", desc: "Display IDE & AI assistant settings" },
  {
    cmd: "fly",
    desc: "Toggle zero-gravity floating physics mode",
  },
  { cmd: "theme [cyan|emerald|purple|amber]", desc: "Switch IDE accent color" },
  { cmd: "neofetch", desc: "Display developer system specs and stats" },
  { cmd: "clear", desc: "Clear terminal buffer" },
];
