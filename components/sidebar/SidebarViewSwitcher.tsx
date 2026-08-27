"use client";

import React from "react";
import { PortfolioFile, ActiveSidebarView } from "@/data";
import { SidebarExplorer } from "@/components/SidebarExplorer";
import { SidebarSearch } from "@/components/sidebar/SidebarSearch";
import { SidebarSourceControl } from "@/components/sidebar/SidebarSourceControl";
import { SidebarRunDebug } from "@/components/sidebar/SidebarRunDebug";
import { SidebarExtensions } from "@/components/sidebar/SidebarExtensions";

interface SidebarViewSwitcherProps {
  activeView: ActiveSidebarView;
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (file: PortfolioFile) => void;
  openCommandPalette: () => void;
  onClose?: () => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
  onCommitSuccess?: (msg: string, hash: string) => void;
  onStartDebug?: (configName: string) => void;
}

export function SidebarViewSwitcher({
  activeView,
  files,
  activeFileId,
  onSelectFile,
  openCommandPalette,
  onClose,
  antigravityMode,
  setAntigravityMode,
  onCommitSuccess,
  onStartDebug,
}: SidebarViewSwitcherProps) {
  switch (activeView) {
    case "search":
      return (
        <SidebarSearch
          files={files}
          activeFileId={activeFileId}
          onSelectFile={onSelectFile}
          onClose={onClose}
        />
      );

    case "git":
    case "source-control":
      return (
        <SidebarSourceControl
          files={files}
          onSelectFile={onSelectFile}
          onCommitSuccess={onCommitSuccess}
          onClose={onClose}
        />
      );

    case "debug":
      return (
        <SidebarRunDebug
          onStartDebug={onStartDebug}
          onClose={onClose}
        />
      );

    case "extensions":
      return (
        <SidebarExtensions
          antigravityMode={antigravityMode}
          setAntigravityMode={setAntigravityMode}
          onClose={onClose}
        />
      );

    case "explorer":
    default:
      return (
        <SidebarExplorer
          files={files}
          activeFileId={activeFileId}
          onSelectFile={onSelectFile}
          openCommandPalette={openCommandPalette}
          onClose={onClose}
        />
      );
  }
}
