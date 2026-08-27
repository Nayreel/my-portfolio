"use client";

import React, { useState, useEffect } from "react";
import { GithubIcon } from "@/components/icons";
import { DEVELOPER_PROFILE, PROJECTS } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GitHubContributionGraph } from "@/components/preview/GitHubContributionGraph";
import { GitHubCommit } from "@/types/github";
import { BioHeroCard } from "./bio/BioHeroCard";
import { BioWhatICanBuildSection } from "./bio/BioWhatICanBuildSection";
import { BioFeaturedProjectsSection } from "./bio/BioFeaturedProjectsSection";
import { BioPillarsSection } from "./bio/BioPillarsSection";
import { BioAIPromptsSection } from "./bio/BioAIPromptsSection";
import { BioHiringCtaCard } from "./bio/BioHiringCtaCard";

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

  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 p-3.5 sm:p-6 lg:p-10 w-full min-w-0">
        {/* Top Hero Section */}
        <BioHeroCard
          latestCommit={latestCommit}
          onSwitchToFile={onSwitchToFile}
          onOpenAIQuery={onOpenAIQuery}
        />

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
        <BioWhatICanBuildSection />

        {/* Featured Production Systems Deep-Dive */}
        <BioFeaturedProjectsSection
          projects={featuredProjects}
          totalProjectsCount={PROJECTS.length}
          onSwitchToFile={onSwitchToFile}
        />

        {/* Core Engineering Pillars */}
        <BioPillarsSection />

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
        <BioAIPromptsSection onOpenAIQuery={onOpenAIQuery} />

        {/* Clear Hiring CTA Card */}
        <BioHiringCtaCard onSwitchToFile={onSwitchToFile} />
      </div>
    </ScrollArea>
  );
}
