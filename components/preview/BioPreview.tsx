"use client";

import React, { useState, useEffect } from "react";
import { FolderGit2, Mail, Bot, Cpu, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { DEVELOPER_PROFILE } from "@/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";
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

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 p-3 sm:p-6 lg:p-10 w-full min-w-0">
        {/* Top Hero Card */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1c1d22] via-[#16171b] to-[#121316] border border-[#2d3039] p-3.5 sm:p-6 lg:p-8 shadow-2xl w-full min-w-0">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 min-w-0">
            <div className="space-y-2 sm:space-y-3 min-w-0 w-full">
              <div className="flex flex-wrap items-center gap-2 max-w-full">
                <Badge
                  variant="outline"
                  className="bg-sky-500/10 border-sky-500/30 text-sky-300 px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs h-auto whitespace-normal break-words max-w-full text-left leading-relaxed"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5 sm:mr-2 shrink-0" />
                  <span>{DEVELOPER_PROFILE.status}</span>
                </Badge>
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#f0f0f0] to-[#999999] bg-clip-text text-transparent break-words">
                {DEVELOPER_PROFILE.name}
              </h1>

              <p className="text-xs sm:text-base lg:text-lg text-sky-400 font-medium font-mono break-words leading-snug">
                {DEVELOPER_PROFILE.title}
              </p>

              <p className="text-xs sm:text-base text-[#a0a5b5] max-w-2xl leading-relaxed break-words">
                {DEVELOPER_PROFILE.bio}
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs text-zinc-400 font-mono pt-1 w-full min-w-0">
                <span className="flex items-center space-x-1 text-zinc-300 max-w-full">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="break-words">
                    {DEVELOPER_PROFILE.location}
                  </span>
                </span>
                <span className="flex items-center space-x-1 text-zinc-300 max-w-full">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="break-words">{DEVELOPER_PROFILE.phone}</span>
                </span>
                <span className="flex items-center space-x-1 text-zinc-300 max-w-full">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="break-all">{DEVELOPER_PROFILE.email}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="mt-6 pt-5 sm:mt-8 sm:pt-6 border-t border-[#2a2c35] flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-2.5 w-full">
            <Button
              onClick={() => onSwitchToFile("projects.tsx")}
              className="h-8.5 px-3.5 cursor-pointer bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs shadow-md shadow-sky-500/20 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <FolderGit2 className="w-3.5 h-3.5 shrink-0" />
              <span>Explore Featured Projects</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => onSwitchToFile("get-in-touch.tsx")}
              className="h-8.5 px-3.5 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-sky-500/40 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Contact / Hire Me</span>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                window.open("https://github.com/Nayreel", "_blank")
              }
              className="h-8.5 px-3.5 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-sky-500/40 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <GithubIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>GitHub Profile</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open(DEVELOPER_PROFILE.linkedin, "_blank")}
              className="h-8.5 px-3.5 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-sky-500/40 text-zinc-300 hover:text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>LinkedIn Profile</span>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                onOpenAIQuery(
                  "Give me a summary of Lee Ryan Garcia's projects, experience, and skills.",
                )
              }
              className="h-8.5 px-3.5 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-sky-500/40 text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <Bot className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Ask AI Assistant</span>
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
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live GitHub Contributions & Commits Section */}
        <div className="space-y-6">
          <GitHubContributionGraph />
        </div>

        {/* Engineering Philosophy */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center space-x-2 text-zinc-200">
            <Cpu className="w-5 h-5 text-sky-400" />
            <span>Core Engineering Pillars</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#16171b] border-[#272930]">
              <CardHeader className="p-5 pb-2">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs mb-2">
                  01
                </div>
                <CardTitle className="text-sm font-semibold text-white">
                  Workflow Automation (n8n)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Designing end-to-end automated pipelines integrating Odoo ERP,
                  Strapi CRM, and Next.js applications.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#16171b] border-[#272930]">
              <CardHeader className="p-5 pb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mb-2">
                  02
                </div>
                <CardTitle className="text-sm font-semibold text-white">
                  Full-Stack Next.js & React
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Building responsive, scalable web platforms and e-commerce
                  systems with modern UI/UX, TypeScript, and robust state
                  architecture.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#16171b] border-[#272930]">
              <CardHeader className="p-5 pb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-2">
                  03
                </div>
                <CardTitle className="text-sm font-semibold text-white">
                  Cloud & Systems Reliability
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Extensive technical troubleshooting across Azure, M365, Docker
                  containers, and real-time Socket.io communication channels.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
