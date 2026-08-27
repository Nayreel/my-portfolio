"use client";

import React from "react";
import { Sidebar, PanelBottom, Zap, Minus, Square, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  ProfileDropdown,
  ThemeOption,
} from "@/components/profile/ProfileDropdown";

interface TopMenuBarLayoutTogglesProps {
  isLeftSidebarOpen: boolean;
  setIsLeftSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isBottomPanelOpen: boolean;
  setIsBottomPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isAIPanelOpen: boolean;
  setIsAIPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
  onOpenResume?: () => void;
  onOpenContact?: () => void;
  openSettingsModal?: () => void;
  activeTheme?: string;
  onSelectTheme?: (theme: ThemeOption) => void;
}

export function TopMenuBarLayoutToggles({
  isLeftSidebarOpen,
  setIsLeftSidebarOpen,
  isBottomPanelOpen,
  setIsBottomPanelOpen,
  isAIPanelOpen,
  setIsAIPanelOpen,
  antigravityMode,
  setAntigravityMode,
  onOpenResume,
  onOpenContact,
  openSettingsModal,
  activeTheme,
  onSelectTheme,
}: TopMenuBarLayoutTogglesProps) {
  return (
    <div className="flex items-center space-x-1.5">
      {/* Antigravity Zero-G mode button */}
      <Tooltip>
        <TooltipTrigger
          onClick={() => {
            const next = !antigravityMode;
            setAntigravityMode(next);
            if (next)
              toast.warning("Zero-G Mode Activated!", {
                description: "Code elements are floating in orbit.",
              });
            else toast.info("Gravity restored.");
          }}
          className={`h-6 px-2 text-[11px] font-medium transition-all rounded inline-flex items-center justify-center cursor-pointer ${
            antigravityMode
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
              : "hover:bg-[#2a2d2e] text-[#a0a0a0] hover:text-amber-300"
          }`}
        >
          <Zap
            className={`w-3 h-3 mr-1 ${antigravityMode ? "text-amber-400 fill-amber-400" : ""}`}
          />
          <span className="hidden lg:inline">
            {antigravityMode ? "Zero-G Active" : "Zero-G Mode"}
          </span>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
        >
          Toggle Zero Gravity Physics Animation
        </TooltipContent>
      </Tooltip>

      {/* Layout Toggles */}
      <div className="flex items-center space-x-0.5 bg-[#252526] p-0.5 rounded border border-[#333333]">
        <Tooltip>
          <TooltipTrigger
            onClick={() => setIsLeftSidebarOpen((prev) => !prev)}
            className={`p-1 rounded hover:bg-[#333333] transition-colors cursor-pointer ${
              isLeftSidebarOpen ? "text-sky-400" : "text-[#777777]"
            }`}
          >
            <Sidebar className="w-3.5 h-3.5" />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Toggle Primary Explorer
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() => setIsBottomPanelOpen((prev) => !prev)}
            className={`p-1 rounded hover:bg-[#333333] transition-colors cursor-pointer ${
              isBottomPanelOpen ? "text-sky-400" : "text-[#777777]"
            }`}
          >
            <PanelBottom className="w-3.5 h-3.5" />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Toggle Terminal & Output Panel
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={() => setIsAIPanelOpen((prev) => !prev)}
            className={`p-1 rounded hover:bg-[#333333] transition-colors relative cursor-pointer ${
              isAIPanelOpen ? "text-sky-400" : "text-[#777777]"
            }`}
          >
            <Sidebar className="w-3.5 h-3.5 scale-x-[-1]" />
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Toggle AI Panel
          </TooltipContent>
        </Tooltip>
      </div>

      {/* User Profile Dropdown with Themes */}
      <ProfileDropdown
        onOpenResume={onOpenResume}
        onOpenContact={onOpenContact}
        openSettingsModal={openSettingsModal}
        antigravityMode={antigravityMode}
        setAntigravityMode={setAntigravityMode}
        activeTheme={activeTheme}
        onSelectTheme={onSelectTheme}
      />

      {/* Window controls styling */}
      <div className="hidden sm:flex items-center space-x-1 pl-2 text-[#777777]">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="hover:text-white hover:bg-transparent h-5 w-5 p-0 transition-colors cursor-pointer"
          title="Minimize"
        >
          <Minus className="w-3 h-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="hover:text-white hover:bg-transparent h-5 w-5 p-0 transition-colors cursor-pointer"
          title="Maximize"
        >
          <Square className="w-2.5 h-2.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="hover:text-red-400 hover:bg-transparent h-5 w-5 p-0 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
