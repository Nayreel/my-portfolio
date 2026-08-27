"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileCode,
} from "lucide-react";
import { PortfolioFile } from "@/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ExplorerFileTreeProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (file: PortfolioFile) => void;
  searchQuery: string;
}

export function ExplorerFileTree({
  files,
  activeFileId,
  onSelectFile,
  searchQuery,
}: ExplorerFileTreeProps) {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    about: true,
    projects: true,
    skills: true,
    contact: true,
    resume: true,
    root: true,
  });

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const groupedFiles: Record<string, PortfolioFile[]> = {};
  files.forEach((file) => {
    const folder = file.folder || "root";
    if (!groupedFiles[folder]) groupedFiles[folder] = [];
    groupedFiles[folder].push(file);
  });

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".jsx")) {
      return (
        <span className="text-[#38bdf8] text-[13px] leading-none font-bold mr-2 shrink-0 select-none">
          ⚛
        </span>
      );
    }
    if (fileName.endsWith(".ts")) {
      return (
        <span className="text-[#3178c6] text-[11px] leading-none font-bold font-mono px-0.5 rounded bg-[#3178c6]/10 mr-2 shrink-0 select-none">
          TS
        </span>
      );
    }
    if (fileName.endsWith(".json")) {
      return (
        <span className="text-[#facc15] text-[12px] leading-none font-bold font-mono mr-2 shrink-0 select-none">
          &#123;&#125;
        </span>
      );
    }
    if (fileName.endsWith(".md")) {
      return (
        <span className="text-[#60a5fa] text-[11px] leading-none font-bold font-mono mr-2 shrink-0 select-none">
          M↓
        </span>
      );
    }
    return <FileCode className="w-3.5 h-3.5 text-sky-400 mr-2 shrink-0" />;
  };

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (searchQuery) {
    return (
      <div className="px-1 py-1 space-y-0.5">
        <div className="text-[10px] text-[#777777] uppercase px-2 mb-1">
          Matching Files ({filteredFiles.length})
        </div>
        {filteredFiles.map((file) => {
          const isSelected = file.id === activeFileId;
          return (
            <Button
              key={file.id}
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => onSelectFile(file)}
              className={`w-full flex items-center justify-between px-2 py-1 h-[22px] rounded text-left transition-colors font-normal cursor-pointer ${
                isSelected
                  ? "bg-[#094771] text-white font-medium hover:bg-[#094771] hover:text-white"
                  : "hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-1.5 truncate text-[13px]">
                {getFileIcon(file.name)}
                <span className="truncate">{file.name}</span>
              </div>
              <Badge
                variant="outline"
                className="text-[9px] py-0 px-1 text-[#888888] border-[#3c3c3c] font-mono pointer-events-none"
              >
                {file.folder}
              </Badge>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      {/* Root workspace folder header */}
      <div
        onClick={() => toggleFolder("root")}
        className="flex items-center px-2 py-1 text-[13px] font-semibold text-[#cccccc] hover:text-white cursor-pointer group"
      >
        {(openFolders["root"] ?? true) ? (
          <ChevronDown className="w-3.5 h-3.5 mr-1 text-[#888888] shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#888888] shrink-0" />
        )}
        {(openFolders["root"] ?? true) ? (
          <FolderOpen className="w-3.5 h-3.5 mr-1.5 text-sky-400 shrink-0" />
        ) : (
          <Folder className="w-3.5 h-3.5 mr-1.5 text-sky-400 shrink-0" />
        )}
        <span className="truncate">my-portfolio</span>
        <Badge
          variant="secondary"
          className="ml-auto text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 px-1 py-0 font-mono"
        >
          main
        </Badge>
      </div>

      {/* Folder Contents */}
      {(openFolders["root"] ?? true) && (
        <div className="space-y-0.5">
          {[
            "about",
            "projects",
            "experience",
            "skills",
            "contact",
            "resume",
          ].map((folderKey) => {
            const folderFiles = groupedFiles[folderKey] || [];
            if (folderFiles.length === 0) return null;
            const isOpen = openFolders[folderKey] ?? true;

            return (
              <div key={folderKey} className="pl-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => toggleFolder(folderKey)}
                  className="w-full flex items-center px-1.5 py-0 h-[22px] rounded hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white text-left transition-colors font-normal group cursor-pointer justify-start text-[13px]"
                >
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 mr-1 text-[#858585] group-hover:text-white shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#858585] group-hover:text-white shrink-0" />
                  )}
                  {isOpen ? (
                    <FolderOpen className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
                  ) : (
                    <Folder className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
                  )}
                  <span className="truncate capitalize">{folderKey}</span>
                  <span className="ml-auto text-[11px] text-[#666666]">
                    {folderFiles.length}
                  </span>
                </Button>

                {isOpen && (
                  <div className="pl-2 space-y-0.5 border-l border-[#282828] ml-2.5 my-0.5">
                    {folderFiles.map((file) => {
                      const isSelected = file.id === activeFileId;
                      return (
                        <Button
                          key={file.id}
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => onSelectFile(file)}
                          className={`w-full flex items-center justify-between px-2 py-0 h-[22px] rounded-sm text-left transition-colors font-normal group cursor-pointer text-[13px] ${
                            isSelected
                              ? "bg-[#04395e] text-white font-medium border-l-2 border-sky-400 hover:bg-[#04395e] hover:text-white"
                              : "hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white"
                          }`}
                        >
                          <div className="flex items-center space-x-1 truncate">
                            {getFileIcon(file.name)}
                            <span className="truncate">{file.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-400/80">
                            M
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Root files */}
          <div className="pl-2 space-y-0.5">
            {(groupedFiles["root"] || []).map((file) => {
              const isSelected = file.id === activeFileId;
              return (
                <Button
                  key={file.id}
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() => onSelectFile(file)}
                  className={`w-full flex items-center justify-between px-2 py-0 h-[22px] rounded text-left transition-colors font-normal cursor-pointer text-[13px] ${
                    isSelected
                      ? "bg-[#04395e] text-white font-medium border-l-2 border-sky-400 hover:bg-[#04395e] hover:text-white"
                      : "hover:bg-[#2a2d2e] text-[#cccccc] hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-1 truncate">
                    {getFileIcon(file.name)}
                    <span className="truncate">{file.name}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
