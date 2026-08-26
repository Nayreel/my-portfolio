"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Mail,
  Copy,
  Bot,
  Cpu,
  MapPin,
  Phone,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    toast.success("Email copied to clipboard", {
      description: DEVELOPER_PROFILE.email,
    });
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-4xl mx-auto space-y-10 p-6 lg:p-10">
        {/* Top Hero Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1d22] via-[#16171b] to-[#121316] border border-[#2d3039] p-6 lg:p-8 shadow-2xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-sky-500/10 border-sky-500/30 text-sky-300 px-3 py-1 font-mono text-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                  <span>{DEVELOPER_PROFILE.status}</span>
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-[#f0f0f0] to-[#999999] bg-clip-text text-transparent">
                {DEVELOPER_PROFILE.name}
              </h1>

              <p className="text-base sm:text-lg text-sky-400 font-medium font-mono">
                {DEVELOPER_PROFILE.title}
              </p>

              <p className="text-sm sm:text-base text-[#a0a5b5] max-w-2xl leading-relaxed">
                {DEVELOPER_PROFILE.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-mono pt-1">
                <span className="flex items-center space-x-1 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{DEVELOPER_PROFILE.location}</span>
                </span>
                <span className="flex items-center space-x-1 text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{DEVELOPER_PROFILE.phone}</span>
                </span>
                <span className="flex items-center space-x-1 text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{DEVELOPER_PROFILE.email}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="mt-8 pt-6 border-t border-[#2a2c35] flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => onSwitchToFile("projects.tsx")}
              className="h-8.5 px-3.5 cursor-pointer bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs shadow-md shadow-sky-500/20 rounded-lg flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Explore Featured Projects</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => onSwitchToFile("get-in-touch.tsx")}
              className="h-8.5 px-3.5 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-sky-500/40 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Contact / Hire Me</span>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                window.open("https://github.com/Nayreel", "_blank")
              }
              className="h-8.5 px-3.5 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-zinc-500 text-zinc-300 hover:text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub Profile</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyEmail}
              className="h-8.5 px-3.5 cursor-pointer bg-[#252830] hover:bg-[#2e323d] border-[#3c4150] hover:border-zinc-500 text-zinc-300 hover:text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>{DEVELOPER_PROFILE.email}</span>
            </Button>

            <Button
              variant="outline"
              onClick={() =>
                onOpenAIQuery(
                  "Give me a summary of Lee Ryan Garcia's projects, experience, and skills.",
                )
              }
              className="h-8.5 px-3.5 cursor-pointer bg-indigo-500/15 hover:bg-indigo-500/25 border-indigo-500/40 hover:border-indigo-400 text-indigo-300 text-xs font-mono rounded-lg flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
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
