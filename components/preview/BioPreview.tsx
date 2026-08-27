"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Mail,
  Bot,
  Cpu,
  MapPin,
  Blocks,
  Layers,
  Workflow,
  Server,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { DEVELOPER_PROFILE, PROJECTS } from "@/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GitHubContributionGraph } from "@/components/preview/GitHubContributionGraph";
import { GitHubCommit } from "@/types/github";

interface BioPreviewProps {
  onSwitchToFile: (fileId: string) => void;
  onOpenAIQuery: (query: string) => void;
}

export function BioPreview({ onSwitchToFile, onOpenAIQuery }: BioPreviewProps) {
  const [latestCommit, setLatestCommit] = useState<GitHubCommit | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLatestCommit = async () => {
      try {
        const res = await fetch("/api/github/commits");
        if (!res.ok) return;
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) return;
        const data = await res.json();
        if (isMounted && data?.latestCommit) {
          setLatestCommit(data.latestCommit);
        }
      } catch (err) {
        console.error("Error loading latest commit:", err);
      }
    };
    fetchLatestCommit();
    return () => {
      isMounted = false;
    };
  }, []);

  // Top flagship featured projects for outcome-oriented preview
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  const suggestedQuestions: string[] = [
    "What projects has Lee built?",
    "What is his strongest technical skill?",
    "How does he use n8n for business automation?",
    "Explain the MineGo architecture",
    "What production problems has he solved?",
    "Why should we hire Lee Ryan Garcia?",
  ];

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 1:
        return <Workflow className="w-4 h-4 text-sky-400" />;
      case 2:
        return <Server className="w-4 h-4 text-sky-400" />;
      default:
        return <Cpu className="w-4 h-4 text-sky-400" />;
    }
  };

  const getBuildIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 1:
        return <Workflow className="w-4 h-4 text-sky-400" />;
      case 2:
        return <Server className="w-4 h-4 text-sky-400" />;
      default:
        return <Bot className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 p-3.5 sm:p-6 lg:p-10 w-full min-w-0">
        {/* Top Hero Section */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1c1d22] via-[#16171b] to-[#121316] border border-[#2d3039] p-4 sm:p-6 lg:p-8 shadow-2xl w-full min-w-0">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:gap-6 min-w-0">
            <div className="space-y-3 min-w-0 w-full">
              <div className="flex flex-wrap items-center gap-2 max-w-full">
                <Badge
                  variant="outline"
                  className="bg-sky-500/10 border-sky-500/30 text-sky-300 px-3 py-1 font-mono text-[11px] sm:text-xs h-auto whitespace-normal break-words max-w-full text-left leading-relaxed"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2 shrink-0" />
                  <span>{DEVELOPER_PROFILE.status}</span>
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#f0f0f0] to-[#b0b0b0] bg-clip-text text-transparent break-words">
                {DEVELOPER_PROFILE.name}
              </h1>

              <p className="text-sm sm:text-lg lg:text-xl text-sky-400 font-semibold font-mono break-words leading-snug">
                {DEVELOPER_PROFILE.title}
              </p>

              <p className="text-xs sm:text-base text-zinc-300 max-w-2xl leading-relaxed break-words">
                {DEVELOPER_PROFILE.bio}
              </p>

              {/* Restrained metadata row (Location, Email, Profiles) */}
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-5 text-xs text-zinc-400 font-mono pt-2 w-full min-w-0">
                <span className="flex items-center space-x-1.5 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{DEVELOPER_PROFILE.location}</span>
                </span>
                <span className="flex items-center space-x-1.5 text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span className="break-all">{DEVELOPER_PROFILE.email}</span>
                </span>
                {latestCommit && (
                  <span className="text-[11px] text-zinc-500 hidden md:inline-block">
                    • Latest commit:{" "}
                    {new Date(latestCommit.date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Primary & Quick Action CTAs */}
          <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-[#2a2c35] flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 w-full">
            <Button
              onClick={() => onSwitchToFile("projects.tsx")}
              className="h-9 px-4 cursor-pointer bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs shadow-md shadow-sky-500/20 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <FolderGit2 className="w-4 h-4 shrink-0" />
              <span>View Projects</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => onSwitchToFile("get-in-touch.tsx")}
              className="h-9 px-4 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-sky-500/40 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <Briefcase className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Hire Me</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open(DEVELOPER_PROFILE.github, "_blank")}
              className="h-9 px-3.5 cursor-pointer bg-[#1b1c21] hover:bg-[#252830] border-[#30333d] hover:border-sky-500/40 text-zinc-300 hover:text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto"
            >
              <GithubIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>GitHub</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open(DEVELOPER_PROFILE.linkedin, "_blank")}
              className="h-9 px-3.5 cursor-pointer bg-[#1b1c21] hover:bg-[#252830] border-[#30333d] hover:border-sky-500/40 text-zinc-300 hover:text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>LinkedIn</span>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                onOpenAIQuery(
                  "Give me an executive summary of Lee Ryan Garcia's qualifications, projects, and strengths.",
                )
              }
              className="h-9 px-3.5 cursor-pointer bg-[#1b1c21] hover:bg-[#252830] border-[#30333d] hover:border-sky-500/40 text-zinc-300 hover:text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all w-full sm:w-auto sm:ml-auto"
            >
              <Bot className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Ask AI</span>
            </Button>
          </div>
        </div>

        {/* Proof of Delivery Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {DEVELOPER_PROFILE.stats.map((stat, idx) => (
            <Card
              key={idx}
              className="bg-[#16171b] border-[#272930] hover:border-sky-500/40 transition-colors shadow-sm"
            >
              <CardContent className="p-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What I Can Build Grid */}
        {DEVELOPER_PROFILE.whatICanBuild &&
          DEVELOPER_PROFILE.whatICanBuild.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2 text-white">
                  <Blocks className="w-4 h-4 text-sky-400" />
                  <span>What I Can Build</span>
                </h2>
                <span className="text-xs text-zinc-500 font-mono hidden sm:inline-block">
                  Full-Lifecycle Solutions
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DEVELOPER_PROFILE.whatICanBuild.map((item, idx) => (
                  <Card
                    key={idx}
                    className="bg-[#16171b] border-[#272930] hover:border-sky-500/30 transition-all group"
                  >
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-center space-x-2.5 mb-1.5">
                        <div className="w-7 h-7 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                          {getBuildIcon(idx)}
                        </div>
                        <div>
                          <CardTitle className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                            {item.title}
                          </CardTitle>
                          <p className="text-[11px] text-zinc-400 font-mono">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 space-y-3">
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-[#20222a] border border-[#2e313b] text-[11px] font-mono text-zinc-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

        {/* Featured Production Systems Deep-Dive */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2 text-white">
              <FolderGit2 className="w-4 h-4 text-sky-400" />
              <span>Featured Production Systems</span>
            </h2>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onSwitchToFile("projects.tsx")}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center space-x-1 cursor-pointer"
            >
              <span>View All ({PROJECTS.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-[#16171b] border-[#272930] hover:border-sky-500/40 transition-all overflow-hidden"
              >
                <CardHeader className="p-5 sm:p-6 pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="text-[11px] font-mono text-sky-400 uppercase tracking-wider mb-1">
                        {project.category}
                      </div>
                      <CardTitle className="text-base sm:text-lg font-bold text-white">
                        {project.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.liveUrl && (
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                          className="h-7 px-2.5 text-xs bg-[#22242c] hover:bg-[#2b2e38] border-[#363a46] text-white flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Live System</span>
                          <ExternalLink className="w-3 h-3 text-sky-400" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                    {project.tagline}
                  </p>
                </CardHeader>

                <CardContent className="p-5 sm:p-6 pt-0 space-y-4">
                  {/* Architecture Badges */}
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 block mb-1.5 uppercase tracking-wide">
                      Architecture & Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.architectureStack || project.tags).map(
                        (tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-[#1f2026] border-[#313540] text-zinc-200 text-[11px] font-mono py-0.5 px-2 font-normal"
                          >
                            {tech}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  {/* What I Solved */}
                  {project.whatISolved && project.whatISolved.length > 0 && (
                    <div>
                      <span className="text-[11px] font-mono text-zinc-400 block mb-2 uppercase tracking-wide">
                        What I Solved & Engineered
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.whatISolved.map((solvedItem, i) => (
                          <div
                            key={i}
                            className="flex items-start space-x-2 text-xs text-zinc-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <span>{solvedItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Engineering Pillars */}
        {DEVELOPER_PROFILE.pillars && (
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2 text-white">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>Core Engineering Pillars</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DEVELOPER_PROFILE.pillars.map((pillar, idx) => (
                <Card
                  key={idx}
                  className="bg-[#16171b] border-[#272930] hover:border-sky-500/30 transition-colors"
                >
                  <CardHeader className="p-5 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono text-xs">
                          {pillar.number}
                        </div>
                        <div className="w-6 h-6 rounded-md bg-[#22242c] flex items-center justify-center">
                          {getPillarIcon(idx)}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-sky-400 uppercase font-semibold">
                        {pillar.label}
                      </span>
                    </div>
                    <CardTitle className="text-sm font-semibold text-white">
                      {pillar.title}
                    </CardTitle>
                    <p className="text-[11px] font-mono text-zinc-500 pt-0.5">
                      {pillar.tech}
                    </p>
                  </CardHeader>
                  <CardContent className="p-5 pt-2">
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Live GitHub Contributions & Commits Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2 text-white">
              <GithubIcon className="w-4 h-4 text-sky-400" />
              <span>Live Engineering Activity</span>
            </h2>
            <span className="text-xs text-zinc-500 font-mono">
              github.com/Nayreel
            </span>
          </div>
          <GitHubContributionGraph />
        </div>

        {/* Interactive AI Portfolio Assistant Prompts */}
        <div className="rounded-xl bg-gradient-to-br from-[#1b1d24] to-[#14151a] border border-[#2b2e38] p-5 sm:p-6 space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Ask My Portfolio Assistant
              </h3>
              <p className="text-xs text-zinc-400">
                Click any structured prompt below to query AI about my
                experience, architecture, and background.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenAIQuery(question)}
                className="text-left p-2.5 rounded-lg bg-[#20222a] hover:bg-[#282b35] border border-[#2e313c] hover:border-sky-500/40 text-xs text-zinc-200 transition-all cursor-pointer flex items-center justify-between group"
              >
                <span className="line-clamp-1 font-medium">{question}</span>
                <HelpCircle className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400 shrink-0 ml-1.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Clear Hiring CTA Card */}
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-950/40 via-[#181a22] to-[#15161d] border border-sky-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Have a project or system that needs to be built?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              I can help with full-stack development, automation pipelines, API
              integrations, and reliable production deployment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
            <Button
              onClick={() => onSwitchToFile("get-in-touch.tsx")}
              className="h-9 px-5 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Hire Me</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => onSwitchToFile("projects.tsx")}
              className="h-9 px-4 bg-[#232630] hover:bg-[#2c303c] border-[#3a3f4e] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
