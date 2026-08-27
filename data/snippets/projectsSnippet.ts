export const PROJECTS_CODE_SNIPPET = `"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Cpu } from "lucide-react";

export type ProjectCategory = "All" | "Web & Automation" | "Client Work" | "Personal & Capstone";

export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  highlightSnippet?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 0,
    title: "AI Energy Shop",
    tagline: "Australian e-commerce platform for solar power systems & automated energy solutions",
    description: "Specializing in solar power systems, battery storage, and energy-efficient solutions with custom n8n automation workflows, ERP sync, and scalable Next.js web systems.",
    category: "Web & Automation",
    tags: ["Next.js", "n8n Automation", "Tailwind CSS", "Redux", "TypeScript", "E-Commerce"],
    liveUrl: "https://aienergyshop.com.au",
    githubUrl: "https://github.com/Nayreel",
  },
  {
    id: 1,
    title: "Feedback Fusion",
    tagline: "Customer sentiment analysis & dynamic QR feedback generation platform",
    description: "Analyzes customer feedback sentiment and generates dynamic survey QR codes for business owners. Presented at regional pitching competitions (PSC8) and IRCITE 2024.",
    category: "Personal & Capstone",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "Sentiment Analysis", "Tableau"],
    liveUrl: "https://feedbackfusion.vercel.app",
    githubUrl: "https://github.com/Nayreel",
  },
  {
    id: 2,
    title: "Iontana",
    tagline: "Modern scalable website with real-time AI Voice Support via n8n + VAPI",
    description: "Built for speed, security, and scalability with an automated AI Voice Assistant using n8n and VAPI for real-time customer voice assistance.",
    category: "Client Work",
    tags: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Shadcn UI", "n8n", "VAPI (AI Voice)"],
    liveUrl: "https://www.iontana.com",
    githubUrl: "https://github.com/Nayreel",
  },
];

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-[#16171b] border border-[#272930] hover:border-sky-500/50 rounded-xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-sky-500/5 text-white">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-sky-300">
            {project.category}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-sky-400 font-mono mt-1">{project.tagline}</p>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#20222a] text-zinc-300 border border-[#2d303d]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#252830] flex items-center justify-end">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </a>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const categories: ProjectCategory[] = [
    "All",
    "Web & Automation",
    "Client Work",
    "Personal & Capstone",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="max-w-6xl mx-auto space-y-8 p-6 lg:p-10 text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering Portfolio</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Projects</h1>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-[#18191e] p-1 rounded-xl border border-[#2a2c35]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={\`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer \${
                selectedCategory === cat
                  ? "bg-sky-500 text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-[#252830]"
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
`;
