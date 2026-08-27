import { DeveloperProfile } from "./types";

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: "Lee Ryan M. Garcia",
  title: "Software Engineer | Full-Stack & Automation",
  handle: "Nayreel",
  email: "leeryan307@gmail.com",
  phone: "+63 929-834-1434",
  github: "https://github.com/Nayreel",
  linkedin: "https://linkedin.com/in/el015",
  twitter: "https://x.com",
  location: "Olongapo City, Zambales, Philippines",
  status: "Available for Software Engineering & Automation Opportunities",
  resumePdfUrl: "/Lee_Ryan_Garcia_Resume.pdf",
  bio: "Full-stack developer building production-ready web applications, automation workflows, and business systems with Next.js, React, TypeScript, and n8n. I focus on turning complex business processes into reliable, scalable software.",
  stats: [
    { label: "Projects Shipped", value: "10+" },
    { label: "Integrations Built", value: "15+" },
    { label: "Production Systems", value: "6+" },
    { label: "Tech Stacks", value: "25+" },
  ],
  whatICanBuild: [
    {
      title: "Web Applications",
      subtitle:
        "SaaS platforms, dashboards, e-commerce, and high-conversion client sites",
      description:
        "Architecting modern, performant web applications with responsive design, state management, and optimized SEO.",
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux"],
    },
    {
      title: "Business Process Automation",
      subtitle: "n8n workflows, API pipelines, and CRM/ERP integrations",
      description:
        "Connecting disparate business systems (Odoo, Strapi, webhooks) to eliminate manual data entry and streamline operations.",
      skills: ["n8n", "Webhooks", "REST APIs", "Odoo ERP", "Strapi"],
    },
    {
      title: "Backend & Systems",
      subtitle:
        "REST/GraphQL APIs, relational databases, caching, and real-time protocols",
      description:
        "Designing scalable data layers, schema migrations, WebSocket communication, and robust server-side business logic.",
      skills: ["GraphQL", "PostgreSQL", "Prisma", "Node.js", "Docker"],
    },
    {
      title: "AI-Powered Applications",
      subtitle:
        "AI voice agents, conversational assistants, and automated intelligence",
      description:
        "Integrating LLM APIs and real-time voice infrastructure into production apps for automated customer assistance.",
      skills: ["VAPI", "n8n AI Agents"],
    },
  ],
  pillars: [
    {
      number: "01",
      label: "Build",
      title: "Production Web Applications",
      tech: "Next.js • React • TypeScript • PostgreSQL • GraphQL • Prisma",
      description:
        "Building responsive, scalable applications from frontend architecture to backend APIs, type safety, and relational databases.",
    },
    {
      number: "02",
      label: "Automate",
      title: "Business Process Automation",
      tech: "n8n • APIs • Odoo • Strapi • Webhooks",
      description:
        "Connecting business systems and eliminating repetitive manual workflows through reliable, self-healing automation pipelines.",
    },
    {
      number: "03",
      label: "Solve",
      title: "Performance & Reliability",
      tech: "Docker • Cloud Deployment • Debugging • Real-Time Systems",
      description:
        "Diagnosing production issues, optimizing query and rendering performance, and deploying maintainable, containerized applications.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Information Technology (BSIT)",
      school: "Gordon College (2020-2024)",
      location: "Olongapo City, Philippines",
      period: "Graduated July 2024",
      honors: "Cum Laude, Dean’s Lister",
      capstone:
        "Feedback Fusion: Empowering Feedback Management with Consumer Insights Using Tableau",
      coursework: "Web Development, System Administration, Networking",
    },
  ],
};

export const developerProfile = DEVELOPER_PROFILE;
