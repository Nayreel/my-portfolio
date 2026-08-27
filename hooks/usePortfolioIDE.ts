"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { PORTFOLIO_FILES } from "@/data";
import {
  PortfolioFile,
  ActiveSidebarView,
  ViewMode,
  IDEThemeMode,
  PanelTab,
} from "@/types/ide";

export function usePortfolioIDE() {
  // Navigation & File state
  const [openTabs, setOpenTabs] = useState<PortfolioFile[]>([
    PORTFOLIO_FILES[0], // bio.tsx
    PORTFOLIO_FILES[1], // projects.tsx
    PORTFOLIO_FILES[3], // tech-stack.json
  ]);
  const [activeFileId, setActiveFileId] = useState<string>("bio.tsx");

  // Layout states
  const [activeSidebarView, setActiveSidebarView] =
    useState<ActiveSidebarView>("explorer");
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false);
  const [bottomPanelTab, setBottomPanelTab] = useState<PanelTab>("terminal");
  const [debugLogMessage, setDebugLogMessage] = useState<string | null>(null);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Modals & Preferences
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [antigravityMode, setAntigravityMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#38bdf8");
  const [fontSize, setFontSize] = useState(13);
  const [ideThemeMode, setIdeThemeMode] = useState<IDEThemeMode>("nebula");

  // AI External prompt trigger
  const [externalAIPrompt, setExternalAIPrompt] = useState<string | null>(null);

  // Cursor tracker
  const [cursorPos, setCursorPos] = useState({ line: 42, col: 18 });

  const activeFile =
    PORTFOLIO_FILES.find((f) => f.id === activeFileId) || PORTFOLIO_FILES[0];

  // Detect responsive screen size & set appropriate defaults
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      handleResize();
      if (window.innerWidth >= 1024) {
        setIsLeftSidebarOpen(true);
        setIsAIPanelOpen(false);
        setIsBottomPanelOpen(false);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "p")) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setIsLeftSidebarOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "l") {
        e.preventDefault();
        setIsAIPanelOpen((prev) => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setIsBottomPanelOpen((prev) => !prev);
      }
      if (
        e.key === "F1" ||
        (e.key === "?" &&
          !(
            e.target instanceof HTMLInputElement ||
            e.target instanceof HTMLTextAreaElement
          ))
      ) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Synchronize CSS custom properties
  useEffect(() => {
    document.documentElement.style.setProperty("--accent-theme", accentColor);
    document.documentElement.style.setProperty(
      "--app-font-size",
      `${fontSize}px`,
    );
  }, [accentColor, fontSize]);

  const handleSelectFile = (file: PortfolioFile) => {
    if (!openTabs.some((t) => t.id === file.id)) {
      setOpenTabs((prev) => [...prev, file]);
    }
    setActiveFileId(file.id);
  };

  const handleCloseTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openTabs.filter((t) => t.id !== fileId);
    if (remaining.length === 0) {
      remaining.push(PORTFOLIO_FILES[0]);
    }
    setOpenTabs(remaining);
    if (activeFileId === fileId) {
      setActiveFileId(remaining[remaining.length - 1].id);
    }
  };

  const handleGitCommitSuccess = () => {
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleStartDebug = (cfg: string) => {
    setIsBottomPanelOpen(true);
    setBottomPanelTab("debug");
    setDebugLogMessage(
      `[Active Session] ${cfg} initialized at ${new Date().toLocaleTimeString()}`,
    );
  };

  const triggerRunCodeCelebration = () => {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    setIsBottomPanelOpen(true);
  };

  return {
    openTabs,
    setOpenTabs,
    activeFileId,
    setActiveFileId,
    activeFile,
    activeSidebarView,
    setActiveSidebarView,
    isLeftSidebarOpen,
    setIsLeftSidebarOpen,
    isBottomPanelOpen,
    setIsBottomPanelOpen,
    bottomPanelTab,
    setBottomPanelTab,
    debugLogMessage,
    setDebugLogMessage,
    isAIPanelOpen,
    setIsAIPanelOpen,
    viewMode,
    setViewMode,
    isMobile,
    isTablet,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    isShortcutsOpen,
    setIsShortcutsOpen,
    antigravityMode,
    setAntigravityMode,
    accentColor,
    setAccentColor,
    fontSize,
    setFontSize,
    ideThemeMode,
    setIdeThemeMode,
    externalAIPrompt,
    setExternalAIPrompt,
    cursorPos,
    setCursorPos,
    handleSelectFile,
    handleCloseTab,
    handleGitCommitSuccess,
    handleStartDebug,
    triggerRunCodeCelebration,
  };
}
