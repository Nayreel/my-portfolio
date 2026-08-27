"use client";

import React from "react";
import {
  Sidebar,
  PanelBottom,
  Zap,
  Minus,
  Square,
  X,
  Menu,
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
import { DEVELOPER_PROFILE } from "@/data";
import { downloadResumePdf } from "@/lib/download";
import {
  ProfileDropdown,
  ThemeOption,
} from "@/components/profile/ProfileDropdown";

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
  onOpenResume?: () => void;
  onOpenContact?: () => void;
  openSettingsModal?: () => void;
  openShortcutsModal?: () => void;
  activeTheme?: string;
  onSelectTheme?: (theme: ThemeOption) => void;
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
  onOpenResume,
  onOpenContact,
  openSettingsModal,
  openShortcutsModal,
  activeTheme,
  onSelectTheme,
}: TopMenuBarProps) {
  const resumeUrl =
    DEVELOPER_PROFILE.resumePdfUrl || "/Lee_Ryan_Garcia_Resume.pdf";
  const resumeFilename =
    resumeUrl.split("/").pop() || "Lee_Ryan_Garcia_Resume.pdf";

  const handleDownloadResume = () => {
    toast.success("Downloading Resume...", {
      description: resumeFilename,
    });
    downloadResumePdf(resumeUrl, resumeFilename);
  };

  return (
    <header className="h-9 bg-[#181818] border-b border-[#2d2d2d] flex items-center justify-between px-2 select-none text-[13px] text-[#cccccc] relative z-40">
      {/* Left section: App Icon & Shadcn Dropdown Menus */}
      <div className="flex items-center space-x-1">
        {/* Mobile & Tablet Hamburger Menu Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => setIsLeftSidebarOpen((prev) => !prev)}
          className="lg:hidden p-1 h-7 w-7 text-zinc-300 hover:text-white hover:bg-[#2a2d2e] rounded-md transition-colors cursor-pointer mr-0.5"
          aria-label="Toggle navigation menu"
        >
          {isLeftSidebarOpen ? (
            <X className="w-4 h-4 text-sky-400" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>

        {/* Antigravity IDE logo */}
        <div
          onClick={openCommandPalette}
          className="flex items-center space-x-1.5 px-2 py-1 mr-1 rounded hover:bg-[#2a2d2e] cursor-pointer text-sky-400"
        >
          <div className="w-3.5 h-3.5 rounded-sm bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
            Δ
          </div>
          <span className="font-semibold text-xs tracking-tight text-white hidden sm:inline">
            Portfolio
          </span>
        </div>

        {/* Desktop Menu items with shadcn DropdownMenu */}
        <div className="hidden lg:flex items-center space-x-0.5">
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
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsBottomPanelOpen(true)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Terminal className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>Open Terminal</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsAIPanelOpen((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Sidebar className="w-3.5 h-3.5 mr-2 text-amber-400 scale-x-[-1]" />
                <span>Toggle AI Assistant</span>
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
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => toast.info("Clipboard copied")}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <span>Copy Current File Path</span>
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
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsBottomPanelOpen((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <PanelBottom className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>Toggle Terminal Panel</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsAIPanelOpen((p) => !p)}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Sidebar className="w-3.5 h-3.5 mr-2 text-amber-400 scale-x-[-1]" />
                <span>Toggle AI Copilot</span>
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
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onOpenLivePreviewTab}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Layers className="w-3.5 h-3.5 mr-2 text-purple-400" />
                <span>Go to Featured Projects</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onOpenContact}
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
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onRunCode}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <span>Run Portfolio Unit Tests</span>
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
                  toast.success("Portfolio IDE v2", {
                    description:
                      "Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Base UI, Motion, Lucide Icons, and Resizable Panels.",
                  })
                }
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <Info className="w-3.5 h-3.5 mr-2 text-sky-400" />
                <span>About Portfolio IDE</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={openShortcutsModal || openCommandPalette}
                className="text-xs cursor-pointer hover:bg-[#094771] hover:text-white focus:bg-[#094771] focus:text-white"
              >
                <FileText className="w-3.5 h-3.5 mr-2 text-emerald-400" />
                <span>Documentation & Shortcuts</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Center section: Window Title Bar */}
      <div className="flex-1 mx-1 sm:mx-2 flex items-center justify-center min-w-0">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={openCommandPalette}
          className="text-xs text-[#9d9d9d] hover:text-[#d4d4d4] transition-colors truncate max-w-full font-normal cursor-pointer select-none px-1.5 sm:px-2 py-0.5 h-auto rounded hover:bg-[#252526]/60"
          title="Portfolio IDE (Click for Command Palette ⌘K)"
        >
          <span className="truncate">
            <span className="hidden md:inline">
              my-portfolio - Portfolio IDE -{" "}
            </span>
            <span className="text-sky-300 sm:text-inherit font-mono sm:font-sans">
              {activeFileName}
            </span>
          </span>
        </Button>
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
              Toggle Antigravity AI Copilot
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Antigravity User Profile Dropdown with Themes */}
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
    </header>
  );
}
