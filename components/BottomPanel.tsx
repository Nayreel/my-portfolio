// components/antigravity/BottomPanel.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Terminal,
  X,
  Maximize2,
  Minimize2,
  Trash2,
  CheckCircle,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  DEVELOPER_PROFILE,
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
  TERMINAL_COMMANDS_HELP,
} from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BottomPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile?: (fileId: string) => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

export type PanelTab = "problems" | "output" | "debug" | "terminal" | "ports";

export function BottomPanel({
  isOpen,
  onClose,
  onSelectFile,
  antigravityMode,
  setAntigravityMode,
}: BottomPanelProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>("terminal");
  const [isExpanded, setIsExpanded] = useState(false);

  // Terminal state
  const [commandInput, setCommandInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<
    { type: "input" | "output" | "system"; text: string; link?: string }[]
  >([
    {
      type: "system",
      text: '⚡ Google Antigravity IDE [Version 2.5.0-preview]\n(c) 2026 Lee Ryan Garcia. All systems operational.\nType "help" for a list of interactive commands or "projects" to view flagships.',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLogs, activeTab]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = commandInput.trim();
    if (!rawCmd) return;

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const nextLogs = [
      ...terminalLogs,
      {
        type: "input" as const,
        text: `PS C:\\Portfolio\\AlexVance> ${rawCmd}`,
      },
    ];
    const cmd = rawCmd.toLowerCase();

    if (cmd === "help") {
      const helpText = TERMINAL_COMMANDS_HELP.map(
        (h) => `  ${h.cmd.padEnd(20)} - ${h.desc}`,
      ).join("\n");
      nextLogs.push({
        type: "output",
        text: `Available Antigravity Portfolio Commands:\n${helpText}`,
      });
    } else if (cmd === "bio") {
      nextLogs.push({
        type: "output",
        text: `👤 ${DEVELOPER_PROFILE.name} - ${DEVELOPER_PROFILE.title}\n📍 ${DEVELOPER_PROFILE.location}\n✉️ ${DEVELOPER_PROFILE.email}\n${DEVELOPER_PROFILE.bio}`,
      });
      if (onSelectFile) onSelectFile("bio.tsx");
    } else if (cmd === "projects") {
      const pList = PROJECTS.map(
        (p) =>
          `🚀 ${p.title} (${p.category})\n   ${p.tagline}\n   Tech: ${p.tags.join(", ")}\n   Stars: ★ ${p.stars} | Forks: ${p.forks}`,
      ).join("\n\n");
      nextLogs.push({
        type: "output",
        text: `Flagship Projects:\n\n${pList}`,
      });
      if (onSelectFile) onSelectFile("projects.tsx");
    } else if (cmd === "skills") {
      const sList = SKILL_CATEGORIES.map(
        (c) =>
          `[${c.category}]\n  ` +
          c.skills.map((s) => `${s.name} (${s.experience})`).join(", "),
      ).join("\n\n");
      nextLogs.push({
        type: "output",
        text: `Skills & Proficiencies:\n\n${sList}`,
      });
      if (onSelectFile) onSelectFile("tech-stack.json");
    } else if (cmd === "experience") {
      const eList = EXPERIENCES.map(
        (e) =>
          `💼 ${e.role} @ ${e.company} (${e.period})\n   ${e.highlights[0]}`,
      ).join("\n\n");
      nextLogs.push({
        type: "output",
        text: `Career Timeline:\n\n${eList}`,
      });
      if (onSelectFile) onSelectFile("experience.tsx");
    } else if (cmd === "contact") {
      nextLogs.push({
        type: "output",
        text: `📬 Email: ${DEVELOPER_PROFILE.email}\n🌐 GitHub: ${DEVELOPER_PROFILE.github}\n💼 LinkedIn: ${DEVELOPER_PROFILE.linkedin}\n💬 Message form available in get-in-touch.tsx`,
      });
      if (onSelectFile) onSelectFile("get-in-touch.tsx");
    } else if (cmd === "cat resume.md" || cmd === "resume") {
      nextLogs.push({
        type: "output",
        text: `📄 Opening Lee Ryan Garcia Formal Curriculum Vitae...`,
      });
      if (onSelectFile) onSelectFile("resume.md");
    } else if (cmd.includes("antigravity") || cmd.includes("fly")) {
      const nextMode = !antigravityMode;
      setAntigravityMode(nextMode);
      confetti({ particleCount: 90, spread: 80 });
      nextLogs.push({
        type: "output",
        text: nextMode
          ? "🚀 Antigravity Zero-G Physics: IGNITED! Watch elements float!"
          : "🛬 Antigravity Zero-G Physics: DEACTIVATED. Gravity restored.",
      });
    } else if (cmd === "clear" || cmd === "cls") {
      setTerminalLogs([]);
      setCommandInput("");
      return;
    } else if (cmd === "neofetch") {
      nextLogs.push({
        type: "output",
        text: `
      /\\        OS: Google Antigravity OS v2.5 x86_64
     /  \\       Host: Next.js 15.4.9 App Router + V8 Turbopack
    / /\\ \\      Kernel: TypeScript 5.9.3 & React 19
   / /  \\ \\     Uptime: 7 Years Engineering Experience
  / /_/\\_\\ \\    Packages: Gemini 3.7 Flash, Tailwind CSS v4, Motion
 /________/ \\   Memory: 99.99% Reliability (Zero Leaks)
                Shell: Antigravity Shell 2.5 (zsh/pwsh)`,
      });
    } else if (cmd === "npm run build" || cmd === "build") {
      confetti({ particleCount: 120, spread: 90 });
      nextLogs.push({
        type: "output",
        text: `> alex-vance-portfolio@2.5.0 build
> next build

▲ Next.js 15.4.9
   Creating an optimized production build ...
 ✓ Compiled successfully in 420ms
 ✓ Linting and checking validity of types ...
 ✓ Collecting page data ...
 ✓ Generating static pages (10/10)
 ✓ Finalizing page optimization ...

Route (app)                              Size     First Load JS
┌ ○ /                                    5.4 kB         89.2 kB
├ ○ /api/gemini/chat                     0 B                0 B
└ ○ /resume                              2.1 kB         85.9 kB
+ First Load JS shared by all            83.8 kB

✓ Build complete! Ready for deployment.`,
      });
    } else if (cmd === "npm run test" || cmd === "npm test" || cmd === "test") {
      nextLogs.push({
        type: "output",
        text: `> vitest run
 ✓ test/agent-reasoning.spec.ts (4 tests) 18ms
 ✓ test/sub-ms-cache.spec.ts (8 tests) 42ms
 ✓ test/fullstack-ssr.spec.ts (6 tests) 24ms

 Test Files  3 passed (3)
      Tests  18 passed (18)
   Duration  142ms (transform 12ms, setup 0ms, collect 22ms, tests 84ms)`,
      });
    } else {
      nextLogs.push({
        type: "output",
        text: `Command not recognized: "${rawCmd}". Type "help" for a list of valid commands.`,
      });
    }

    setTerminalLogs(nextLogs);
    setCommandInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommandInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCommandInput("");
        } else {
          setHistoryIndex(newIndex);
          setCommandInput(commandHistory[newIndex]);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`bg-[#181818] border-t border-[#2d2d2d] flex flex-col select-none text-xs text-[#cccccc] z-20 shrink-0 min-h-0 overflow-hidden transition-all ${
        isExpanded ? "h-96" : "h-48 sm:h-56"
      }`}
    >
      {/* Panel Header Strip */}
      <div className="h-8 px-2 flex items-center justify-between border-b border-[#282828] bg-[#181818] text-[11px] shrink-0">
        {/* Panel Tabs */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab("problems")}
            className={`px-2.5 py-1 rounded-sm flex items-center space-x-1.5 transition-colors ${
              activeTab === "problems"
                ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium"
                : "text-[#888888] hover:text-[#cccccc]"
            }`}
          >
            <span>Problems</span>
            <Badge
              variant="outline"
              className="text-[9px] px-1 py-0 bg-[#2d2d2d] text-zinc-400 border-none"
            >
              0
            </Badge>
          </button>

          <button
            onClick={() => setActiveTab("output")}
            className={`px-2.5 py-1 rounded-sm flex items-center space-x-1.5 transition-colors ${
              activeTab === "output"
                ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium"
                : "text-[#888888] hover:text-[#cccccc]"
            }`}
          >
            <span>Output</span>
          </button>

          <button
            onClick={() => setActiveTab("debug")}
            className={`px-2.5 py-1 rounded-sm flex items-center space-x-1.5 transition-colors ${
              activeTab === "debug"
                ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium"
                : "text-[#888888] hover:text-[#cccccc]"
            }`}
          >
            <span>Debug Console</span>
          </button>

          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-2.5 py-1 rounded-sm flex items-center space-x-1.5 transition-colors ${
              activeTab === "terminal"
                ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium"
                : "text-[#888888] hover:text-[#cccccc]"
            }`}
          >
            <Terminal className="w-3 h-3 text-sky-400" />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab("ports")}
            className={`px-2.5 py-1 rounded-sm flex items-center space-x-1.5 transition-colors ${
              activeTab === "ports"
                ? "bg-[#252526] text-white border-b-2 border-sky-400 font-medium"
                : "text-[#888888] hover:text-[#cccccc]"
            }`}
          >
            <span>Ports</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>
        </div>

        {/* Panel Action Controls */}
        <div className="flex items-center space-x-1">
          {activeTab === "terminal" && (
            <Tooltip>
              <TooltipTrigger
                onClick={() => setTerminalLogs([])}
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
              {isExpanded ? "Restore Panel Size" : "Maximize Panel"}
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

      {/* Tab Body */}
      <ScrollArea className="flex-1 bg-[#141414] font-mono text-xs p-3">
        {/* 1. Terminal View */}
        {activeTab === "terminal" && (
          <div
            className="h-full flex flex-col space-y-1"
            onClick={() => inputRef.current?.focus()}
          >
            {terminalLogs.map((log, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap leading-relaxed ${
                  log.type === "input"
                    ? "text-sky-300 font-semibold"
                    : log.type === "system"
                      ? "text-zinc-400 italic"
                      : "text-[#d4d4d4]"
                }`}
              >
                {log.text}
              </div>
            ))}

            {/* Prompt input line */}
            <form
              onSubmit={handleCommandSubmit}
              className="flex items-center space-x-2 pt-1"
            >
              <span className="text-emerald-400 font-bold shrink-0 select-none">
                PS C:\Portfolio\AlexVance&gt;
              </span>
              <input
                ref={inputRef}
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type command (e.g. 'help', 'projects', 'antigravity --fly')..."
                className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs"
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        )}

        {/* 2. Output View */}
        {activeTab === "output" && (
          <div className="space-y-1 text-[#aaaaaa] font-mono text-[11px] leading-relaxed">
            <div className="text-zinc-500">
              [Next.js Dev Server Running on Port 3000]
            </div>
            <div>
              GET /api/portfolio/stats 200 in 107ms (next.js: 10ms, proxy.ts:
              4ms)
            </div>
            <div>GET /manifest.webmanifest 200 in 11ms (next.js: 5ms)</div>
            <div className="text-emerald-400 font-medium">
              ✓ Compiled in 609ms
            </div>
            <div>
              GET /api/gemini/health 200 in 144ms (next.js: 21ms, model:
              gemini-3.7-flash)
            </div>
            <div>GET /assets/antigravity-ast.json 200 in 14ms</div>
            <div className="text-emerald-400 font-medium">✓ Ready in 346ms</div>
            <div>GET /projects/antigravity-os 200 in 190ms (cache: HIT)</div>
          </div>
        )}

        {/* 3. Problems View */}
        {activeTab === "problems" && (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-2 py-8">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <p className="text-xs">
              No problems have been detected in the portfolio workspace.
            </p>
          </div>
        )}

        {/* 4. Debug Console */}
        {activeTab === "debug" && (
          <div className="space-y-1 text-zinc-400">
            <div>
              [Debugger connected to ws://127.0.0.1:9229/antigravity-node]
            </div>
            <div className="text-sky-400">
              ✓ V8 Profiler initialized. Breakpoints: 0 active.
            </div>
            <div className="text-zinc-500">
              &gt; Antigravity runtime evaluation engine ready.
            </div>
          </div>
        )}

        {/* 5. Ports View */}
        {activeTab === "ports" && (
          <div className="space-y-2">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="pb-1 font-semibold">Port</th>
                  <th className="pb-1 font-semibold">Process</th>
                  <th className="pb-1 font-semibold">Address</th>
                  <th className="pb-1 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-900">
                  <td className="py-1 font-mono text-sky-400">3000</td>
                  <td className="py-1 font-mono">next-server</td>
                  <td className="py-1 font-mono">http://localhost:3000</td>
                  <td className="py-1 text-emerald-400">● Forwarded / Open</td>
                </tr>
                <tr>
                  <td className="py-1 font-mono text-sky-400">9229</td>
                  <td className="py-1 font-mono">node-inspect</td>
                  <td className="py-1 font-mono">127.0.0.1:9229</td>
                  <td className="py-1 text-emerald-400">● Running</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
