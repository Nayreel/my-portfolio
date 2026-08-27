"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PanelTab } from "@/types/ide";
import { BottomPanelHeader } from "./bottom-panel/BottomPanelHeader";
import { TerminalTab } from "./bottom-panel/TerminalTab";

export type { PanelTab } from "@/types/ide";

interface BottomPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile?: (fileId: string) => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
  activeTab?: PanelTab;
  setActiveTab?: (tab: PanelTab) => void;
  debugLogMessage?: string | null;
}

export function BottomPanel({
  isOpen,
  onClose,
  onSelectFile,
  antigravityMode,
  setAntigravityMode,
  activeTab: controlledActiveTab,
  setActiveTab: setControlledActiveTab,
  debugLogMessage,
}: BottomPanelProps) {
  const [internalActiveTab, setInternalActiveTab] =
    useState<PanelTab>("terminal");
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const setActiveTab = setControlledActiveTab ?? setInternalActiveTab;

  const [isExpanded, setIsExpanded] = useState(false);
  const [clearTerminalSignal, setClearTerminalSignal] = useState(0);

  if (!isOpen) return null;

  return (
    <div
      className={`w-full bg-[#181818] border-t border-[#2d2d2d] flex flex-col select-none transition-all duration-200 z-20 ${
        isExpanded ? "h-[85vh]" : "h-full"
      }`}
    >
      {/* Tab Navigation Header */}
      <BottomPanelHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        onClearTerminal={() => setClearTerminalSignal((s) => s + 1)}
        onClose={onClose}
      />

      {/* Tab Body */}
      <ScrollArea className="flex-1 bg-[#141414] font-mono text-xs p-3 min-h-0">
        {activeTab === "terminal" && (
          <TerminalTab
            key={clearTerminalSignal}
            onSelectFile={onSelectFile}
            antigravityMode={antigravityMode}
            setAntigravityMode={setAntigravityMode}
          />
        )}

        {activeTab === "output" && (
          <div className="space-y-1 text-[#aaaaaa] font-mono text-[11px] leading-relaxed">
            <div className="text-zinc-500">
              [Next.js Dev Server Running on Port 3000]
            </div>
            <div>GET /api/portfolio/stats 200 in 107ms</div>
            <div className="text-emerald-400 font-medium">
              ✓ Compiled in 380ms
            </div>
            <div className="text-emerald-400 font-medium">✓ Ready</div>
          </div>
        )}

        {activeTab === "problems" && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-2 py-8">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <p className="text-xs">
              No problems have been detected in the portfolio workspace.
            </p>
          </div>
        )}

        {activeTab === "debug" && (
          <div className="space-y-1 text-zinc-400">
            <div>
              [Debugger connected to ws://127.0.0.1:9229/antigravity-node]
            </div>
            <div className="text-sky-400">
              ✓ V8 Profiler initialized. Breakpoints: 2 active.
            </div>
            {debugLogMessage && (
              <div className="text-emerald-400 font-mono text-[11px] pt-1 bg-emerald-950/20 border border-emerald-900/40 p-2 rounded">
                ▶ {debugLogMessage}
              </div>
            )}
            <div className="text-zinc-500 font-mono text-[10px] pt-1">
              [Info] Application state inspected: Lee Ryan Garcia (Full-Stack Engineer)
            </div>
          </div>
        )}

        {activeTab === "ports" && (
          <div className="space-y-2">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="pb-1 font-semibold">Port</th>
                  <th className="pb-1 font-semibold">Process</th>
                  <th className="pb-1 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-900">
                  <td className="py-1 font-mono text-sky-400">3000</td>
                  <td className="py-1 font-mono">next-server</td>
                  <td className="py-1 text-emerald-400">● Forwarded / Open</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
