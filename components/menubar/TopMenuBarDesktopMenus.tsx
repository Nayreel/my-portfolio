"use client";

import React from "react";
import {
  Sidebar,
  PanelBottom,
  Zap,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";

interface TopMenuBarDesktopMenusProps {
  openCommandPalette: () => void;
  setIsBottomPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setIsAIPanelOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setIsLeftSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  handleDownloadResume: () => void;
  onOpenLivePreviewTab: () => void;
  onOpenContact?: () => void;
  onRunCode: () => void;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
  openShortcutsModal?: () => void;
}

export function TopMenuBarDesktopMenus({
  openCommandPalette,
  setIsBottomPanelOpen,
  setIsAIPanelOpen,
  setIsLeftSidebarOpen,
  handleDownloadResume,
  onOpenLivePreviewTab,
  onOpenContact,
  onRunCode,
  setAntigravityMode,
  openShortcutsModal,
}: TopMenuBarDesktopMenusProps) {
  return (
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
  );
}
