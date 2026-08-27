"use client";

import React, { useState } from "react";
import { RefreshCw, Search, X } from "lucide-react";
import { PortfolioFile } from "@/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExplorerFileTree } from "./explorer/ExplorerFileTree";
import { ExplorerOutlineSection } from "./explorer/ExplorerOutlineSection";

interface SidebarExplorerProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (file: PortfolioFile) => void;
  openCommandPalette: () => void;
  onClose?: () => void;
}

export function SidebarExplorer({
  files,
  activeFileId,
  onSelectFile,
  openCommandPalette,
  onClose,
}: SidebarExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [toggleRefreshKey, setToggleRefreshKey] = useState(0);

  const activeFile = files.find((f) => f.id === activeFileId);

  return (
    <div className="w-full bg-[#181818] border-r border-[#2d2d2d] flex flex-col h-full select-none text-xs text-[#cccccc]">
      {/* Sidebar Header */}
      <div className="h-9 px-4 flex items-center justify-between border-b border-[#2d2d2d] text-[11px] font-semibold tracking-wider text-[#cccccc] select-none">
        <span className="uppercase tracking-wider font-semibold text-[#bbbbbb] text-[11px]">
          EXPLORER
        </span>
        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger
              onClick={() => setToggleRefreshKey((k) => k + 1)}
              className="p-1 hover:bg-[#2a2d2e] rounded text-[#858585] hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              Refresh Explorer
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={openCommandPalette}
              className="p-1 hover:bg-[#2a2d2e] rounded text-[#858585] hover:text-white transition-colors cursor-pointer"
            >
              <Search className="w-3 h-3" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              Quick Search (⌘P)
            </TooltipContent>
          </Tooltip>

          {onClose && (
            <Tooltip>
              <TooltipTrigger
                onClick={onClose}
                className="p-1 hover:bg-[#2a2d2e] rounded text-[#858585] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
              >
                Close Explorer
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Quick Search with Input */}
      <div className="px-2 py-1.5 border-b border-[#252526]">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-[#666666]" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter files..."
            className="h-7 bg-[#1f1f1f] border-[#333333] pl-8 pr-6 text-xs text-[#dddddd] placeholder-[#666666] focus-visible:ring-sky-500 focus-visible:ring-1"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => setSearchQuery("")}
              className="absolute right-1 top-1 text-[#888888] hover:text-white hover:bg-transparent h-5 w-5 p-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Main File Tree Area */}
      <ScrollArea className="flex-1 px-1 py-1" key={toggleRefreshKey}>
        <ExplorerFileTree
          files={files}
          activeFileId={activeFileId}
          onSelectFile={onSelectFile}
          searchQuery={searchQuery}
        />
      </ScrollArea>

      {/* Collapsible Outline and Timeline Sections */}
      <ExplorerOutlineSection activeFile={activeFile} />
    </div>
  );
}
