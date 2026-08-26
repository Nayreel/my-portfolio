"use client";

import React, { useState } from "react";
import { Copy, Check, Cpu, Play } from "lucide-react";
import { PortfolioFile } from "@/data";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";

interface CodeViewerProps {
  file: PortfolioFile;
  onRunPreview: () => void;
  onAskAI: (prompt: string) => void;
  onCursorChange?: (line: number, col: number) => void;
  fontSize?: number;
}

export function CodeViewer({
  file,
  onRunPreview,
  onAskAI,
  onCursorChange,
  fontSize = 13,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const [activeLine, setActiveLine] = useState<number>(4);

  const lines = file.code.split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(file.code);
    setCopied(true);
    toast.success("Code copied to clipboard", {
      description: `${file.name} (${lines.length} lines)`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLineClick = (lineNum: number) => {
    setActiveLine(lineNum);
    if (onCursorChange) {
      onCursorChange(lineNum, 1);
    }
  };

  // Simple syntax highlighter for code display
  const renderHighlightedLine = (lineText: string) => {
    if (!lineText) return <span>&nbsp;</span>;

    // Comments
    if (
      lineText.trim().startsWith("//") ||
      lineText.trim().startsWith("/*") ||
      lineText.trim().startsWith("*")
    ) {
      return <span className="text-[#6a9955] italic">{lineText}</span>;
    }

    // Markdown headers
    if (file.language === "markdown" && lineText.startsWith("#")) {
      return <span className="text-[#4fc1ff] font-bold">{lineText}</span>;
    }

    // Regex token matcher
    const tokens = lineText.split(
      /(\b(?:import|export|from|const|let|var|function|async|await|return|interface|type|public|default|if|else|package|func|struct|impl|match|enum)\b|"[^"]*"|'[^']*'|`[^`]*`|<[a-zA-Z0-9_.-]+|[a-zA-Z0-9_.-]+>|\{|\}|\(|\)|=>|:)/g,
    );

    return (
      <span>
        {tokens.map((token, i) => {
          if (
            /^(import|export|from|const|let|var|function|async|await|return|interface|type|public|default|if|else|package|func|struct|impl|match|enum)$/.test(
              token,
            )
          ) {
            return (
              <span key={i} className="text-[#c586c0] font-medium">
                {token}
              </span>
            );
          }
          if (/^(".*"|'.*'|`.*`)$/.test(token)) {
            return (
              <span key={i} className="text-[#ce9178]">
                {token}
              </span>
            );
          }
          if (/^(true|false|null|undefined|[0-9]+)$/.test(token)) {
            return (
              <span key={i} className="text-[#b5cea8]">
                {token}
              </span>
            );
          }
          if (token.startsWith("<") || token.endsWith(">")) {
            return (
              <span key={i} className="text-[#4ec9b0]">
                {token}
              </span>
            );
          }
          if (token === "=>" || token === ":") {
            return (
              <span key={i} className="text-[#569cd6]">
                {token}
              </span>
            );
          }
          if (/^[A-Z][a-zA-Z0-9_]*$/.test(token)) {
            return (
              <span key={i} className="text-[#4ec9b0]">
                {token}
              </span>
            );
          }
          return <span key={i}>{token}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="relative flex-1 bg-[#1e1e1e] flex overflow-hidden font-mono text-[13px] leading-[22px] text-[#d4d4d4] select-text">
      {/* Code floating action buttons with shadcn components */}
      <div className="absolute top-3 right-20 z-20 flex items-center space-x-1.5 bg-[#252526]/90 backdrop-blur-md border border-[#3c3c3c] rounded-md px-1.5 py-1 shadow-lg">
        <Tooltip>
          <TooltipTrigger
            onClick={onRunPreview}
            className="h-6 px-2 text-[11px] text-sky-400 hover:text-sky-300 hover:bg-[#333333] rounded inline-flex items-center justify-center cursor-pointer transition-colors"
          >
            <Play className="w-3 h-3 fill-sky-400 mr-1" />
            <span>Live Render</span>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Switch to interactive live preview
          </TooltipContent>
        </Tooltip>

        <span className="text-[#444444]">|</span>

        <Tooltip>
          <TooltipTrigger
            onClick={() =>
              onAskAI(
                `Explain what ${file.name} does and how it was architected.`,
              )
            }
            className="h-6 px-2 text-[11px] text-amber-400 hover:text-amber-300 hover:bg-[#333333] rounded inline-flex items-center justify-center cursor-pointer transition-colors"
          >
            <Cpu className="w-3 h-3 mr-1" />
            <span>Ask AI</span>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Ask Gemini Copilot to explain code
          </TooltipContent>
        </Tooltip>

        <span className="text-[#444444]">|</span>

        <Tooltip>
          <TooltipTrigger
            onClick={handleCopy}
            className="h-6 px-2 text-[11px] text-[#aaaaaa] hover:text-white hover:bg-[#333333] rounded inline-flex items-center justify-center cursor-pointer transition-colors"
          >
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400 mr-1" />
            ) : (
              <Copy className="w-3 h-3 mr-1" />
            )}
            <span>{copied ? "Copied" : "Copy"}</span>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
          >
            Copy source code to clipboard
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Main Code Area */}
      <div className="flex-1 overflow-auto custom-scrollbar py-2">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isCurrent = activeLine === lineNum;
              const isModified =
                lineNum === 3 || lineNum === 7 || lineNum === 14;

              return (
                <tr
                  key={idx}
                  onClick={() => handleLineClick(lineNum)}
                  className={`group transition-colors ${
                    isCurrent ? "bg-[#282c34]/70" : "hover:bg-[#23272e]/50"
                  }`}
                >
                  {/* Git Diff Indicator */}
                  <td className="w-1 pl-1 text-center select-none">
                    {isModified && (
                      <div
                        className="w-0.5 h-full bg-sky-400/90 rounded"
                        title="Modified line"
                      />
                    )}
                  </td>

                  {/* Line Number */}
                  <td
                    style={{ fontSize: `${Math.max(10, fontSize - 1)}px` }}
                    className="w-12 pr-4 text-right text-[#5c6370] select-none group-hover:text-[#abb2bf] font-mono"
                  >
                    {lineNum}
                  </td>

                  {/* Code Line */}
                  <td
                    style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
                    className="pr-12 whitespace-pre font-mono tracking-tight"
                  >
                    {renderHighlightedLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Minimap on the right */}
      <div
        className="w-24 bg-[#1a1a1a] border-l border-[#282828] hidden lg:block overflow-hidden select-none py-2 px-1 cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
        onClick={() => setActiveLine(1)}
      >
        <div className="space-y-[2px]">
          {lines.slice(0, 80).map((l, i) => {
            const widthPct = Math.min(
              Math.max((l.trim().length / 60) * 100, 10),
              95,
            );
            return (
              <div
                key={i}
                style={{ width: `${widthPct}%` }}
                className={`h-[2px] rounded-[1px] ${
                  i + 1 === activeLine
                    ? "bg-sky-400"
                    : l.trim().startsWith("//")
                      ? "bg-[#445544]"
                      : l.includes("export") || l.includes("import")
                        ? "bg-[#8866aa]"
                        : "bg-[#555555]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
