"use client";

import React from "react";
import {
  FolderGit2,
  Mail,
  Bot,
  MapPin,
  Briefcase,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { DEVELOPER_PROFILE } from "@/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitHubCommit } from "@/types/github";

interface BioHeroCardProps {
  latestCommit: GitHubCommit | null;
  onSwitchToFile: (fileId: string) => void;
  onOpenAIQuery: (query: string) => void;
}

export function BioHeroCard({
  latestCommit,
  onSwitchToFile,
  onOpenAIQuery,
}: BioHeroCardProps) {
  return (
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

          {/* Restrained metadata row */}
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
                • Latest commit: {new Date(latestCommit.date).toLocaleDateString()}
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
  );
}
