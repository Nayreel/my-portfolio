"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Target,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  MoreHorizontal,
  Cloud,
} from "lucide-react";
import { GitCommitRecord } from "@/types/sidebar";
import { Badge } from "@/components/ui/badge";

interface SidebarGitGraphProps {
  commits: GitCommitRecord[];
  onResetChanges: () => void;
}

export function SidebarGitGraph({ commits, onResetChanges }: SidebarGitGraphProps) {
  const [isGraphCollapsed, setIsGraphCollapsed] = useState(false);

  return (
    <div className="shrink-0 border-t border-[#252526] bg-[#181818] flex flex-col">
      {/* Graph Header & Toolbar */}
      <div
        onClick={() => setIsGraphCollapsed((prev) => !prev)}
        className="flex items-center justify-between px-3 py-1 hover:bg-[#252526] cursor-pointer text-zinc-300 select-none"
      >
        <div className="flex items-center space-x-1">
          {isGraphCollapsed ? (
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          )}
          <span className="text-xs font-medium">Graph</span>
        </div>

        {/* Toolbar Actions */}
        <div
          className="flex items-center space-x-1 text-zinc-400"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] text-zinc-400 hover:text-white px-1 cursor-pointer">
            Auto
          </span>
          <span title="Focus Current Head" className="hover:text-white cursor-pointer p-0.5">
            <Target className="w-3.5 h-3.5" />
          </span>
          <span title="Pull" className="hover:text-white cursor-pointer p-0.5">
            <ArrowDownToLine className="w-3.5 h-3.5" />
          </span>
          <span title="Push" className="hover:text-white cursor-pointer p-0.5">
            <ArrowUpFromLine className="w-3.5 h-3.5" />
          </span>
          <span
            title="Refresh Graph"
            onClick={onResetChanges}
            className="hover:text-white cursor-pointer p-0.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </span>
          <span title="More Actions" className="hover:text-white cursor-pointer p-0.5">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Interactive Connected Git Graph List */}
      {!isGraphCollapsed && (
        <div className="max-h-60 overflow-y-auto py-1 px-3 space-y-1 relative custom-scrollbar border-t border-[#222]">
          {commits.map((c, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === commits.length - 1;

            return (
              <div
                key={c.hash}
                onClick={() => {
                  navigator.clipboard.writeText(c.hash);
                }}
                className="flex items-start space-x-2 py-0.5 group cursor-pointer hover:bg-[#222222] px-1 rounded transition-colors relative"
              >
                {/* Visual Branch Line & Node */}
                <div className="flex flex-col items-center shrink-0 w-3 self-stretch relative pt-1">
                  {!isLast && (
                    <div className="absolute top-2.5 bottom-[-8px] left-[5px] w-[1px] bg-sky-500/50" />
                  )}
                  {isFirst ? (
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-sky-400 bg-[#181818] ring-1 ring-sky-400/40 shrink-0 z-10" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-sky-400 shrink-0 z-10" />
                  )}
                </div>

                {/* Commit Message, Branch Badge & Author */}
                <div className="flex-1 min-w-0 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="text-xs text-zinc-200 truncate group-hover:text-sky-300 transition-colors">
                      {c.message}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0 ml-1">
                    {c.isHead && (
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1 py-0 h-4 bg-sky-950/60 border-sky-500/70 text-sky-300 flex items-center space-x-0.5 font-mono rounded-xs"
                      >
                        <span>◎</span>
                        <span>dev</span>
                      </Badge>
                    )}
                    {c.cloudSynced && (
                      <Cloud className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    )}
                    {c.author && !c.isHead && (
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {c.author.toLowerCase().replace(/\s+/g, "")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
