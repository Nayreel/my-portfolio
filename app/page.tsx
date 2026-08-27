"use client";

import React from "react";
import { PORTFOLIO_FILES } from "@/data";
import { usePortfolioIDE } from "@/hooks/usePortfolioIDE";
import { TopMenuBar } from "@/components/TopMenuBar";
import { ActivityBar } from "@/components/ActivityBar";
import { SidebarViewSwitcher } from "@/components/sidebar/SidebarViewSwitcher";
import { EditorTabs } from "@/components/EditorTabs";
import { CodeViewer } from "@/components/CodeViewer";
import { RenderedPreview } from "@/components/RenderedPreview";
import { AIAssistantPanel } from "@/components/AIAssistantPanel";
import { BottomPanel } from "@/components/BottomPanel";
import { StatusBar } from "@/components/StatusBar";
import { CommandPalette } from "@/components/CommandPalette";
import { SettingsModal } from "@/components/SettingsModal";
import { ShortcutsModal } from "@/components/ShortcutsModal";
import { AntigravityPhysics } from "@/components/AntigravityPhysics";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function AntigravityPortfolioApp() {
  const {
    openTabs,
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
  } = usePortfolioIDE();

  return (
    <div
      className={`h-[100dvh] w-full max-w-full overflow-hidden flex flex-col ide-theme-${ideThemeMode} bg-[#121316] text-[#cccccc] font-sans antialiased select-none transition-colors duration-300 relative`}
      style={
        {
          "--accent-theme": accentColor,
          "--app-font-size": `${fontSize}px`,
          fontSize: `${fontSize}px`,
        } as React.CSSProperties
      }
    >
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
          handleSelectFile(PORTFOLIO_FILES[1]);
          setViewMode("preview");
        }}
        onOpenResume={() => {
          handleSelectFile(
            PORTFOLIO_FILES.find((f) => f.id === "resume.md") ||
              PORTFOLIO_FILES[0],
          );
          setViewMode("preview");
        }}
        onOpenContact={() => {
          handleSelectFile(
            PORTFOLIO_FILES.find((f) => f.id === "get-in-touch.tsx") ||
              PORTFOLIO_FILES[0],
          );
          setViewMode("preview");
        }}
        openSettingsModal={() => setIsSettingsOpen(true)}
        openShortcutsModal={() => setIsShortcutsOpen(true)}
        onSelectTheme={(theme) => {
          setAccentColor(theme.color);
          setIdeThemeMode(theme.mode);
        }}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative min-h-0">
        {/* Far-Left Activity Bar */}
        <div className="hidden lg:flex shrink-0 h-full">
          <ActivityBar
            activeView={activeSidebarView}
            setActiveView={(view) => {
              setActiveSidebarView(view);
              setIsLeftSidebarOpen(view !== "none");
            }}
            isAIPanelOpen={isAIPanelOpen}
            setIsAIPanelOpen={setIsAIPanelOpen}
            openSettingsModal={() => setIsSettingsOpen(true)}
            openContactTab={() => {
              const file =
                PORTFOLIO_FILES.find((f) => f.id === "get-in-touch.tsx") ||
                PORTFOLIO_FILES[0];
              handleSelectFile(file);
              setViewMode("preview");
            }}
          />
        </div>

        {/* Primary Sidebar on Desktop */}
        {!isTablet && isLeftSidebarOpen && activeSidebarView !== "none" && (
          <div className="w-64 shrink-0 h-full">
            <SidebarViewSwitcher
              activeView={activeSidebarView}
              files={PORTFOLIO_FILES}
              activeFileId={activeFileId}
              onSelectFile={handleSelectFile}
              openCommandPalette={() => setIsCommandPaletteOpen(true)}
              antigravityMode={antigravityMode}
              setAntigravityMode={setAntigravityMode}
              onCommitSuccess={handleGitCommitSuccess}
              onStartDebug={handleStartDebug}
            />
          </div>
        )}

        {/* Primary Sidebar Overlay Drawer on Tablet/Mobile */}
        {isTablet && isLeftSidebarOpen && activeSidebarView !== "none" && (
          <>
            <div
              onClick={() => setIsLeftSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-35"
            />
            <div className="fixed inset-y-9 left-0 z-40 w-72 max-w-[85vw] shadow-2xl border-r border-[#2d2d2d] bg-[#181818] flex flex-col">
              <SidebarViewSwitcher
                activeView={activeSidebarView}
                files={PORTFOLIO_FILES}
                activeFileId={activeFileId}
                onSelectFile={(f) => {
                  handleSelectFile(f);
                  if (isTablet) setIsLeftSidebarOpen(false);
                }}
                openCommandPalette={() => {
                  setIsLeftSidebarOpen(false);
                  setIsCommandPaletteOpen(true);
                }}
                onClose={() => setIsLeftSidebarOpen(false)}
                antigravityMode={antigravityMode}
                setAntigravityMode={setAntigravityMode}
                onCommitSuccess={handleGitCommitSuccess}
                onStartDebug={handleStartDebug}
              />
            </div>
          </>
        )}

        {/* Horizontal Resizable Area */}
        <ResizablePanelGroup
          key={`h-group-${!isTablet && isAIPanelOpen}`}
          orientation="horizontal"
          className="flex-1 h-full min-w-0 overflow-hidden"
        >
          {/* Main Central Workspace */}
          <ResizablePanel
            id="editor-main-panel"
            defaultSize={!isTablet && isAIPanelOpen ? 70 : 100}
            minSize={8}
          >
            <ResizablePanelGroup
              key={`v-group-${!isMobile && isBottomPanelOpen}`}
              orientation="vertical"
              className="h-full w-full min-h-0 overflow-hidden"
            >
              {/* Top Editor Content Area */}
              <ResizablePanel
                id="editor-content-panel"
                defaultSize={!isMobile && isBottomPanelOpen ? 65 : 100}
                minSize={8}
              >
                <div className="h-full w-full flex flex-col min-w-0 overflow-hidden bg-[#1e1e1e]">
                  {/* Multi-Tab Bar */}
                  <EditorTabs
                    openTabs={openTabs}
                    activeFileId={activeFileId}
                    onSelectTab={(f) => setActiveFileId(f.id)}
                    onCloseTab={handleCloseTab}
                    viewMode={
                      isMobile && viewMode === "split" ? "preview" : viewMode
                    }
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

                  {/* Content Area (Code Viewer or Rendered Preview) */}
                  <div className="flex-1 flex overflow-hidden relative min-h-0">
                    {(viewMode === "code" ||
                      (!isMobile && viewMode === "split")) && (
                      <div
                        className={`h-full flex flex-col ${
                          !isMobile && viewMode === "split"
                            ? "w-1/2 border-r border-[#2d2d2d]"
                            : "w-full"
                        }`}
                      >
                        <CodeViewer
                          file={activeFile}
                          fontSize={fontSize}
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

                    {(viewMode === "preview" ||
                      (!isMobile && viewMode === "split") ||
                      (isMobile && viewMode !== "code")) && (
                      <div
                        className={`h-full flex flex-col ${
                          !isMobile && viewMode === "split"
                            ? "w-1/2"
                            : "w-full"
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

              {/* Bottom Integrated Panel on Desktop */}
              {!isMobile && isBottomPanelOpen && (
                <>
                  <ResizableHandle
                    withHandle
                    className="bg-[#2d2d2d] hover:bg-sky-500 active:bg-sky-400 transition-colors"
                  />
                  <ResizablePanel
                    id="terminal-bottom-panel"
                    defaultSize={35}
                    minSize={8}
                  >
                    <BottomPanel
                      isOpen={isBottomPanelOpen}
                      onClose={() => setIsBottomPanelOpen(false)}
                      activeTab={bottomPanelTab}
                      setActiveTab={setBottomPanelTab}
                      debugLogMessage={debugLogMessage}
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

          {/* Right Secondary Sidebar on Desktop */}
          {!isTablet && isAIPanelOpen && (
            <>
              <ResizableHandle
                withHandle
                className="bg-[#282930] hover:bg-sky-500 active:bg-sky-400 transition-colors"
              />
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

        {/* AI Copilot Drawer on Tablet / Mobile */}
        {isTablet && isAIPanelOpen && (
          <>
            <div
              onClick={() => setIsAIPanelOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-35"
            />
            <div className="fixed inset-y-9 right-0 z-40 w-full sm:w-96 max-w-full shadow-2xl border-l border-[#2d2d2d] bg-[#181818] flex flex-col">
              <AIAssistantPanel
                isOpen={isAIPanelOpen}
                onClose={() => setIsAIPanelOpen(false)}
                activeFile={activeFile}
                onSelectFile={(fileId) => {
                  const f = PORTFOLIO_FILES.find((x) => x.id === fileId);
                  if (f) handleSelectFile(f);
                  if (isMobile) setIsAIPanelOpen(false);
                }}
                externalPrompt={externalAIPrompt}
                clearExternalPrompt={() => setExternalAIPrompt(null)}
              />
            </div>
          </>
        )}

        {/* Bottom Terminal Drawer on Mobile */}
        {isMobile && isBottomPanelOpen && (
          <>
            <div
              onClick={() => setIsBottomPanelOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-35"
            />
            <div className="fixed bottom-6 inset-x-0 z-40 h-80 max-h-[70dvh] shadow-2xl border-t border-[#2d2d2d] bg-[#181818] flex flex-col">
              <BottomPanel
                isOpen={isBottomPanelOpen}
                onClose={() => setIsBottomPanelOpen(false)}
                activeTab={bottomPanelTab}
                setActiveTab={setBottomPanelTab}
                debugLogMessage={debugLogMessage}
                onSelectFile={(fileId) => {
                  const f = PORTFOLIO_FILES.find((x) => x.id === fileId);
                  if (f) handleSelectFile(f);
                  setIsBottomPanelOpen(false);
                }}
                antigravityMode={antigravityMode}
                setAntigravityMode={setAntigravityMode}
              />
            </div>
          </>
        )}
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
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
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
        ideThemeMode={ideThemeMode}
        setIdeThemeMode={setIdeThemeMode}
        antigravityMode={antigravityMode}
        setAntigravityMode={setAntigravityMode}
      />

      {/* 6. Documentation & Keyboard Shortcuts Modal */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* 7. Zero Gravity Physics Overlay */}
      <AntigravityPhysics
        active={antigravityMode}
        onDeactivate={() => setAntigravityMode(false)}
      />
    </div>
  );
}
