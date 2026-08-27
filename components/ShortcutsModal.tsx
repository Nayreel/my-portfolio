"use client";

import React, { useState } from "react";
import {
  Keyboard,
  Terminal,
  BookOpen,
  Command,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommandPalette?: () => void;
}

type TabType = "shortcuts" | "terminal" | "guide";

interface ShortcutItem {
  keys: string[];
  description: string;
  category: "Navigation" | "Panels" | "Editor & Tools";
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: ["Ctrl", "K"],
    description: "Open Command Palette & Global Search",
    category: "Navigation",
  },
  {
    keys: ["Ctrl", "P"],
    description: "Quick File Switcher",
    category: "Navigation",
  },
  {
    keys: ["Ctrl", "B"],
    description: "Toggle File Explorer Sidebar",
    category: "Panels",
  },
  {
    keys: ["Ctrl", "L"],
    description: "Toggle Antigravity AI Copilot Panel",
    category: "Panels",
  },
  {
    keys: ["Ctrl", "`"],
    description: "Toggle Interactive Terminal Emulator",
    category: "Panels",
  },
  {
    keys: ["Ctrl", ","],
    description: "Open Preferences & Theme Settings",
    category: "Editor & Tools",
  },
];

const TERMINAL_COMMANDS = [
  { cmd: "help", desc: "List all interactive terminal CLI commands" },
  { cmd: "bio", desc: "Display Lee Ryan Garcia developer bio & pillars" },
  { cmd: "projects", desc: "List all 9 featured & client engineering projects" },
  { cmd: "skills", desc: "Display categorized technical matrix" },
  { cmd: "experience", desc: "View career milestones & professional history" },
  { cmd: "cat resume.md", desc: "Print formatted markdown curriculum vitae" },
  { cmd: "download-resume", desc: "Download Lee_Ryan_Garcia_Resume.pdf directly" },
  { cmd: "clear", desc: "Clear terminal screen output" },
];

const GUIDE_SECTIONS = [
  {
    title: "Tri-Mode Code & Component Viewer",
    desc: "Switch between Code (monaco/code view), Live Preview (fully interactive live portfolio component), and Split mode (side-by-side) on desktop viewports using the top right editor tab switcher.",
    icon: Layers,
  },
  {
    title: "5 Workspace Theme Modes",
    desc: "Tailored IDE aesthetic atmospheres: Dark Nebula (slate), Midnight Abyss (pure OLED #000000), Cyberpunk Synthwave (neon purple), Matrix Terminal (emerald green), and Solar Warm (espresso amber).",
    icon: Sparkles,
  },
  {
    title: "Zero-Gravity Physics Engine",
    desc: "Toggle Zero-G mode from the top menu or preferences modal to experience interactive floating elements with realistic 2D gravity and collision dynamics.",
    icon: Command,
  },
  {
    title: "Global Command Palette",
    desc: "Press Ctrl+K anytime to quickly filter projects, open source files, switch color palettes, trigger terminal commands, and jump across the portfolio.",
    icon: Search,
  },
];

export function ShortcutsModal({
  isOpen,
  onClose,
  onOpenCommandPalette,
}: ShortcutsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("shortcuts");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#18191e] border-[#2f313c] w-[95vw] max-w-[95vw] sm:max-w-2xl max-h-[85dvh] sm:max-h-[85vh] text-white shadow-2xl rounded-2xl p-0 gap-0 flex flex-col overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-3.5 pr-12 shrink-0 border-b border-[#272932]/60 bg-[#18191e]">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <DialogTitle className="text-white text-base sm:text-lg font-bold truncate">
              Documentation & Keyboard Shortcuts
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-zinc-400 mt-1">
            Master the Portfolio IDE with keyboard bindings, terminal CLI commands, and feature guides.
          </DialogDescription>

          {/* Tab Selection */}
          <div className="flex items-center space-x-1.5 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setActiveTab("shortcuts")}
              className={`text-xs h-7 px-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "shortcuts"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-[#252830]"
              }`}
            >
              <Keyboard className="w-3.5 h-3.5 mr-1" />
              Shortcuts
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setActiveTab("terminal")}
              className={`text-xs h-7 px-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "terminal"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-[#252830]"
              }`}
            >
              <Terminal className="w-3.5 h-3.5 mr-1" />
              Terminal CLI
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setActiveTab("guide")}
              className={`text-xs h-7 px-3 rounded-lg cursor-pointer transition-colors ${
                activeTab === "guide"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                  : "text-zinc-400 hover:text-white hover:bg-[#252830]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              IDE Guide
            </Button>
          </div>
        </DialogHeader>

        {/* Scrollable Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain custom-scrollbar p-4 sm:p-6 space-y-4">
          {/* TAB 1: Keyboard Shortcuts */}
          {activeTab === "shortcuts" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {SHORTCUTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#141518] border border-[#272932] hover:border-[#383b48] transition-colors"
                  >
                    <span className="text-xs text-zinc-300 pr-2 leading-snug">
                      {item.description}
                    </span>
                    <div className="flex items-center space-x-1 shrink-0">
                      {item.keys.map((k, kIdx) => (
                        <React.Fragment key={kIdx}>
                          <kbd className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#22242c] border border-[#373945] rounded shadow-xs text-zinc-200">
                            {k}
                          </kbd>
                          {kIdx < item.keys.length - 1 && (
                            <span className="text-[10px] text-zinc-500">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {onOpenCommandPalette && (
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      onClose();
                      onOpenCommandPalette();
                    }}
                    variant="outline"
                    className="w-full text-xs bg-[#1a1c22] border-[#2f323e] hover:bg-[#242730] text-sky-400 hover:text-sky-300 cursor-pointer h-9 rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Open Command Palette (Ctrl+K)</span>
                    <ExternalLink className="w-3 h-3 ml-1 text-zinc-500" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Terminal CLI Commands */}
          {activeTab === "terminal" && (
            <div className="space-y-2">
              <div className="p-3 bg-[#111215] border border-[#272932] rounded-xl font-mono text-xs text-zinc-400 space-y-2">
                <div className="text-[11px] text-zinc-500">
                  Tip: Press <kbd className="px-1.5 py-0.2 bg-[#20222a] border border-[#333] rounded text-zinc-300">Ctrl + `</kbd> to toggle the terminal panel anytime.
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {TERMINAL_COMMANDS.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-[#141518] border border-[#272932] gap-1 sm:gap-3"
                  >
                    <div className="font-mono text-xs text-emerald-400 font-bold flex items-center space-x-1.5 shrink-0">
                      <span className="text-zinc-500">$</span>
                      <span>{c.cmd}</span>
                    </div>
                    <div className="text-xs text-zinc-400 font-sans sm:text-right">
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: IDE Guide */}
          {activeTab === "guide" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GUIDE_SECTIONS.map((g, idx) => {
                const Icon = g.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#141518] border border-[#272932] space-y-1.5"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      <h4 className="text-xs font-semibold text-white">
                        {g.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                      {g.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 sm:p-6 pt-3 pb-5 sm:pb-6 border-t border-[#272932]/60 shrink-0 bg-[#18191e]/95 backdrop-blur-xs flex flex-row justify-end">
          <Button
            onClick={onClose}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl shadow-md cursor-pointer h-9 sm:h-10 px-5"
          >
            Got It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
