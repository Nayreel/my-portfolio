"use client";

import React, { useState, useMemo } from "react";
import {
  Search as SearchIcon,
  ChevronDown,
  ChevronRight,
  CaseSensitive,
  WholeWord,
  Regex,
  X,
  Replace,
  FileCode,
  Sparkles,
} from "lucide-react";
import { PortfolioFile } from "@/data";
import { SearchResultFileGroup } from "@/types/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarSearchProps {
  files: PortfolioFile[];
  activeFileId: string;
  onSelectFile: (file: PortfolioFile) => void;
  onClose?: () => void;
}

export function SidebarSearch({
  files,
  activeFileId,
  onSelectFile,
  onClose,
}: SidebarSearchProps) {
  const [query, setQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [matchWholeWord, setMatchWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [collapsedFiles, setCollapsedFiles] = useState<Record<string, boolean>>(
    {},
  );

  const toggleFileCollapse = (fileId: string) => {
    setCollapsedFiles((prev) => ({
      ...prev,
      [fileId]: !prev[fileId],
    }));
  };

  // Compute search results across files & their code lines
  const searchResults: SearchResultFileGroup[] = useMemo(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return [];

    let regex: RegExp | null = null;
    try {
      if (useRegex) {
        regex = new RegExp(trimmedQuery, matchCase ? "g" : "gi");
      } else if (matchWholeWord) {
        const escaped = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        regex = new RegExp(`\\b${escaped}\\b`, matchCase ? "g" : "gi");
      } else {
        const escaped = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        regex = new RegExp(escaped, matchCase ? "g" : "gi");
      }
    } catch {
      return [];
    }

    const results: SearchResultFileGroup[] = [];

    files.forEach((file) => {
      const fileMatches: {
        lineNumber: number;
        lineContent: string;
        previewSnippet: string;
      }[] = [];
      const lines = file.code.split("\n");

      lines.forEach((line, index) => {
        regex.lastIndex = 0;
        if (regex.test(line)) {
          fileMatches.push({
            lineNumber: index + 1,
            lineContent: line.trim(),
            previewSnippet: line.trim(),
          });
        }
      });

      // Also check if file name or description matches even if no code line match
      if (fileMatches.length === 0) {
        regex.lastIndex = 0;
        if (regex.test(file.name) || regex.test(file.description)) {
          fileMatches.push({
            lineNumber: 1,
            lineContent: file.description,
            previewSnippet: file.description,
          });
        }
      }

      if (fileMatches.length > 0) {
        results.push({
          fileId: file.id,
          fileName: file.name,
          filePath: file.path,
          previewType: file.previewType,
          matches: fileMatches,
        });
      }
    });

    return results;
  }, [query, files, matchCase, matchWholeWord, useRegex]);

  const totalMatchesCount = searchResults.reduce(
    (acc, group) => acc + group.matches.length,
    0,
  );

  return (
    <div className="flex flex-col h-full bg-[#181818] border-r border-[#2d2d2d] text-zinc-300 select-none text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d2d2d] shrink-0 bg-[#1f1f1f]">
        <div className="flex items-center space-x-2">
          <SearchIcon className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold tracking-wider text-[11px] uppercase text-zinc-200">
            Search
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {onClose && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-[#2d2d2d]"
              title="Close Search Sidebar"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-3 space-y-2 border-b border-[#282828] shrink-0">
        {/* Main Search Input */}
        <div className="relative flex items-center">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setShowReplace((prev) => !prev)}
            className={`mr-1 text-zinc-400 hover:text-white ${
              showReplace ? "text-sky-400 bg-sky-950/40" : ""
            }`}
            title="Toggle Replace"
          >
            <ChevronRight
              className={`w-3.5 h-3.5 transition-transform ${
                showReplace ? "rotate-90" : ""
              }`}
            />
          </Button>
          <div className="relative flex-1">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across files..."
              className="h-7 text-xs bg-[#1f1f1f] border-[#3c3c3c] focus-visible:ring-1 focus-visible:ring-sky-500 pr-20 pl-2.5 text-zinc-200 placeholder:text-zinc-500"
            />
            {/* Toggles inside search input */}
            <div className="absolute right-1 top-1 flex items-center space-x-0.5">
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setMatchCase((prev) => !prev)}
                  className={`p-0.5 rounded text-[10px] cursor-pointer ${
                    matchCase
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <CaseSensitive className="w-3.5 h-3.5" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[11px] bg-[#222]">
                  Match Case (Alt+C)
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  onClick={() => setMatchWholeWord((prev) => !prev)}
                  className={`p-0.5 rounded text-[10px] cursor-pointer ${
                    matchWholeWord
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <WholeWord className="w-3.5 h-3.5" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[11px] bg-[#222]">
                  Match Whole Word (Alt+W)
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger
                  onClick={() => setUseRegex((prev) => !prev)}
                  className={`p-0.5 rounded text-[10px] cursor-pointer ${
                    useRegex
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Regex className="w-3.5 h-3.5" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[11px] bg-[#222]">
                  Use Regular Expression (Alt+R)
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Optional Replace Row */}
        {showReplace && (
          <div className="flex items-center pl-7">
            <div className="relative flex-1">
              <Input
                value={replaceQuery}
                onChange={(e) => setReplaceQuery(e.target.value)}
                placeholder="Replace (simulated)..."
                className="h-7 text-xs bg-[#1f1f1f] border-[#3c3c3c] focus-visible:ring-1 focus-visible:ring-sky-500 pr-8 pl-2.5 text-zinc-200 placeholder:text-zinc-500"
              />
              <Button
                variant="ghost"
                size="icon-xs"
                className="absolute right-0.5 top-0.5 text-zinc-400 hover:text-sky-400 hover:bg-transparent"
                title="Replace All in Portfolio"
              >
                <Replace className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}

        {/* Quick query chips */}
        <div className="flex flex-wrap gap-1 pt-1">
          {["React", "Next.js", "TypeScript", "AI", "Automation"].map(
            (term) => (
              <Button
                key={term}
                variant="outline"
                size="xs"
                onClick={() => setQuery(term)}
                className="text-[10px] cursor-pointer bg-[#242424] hover:bg-[#2e2e2e] text-zinc-400 hover:text-sky-300 px-1.5 py-0 h-5 border-[#333]"
              >
                {term}
              </Button>
            ),
          )}
        </div>
      </div>

      {/* Results Header / Summary */}
      {query.trim() && (
        <div className="px-3 py-1 text-[11px] text-zinc-400 flex items-center justify-between border-b border-[#222] bg-[#161616] shrink-0">
          <span>
            {totalMatchesCount} {totalMatchesCount === 1 ? "result" : "results"}{" "}
            in {searchResults.length}{" "}
            {searchResults.length === 1 ? "file" : "files"}
          </span>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setQuery("")}
            className="text-zinc-500 hover:text-zinc-300 text-[10px] h-5 px-1.5 hover:bg-transparent"
          >
            Clear
          </Button>
        </div>
      )}

      {/* Search Results List */}
      <ScrollArea className="flex-1">
        <div className="py-2">
          {!query.trim() ? (
            <div className="px-4 py-8 text-center text-zinc-500 space-y-2">
              <Sparkles className="w-6 h-6 mx-auto text-zinc-600 mb-1" />
              <p className="text-xs">
                Type a keyword to search across all code, resume, projects, and
                career records.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-500">
              <p className="text-xs">
                No matching results found for &ldquo;{query}&rdquo;
              </p>
            </div>
          ) : (
            searchResults.map((group) => {
              const isCollapsed = !!collapsedFiles[group.fileId];
              const fileObj = files.find((f) => f.id === group.fileId);
              const isActive = activeFileId === group.fileId;

              return (
                <div key={group.fileId} className="mb-1">
                  {/* File header row */}
                  <div
                    onClick={() => toggleFileCollapse(group.fileId)}
                    className={`flex items-center justify-between px-2.5 py-1 cursor-pointer hover:bg-[#252526] transition-colors ${
                      isActive
                        ? "bg-[#252526] text-sky-300 font-medium"
                        : "text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 truncate">
                      {isCollapsed ? (
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      )}
                      <FileCode className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate text-xs">{group.fileName}</span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-[#2a2a2a] text-zinc-400 text-[10px] px-1 py-0 h-4 border-[#333]"
                    >
                      {group.matches.length}
                    </Badge>
                  </div>

                  {/* Matches within file */}
                  {!isCollapsed && (
                    <div className="pl-6 pr-2 py-0.5 space-y-0.5">
                      {group.matches.map((match, idx) => (
                        <div
                          key={`${group.fileId}-m-${idx}`}
                          onClick={() => {
                            if (fileObj) onSelectFile(fileObj);
                          }}
                          className="px-2 py-1 rounded hover:bg-[#2a2d2e] cursor-pointer text-zinc-400 hover:text-zinc-200 transition-colors flex items-start space-x-2 group"
                        >
                          <span className="text-zinc-600 group-hover:text-zinc-500 font-mono text-[10px] shrink-0 pt-0.5">
                            {match.lineNumber}:
                          </span>
                          <span className="font-mono text-[11px] truncate leading-tight">
                            {match.previewSnippet}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
