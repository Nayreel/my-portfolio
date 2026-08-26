"use client";

import React from "react";
import {
  Files,
  Search,
  GitBranch,
  PlayCircle,
  Puzzle,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export type ActiveSidebarView =
  | "explorer"
  | "search"
  | "git"
  | "debug"
  | "extensions"
  | "none";

interface ActivityBarProps {
  activeView: ActiveSidebarView;
  setActiveView: (view: ActiveSidebarView) => void;
  isAIPanelOpen: boolean;
  setIsAIPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  openSettingsModal: () => void;
  openContactTab: () => void;
}

export function ActivityBar({
  activeView,
  setActiveView,
  isAIPanelOpen,
  setIsAIPanelOpen,
  openSettingsModal,
  openContactTab,
}: ActivityBarProps) {
  const topButtons = [
    {
      id: "explorer" as ActiveSidebarView,
      icon: Files,
      label: "Explorer",
      badge: null,
    },
    {
      id: "search" as ActiveSidebarView,
      icon: Search,
      label: "Search Files & Symbols",
      badge: null,
    },
    {
      id: "git" as ActiveSidebarView,
      icon: GitBranch,
      label: "Source Control • 3 Modified",
      badge: "3",
    },
    {
      id: "debug" as ActiveSidebarView,
      icon: PlayCircle,
      label: "Run & Debug",
      badge: null,
    },
    {
      id: "extensions" as ActiveSidebarView,
      icon: Puzzle,
      label: "Extensions",
      badge: null,
    },
  ];

  return (
    <aside className="w-10 sm:w-12 bg-[#181818] border-r border-[#2d2d2d] flex flex-col justify-between items-center py-2 select-none z-30 shrink-0">
      {/* Top Activity Buttons with shadcn Tooltips */}
      <div className="flex flex-col items-center space-y-1.5 w-full">
        {topButtons.map((btn) => {
          const Icon = btn.icon;
          const isActive = activeView === btn.id;

          return (
            <Tooltip key={btn.id}>
              <TooltipTrigger
                onClick={() => {
                  if (isActive) {
                    setActiveView("none");
                  } else {
                    setActiveView(btn.id);
                  }
                }}
                className={`relative w-full h-10 flex items-center justify-center transition-all group cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-[#858585] hover:text-[#d4d4d4]"
                }`}
              >
                {/* Active indicator line */}
                {isActive && (
                  <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-sky-400 rounded-r" />
                )}
                <Icon className="w-5 h-5 stroke-[1.75] group-hover:scale-105 transition-transform" />

                {btn.badge && (
                  <Badge
                    variant="secondary"
                    className="absolute bottom-1 right-1.5 bg-sky-500 text-black text-[9px] font-bold px-1 py-0 h-3.5 min-w-[14px] flex items-center justify-center rounded-full leading-none pointer-events-none"
                  >
                    {btn.badge}
                  </Badge>
                )}
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c] text-xs"
              >
                {btn.label}
              </TooltipContent>
            </Tooltip>
          );
        })}

        {/* Antigravity AI Trigger */}
        <div className="w-8 h-[1px] bg-[#2d2d2d] my-1" />
      </div>

      {/* Bottom Activity Buttons */}
      <div className="flex flex-col items-center space-y-1.5 w-full">
        <Tooltip>
          <TooltipTrigger
            onClick={openContactTab}
            className="w-full h-10 flex items-center justify-center text-[#858585] hover:text-sky-300 transition-colors cursor-pointer"
          >
            <Avatar className="w-6 h-6 ring-1 ring-sky-500/40">
              <AvatarFallback className="bg-gradient-to-tr from-sky-500 to-indigo-600 text-[10px] font-bold text-white">
                LG
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c] text-xs"
          >
            Contact Lee Ryan Garcia
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={openSettingsModal}
            className="w-full h-10 flex items-center justify-center text-[#858585] hover:text-white transition-colors group cursor-pointer"
          >
            <Settings className="w-5 h-5 stroke-[1.75] group-hover:rotate-45 transition-transform" />
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c] text-xs"
          >
            Portfolio IDE Preferences & Theme
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
