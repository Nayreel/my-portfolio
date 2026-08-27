"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode,
  RefreshCw,
  Search,
  GitCommit,
  X,
} from "lucide-react";
import { PortfolioFile } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarExplorerProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (file: PortfolioFile) => void;
  openCommandPalette: () => void;
  onClose?: () => void;
}

export function SidebarExplorer({
  files,
  activeFileId,
  onSelectFile,
  openCommandPalette,
  onClose,
}: SidebarExplorerProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    about: true,
    projects: true,
    skills: true,
    contact: true,
    resume: true,
    root: true,
  });

  const [isOutlineOpen, setIsOutlineOpen] = useState(true);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  // Group files by folder
  const groupedFiles: Record<string, PortfolioFile[]> = {};
  files.forEach((file) => {
    const folder = file.folder || "root";
    if (!groupedFiles[folder]) groupedFiles[folder] = [];
    groupedFiles[folder].push(file);
  });

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".jsx")) {
      return <span className="text-[#38bdf8] text-[13px] leading-none font-bold mr-2 shrink-0 select-none">⚛</span>;
    }
    if (fileName.endsWith(".ts")) {
      return <span className="text-[#3178c6] text-[11px] leading-none font-bold font-mono px-0.5 rounded bg-[#3178c6]/10 mr-2 shrink-0 select-none">TS</span>;
    }
    if (fileName.endsWith(".json")) {
      return <span className="text-[#facc15] text-[12px] leading-none font-bold font-mono mr-2 shrink-0 select-none">&#123;&#125;</span>;
    }
    if (fileName.endsWith(".md")) {
      return <span className="text-[#60a5fa] text-[11px] leading-none font-bold font-mono mr-2 shrink-0 select-none">M↓</span>;
    }
    return <FileCode className="w-3.5 h-3.5 text-sky-400 mr-2 shrink-0" />;
  };

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeFile = files.find((f) => f.id === activeFileId);

  // Outline symbols
  const outlineItems: Record<string, string[]> = {
    "bio.tsx": ["LeeRyanProfile", "EngineeringPhilosophy", "AboutHero()", "DeveloperStats()"],
    "projects.tsx": ["FeaturedProjects[]", "ProjectCard()", "MetricsBanner()", "CodeInspectionModal()"],
    "experience.tsx": ["CareerTimeline[]", "JAVResourceRecord", "BuweloSupportRecord", "HokeiSubicRecord", "GordonCollegeEducation"],
    "tech-stack.json": ["developer", "frontend[]", "backend_and_databases[]", "automation_and_integrations[]", "devops_cloud_and_tools[]"],
    "get-in-touch.tsx": ["ContactModule()", "handleSubmit()", "SocialLinks()", "DirectDispatch()"],
    "resume.md": ["Professional Summary", "Work Experience", "Education (Cum Laude)", "Conferences & Competitions", "Skills & Tech Stack"],
    "package.json": ["dependencies", "devDependencies", "scripts"],
    "config.ts": ["portfolioConfig", "themeSettings", "editorConfig", "aiAssistantConfig"],
  };

  return (
    <div className="w-full bg-[#181818] border-r border-[#2d2d2d] flex flex-col h-full select-none text-xs text-[#cccccc]">
      {/* Sidebar Header */}
      <div className="h-9 px-4 flex items-center justify-between border-b border-[#2d2d2d] text-[11px] font-semibold tracking-wider text-[#cccccc] select-none">
        <span className="uppercase tracking-wider font-semibold text-[#bbbbbb] text-[11px]">
          EXPLORER
        </span>
        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                const allOpen = Object.values(openFolders).every(Boolean);
                const nextState: Record<string, boolean> = {};
                Object.keys(openFolders).forEach(
                  (k) => (nextState[k] = !allOpen),
                );
                setOpenFolders(nextState);
              }}
              className="p-1 hover:bg-[#2a2d2e] rounded text-[#858585] hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              Toggle All Folders
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={openCommandPalette}
              className="p-1 hover:bg-[#2a2d2e] rounded text-[#858585] hover:text-white transition-colors cursor-pointer"
            >
              <Search className="w-3 h-3" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              Quick Search (⌘P)
            </TooltipContent>
          </Tooltip>

          {onClose && (
            <Tooltip>
              <TooltipTrigger
                onClick={onClose}
                className="p-1 hover:bg-[#2a2d2e] rounded text-[#858585] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
              >
                Close Explorer
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Quick Search with shadcn Input */}
      <div className="px-2 py-1.5 border-b border-[#252526]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#666666]" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter files..."
            className="h-7 bg-[#1f1f1f] border-[#333333] pl-8 pr-6 text-xs text-[#dddddd] placeholder-[#666666] focus-visible:ring-sky-500 focus-visible:ring-1"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setSearchQuery("")}
              className="absolute right-1 top-1 text-[#888888] hover:text-white hover:bg-transparent h-5 w-5 p-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Main File Tree Area wrapped in ScrollArea */}
      <ScrollArea className="flex-1 px-1 py-1">
        {searchQuery ? (
          <div className="px-1 py-1 space-y-0.5">
            <div className="text-[10px] text-[#777777] uppercase px-2 mb-1">
              Matching Files ({filteredFiles.length})
            </div>
            {filteredFiles.map((file) => {
              const isSelected = file.id === activeFileId;
              return (
                <Button
                  key={file.id}
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => onSelectFile(file)}
                  className={`w-full flex items-center justify-between px-2 py-1 h-[22px] rounded text-left transition-colors font-normal cursor-pointer ${
                    isSelected
                      ? "bg-[#094771] text-white font-medium hover:bg-[#094771] hover:text-white"
                      : "hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate text-[13px]">
                    {getFileIcon(file.name)}
                    <span className="truncate">{file.name}</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[9px] py-0 px-1 text-[#888888] border-[#3c3c3c] font-mono pointer-events-none"
                  >
                    {file.folder}
                  </Badge>
                </Button>
              );
            })}
          </div>
        ) : (
          <div>
            {/* Root workspace folder header */}
            <div
              onClick={() => toggleFolder("root")}
              className="flex items-center px-2 py-1 text-[13px] font-semibold text-[#cccccc] hover:text-white cursor-pointer group"
            >
              {(openFolders["root"] ?? true) ? (
                <ChevronDown className="w-3.5 h-3.5 mr-1 text-[#888888] shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#888888] shrink-0" />
              )}
              {(openFolders["root"] ?? true) ? (
                <FolderOpen className="w-3.5 h-3.5 mr-1.5 text-sky-400 shrink-0" />
              ) : (
                <Folder className="w-3.5 h-3.5 mr-1.5 text-sky-400 shrink-0" />
              )}
              <span className="truncate">my-portfolio</span>
              <Badge
                variant="secondary"
                className="ml-auto text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-1 py-0 font-mono"
              >
                main
              </Badge>
            </div>

            {/* Folder Contents (both subfolders & root files inside my-portfolio) */}
            {(openFolders["root"] ?? true) && (
              <div className="space-y-0.5">
                {/* Folder Sections */}
                {[
                  "about",
                  "projects",
                  "experience",
                  "skills",
                  "contact",
                  "resume",
                ].map((folderKey) => {
                  const folderFiles = groupedFiles[folderKey] || [];
                  if (folderFiles.length === 0) return null;
                  const isOpen = openFolders[folderKey] ?? true;

                  return (
                    <div key={folderKey} className="pl-2">
                      {/* Folder Header */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => toggleFolder(folderKey)}
                        className="w-full flex items-center px-1.5 py-0 h-[22px] rounded hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white text-left transition-colors font-normal group cursor-pointer justify-start text-[13px]"
                      >
                        {isOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 mr-1 text-[#858585] group-hover:text-white shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#858585] group-hover:text-white shrink-0" />
                        )}
                        {isOpen ? (
                          <FolderOpen className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
                        ) : (
                          <Folder className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
                        )}
                        <span className="truncate capitalize">{folderKey}</span>
                        <span className="ml-auto text-[11px] text-[#666666]">
                          {folderFiles.length}
                        </span>
                      </Button>

                      {/* Folder Children Files */}
                      {isOpen && (
                        <div className="pl-2 space-y-0.5 border-l border-[#282828] ml-2.5 my-0.5">
                          {folderFiles.map((file) => {
                            const isSelected = file.id === activeFileId;
                            return (
                              <Button
                                key={file.id}
                                type="button"
                                variant="ghost"
                                size="xs"
                                onClick={() => onSelectFile(file)}
                                className={`w-full flex items-center justify-between px-2 py-0 h-[22px] rounded-sm text-left transition-colors font-normal group cursor-pointer text-[13px] ${
                                  isSelected
                                    ? "bg-[#04395e] text-white font-medium border-l-2 border-sky-400 hover:bg-[#04395e] hover:text-white"
                                    : "hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white"
                                }`}
                              >
                                <div className="flex items-center space-x-1 truncate">
                                  {getFileIcon(file.name)}
                                  <span className="truncate">{file.name}</span>
                                </div>
                                <span className="text-[10px] font-mono text-amber-400/80">
                                  M
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Root files (package.json, config.ts) inside my-portfolio */}
                <div className="pl-2 space-y-0.5">
                  {(groupedFiles["root"] || []).map((file) => {
                    const isSelected = file.id === activeFileId;
                    return (
                      <Button
                        key={file.id}
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => onSelectFile(file)}
                        className={`w-full flex items-center justify-between px-2 py-0 h-[22px] rounded text-left transition-colors font-normal cursor-pointer text-[13px] ${
                          isSelected
                            ? "bg-[#04395e] text-white font-medium border-l-2 border-sky-400 hover:bg-[#04395e] hover:text-white"
                            : "hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center space-x-1 truncate">
                          {getFileIcon(file.name)}
                          <span className="truncate">{file.name}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

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
            {(outlineItems[activeFile.id] || ["render()", "defaultExport"]).map(
              (symbol, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-1.5 hover:text-sky-300 cursor-pointer transition-colors"
                >
                  <span className="text-amber-400 font-mono text-[10px]">
                    [e]
                  </span>
                  <span className="font-mono truncate">{symbol}</span>
                </div>
              ),
            )}
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
                feat: add AI copilot &amp; interactive previews
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
    </div>
  );
}
