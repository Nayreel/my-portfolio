"use client";

import React from "react";
import { FolderGit2, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { Project } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BioFeaturedProjectsSectionProps {
  projects: Project[];
  totalProjectsCount: number;
  onSwitchToFile: (fileId: string) => void;
}

export function BioFeaturedProjectsSection({
  projects,
  totalProjectsCount,
  onSwitchToFile,
}: BioFeaturedProjectsSectionProps) {
  return (
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
          <span>View All ({totalProjectsCount})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
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
                  {(project.architectureStack || project.tags).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-[#1f2026] border-[#313540] text-zinc-200 text-[11px] font-mono py-0.5 px-2 font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
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
  );
}
