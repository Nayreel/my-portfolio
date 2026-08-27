"use client";

import React from "react";
import {
  GitBranch,
  RotateCw,
  AlertCircle,
  AlertTriangle,
  Check,
  Bell,
  Zap,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";

interface StatusBarProps {
  cursorLine?: number;
  cursorCol?: number;
  onToggleTerminal?: () => void;
  onToggleAI?: () => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

export function StatusBar({
  cursorLine = 42,
  cursorCol = 18,
  onToggleTerminal,
  onToggleAI,
  antigravityMode,
  setAntigravityMode,
}: StatusBarProps) {
  return (
    <footer className="h-6 bg-[#007acc] text-white flex items-center justify-between px-2 text-[11px] font-sans select-none z-30 shrink-0">
      {/* Left side info */}
      <div className="flex items-center space-x-3">
        {/* Git Branch Pill */}
        <Tooltip>
          <TooltipTrigger
            onClick={onToggleTerminal}
            className="flex items-center space-x-1 hover:bg-black/20 px-1.5 py-0.5 rounded transition-colors cursor-pointer"
          >
            <GitBranch className="w-3 h-3" />
            <span className="font-mono">main* 0↓ 1↑</span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Git: main (1 commit ready to deploy)
          </TooltipContent>
        </Tooltip>

        {/* Sync indicator */}
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              if (onToggleTerminal) onToggleTerminal();
              toast.info("Git sync triggered", {
                description: "Repository up to date.",
              });
            }}
            className="hover:bg-black/20 p-0.5 rounded transition-colors cursor-pointer"
          >
            <RotateCw className="w-2.5 h-2.5" />
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Synchronize Git Changes
          </TooltipContent>
        </Tooltip>

        {/* Errors & Warnings */}
        <Tooltip>
          <TooltipTrigger
            onClick={onToggleTerminal}
            className="flex items-center space-x-1.5 hover:bg-black/20 px-1 py-0.5 rounded transition-colors cursor-pointer"
          >
            <span className="flex items-center space-x-0.5">
              <AlertCircle className="w-3 h-3" />
              <span className="font-mono">0</span>
            </span>
            <span className="flex items-center space-x-0.5">
              <AlertTriangle className="w-3 h-3" />
              <span className="font-mono">0</span>
            </span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            0 Errors, 0 Warnings
          </TooltipContent>
        </Tooltip>

        {/* Blame message */}
        <span className="hidden md:inline text-white/80 text-[10px]">
          Lee Ryan Garcia (2 hours ago) • Ready for Hire
        </span>
      </div>

      {/* Right side info */}
      <div className="flex items-center space-x-3 text-[11px]">
        {/* Zero-G Trigger */}
        <Tooltip>
          <TooltipTrigger
            onClick={() => {
              const next = !antigravityMode;
              setAntigravityMode(next);
              if (next) toast.warning("Zero Gravity Mode Activated!");
              else toast.info("Gravity restored.");
            }}
            className={`flex items-center space-x-1 px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
              antigravityMode
                ? "bg-amber-400 text-black font-bold"
                : "hover:bg-black/20"
            }`}
          >
            <Zap className="w-3 h-3" />
            <span className="hidden sm:inline">
              {antigravityMode ? "Zero-G: ON" : "Zero-G: OFF"}
            </span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Toggle Zero-G physics floating effect
          </TooltipContent>
        </Tooltip>

        {/* Cursor Position */}
        <span className="font-mono hidden sm:inline">
          Ln {cursorLine}, Col {cursorCol}
        </span>

        {/* Encoding / Spaces */}
        <span className="hidden lg:inline">Spaces: 2</span>
        <span className="hidden lg:inline">UTF-8</span>
        <span className="hidden lg:inline">CRLF</span>

        {/* Language */}
        <span className="font-medium hidden md:inline">TypeScript JSX</span>

        {/* AI branding */}
        <Tooltip>
          <TooltipTrigger
            onClick={onToggleAI}
            className="flex items-center space-x-1 hover:bg-black/20 px-1 py-0.5 rounded transition-colors font-semibold cursor-pointer text-sky-300"
          >
            <span>AI</span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Toggle AI Reasoning
          </TooltipContent>
        </Tooltip>

        {/* Prettier status */}
        <span className="hidden xs:flex sm:flex items-center space-x-0.5 text-white/90">
          <Check className="w-3 h-3" />
          <span>Prettier</span>
        </span>

        {/* Notifications */}
        <Tooltip>
          <TooltipTrigger
            onClick={() => toast.info("No new notifications")}
            className="hover:bg-black/20 p-0.5 rounded transition-colors cursor-pointer"
          >
            <Bell className="w-3 h-3" />
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Notifications
          </TooltipContent>
        </Tooltip>
      </div>
    </footer>
  );
}
