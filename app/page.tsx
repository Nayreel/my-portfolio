"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_FILES, PortfolioFile } from "@/data";
import { TopMenuBar } from "@/components/TopMenuBar";
import { ActivityBar, ActiveSidebarView } from "@/components/ActivityBar";
import { SidebarExplorer } from "@/components/SidebarExplorer";
import { EditorTabs, ViewMode } from "@/components/EditorTabs";
import { CodeViewer } from "@/components/CodeViewer";
import { RenderedPreview } from "@/components/RenderedPreview";
import { AIAssistantPanel } from "@/components/AIAssistantPanel";
import { BottomPanel } from "@/components/BottomPanel";
import { StatusBar } from "@/components/StatusBar";
import { CommandPalette } from "@/components/CommandPalette";
import { SettingsModal } from "@/components/SettingsModal";
import { AntigravityPhysics } from "@/components/AntigravityPhysics";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import confetti from "canvas-confetti";

export default function AntigravityPortfolioApp() {
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
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(true);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("preview"); // Default to Preview for instant portfolio showcase

  // Modals & Extras
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [antigravityMode, setAntigravityMode] = useState(false);
  const [accentColor, setAccentColor] = useState("#38bdf8");
  const [fontSize, setFontSize] = useState(13);

  // AI External prompt trigger
  const [externalAIPrompt, setExternalAIPrompt] = useState<string | null>(null);

  // Cursor tracker
  const [cursorPos, setCursorPos] = useState({ line: 42, col: 18 });

  const activeFile =
    PORTFOLIO_FILES.find((f) => f.id === activeFileId) || PORTFOLIO_FILES[0];

  // Select a file from sidebar or quick switcher
  const handleSelectFile = (file: PortfolioFile) => {
    if (!openTabs.some((t) => t.id === file.id)) {
      setOpenTabs((prev) => [...prev, file]);
    }
    setActiveFileId(file.id);
  };

  // Close tab
  const handleCloseTab = (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openTabs.filter((t) => t.id !== fileId);
    if (remaining.length === 0) {
      // Always keep at least 1 file open
      remaining.push(PORTFOLIO_FILES[0]);
    }
    setOpenTabs(remaining);
    if (activeFileId === fileId) {
      setActiveFileId(remaining[remaining.length - 1].id);
    }
  };

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K or ⌘P or Ctrl+P: Command Palette
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "p")) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // ⌘B or Ctrl+B: Toggle Explorer Sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setIsLeftSidebarOpen((prev) => !prev);
      }
      // ⌘L or Ctrl+L: Toggle Antigravity AI
      if ((e.metaKey || e.ctrlKey) && e.key === "l") {
        e.preventDefault();
        setIsAIPanelOpen((prev) => !prev);
      }
      // Ctrl+` (backtick): Toggle Terminal
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setIsBottomPanelOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerRunCodeCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    setIsBottomPanelOpen(true);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#181818] text-[#cccccc] font-sans antialiased select-none">
      {/* 1. Top Window & Menu Bar */}
      <TopMenuBar
        activeFileName={activeFile.name}
        activeFilePath={activeFile.path}
        isLeftSidebarOpen={isLeftSidebarOpen}
        setIsLeftSidebarOpen={setIsLeftSidebarOpen}
        isBottomPanelOpen={isBottomPanelOpen}
        setIsBottomPanelOpen={setIsBottomPanelOpen}
        isAIPanelOpen={isAIPanelOpen}
        setIsAIPanelOpen={setIsAIPanelOpen}
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
        onRunCode={triggerRunCodeCelebration}
        antigravityMode={antigravityMode}
        setAntigravityMode={setAntigravityMode}
        onOpenLivePreviewTab={() => {
          handleSelectFile(PORTFOLIO_FILES[1]); // projects
          setViewMode("preview");
        }}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Far-Left Activity Bar */}
        <ActivityBar
          activeView={activeSidebarView}
          setActiveView={(view) => {
            setActiveSidebarView(view);
            if (view === "none") {
              setIsLeftSidebarOpen(false);
            } else {
              setIsLeftSidebarOpen(true);
            }
          }}
          isAIPanelOpen={isAIPanelOpen}
          setIsAIPanelOpen={setIsAIPanelOpen}
          openSettingsModal={() => setIsSettingsOpen(true)}
          openContactTab={() => {
            handleSelectFile(
              PORTFOLIO_FILES.find((f) => f.id === "get-in-touch.tsx") ||
                PORTFOLIO_FILES[0],
            );
            setViewMode("preview");
          }}
        />

        {/* Primary Sidebar (Explorer / Search) */}
        {isLeftSidebarOpen && activeSidebarView !== "none" && (
          <SidebarExplorer
            files={PORTFOLIO_FILES}
            activeFileId={activeFileId}
            onSelectFile={handleSelectFile}
            openCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        )}

        {/* Horizontal Resizable Area (Main Workspace + AI Assistant Panel) */}
        <ResizablePanelGroup
          key={`h-group-${isAIPanelOpen}`}
          orientation="horizontal"
          className="flex-1 h-full min-w-0 overflow-hidden"
        >
          {/* Main Central Workspace: Vertical Resizable Area (Editor Tabs/Preview + Bottom Terminal) */}
          <ResizablePanel
            id="editor-main-panel"
            defaultSize={isAIPanelOpen ? 70 : 100}
            minSize={8}
          >
            <ResizablePanelGroup
              key={`v-group-${isBottomPanelOpen}`}
              orientation="vertical"
              className="h-full w-full min-h-0 overflow-hidden"
            >
              {/* Top Editor Content Area */}
              <ResizablePanel
                id="editor-content-panel"
                defaultSize={isBottomPanelOpen ? 65 : 100}
                minSize={8}
              >
                <div className="h-full w-full flex flex-col min-w-0 overflow-hidden bg-[#1e1e1e]">
                  {/* Multi-Tab Bar and Breadcrumb */}
                  <EditorTabs
                    openTabs={openTabs}
                    activeFileId={activeFileId}
                    onSelectTab={(f) => setActiveFileId(f.id)}
                    onCloseTab={handleCloseTab}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                    onAskAIAboutFile={() => {
                      setIsAIPanelOpen(true);
                      setExternalAIPrompt(
                        `Can you explain the architecture and key concepts in ${activeFile.name}?`,
                      );
                    }}
                    onRunActiveFile={() => {
                      setViewMode("preview");
                      triggerRunCodeCelebration();
                    }}
                  />

                  {/* Central Content Area (Code, Rendered Preview, or Split) */}
                  <div className="flex-1 flex overflow-hidden relative">
                    {/* Split / Code Mode: Code Editor */}
                    {(viewMode === "code" || viewMode === "split") && (
                      <div
                        className={`h-full flex flex-col ${
                          viewMode === "split"
                            ? "w-1/2 border-r border-[#2d2d2d]"
                            : "w-full"
                        }`}
                      >
                        <CodeViewer
                          file={activeFile}
                          onRunPreview={() => setViewMode("preview")}
                          onAskAI={(prompt) => {
                            setIsAIPanelOpen(true);
                            setExternalAIPrompt(prompt);
                          }}
                          onCursorChange={(line, col) =>
                            setCursorPos({ line, col })
                          }
                        />
                      </div>
                    )}

                    {/* Split / Preview Mode: Interactive Rendered Portfolio */}
                    {(viewMode === "preview" || viewMode === "split") && (
                      <div
                        className={`h-full flex flex-col ${
                          viewMode === "split" ? "w-1/2" : "w-full"
                        }`}
                      >
                        <RenderedPreview
                          activeFile={activeFile}
                          onSwitchToFile={(fileId) => {
                            const target = PORTFOLIO_FILES.find(
                              (f) => f.id === fileId,
                            );
                            if (target) handleSelectFile(target);
                          }}
                          onOpenAIQuery={(query) => {
                            setIsAIPanelOpen(true);
                            setExternalAIPrompt(query);
                          }}
                          antigravityMode={antigravityMode}
                          setAntigravityMode={setAntigravityMode}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>

              {/* Bottom Integrated Panel (Terminal / Problems / Console) */}
              {isBottomPanelOpen && (
                <>
                  <ResizableHandle withHandle className="bg-[#2d2d2d] hover:bg-sky-500 active:bg-sky-400 transition-colors" />
                  <ResizablePanel
                    id="terminal-bottom-panel"
                    defaultSize={35}
                    minSize={8}
                  >
                    <BottomPanel
                      isOpen={isBottomPanelOpen}
                      onClose={() => setIsBottomPanelOpen(false)}
                      onSelectFile={(fileId) => {
                        const f = PORTFOLIO_FILES.find((x) => x.id === fileId);
                        if (f) handleSelectFile(f);
                      }}
                      antigravityMode={antigravityMode}
                      setAntigravityMode={setAntigravityMode}
                    />
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </ResizablePanel>

          {/* Right Secondary Sidebar: Antigravity AI / Gemini 3.7 Copilot */}
          {isAIPanelOpen && (
            <>
              <ResizableHandle withHandle className="bg-[#282930] hover:bg-sky-500 active:bg-sky-400 transition-colors" />
              <ResizablePanel
                id="ai-assistant-panel"
                defaultSize={30}
                minSize={8}
              >
                <AIAssistantPanel
                  isOpen={isAIPanelOpen}
                  onClose={() => setIsAIPanelOpen(false)}
                  activeFile={activeFile}
                  onSelectFile={(fileId) => {
                    const f = PORTFOLIO_FILES.find((x) => x.id === fileId);
                    if (f) handleSelectFile(f);
                  }}
                  externalPrompt={externalAIPrompt}
                  clearExternalPrompt={() => setExternalAIPrompt(null)}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>

      {/* 3. Bottom Status Bar */}
      <StatusBar
        cursorLine={cursorPos.line}
        cursorCol={cursorPos.col}
        onToggleTerminal={() => setIsBottomPanelOpen((prev) => !prev)}
        onToggleAI={() => setIsAIPanelOpen((prev) => !prev)}
        antigravityMode={antigravityMode}
        setAntigravityMode={setAntigravityMode}
      />

      {/* 4. Command Palette Modal (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectFile={handleSelectFile}
        onToggleTerminal={() => setIsBottomPanelOpen((p) => !p)}
        onToggleAI={() => setIsAIPanelOpen((p) => !p)}
        antigravityMode={antigravityMode}
        setAntigravityMode={setAntigravityMode}
      />

      {/* 5. Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* 6. Zero Gravity Floating Particles & Physics Overlay */}
      <AntigravityPhysics
        active={antigravityMode}
        onDeactivate={() => setAntigravityMode(false)}
      />
    </div>
  );
}
