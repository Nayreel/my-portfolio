// components/antigravity/TopMenuBar.tsx
"use client";

import React from "react";
import {
  Search,
  Sidebar,
  PanelBottom,
  Zap,
  Minus,
  Square,
  X,
  FileCode,
  Terminal,
  FolderTree,
  Send,
  Download,
  Info,
  Layers,
  FileText,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface TopMenuBarProps {
  activeFileName: string;
  activeFilePath: string;
  isLeftSidebarOpen: boolean;
  setIsLeftSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isBottomPanelOpen: boolean;
  setIsBottomPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isAIPanelOpen: boolean;
  setIsAIPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  openCommandPalette: () => void;
  onRunCode: () => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
  onOpenLivePreviewTab: () => void;
}

export function TopMenuBar({
  activeFileName,
  activeFilePath,
  isLeftSidebarOpen,
  setIsLeftSidebarOpen,
  isBottomPanelOpen,
  setIsBottomPanelOpen,
  isAIPanelOpen,
  setIsAIPanelOpen,
  openCommandPalette,
  onRunCode,
  antigravityMode,
  setAntigravityMode,
  onOpenLivePreviewTab,
}: TopMenuBarProps) {
  const handleDownloadResume = () => {
    toast.success("Resume downloaded!", {
      description: "Alex_Vance_Staff_Software_Engineer.pdf has been prepared.",
    });
  };

  return (
    <header className="h-9 bg-[#181818] border-b border-[#2d2d2d] flex items-center justify-between px-2 select-none text-[13px] text-[#cccccc] relative z-40">
      {/* Left section: App Icon & Shadcn Dropdown Menus */}
      <div className="flex items-center space-x-1">
        {/* Antigravity IDE logo */}
        <div
          onClick={openCommandPalette}
          className="flex items-center space-x-1.5 px-2 py-1 mr-1 rounded hover:bg-[#2a2d2e] cursor-pointer text-sky-400"
        >
          <div className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
            Δ
          </div>
          <span className="font-semibold text-xs tracking-tight text-white hidden sm:inline">
            Antigravity
          </span>
        </div>

        {/* Desktop Menu items with shadcn DropdownMenu */}
        <div className="hidden md:flex items-center space-x-0.5">
          {/* File Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 py-0.5 rounded text-xs text-[#b8b8b8] hover:bg-[#2a2d2e] hover:text-white transition-colors focus:outline-none data-[state=open]:bg-[#2a2d2e] data-[state=open]:text-white cursor-pointer">
              File
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 bg-[#252526] border-[#454545] text-[#cccccc]"
            >
              <DropdownMenuItem
                onClick={openCommandPalette}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <FileCode className="w-3.5 h-3.5 mr-2 text-sky-400" />
                <span>Quick Open...</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌘P
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsBottomPanelOpen(true)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Terminal className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>Open Terminal</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌃`
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsAIPanelOpen((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Sidebar className="w-3.5 h-3.5 mr-2 text-amber-400 scale-x-[-1]" />
                <span>Toggle AI Assistant</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌘L
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3c3c3c]" />
              <DropdownMenuItem
                onClick={handleDownloadResume}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Download className="w-3.5 h-3.5 mr-2 text-sky-400" />
                <span>Download Resume (PDF)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Edit Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 py-0.5 rounded text-xs text-[#b8b8b8] hover:bg-[#2a2d2e] hover:text-white transition-colors focus:outline-none data-[state=open]:bg-[#2a2d2e] data-[state=open]:text-white cursor-pointer">
              Edit
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 bg-[#252526] border-[#454545] text-[#cccccc]"
            >
              <DropdownMenuItem
                onClick={openCommandPalette}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <span>Find in Workspace</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌘F
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.info("Clipboard copied")}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <span>Copy Current File Path</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌥⌘C
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 py-0.5 rounded text-xs text-[#b8b8b8] hover:bg-[#2a2d2e] hover:text-white transition-colors focus:outline-none data-[state=open]:bg-[#2a2d2e] data-[state=open]:text-white cursor-pointer">
              View
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 bg-[#252526] border-[#454545] text-[#cccccc]"
            >
              <DropdownMenuItem
                onClick={() => setIsLeftSidebarOpen((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Sidebar className="w-3.5 h-3.5 mr-2 text-sky-400" />
                <span>Toggle Primary Sidebar</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌘B
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsBottomPanelOpen((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <PanelBottom className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>Toggle Terminal Panel</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌃`
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsAIPanelOpen((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Sidebar className="w-3.5 h-3.5 mr-2 text-amber-400 scale-x-[-1]" />
                <span>Toggle Antigravity AI</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌘L
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#3c3c3c]" />
              <DropdownMenuItem
                onClick={() => setAntigravityMode((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Zap className="w-3.5 h-3.5 mr-2 text-amber-400" />
                <span>Toggle Zero-G Physics</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Go Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 py-0.5 rounded text-xs text-[#b8b8b8] hover:bg-[#2a2d2e] hover:text-white transition-colors focus:outline-none data-[state=open]:bg-[#2a2d2e] data-[state=open]:text-white cursor-pointer">
              Go
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 bg-[#252526] border-[#454545] text-[#cccccc]"
            >
              <DropdownMenuItem
                onClick={openCommandPalette}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <FolderTree className="w-3.5 h-3.5 mr-2 text-sky-400" />
                <span>Go to File...</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌘P
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onOpenLivePreviewTab}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Layers className="w-3.5 h-3.5 mr-2 text-purple-400" />
                <span>Go to Featured Projects</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={openCommandPalette}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Send className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>Go to Contact Form</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Run Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 py-0.5 rounded text-xs text-[#b8b8b8] hover:bg-[#2a2d2e] hover:text-white transition-colors focus:outline-none data-[state=open]:bg-[#2a2d2e] data-[state=open]:text-white cursor-pointer">
              Run
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 bg-[#252526] border-[#454545] text-[#cccccc]"
            >
              <DropdownMenuItem
                onClick={onRunCode}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <span>Start Dev Preview Build</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  F5
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onRunCode}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <span>Run Portfolio Unit Tests</span>
                <DropdownMenuShortcut className="text-[#888888]">
                  ⌃F5
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="px-2 py-0.5 rounded text-xs text-[#b8b8b8] hover:bg-[#2a2d2e] hover:text-white transition-colors focus:outline-none data-[state=open]:bg-[#2a2d2e] data-[state=open]:text-white cursor-pointer">
              Help
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 bg-[#252526] border-[#454545] text-[#cccccc]"
            >
              <DropdownMenuItem
                onClick={() =>
                  toast.success("Antigravity IDE v2.5", {
                    description:
                      "Built with Next.js 15, Tailwind CSS v4, and Gemini 3.7 Flash.",
                  })
                }
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Info className="w-3.5 h-3.5 mr-2 text-sky-400" />
                <span>About Antigravity IDE</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={openCommandPalette}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <FileText className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>Documentation & Shortcuts</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Center section: Quick Search & Title Bar */}
      <div className="flex-1 max-w-xl mx-2 flex items-center justify-center">
        <Tooltip>
          <TooltipTrigger
            onClick={openCommandPalette}
            className="w-full max-w-md h-6 bg-[#252526] hover:bg-[#2d2d2d] border border-[#333333] hover:border-[#444444] rounded flex items-center justify-between px-2.5 text-xs text-[#999999] transition-all group shadow-inner cursor-pointer"
          >
            <div className="flex items-center space-x-2 truncate">
              <Search className="w-3.5 h-3.5 text-[#777777] group-hover:text-sky-400 transition-colors" />
              <span className="truncate text-xs font-mono">
                portfolio-v2.5 <span className="text-[#555555]">-</span>{" "}
                {activeFilePath}
              </span>
            </div>
            <kbd className="text-[10px] bg-[#1e1e1e] border border-[#3c3c3c] text-[#888888] px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Search files, run actions, or query skills (⌘K)
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Right section: Layout Toggles, Zero-G button, User Profile */}
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
              {antigravityMode ? "Anti-G Active" : "Zero-G Mode"}
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
              Toggle Primary Explorer (⌘B)
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
              Toggle Terminal & Output Panel (⌃`)
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
              Toggle Antigravity AI Copilot (⌘L)
            </TooltipContent>
          </Tooltip>
        </div>

        {/* User Profile Badge */}
        <Tooltip>
          <TooltipTrigger
            onClick={openCommandPalette}
            className="flex items-center pl-1 cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
          >
            <Badge
              variant="outline"
              className="bg-[#0078d4]/20 hover:bg-[#0078d4]/30 border-[#0078d4]/40 text-sky-300 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all flex items-center space-x-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
              <span>Lee Ryan Garcia</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Staff Full-Stack & AI Systems Engineer • Available for Hire
          </TooltipContent>
        </Tooltip>

        {/* Window controls styling */}
        <div className="hidden sm:flex items-center space-x-2 pl-2 text-[#777777]">
          <button
            className="hover:text-white transition-colors"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            className="hover:text-white transition-colors"
            title="Maximize"
          >
            <Square className="w-2.5 h-2.5" />
          </button>
          <button
            className="hover:text-red-400 transition-colors"
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </header>
  );
}
