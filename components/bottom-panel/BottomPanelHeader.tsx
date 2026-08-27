"use client";

import React from "react";
import { Terminal, X, Maximize2, Minimize2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PanelTab } from "@/types/ide";

interface BottomPanelHeaderProps {
  activeTab: PanelTab;
  setActiveTab: (tab: PanelTab) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  onClearTerminal: () => void;
  onClose: () => void;
}

export function BottomPanelHeader({
  activeTab,
  setActiveTab,
  isExpanded,
  setIsExpanded,
  onClearTerminal,
  onClose,
}: BottomPanelHeaderProps) {
  return (
    <div className="h-9 px-2 sm:px-3 flex items-center justify-between border-b border-[#242526] text-xs bg-[#1f1f1f] shrink-0">
      <div className="flex items-center space-x-0.5 sm:space-x-1 overflow-x-auto custom-scrollbar touch-pan-x min-w-0 mr-2">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setActiveTab("problems")}
          className={`px-2.5 py-1 h-auto rounded-sm flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "problems"
              ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium hover:bg-[#252526] hover:text-white"
              : "text-[#888888] hover:text-[#cccccc] hover:bg-transparent"
          }`}
        >
          <span>Problems</span>
          <Badge
            variant="outline"
            className="text-[10px] px-1 py-0 border-zinc-700 pointer-events-none"
          >
            0
          </Badge>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setActiveTab("output")}
          className={`px-2.5 py-1 h-auto rounded-sm flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "output"
              ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium hover:bg-[#252526] hover:text-white"
              : "text-[#888888] hover:text-[#cccccc] hover:bg-transparent"
          }`}
        >
          <span>Output</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setActiveTab("terminal")}
          className={`px-2.5 py-1 h-auto rounded-sm flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "terminal"
              ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium hover:bg-[#252526] hover:text-white"
              : "text-[#888888] hover:text-[#cccccc] hover:bg-transparent"
          }`}
        >
          <Terminal className="w-3 h-3 text-sky-400" />
          <span>Terminal</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setActiveTab("ports")}
          className={`px-2.5 py-1 h-auto rounded-sm flex items-center space-x-1.5 transition-colors cursor-pointer ${
            activeTab === "ports"
              ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium hover:bg-[#252526] hover:text-white"
              : "text-[#888888] hover:text-[#cccccc] hover:bg-transparent"
          }`}
        >
          <span>Ports</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </Button>
      </div>

      {/* Panel Action Controls */}
      <div className="flex items-center space-x-1">
        {activeTab === "terminal" && (
          <Tooltip>
            <TooltipTrigger
              onClick={onClearTerminal}
              className="p-1 hover:bg-[#2a2d2e] rounded text-[#888888] hover:text-white transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              Clear Terminal
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-[#2a2d2e] rounded text-[#888888] hover:text-white transition-colors cursor-pointer"
          >
            {isExpanded ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            {isExpanded ? "Restore Panel Height" : "Maximize Panel Height"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            onClick={onClose}
            className="p-1 hover:bg-[#2a2d2e] rounded text-[#888888] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3 h-3" />
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Close Panel (⌃`)
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
