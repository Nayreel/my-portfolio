import { SkillCategory } from "./types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: "Code2",
    skills: [
      { name: "Next.js (App Router)", level: "Core", favorite: true },
      { name: "React", level: "Core", favorite: true },
      { name: "TypeScript", level: "Core", favorite: true },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "Tailwind CSS", level: "Core", favorite: true },
      { name: "shadcn/ui", level: "Production" },
      { name: "GSAP Animations", level: "Advanced" },
      { name: "Aceternity UI", level: "Advanced" },
      { name: "HTML5 & CSS3", level: "Core" },
      { name: "Redux", level: "Working" },
    ],
  },
  {
    category: "Backend & Data",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "Core", favorite: true },
      { name: "Express.js", level: "Core" },
      { name: "NestJS", level: "Production", favorite: true },
      { name: "PostgreSQL", level: "Core", favorite: true },
      { name: "Prisma ORM", level: "Core", favorite: true },
      { name: "MongoDB", level: "Production" },
      { name: "MySQL", level: "Working" },
      { name: "Socket.io (WebSockets)", level: "Advanced" },
      { name: "Redis", level: "Working" },
    ],
  },
  {
    category: "APIs & Automation",
    icon: "Bot",
    skills: [
      { name: "REST APIs", level: "Core", favorite: true },
      { name: "GraphQL", level: "Core", favorite: true },
      { name: "n8n Workflow Automation", level: "Advanced", favorite: true },
      { name: "Webhooks & Event Streams", level: "Advanced" },
      { name: "Odoo ERP", level: "Integration" },
      { name: "Strapi CRM", level: "Integration" },
      { name: "VAPI AI Voice", level: "Integration" },
      { name: "Shopify API", level: "Integration" },
      { name: "Cloudinary", level: "Integration" },
    ],
  },
  {
    category: "Infrastructure & DevOps",
    icon: "Wrench",
    skills: [
      { name: "Git & GitHub", level: "Core", favorite: true },
      { name: "GitHub Actions (CI/CD)", level: "Production", favorite: true },
      { name: "Docker", level: "Production" },
      { name: "Vercel", level: "Production" },
      { name: "Railway", level: "Production" },
      { name: "Render", level: "Production" },
      { name: "Microsoft Azure", level: "Working" },
      { name: "Postman", level: "Core" },
    ],
  },
];

export const skills = SKILL_CATEGORIES;
