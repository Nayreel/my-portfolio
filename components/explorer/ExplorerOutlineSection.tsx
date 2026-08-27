"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, GitCommit } from "lucide-react";
import { PortfolioFile } from "@/data";
import { Button } from "@/components/ui/button";

interface ExplorerOutlineSectionProps {
  activeFile?: PortfolioFile;
}

const OUTLINE_ITEMS: Record<string, string[]> = {
  "bio.tsx": [
    "LeeRyanProfile",
    "EngineeringPhilosophy",
    "AboutHero()",
    "DeveloperStats()",
  ],
  "projects.tsx": [
    "FeaturedProjects[]",
    "ProjectCard()",
    "MetricsBanner()",
    "CodeInspectionModal()",
  ],
  "experience.tsx": [
    "CareerTimeline[]",
    "JAVResourceRecord",
    "BuweloSupportRecord",
    "HokeiSubicRecord",
    "GordonCollegeEducation",
  ],
  "tech-stack.json": [
    "developer",
    "frontend[]",
    "backend_and_databases[]",
    "automation_and_integrations[]",
    "devops_cloud_and_tools[]",
  ],
  "get-in-touch.tsx": [
    "ContactModule()",
    "handleSubmit()",
    "SocialLinks()",
    "DirectDispatch()",
  ],
  "resume.md": [
    "Professional Summary",
    "Work Experience",
    "Education (Cum Laude)",
    "Conferences & Competitions",
    "Skills & Tech Stack",
  ],
  "package.json": ["dependencies", "devDependencies", "scripts"],
  "config.ts": [
    "portfolioConfig",
    "themeSettings",
    "editorConfig",
    "aiAssistantConfig",
  ],
};

export function ExplorerOutlineSection({
  activeFile,
}: ExplorerOutlineSectionProps) {
  const [isOutlineOpen, setIsOutlineOpen] = useState(true);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  return (
    <>
      {/* Collapsible Outline Section */}
      <div className="border-t border-[#2d2d2d]">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setIsOutlineOpen(!isOutlineOpen)}
          className="w-full px-3 py-1.5 h-auto flex items-center justify-between text-[11px] font-semibold text-[#888888] hover:text-[#cccccc] hover:bg-[#202020] transition-colors rounded-none cursor-pointer"
        >
          <div className="flex items-center space-x-1">
            {isOutlineOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <span className="uppercase tracking-wider">OUTLINE</span>
          </div>
          <span className="text-[10px] text-[#666666] font-mono font-normal">
            {activeFile?.name}
          </span>
        </Button>

        {isOutlineOpen && activeFile && (
          <div className="px-4 py-1.5 space-y-1 text-[11px] text-[#999999] bg-[#141414] max-h-32 overflow-y-auto custom-scrollbar">
            {(
              OUTLINE_ITEMS[activeFile.id] || ["render()", "defaultExport"]
            ).map((symbol, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-1.5 hover:text-sky-300 cursor-pointer transition-colors"
              >
                <span className="text-amber-400 font-mono text-[10px]">
                  [e]
                </span>
                <span className="font-mono truncate">{symbol}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsible Timeline / Git Section */}
      <div className="border-t border-[#2d2d2d]">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setIsTimelineOpen(!isTimelineOpen)}
          className="w-full px-3 py-1.5 h-auto flex items-center justify-between text-[11px] font-semibold text-[#888888] hover:text-[#cccccc] hover:bg-[#202020] transition-colors rounded-none cursor-pointer"
        >
          <div className="flex items-center space-x-1">
            {isTimelineOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
            <span className="uppercase tracking-wider">TIMELINE (GIT)</span>
          </div>
          <GitCommit className="w-3 h-3 text-emerald-400" />
        </Button>

        {isTimelineOpen && (
          <div className="px-3 py-1.5 space-y-1.5 text-[11px] text-[#888888] bg-[#141414] max-h-28 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col">
              <span className="text-[#bbbbbb] font-medium truncate">
                feat: add AI &amp; interactive previews
              </span>
              <span className="text-[10px] text-[#666666]">
                Lee Ryan Garcia • 2 hours ago
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#bbbbbb] font-medium truncate">
                refactor: optimize sub-ms database cache
              </span>
              <span className="text-[10px] text-[#666666]">
                Lee Ryan Garcia • 2 days ago
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#bbbbbb] font-medium truncate">
                initial: architect Developer IDE layout
              </span>
              <span className="text-[10px] text-[#666666]">
                Lee Ryan Garcia • 1 week ago
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
