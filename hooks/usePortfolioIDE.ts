"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import confetti from "canvas-confetti";
import { PORTFOLIO_FILES } from "@/data";
import {
  PortfolioFile,
  ActiveSidebarView,
  ViewMode,
  IDEThemeMode,
  PanelTab,
} from "@/types/ide";

const storageListeners = new Set<() => void>();

function notifyStorageListeners() {
  storageListeners.forEach((listener) => listener());
}

function useStoredPreference(key: string, fallback: string): string {
  const subscribe = (callback: () => void) => {
    storageListeners.add(callback);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key) callback();
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      storageListeners.delete(callback);
      window.removeEventListener("storage", handleStorage);
    };
  };

  const getSnapshot = () => {
    try {
      if (typeof window === "undefined") return fallback;
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const getServerSnapshot = () => fallback;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

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

  // Stored Preferences via useSyncExternalStore (SSR-safe, zero cascading renders)
  const activeThemeId = useStoredPreference("portfolio_theme_id", "cyan");
  const accentColor = useStoredPreference("portfolio_accent_color", "#38bdf8");
  const ideThemeMode = useStoredPreference(
    "portfolio_ide_theme_mode",
    "nebula",
  ) as IDEThemeMode;
  const rawFontSize = useStoredPreference("portfolio_font_size", "13");
  const fontSize = parseInt(rawFontSize, 10) || 13;

  const handleSetActiveThemeId = (themeId: string) => {
    try {
      localStorage.setItem("portfolio_theme_id", themeId);
      notifyStorageListeners();
    } catch {
      // Ignore write errors
    }
  };

  const handleSetAccentColor = (color: string) => {
    try {
      localStorage.setItem("portfolio_accent_color", color);
      notifyStorageListeners();
    } catch {
      // Ignore write errors
    }

    const COLOR_MAP: Record<string, string> = {
      "#38bdf8": "cyan",
      "#a855f7": "purple",
      "#10b981": "emerald",
      "#f59e0b": "amber",
      "#f43f5e": "rose",
      "#0284c7": "blue",
    };
    if (COLOR_MAP[color]) {
      handleSetActiveThemeId(COLOR_MAP[color]);
    }
  };

  const handleSetIdeThemeMode = (mode: IDEThemeMode) => {
    try {
      localStorage.setItem("portfolio_ide_theme_mode", mode);
      notifyStorageListeners();
    } catch {
      // Ignore write errors
    }
  };

  const handleSetFontSize = (size: number) => {
    try {
      localStorage.setItem("portfolio_font_size", size.toString());
      notifyStorageListeners();
    } catch {
      // Ignore write errors
    }
  };

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
    activeThemeId,
    setActiveThemeId: handleSetActiveThemeId,
    accentColor,
    setAccentColor: handleSetAccentColor,
    fontSize,
    setFontSize: handleSetFontSize,
    ideThemeMode,
    setIdeThemeMode: handleSetIdeThemeMode,
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
