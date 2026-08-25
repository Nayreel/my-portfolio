"use client";

import React, { useState } from "react";
import {
  Rocket,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Download,
  Send,
  CheckCircle,
  Terminal,
  Code2,
  Cpu,
  Zap,
  Star,
  GitFork,
  Check,
  Play,
  Flame,
  Layers,
  Copy,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import confetti from "canvas-confetti";
import {
  DEVELOPER_PROFILE,
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
  PortfolioFile,
  Project,
} from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";

interface RenderedPreviewProps {
  activeFile: PortfolioFile;
  onSwitchToFile: (fileId: string) => void;
  onOpenAIQuery: (query: string) => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

export function RenderedPreview({
  activeFile,
  onSwitchToFile,
  onOpenAIQuery,
  antigravityMode,
  setAntigravityMode,
}: RenderedPreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(
    null,
  );
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    roleType: "Senior Full-Stack / AI Engineer",
  });
  const [miniGameScore, setMiniGameScore] = useState(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    toast.success("Email copied to clipboard", {
      description: DEVELOPER_PROFILE.email,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    toast.success("Message Dispatched!", {
      description:
        "Thanks for reaching out! Alex will reply to your email shortly.",
    });
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const triggerConfettiCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#38bdf8", "#818cf8", "#34d399", "#f59e0b"],
    });
  };

  // 1. BIO PREVIEW
  if (activeFile.id === "bio.tsx") {
    return (
      <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
        <div className="max-w-4xl mx-auto space-y-10 p-6 lg:p-10">
          {/* Top Hero Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1d22] via-[#16171b] to-[#121316] border border-[#2d3039] p-6 lg:p-8 shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <Badge
                  variant="outline"
                  className="bg-sky-500/10 border-sky-500/30 text-sky-300 px-3 py-1 font-mono text-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                  <span>{DEVELOPER_PROFILE.status}</span>
                </Badge>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#f0f0f0] to-[#999999] bg-clip-text text-transparent">
                  {DEVELOPER_PROFILE.name}
                </h1>

                <p className="text-base sm:text-lg text-sky-400 font-medium font-mono">
                  {DEVELOPER_PROFILE.title}
                </p>

                <p className="text-sm sm:text-base text-[#a0a5b5] max-w-2xl leading-relaxed">
                  {DEVELOPER_PROFILE.bio}
                </p>
              </div>

              {/* Profile Avatar / Badge */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 p-[2px] shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-[#18191e] flex flex-col items-center justify-center p-3 text-center">
                    <span className="text-3xl font-extrabold bg-gradient-to-br from-sky-400 to-indigo-300 bg-clip-text text-transparent">
                      AV
                    </span>
                    <span className="text-[10px] text-zinc-400 mt-1 font-mono">
                      SF, CA • Remote
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="mt-8 pt-6 border-t border-[#2a2c35] flex flex-wrap items-center gap-3">
              <Button
                onClick={() => onSwitchToFile("projects.tsx")}
                className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs shadow-md shadow-sky-500/20"
              >
                <Rocket className="w-3.5 h-3.5 mr-1.5" />
                <span>Explore Flagship Projects</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => onSwitchToFile("get-in-touch.tsx")}
                className="bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] text-white text-xs font-medium"
              >
                <Mail className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                <span>Contact / Hire Me</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleCopyEmail}
                className="bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] text-zinc-300 text-xs font-medium"
              >
                <Copy className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                <span>{DEVELOPER_PROFILE.email}</span>
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  onOpenAIQuery(
                    "Give me a 30-second summary of Lee Ryan Garcia's strongest skills.",
                  )
                }
                className="bg-indigo-500/15 hover:bg-indigo-500/25 border-indigo-500/40 text-indigo-300 text-xs font-mono ml-auto"
              >
                <Cpu className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
                <span>Ask Copilot</span>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DEVELOPER_PROFILE.stats.map((stat, idx) => (
              <Card
                key={idx}
                className="bg-[#16171b] border-[#272930] hover:border-sky-500/40 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Engineering Philosophy */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center space-x-2 text-zinc-200">
              <Cpu className="w-5 h-5 text-sky-400" />
              <span>Core Architectural Pillars</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-[#16171b] border-[#272930]">
                <CardHeader className="p-5 pb-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs mb-2">
                    01
                  </div>
                  <CardTitle className="text-sm font-semibold text-white">
                    Deterministic Agentic DAGs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Building autonomous LLM reasoning loops with strict
                    validation schemas, rollback state machines, and
                    human-in-the-loop controls.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#16171b] border-[#272930]">
                <CardHeader className="p-5 pb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mb-2">
                    02
                  </div>
                  <CardTitle className="text-sm font-semibold text-white">
                    Sub-100ms Edge Latency
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Distributed memory caches, zero-copy serialization, and edge
                    streaming architectures that ensure instant user
                    interactions.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#16171b] border-[#272930]">
                <CardHeader className="p-5 pb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                    03
                  </div>
                  <CardTitle className="text-sm font-semibold text-white">
                    Developer Ergonomics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Crafting IDE environments, CLI tools, and AST visualizers
                    that 10x developer productivity and eliminate cognitive
                    friction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    );
  }

  // 2. PROJECTS PREVIEW
  if (activeFile.id === "projects.tsx") {
    const categories = [
      "All",
      "Developer Tools",
      "AI & ML",
      "Cloud & Systems",
      "Full-Stack Web",
    ];
    const filteredProjects =
      selectedCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === selectedCategory);

    return (
      <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
        <div className="max-w-5xl mx-auto space-y-8 p-6 lg:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
                <Rocket className="w-3.5 h-3.5" />
                <span>Featured Engineering Portfolio</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Production Systems & Flagship Work
              </h1>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#18191e] p-1 rounded-xl border border-[#2a2c35]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-sky-500 text-black font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-[#252830]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid with shadcn Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group bg-[#16171b] border-[#272930] hover:border-sky-500/50 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-sky-500/5 relative overflow-hidden text-white"
              >
                {/* Glow accent */}
                <div
                  className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.imageColor} blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`}
                />

                <CardHeader className="p-6 pb-3 space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="text-[11px] font-mono bg-white/5 border-white/10 text-sky-300"
                    >
                      {project.category}
                    </Badge>
                    <div className="flex items-center space-x-3 text-xs text-zinc-400 font-mono">
                      <span className="flex items-center space-x-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{project.stars}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitFork className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{project.forks}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-sky-400/90 font-mono mt-1">
                      {project.tagline}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4 relative z-10">
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics Banner */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#252830]">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs sm:text-sm font-bold text-white font-mono">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-zinc-400">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] font-mono bg-[#20222a] text-zinc-300 border border-[#2d303d]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                {/* Bottom Actions */}
                <CardFooter className="p-6 pt-4 border-t border-[#252830] flex items-center justify-between relative z-10">
                  <Button
                    variant="link"
                    onClick={() => setActiveProjectModal(project)}
                    className="p-0 h-auto text-xs text-sky-400 hover:text-sky-300 font-mono flex items-center space-x-1"
                  >
                    <Code2 className="w-3.5 h-3.5 mr-1" />
                    <span>Inspect Code</span>
                  </Button>

                  <div className="flex items-center space-x-2">
                    <Tooltip>
                      <TooltipTrigger
                        onClick={() =>
                          onOpenAIQuery(
                            `Explain the architectural challenges in ${project.title}.`,
                          )
                        }
                        className="h-8 w-8 rounded-lg bg-[#252830] hover:bg-sky-500/20 text-zinc-400 hover:text-sky-300 inline-flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
                      >
                        Ask Copilot about {project.title}
                      </TooltipContent>
                    </Tooltip>

                    <Button
                      size="sm"
                      onClick={() => {
                        triggerConfettiCelebration();
                        toast.success(
                          `Simulation initialized for ${project.title}!`,
                        );
                      }}
                      className="bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold"
                    >
                      <span>Simulate Run</span>
                      <Play className="w-3 h-3 fill-sky-300 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Code Inspection Modal with shadcn Dialog */}
          <Dialog
            open={!!activeProjectModal}
            onOpenChange={(open) => !open && setActiveProjectModal(null)}
          >
            <DialogContent className="bg-[#18191e] border-[#333333] max-w-2xl text-white">
              <DialogHeader>
                <DialogTitle className="font-bold text-lg text-white">
                  {activeProjectModal?.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-zinc-400 font-mono">
                  Production Architecture Snippet
                </DialogDescription>
              </DialogHeader>

              <pre className="bg-[#121214] p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-[#2a2c35] max-h-80">
                <code>{activeProjectModal?.highlightCode}</code>
              </pre>

              <DialogFooter>
                <Button
                  onClick={() => {
                    if (activeProjectModal) {
                      navigator.clipboard.writeText(
                        activeProjectModal.highlightCode,
                      );
                      toast.success("Snippet copied to clipboard");
                      triggerConfettiCelebration();
                    }
                  }}
                  className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs"
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  Copy Snippet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </ScrollArea>
    );
  }

  // 3. EXPERIENCE PREVIEW
  if (activeFile.id === "experience.tsx") {
    return (
      <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
        <div className="max-w-4xl mx-auto space-y-8 p-6 lg:p-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career Milestones</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Engineering Leadership & Impact
            </h1>
          </div>

          <div className="space-y-6 relative border-l-2 border-[#2a2c35] pl-6 ml-3">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Node circle */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#18191e] border-2 border-sky-400 group-hover:scale-125 transition-transform" />

                <Card className="bg-[#16171b] border-[#272930] p-6 space-y-4 hover:border-sky-500/40 transition-colors text-white">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-sky-400 flex items-center space-x-2">
                        <span>{exp.company}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-xs text-zinc-400">
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="text-xs font-mono bg-[#20222a] text-zinc-300 border-[#2d303d]"
                      >
                        {exp.period}
                      </Badge>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies Used */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-[10px] font-mono bg-[#20222a] text-sky-300/90 border border-[#2d303d]"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Education Card */}
          <Card className="bg-[#16171b] border-[#272930] p-6 space-y-3 text-white">
            <h2 className="text-lg font-bold flex items-center space-x-2 text-white">
              <GraduationCap className="w-5 h-5 text-indigo-400" />
              <span>Education</span>
            </h2>

            {DEVELOPER_PROFILE.education.map((edu, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-zinc-200">
                    {edu.school}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {edu.degree} ({edu.honors})
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs font-mono text-zinc-400 border-[#333333]"
                >
                  {edu.period}
                </Badge>
              </div>
            ))}
          </Card>
        </div>
      </ScrollArea>
    );
  }

  // 4. SKILLS PREVIEW (tech-stack.json)
  if (activeFile.id === "tech-stack.json") {
    return (
      <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
        <div className="max-w-4xl mx-auto space-y-8 p-6 lg:p-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>Engineering Matrix</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Skill Proficiency & Technologies
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <Card
                key={idx}
                className="bg-[#16171b] border-[#272930] p-6 space-y-4 text-white"
              >
                <h3 className="font-bold text-base text-zinc-200 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>{cat.category}</span>
                </h3>

                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-200 font-mono font-medium flex items-center space-x-1.5">
                          <span>{skill.name}</span>
                          {skill.favorite && (
                            <span
                              className="text-amber-400 text-[10px]"
                              title="Flagship Favorite"
                            >
                              ★
                            </span>
                          )}
                        </span>
                        <span className="text-zinc-400 font-mono">
                          {skill.experience}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-1.5 bg-[#252830] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    );
  }

  // 5. CONTACT PREVIEW
  if (activeFile.id === "get-in-touch.tsx") {
    return (
      <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
        <div className="max-w-2xl mx-auto space-y-8 p-6 lg:p-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Dispatch</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Get in Touch with Lee Ryan
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Interested in hiring me for a senior full-stack/AI role,
              architectural advisory, or project collaboration? Drop a line
              below.
            </p>
          </div>

          {contactSubmitted ? (
            <Card className="p-8 bg-emerald-500/10 border-emerald-500/30 text-center space-y-4 text-white">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Message Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                Thanks for reaching out! Your message was received. You can also
                write directly to{" "}
                <span className="text-sky-300 font-mono">
                  {DEVELOPER_PROFILE.email}
                </span>
                .
              </p>
              <Button
                onClick={() => setContactSubmitted(false)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs"
              >
                Send Another Message
              </Button>
            </Card>
          ) : (
            <Card className="bg-[#16171b] border-[#272930] p-6 lg:p-8 shadow-xl text-white">
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">
                      Your Name
                    </label>
                    <Input
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      placeholder="e.g. Sarah Connor"
                      className="bg-[#121214] border-[#2d303d] text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">
                      Your Email
                    </label>
                    <Input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="s.connor@cyberdyne.io"
                      className="bg-[#121214] border-[#2d303d] text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Topic / Inquiry Type
                  </label>
                  <select
                    value={contactForm.roleType}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        roleType: e.target.value,
                      })
                    }
                    className="w-full bg-[#121214] border border-[#2d303d] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="Senior Full-Stack / AI Engineer">
                      Full-Time Senior / Lead Engineering Role
                    </option>
                    <option value="Contract / Architectural Advisory">
                      Contract / Architectural Advisory
                    </option>
                    <option value="Open Source Collaboration">
                      Open Source Collaboration
                    </option>
                    <option value="Technical Coffee Chat">
                      Technical Coffee Chat
                    </option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Message
                  </label>
                  <Textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tell me about your team, challenge, or what you're building..."
                    className="bg-[#121214] border-[#2d303d] text-xs text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shadow-sky-500/20"
                >
                  <Send className="w-3.5 h-3.5 mr-2" />
                  <span>Send Message to Alex</span>
                </Button>
              </form>
            </Card>
          )}

          {/* Social Quick Links */}
          <div className="flex items-center justify-center space-x-6 text-xs text-zinc-400">
            <button
              onClick={handleCopyEmail}
              className="flex items-center space-x-1 hover:text-sky-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{DEVELOPER_PROFILE.email}</span>
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 hover:text-sky-400 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </ScrollArea>
    );
  }

  // 6. RESUME PREVIEW
  if (activeFile.id === "resume.md") {
    return (
      <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
        <div className="max-w-3xl mx-auto space-y-6 p-6 lg:p-10">
          <Card className="bg-[#16171b] border-[#272930] p-6 lg:p-10 shadow-2xl text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2c35] pb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {DEVELOPER_PROFILE.name}
                </h1>
                <p className="text-sky-400 font-mono text-sm mt-0.5">
                  {DEVELOPER_PROFILE.title}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  📍 {DEVELOPER_PROFILE.location} • ✉️ {DEVELOPER_PROFILE.email}
                </p>
              </div>

              <Button
                onClick={() => {
                  triggerConfettiCelebration();
                  toast.success("Resume downloaded!", {
                    description: "Alex_Vance_Resume.pdf",
                  });
                  window.print();
                }}
                className="bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shrink-0"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                <span>Download CV (PDF)</span>
              </Button>
            </div>

            {/* Formatted Markdown Content */}
            <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pt-6">
              <div>
                <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-2 font-mono">
                  🎯 Executive Summary
                </h3>
                <p className="text-zinc-300">
                  Senior Full-Stack & AI Systems Engineer with 7+ years of
                  experience architecting high-throughput web applications,
                  AI-agent copilots, and real-time distributed platforms. Deep
                  expertise in Next.js 15, TypeScript, Go, Python, and modern
                  LLM orchestration.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono">
                  💼 Work Experience
                </h3>

                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-white text-sm">
                        {exp.role} | {exp.company}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs font-mono text-zinc-400 border-[#333333]"
                      >
                        {exp.period}
                      </Badge>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-1">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono">
                  🎓 Education
                </h3>
                <div className="flex justify-between text-xs">
                  <span>
                    <strong>UC Berkeley</strong> — B.S. in Computer Science & AI
                    (Magna Cum Laude)
                  </span>
                  <span className="text-zinc-400 font-mono">2015 - 2019</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    );
  }

  // 7. PLAYGROUND PREVIEW
  if (activeFile.id === "playground.tsx") {
    return (
      <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
        <div className="max-w-3xl mx-auto space-y-8 p-6 lg:p-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Sandbox</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Antigravity Physics & Easter Eggs
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Zero-G Toggle Card */}
            <Card className="p-6 bg-[#16171b] border-[#272930] space-y-4 text-white">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-bold text-white">
                Zero Gravity Physics Engine
              </CardTitle>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Experience the Google Antigravity simulation! When enabled, UI
                elements float and drift smoothly across the workspace.
              </p>

              <Button
                onClick={() => {
                  const next = !antigravityMode;
                  setAntigravityMode(next);
                  if (next) toast.warning("Zero Gravity Mode Activated!");
                  else toast.info("Gravity restored.");
                }}
                className={`w-full text-xs font-bold transition-all ${
                  antigravityMode
                    ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/30"
                    : "bg-[#252830] hover:bg-[#2e323d] text-amber-300 border border-amber-500/30"
                }`}
              >
                {antigravityMode
                  ? "🚀 Zero-G Mode Active (Click to Land)"
                  : "🚀 Ignite Zero-G Mode"}
              </Button>
            </Card>

            {/* Bug Hunter Mini Game */}
            <Card className="p-6 bg-[#16171b] border-[#272930] space-y-4 text-white">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-white">
                  Bug Hunter Minigame
                </CardTitle>
                <Badge
                  variant="outline"
                  className="text-xs font-mono text-sky-400 border-sky-500/30"
                >
                  Score: {miniGameScore}
                </Badge>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Click the elusive memory-leak bug to optimize system latency!
              </p>

              <div className="h-28 bg-[#121214] border border-[#272930] rounded-xl relative flex items-center justify-center overflow-hidden">
                <Button
                  onClick={() => {
                    setMiniGameScore((s) => s + 1);
                    toast.success(`Bug eliminated! Latency reduced by 12ms`, {
                      description: `Total score: ${miniGameScore + 1}`,
                    });
                    triggerConfettiCelebration();
                  }}
                  className="bg-rose-500 hover:bg-rose-400 text-white font-mono text-xs font-bold transition-transform hover:scale-110 shadow-lg"
                >
                  🐛 Fix Bug (-12ms)
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </ScrollArea>
    );
  }

  // DEFAULT PREVIEW (package.json / config)
  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="min-h-full p-6 lg:p-10 flex items-center justify-center">
        <Card className="max-w-md bg-[#16171b] border-[#272930] text-center p-6 space-y-4 text-white">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
            <Code2 className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-bold text-white">
            {activeFile.name}
          </CardTitle>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {activeFile.description}
          </p>
          <Button
            onClick={() => onSwitchToFile("bio.tsx")}
            className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs"
          >
            Return to Developer Bio
          </Button>
        </Card>
      </div>
    </ScrollArea>
  );
}
