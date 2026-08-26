"use client";

import React, { useState } from "react";
import {
  Palette,
  Flame,
  FileText,
  Mail,
  Copy,
  Settings,
  Check,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import confetti from "canvas-confetti";
import { DEVELOPER_PROFILE } from "@/data";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";

import { IDEThemeMode } from "@/types/ide";

export interface ThemeOption {
  id: string;
  name: string;
  color: string;
  mode: IDEThemeMode;
  bgClass: string;
  borderClass: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "cyan",
    name: "Nebula Cyan (Default)",
    color: "#38bdf8",
    mode: "nebula",
    bgClass: "bg-sky-500",
    borderClass: "border-sky-500",
  },
  {
    id: "purple",
    name: "Cyberpunk Purple",
    color: "#a855f7",
    mode: "cyberpunk",
    bgClass: "bg-purple-500",
    borderClass: "border-purple-500",
  },
  {
    id: "emerald",
    name: "Matrix Emerald",
    color: "#10b981",
    mode: "matrix",
    bgClass: "bg-emerald-500",
    borderClass: "border-emerald-500",
  },
  {
    id: "amber",
    name: "Solar Amber",
    color: "#f59e0b",
    mode: "solar",
    bgClass: "bg-amber-500",
    borderClass: "border-amber-500",
  },
  {
    id: "rose",
    name: "Crimson Rose",
    color: "#f43f5e",
    mode: "cyberpunk",
    bgClass: "bg-rose-500",
    borderClass: "border-rose-500",
  },
  {
    id: "blue",
    name: "Midnight Abyss",
    color: "#38bdf8",
    mode: "abyss",
    bgClass: "bg-blue-500",
    borderClass: "border-blue-500",
  },
];

interface ProfileDropdownProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
  openSettingsModal?: () => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
  activeTheme?: string;
  onSelectTheme?: (theme: ThemeOption) => void;
}

export function ProfileDropdown({
  onOpenResume,
  onOpenContact,
  openSettingsModal,
  antigravityMode,
  setAntigravityMode,
  activeTheme = "cyan",
  onSelectTheme,
}: ProfileDropdownProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(activeTheme);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    toast.success("Email copied to clipboard", {
      description: DEVELOPER_PROFILE.email,
    });
  };

  const handleThemeChange = (theme: ThemeOption) => {
    setSelectedThemeId(theme.id);
    document.documentElement.style.setProperty("--accent-theme", theme.color);
    if (onSelectTheme) onSelectTheme(theme);
    toast.success(`Theme switched to ${theme.name}`, {
      description: `Accent color updated across IDE workspace.`,
    });
  };

  const handleToggleZeroG = () => {
    const next = !antigravityMode;
    setAntigravityMode(next);
    confetti({ particleCount: 70, spread: 60 });
    if (next) toast.warning("Zero Gravity Mode Activated!");
    else toast.info("Gravity restored.");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center pl-1 cursor-pointer bg-transparent border-0 p-0 focus:outline-none select-none">
        <Badge
          variant="outline"
          className="bg-[#0078d4]/20 hover:bg-[#0078d4]/30 border-[#0078d4]/40 text-sky-300 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm hover:shadow-sky-500/20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
          <span className="font-sans">{DEVELOPER_PROFILE.name}</span>
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 bg-[#1e1f24] border-[#31333e] text-[#cccccc] p-1.5 shadow-2xl rounded-2xl z-50 text-xs"
      >
        {/* Profile Card Header */}
        <div className="p-3 bg-[#15161a] rounded-xl border border-[#262831] mb-1.5 space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-[1.5px] shrink-0 shadow-md">
              <div className="w-full h-full bg-[#18191e] rounded-[10px] flex items-center justify-center font-bold text-sky-300 font-mono text-xs">
                LG
              </div>
            </div>
            <div className="truncate min-w-0">
              <div className="font-bold text-white text-xs truncate">
                {DEVELOPER_PROFILE.name}
              </div>
              <div className="text-[10.5px] text-sky-400 font-mono truncate">
                {DEVELOPER_PROFILE.title}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10.5px] text-zinc-400 pt-1 border-t border-[#22242c]">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for Hire</span>
            </span>
            <span className="font-mono text-zinc-500">PH (GMT+8)</span>
          </div>
        </div>

        {/* Themes Submenu */}
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Palette className="w-3.5 h-3.5 text-sky-400" />
                <span>Color Theme</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      THEME_OPTIONS.find((t) => t.id === selectedThemeId)
                        ?.color || "#38bdf8",
                  }}
                />
                <ChevronRight className="w-3 h-3 text-zinc-500" />
              </div>
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent className="w-56 bg-[#1e1f24] border-[#31333e] text-[#cccccc] p-1.5 rounded-xl shadow-2xl">
              <DropdownMenuLabel className="text-[10px] text-zinc-400 font-mono uppercase px-2 py-1">
                IDE Workspace Themes
              </DropdownMenuLabel>
              {THEME_OPTIONS.map((theme) => (
                <DropdownMenuItem
                  key={theme.id}
                  onClick={() => handleThemeChange(theme)}
                  className="text-xs cursor-pointer py-1.5 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2.5">
                    <div
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.color }}
                    />
                    <span>{theme.name}</span>
                  </div>
                  {selectedThemeId === theme.id && (
                    <Check className="w-3.5 h-3.5 text-sky-400" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Zero-G Toggle */}
          <DropdownMenuItem
            onClick={handleToggleZeroG}
            className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Flame
                className={`w-3.5 h-3.5 ${
                  antigravityMode ? "text-amber-400 animate-pulse" : "text-zinc-400"
                }`}
              />
              <span>Zero-Gravity Mode</span>
            </div>
            <Badge
              variant="outline"
              className={`text-[9px] font-mono px-1.5 py-0 h-4 border-0 ${
                antigravityMode
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              {antigravityMode ? "ACTIVE" : "OFF"}
            </Badge>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#2a2c35] my-1" />

        {/* Quick Links Group */}
        <DropdownMenuGroup>
          {onOpenResume && (
            <DropdownMenuItem
              onClick={onOpenResume}
              className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center space-x-2"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>View Formal CV (resume.md)</span>
            </DropdownMenuItem>
          )}

          {onOpenContact && (
            <DropdownMenuItem
              onClick={onOpenContact}
              className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center space-x-2"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact / Hire Lee Ryan</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={handleCopyEmail}
            className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center space-x-2"
          >
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span>Copy Email Address</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => window.open("https://github.com/Nayreel", "_blank")}
            className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <GithubIcon className="w-3.5 h-3.5 text-zinc-300" />
              <span>GitHub (Nayreel)</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              window.open("https://linkedin.com/in/el015", "_blank")
            }
            className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn (/in/el015)</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-[#2a2c35] my-1" />

        {/* Preferences */}
        {openSettingsModal && (
          <DropdownMenuItem
            onClick={openSettingsModal}
            className="text-xs cursor-pointer py-2 px-2.5 rounded-lg hover:bg-[#272932] hover:text-white focus:bg-[#272932] focus:text-white flex items-center space-x-2"
          >
            <Settings className="w-3.5 h-3.5 text-zinc-400" />
            <span>IDE Preferences & Settings</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
