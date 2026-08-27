"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { DEVELOPER_PROFILE } from "@/data";
import { downloadResumePdf } from "@/lib/download";
import { ThemeOption } from "@/components/profile/ProfileDropdown";
import { TopMenuBarDesktopMenus } from "./menubar/TopMenuBarDesktopMenus";
import { TopMenuBarLayoutToggles } from "./menubar/TopMenuBarLayoutToggles";

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
      {/* Left section: App Icon & Dropdown Menus */}
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

        {/* Desktop Menu items */}
        <TopMenuBarDesktopMenus
          openCommandPalette={openCommandPalette}
          setIsBottomPanelOpen={setIsBottomPanelOpen}
          setIsAIPanelOpen={setIsAIPanelOpen}
          setIsLeftSidebarOpen={setIsLeftSidebarOpen}
          handleDownloadResume={handleDownloadResume}
          onOpenLivePreviewTab={onOpenLivePreviewTab}
          onOpenContact={onOpenContact}
          onRunCode={onRunCode}
          setAntigravityMode={setAntigravityMode}
          openShortcutsModal={openShortcutsModal}
        />
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
              Lee Ryan Garcia - Portfolio -{" "}
            </span>
            <span className="text-sky-300 sm:text-inherit font-mono sm:font-sans">
              {activeFileName}
            </span>
          </span>
        </Button>
      </div>

      {/* Right section: Layout Toggles, Zero-G button, User Profile */}
      <TopMenuBarLayoutToggles
        isLeftSidebarOpen={isLeftSidebarOpen}
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
        isBottomPanelOpen={isBottomPanelOpen}
        setIsBottomPanelOpen={setIsBottomPanelOpen}
        isAIPanelOpen={isAIPanelOpen}
        setIsAIPanelOpen={setIsAIPanelOpen}
        antigravityMode={antigravityMode}
        setAntigravityMode={setAntigravityMode}
        onOpenResume={onOpenResume}
        onOpenContact={onOpenContact}
        openSettingsModal={openSettingsModal}
        activeTheme={activeTheme}
        onSelectTheme={onSelectTheme}
      />
    </header>
  );
}
