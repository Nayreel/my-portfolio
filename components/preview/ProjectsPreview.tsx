"use client";

import React, { useState } from "react";
import {
  Rocket,
  ExternalLink,
  Code2,
  Cpu,
  Star,
  GitFork,
  Copy,
} from "lucide-react";
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
    "AI & Automation",
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
      <div className="max-w-5xl mx-auto space-y-8 p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
              <Rocket className="w-3.5 h-3.5" />
              <span>Featured Engineering Portfolio</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              My Projects
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

              <CardHeader className="p-6 pb-3 space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-[11px] font-mono bg-white/5 border-white/10 text-sky-300"
                  >
                    {project.category}
                  </Badge>
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
              <CardFooter className="p-6 pt-4 border-t border-[#252830] flex items-center justify-between relative z-10">
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
                      Ask Copilot about {project.title}
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
          <DialogContent className="bg-[#18191e] border-[#333333] max-w-2xl text-white">
            <DialogHeader>
              <DialogTitle className="font-bold text-lg text-white">
                {activeProjectModal?.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 font-mono">
                Implementation Architecture Snippet
              </DialogDescription>
            </DialogHeader>

            <pre className="bg-[#121214] p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-[#2a2c35] max-h-80">
              <code>{activeProjectModal?.highlightCode}</code>
            </pre>

            <DialogFooter className="flex items-center justify-between sm:justify-between w-full">
              <a
                href={activeProjectModal?.liveUrl || activeProjectModal?.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sky-400 hover:text-sky-300 font-mono flex items-center space-x-1"
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
