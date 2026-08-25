// components/antigravity/EditorTabs.tsx
"use client";

import React from "react";
import {
  X,
  Code2,
  Eye,
  Columns,
  ChevronRight,
  FileCode2,
  Cpu,
} from "lucide-react";
import { PortfolioFile } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type ViewMode = "code" | "preview" | "split";

interface EditorTabsProps {
  openTabs: PortfolioFile[];
  activeFileId: string;
  onSelectTab: (file: PortfolioFile) => void;
  onCloseTab: (fileId: string, e: React.MouseEvent) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onAskAIAboutFile: () => void;
  onRunActiveFile: () => void;
}

export function EditorTabs({
  openTabs,
  activeFileId,
  onSelectTab,
  onCloseTab,
  viewMode,
  setViewMode,
  onAskAIAboutFile,
}: EditorTabsProps) {
  const activeFile = openTabs.find((f) => f.id === activeFileId) || openTabs[0];

  const getTabIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
      return (
        <span className="text-sky-400 font-mono text-[11px] font-bold mr-1.5">
          ⚛
        </span>
      );
    }
    if (fileName.endsWith(".json")) {
      return (
        <span className="text-amber-400 font-mono text-[11px] font-bold mr-1.5">
          &#123;&#125;
        </span>
      );
    }
    if (fileName.endsWith(".md")) {
      return (
        <span className="text-blue-400 font-mono text-[11px] font-bold mr-1.5">
          M↓
        </span>
      );
    }
    return <FileCode2 className="w-3.5 h-3.5 text-sky-400 mr-1.5" />;
  };

  return (
    <div className="bg-[#1e1e1e] border-b border-[#2d2d2d] flex flex-col select-none z-20">
      {/* Upper Tab Strip */}
      <div className="h-9 flex items-center justify-between overflow-x-auto custom-scrollbar bg-[#181818]">
        <div className="flex items-center h-full">
          {openTabs.map((file) => {
            const isActive = file.id === activeFileId;
            return (
              <div
                key={file.id}
                onClick={() => onSelectTab(file)}
                className={`h-full flex items-center px-3.5 space-x-2 border-r border-[#2d2d2d] cursor-pointer text-xs font-mono transition-all group ${
                  isActive
                    ? "bg-[#1e1e1e] text-white border-t-2 border-t-sky-400 font-medium"
                    : "bg-[#181818] text-[#888888] hover:bg-[#1f1f1f] hover:text-[#cccccc]"
                }`}
              >
                <div className="flex items-center">
                  {getTabIcon(file.name)}
                  <span className="truncate max-w-[140px]">{file.name}</span>
                </div>

                {/* Modified dot / close button */}
                <div className="flex items-center ml-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mr-1 group-hover:hidden" />
                  <button
                    onClick={(e) => onCloseTab(file.id, e)}
                    className="p-0.5 rounded hover:bg-[#333333] text-[#888888] hover:text-white hidden group-hover:block transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Tab Controls: Mode Switcher & Actions */}
        <div className="flex items-center space-x-1.5 px-2 shrink-0">
          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-[#252526] p-0.5 rounded-md border border-[#333333]">
            <Tooltip>
              <TooltipTrigger
                onClick={() => setViewMode("code")}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === "code"
                    ? "bg-[#094771] text-white font-medium shadow-sm"
                    : "text-[#999999] hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Code</span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
              >
                Show Source Code Editor
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={() => setViewMode("split")}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === "split"
                    ? "bg-[#094771] text-white font-medium shadow-sm"
                    : "text-[#999999] hover:text-white"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Split</span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
              >
                Side-by-side Code + Live Component
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                onClick={() => setViewMode("preview")}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                  viewMode === "preview"
                    ? "bg-[#094771] text-white font-medium shadow-sm"
                    : "text-[#999999] hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Preview</span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
              >
                Full Interactive Live Portfolio View
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Quick AI button */}
          <Tooltip>
            <TooltipTrigger
              onClick={onAskAIAboutFile}
              className="h-6 px-2 text-[11px] bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 font-medium rounded-md inline-flex items-center justify-center cursor-pointer transition-colors"
            >
              <Cpu className="w-3 h-3 mr-1 text-sky-400" />
              <span className="hidden md:inline">Explain File</span>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              Ask Antigravity Copilot to analyze {activeFile?.name}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Breadcrumbs Bar */}
      <div className="h-6 bg-[#1e1e1e] px-3 flex items-center justify-between text-[11px] font-mono text-[#888888] border-t border-[#252526]">
        <div className="flex items-center space-x-1.5 truncate">
          <span className="text-[#666666]">portfolio-v2.5</span>
          <ChevronRight className="w-3 h-3 text-[#555555]" />
          <span>{activeFile?.folder || "root"}</span>
          <ChevronRight className="w-3 h-3 text-[#555555]" />
          <span className="text-[#cccccc] font-medium">{activeFile?.name}</span>
          <ChevronRight className="w-3 h-3 text-[#555555]" />
          <span className="text-amber-400/90">[e] export default</span>
        </div>

        <div className="flex items-center space-x-2 text-[10px] text-[#777777]">
          <span>{activeFile?.metadata?.lines || 50} lines</span>
          <Badge
            variant="outline"
            className="text-[9px] py-0 px-1 text-emerald-400 border-emerald-500/30 bg-emerald-950/20"
          >
            TypeScript JSX
          </Badge>
        </div>
      </div>
    </div>
  );
}
