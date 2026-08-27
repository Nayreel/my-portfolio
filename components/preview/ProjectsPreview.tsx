"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Cpu, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { PROJECTS, Project, ProjectCategory } from "@/data";
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

interface ProjectsPreviewProps {
  onOpenAIQuery: (query: string) => void;
}

export function ProjectsPreview({ onOpenAIQuery }: ProjectsPreviewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(
    null,
  );

  const categories: ProjectCategory[] = [
    "All",
    "Web & Automation",
    "Client Work",
    "Personal & Capstone",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 p-3.5 sm:p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Featured Engineering Portfolio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              My Projects
            </h1>
          </div>

          {/* Category Filter Pills */}
          <div className="flex overflow-x-auto custom-scrollbar touch-pan-x gap-1 bg-[#18191e] p-1 rounded-xl border border-[#2a2c35] max-w-full shrink-0">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant="ghost"
                size="xs"
                onClick={() => setSelectedCategory(cat)}
                className={`h-auto px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-sky-500 text-black font-semibold shadow-sm hover:bg-sky-400 hover:text-black"
                    : "text-zinc-400 hover:text-white hover:bg-[#252830]"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group bg-[#16171b] border-[#272930] hover:border-sky-500/50 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-sky-500/5 relative overflow-hidden text-white"
            >
              <div
                className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${project.imageColor} blur-3xl opacity-30 group-hover:opacity-60 transition-opacity pointer-events-none`}
              />

              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3 space-y-2.5 sm:space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-[11px] font-mono bg-white/5 border-white/10 text-sky-300"
                  >
                    {project.category}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-sky-400/90 font-mono mt-0.5 sm:mt-1">
                    {project.tagline}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4 relative z-10">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {project.description}
                </p>

                {/* What I Solved & Engineered */}
                {project.whatISolved && project.whatISolved.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono text-sky-400 block uppercase tracking-wide">
                      What I Solved
                    </span>
                    <ul className="space-y-1">
                      {project.whatISolved.slice(0, 3).map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-zinc-300 flex items-start space-x-1.5"
                        >
                          <span className="text-sky-400 font-bold shrink-0">
                            •
                          </span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

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

              {/* Card Footer Actions */}
              <CardFooter className="p-4 sm:p-6 pt-3 sm:pt-4 border-t border-[#252830] flex flex-wrap items-center justify-between gap-2 relative z-10">
                <div className="flex items-center space-x-2">
                  <Tooltip>
                    <TooltipTrigger
                      onClick={() =>
                        onOpenAIQuery(
                          `Tell me more about the technical stack and features in ${project.title}.`,
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
                      Ask AI Assistant about {project.title}
                    </TooltipContent>
                  </Tooltip>

                  <a
                    href={project.liveUrl || project.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={triggerConfetti}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-semibold transition-colors"
                  >
                    <span>Live Site</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Code Inspection Modal */}
        <Dialog
          open={!!activeProjectModal}
          onOpenChange={(open) => !open && setActiveProjectModal(null)}
        >
          <DialogContent className="bg-[#18191e] border-[#333333] max-w-2xl w-[92vw] sm:w-full max-h-[85dvh] overflow-y-auto text-white p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="font-bold text-base sm:text-lg text-white">
                {activeProjectModal?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 font-mono">
                Implementation Architecture Snippet
              </DialogDescription>
            </DialogHeader>

            <pre className="bg-[#121214] p-3 sm:p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-[#2a2c35] max-h-60 sm:max-h-80">
              <code>{activeProjectModal?.highlightCode}</code>
            </pre>

            <DialogFooter className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 w-full pt-2">
              <a
                href={activeProjectModal?.liveUrl || activeProjectModal?.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sky-400 hover:text-sky-300 font-mono flex items-center justify-center sm:justify-start space-x-1 py-1"
              >
                <span>Open Live Application</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>

              <Button
                onClick={() => {
                  if (activeProjectModal) {
                    navigator.clipboard.writeText(
                      activeProjectModal.highlightCode,
                    );
                    toast.success("Snippet copied to clipboard");
                    triggerConfetti();
                  }
                }}
                className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs cursor-pointer w-full sm:w-auto"
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
