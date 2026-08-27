"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  Sparkles,
  Plus,
  Minus,
  X,
} from "lucide-react";
import { PortfolioFile } from "@/data";
import { GitChangeFile, GitCommitRecord } from "@/types/sidebar";
import { INITIAL_GIT_CHANGES, INITIAL_GIT_COMMITS } from "@/data/sidebarData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarGitGraph } from "@/components/sidebar/SidebarGitGraph";

interface SidebarSourceControlProps {
  files: PortfolioFile[];
  onSelectFile: (file: PortfolioFile) => void;
  onCommitSuccess?: (commitMessage: string, commitHash: string) => void;
  onClose?: () => void;
}

export function SidebarSourceControl({
  files,
  onSelectFile,
  onCommitSuccess,
  onClose,
}: SidebarSourceControlProps) {
  const [changes, setChanges] = useState<GitChangeFile[]>(INITIAL_GIT_CHANGES);
  const [commits, setCommits] =
    useState<GitCommitRecord[]>(INITIAL_GIT_COMMITS);
  const [commitMessage, setCommitMessage] = useState("");
  const [isChangesSectionOpen, setIsChangesSectionOpen] = useState(true);
  const [isStagedCollapsed, setIsStagedCollapsed] = useState(false);
  const [isUnstagedCollapsed, setIsUnstagedCollapsed] = useState(false);
  const [lastCommitNotice, setLastCommitNotice] = useState<string | null>(null);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const stagedFiles = changes.filter((c) => c.staged);
  const unstagedFiles = changes.filter((c) => !c.staged);

  const toggleStageFile = (fileId: string) => {
    setChanges((prev) =>
      prev.map((item) =>
        item.id === fileId ? { ...item, staged: !item.staged } : item,
      ),
    );
  };

  const handleGenerateAICommit = () => {
    if (isGeneratingAI) return;
    setIsGeneratingAI(true);
    const aiMessages = [
      "feat: implement sidebar view switcher with search, source control, and debugging functionality",
      "feat: add responsive sidebar panels with strict TypeScript and shadcn components",
      "feat: add VS Code source control graph and AI commit generator",
      "refactor: optimize developer portfolio state and responsive drawers",
    ];
    const picked = aiMessages[Math.floor(Math.random() * aiMessages.length)];
    setTimeout(() => {
      setCommitMessage(picked);
      setIsGeneratingAI(false);
    }, 5000);
  };

  const handleCommit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const msg =
      commitMessage.trim() || "feat: update portfolio workspace changes";
    const toCommit = stagedFiles.length > 0 ? stagedFiles : unstagedFiles;
    if (toCommit.length === 0) return;

    const randomHex = Math.random().toString(16).substring(2, 9);
    const newCommit: GitCommitRecord = {
      hash: randomHex,
      message: msg,
      author: "Lee Ryan Garcia",
      timeAgo: "Just now",
      branch: "dev",
      filesChangedCount: toCommit.length,
      isHead: true,
      cloudSynced: true,
    };

    setCommits((prev) => [
      newCommit,
      ...prev.map((c) => ({ ...c, isHead: false })),
    ]);
    setCommitMessage("");
    setChanges((prev) =>
      prev.filter((item) => !toCommit.some((tc) => tc.id === item.id)),
    );
    setLastCommitNotice(`Committed [${randomHex}] on "dev"`);
    setTimeout(() => setLastCommitNotice(null), 3500);
    if (onCommitSuccess) onCommitSuccess(msg, randomHex);
  };

  const renderFileRow = (file: GitChangeFile, isStaged: boolean) => {
    const isTsx =
      file.fileName.endsWith(".tsx") || file.fileName.endsWith(".jsx");
    const isUntracked = file.status === "U";

    return (
      <div
        key={`${isStaged ? "staged" : "unstaged"}-${file.id}`}
        onClick={() => {
          const target = files.find((f) => f.id === file.id);
          if (target) onSelectFile(target);
        }}
        className="flex items-center justify-between px-5 py-0.5 hover:bg-[#2a2d2e] cursor-pointer text-zinc-300 group transition-colors"
      >
        <div className="flex items-center truncate mr-2">
          {isTsx ? (
            <span className="text-[#38bdf8] text-[13px] leading-none font-bold mr-1.5 shrink-0 select-none">
              ⚛
            </span>
          ) : (
            <span className="text-[#3178c6] text-[10px] leading-none font-bold font-mono px-0.5 rounded bg-[#3178c6]/20 mr-1.5 shrink-0 select-none">
              TS
            </span>
          )}
          <span className="text-xs text-zinc-100 truncate">
            {file.fileName}
          </span>
          {file.folderDisplay && (
            <span className="text-[11px] text-zinc-500 ml-1.5 truncate">
              {file.folderDisplay}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1 shrink-0">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={(e) => {
              e.stopPropagation();
              toggleStageFile(file.id);
            }}
            className="opacity-0 group-hover:opacity-100 h-4 w-4 text-zinc-400 hover:text-zinc-200"
            title={isStaged ? "Unstage File" : "Stage File"}
          >
            {isStaged ? (
              <Minus className="w-3 h-3" />
            ) : (
              <Plus className="w-3 h-3" />
            )}
          </Button>
          <span
            className={`font-mono text-[11px] font-semibold ${
              isUntracked && !isStaged ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {file.changeCountDisplay || file.status}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#181818] border-r border-[#2d2d2d] text-zinc-300 select-none text-xs">
      {/* Top Header */}
      <div className="flex items-center justify-between px-4 py-2 shrink-0 bg-[#181818]">
        <span className="font-semibold text-xs text-zinc-200">
          Source Control
        </span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-zinc-400 hover:text-zinc-200 hover:bg-[#282828] h-5 w-5"
            title="Views and More Actions..."
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-[#282828] h-5 w-5"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="pb-4">
          {/* Main Changes Collapsible Group */}
          <div>
            <div
              onClick={() => setIsChangesSectionOpen((prev) => !prev)}
              className="flex items-center px-3 py-1 hover:bg-[#252526] cursor-pointer text-zinc-300 font-medium"
            >
              {isChangesSectionOpen ? (
                <ChevronDown className="w-3.5 h-3.5 mr-1 text-zinc-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-zinc-400" />
              )}
              <span>Changes</span>
            </div>

            {isChangesSectionOpen && (
              <div className="px-3 pt-1 pb-3 space-y-2">
                {/* Message Input with Conditional Initial / Multiline State */}
                <div
                  className={`relative rounded-sm bg-[#222222] border border-[#383838] focus-within:border-sky-500 transition-colors ${
                    !commitMessage.trim() ? "h-7 overflow-hidden" : ""
                  }`}
                >
                  <Textarea
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                        e.preventDefault();
                        handleCommit();
                      }
                    }}
                    placeholder={
                      isGeneratingAI ? "Thinking..." : "Message (Ctrl+Enter ..."
                    }
                    className={`w-full bg-transparent border-0 ring-0 focus-visible:ring-0 focus-visible:border-0 shadow-none text-xs text-zinc-100 placeholder:text-zinc-500 pl-2 resize-none font-sans custom-scrollbar ${
                      commitMessage.trim()
                        ? "min-h-[28px] h-auto field-sizing-content py-1.5 pr-8 leading-relaxed"
                        : "h-7 min-h-[28px] max-h-[28px] py-1 pr-24 leading-none overflow-hidden whitespace-nowrap"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleGenerateAICommit}
                    disabled={isGeneratingAI}
                    className={`absolute transition-all cursor-pointer ${
                      commitMessage.trim()
                        ? "top-1.5 right-1.5 w-6 h-6 rounded-sm bg-[#0078d4] hover:bg-[#006cbd] text-white flex items-center justify-center"
                        : "right-0.5 top-0.5 h-6 bg-[#0078d4] hover:bg-[#006cbd] text-white text-[11px] font-medium px-2 rounded-xs flex items-center space-x-1"
                    }`}
                    title={isGeneratingAI ? "Thinking..." : "Generate"}
                  >
                    {commitMessage.trim() ? (
                      <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                    ) : isGeneratingAI ? (
                      <span className="text-[11px] font-medium text-white">
                        Thinking...
                      </span>
                    ) : (
                      <>
                        <span>Generate</span>
                        <Sparkles className="w-3 h-3 text-white" />
                      </>
                    )}
                  </button>
                </div>

                {/* Blue Split Commit Button */}
                <div className="flex items-center rounded-sm overflow-hidden bg-[#0078d4] hover:bg-[#006cbd] text-white transition-colors">
                  <button
                    onClick={() => handleCommit()}
                    className="flex-1 flex items-center justify-center space-x-1.5 py-1 text-xs font-semibold hover:bg-black/10 transition-colors cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Commit</span>
                  </button>
                  <div className="w-[1px] h-4 bg-white/25" />
                  <button
                    className="px-2 py-1 hover:bg-black/10 transition-colors cursor-pointer"
                    title="Commit Options"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {lastCommitNotice && (
                  <div className="text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-1 rounded flex items-center space-x-1 animate-in fade-in duration-200">
                    <Check className="w-3 h-3 shrink-0" />
                    <span className="truncate">{lastCommitNotice}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Staged Changes Section */}
          <div className="mt-1">
            <div
              onClick={() => setIsStagedCollapsed((prev) => !prev)}
              className="flex items-center justify-between px-3 py-1 hover:bg-[#252526] cursor-pointer text-zinc-300 group"
            >
              <div className="flex items-center space-x-1">
                {isStagedCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                )}
                <span className="text-xs">Staged Changes</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  {stagedFiles.length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChanges((prev) =>
                          prev.map((f) => ({ ...f, staged: false })),
                        );
                      }}
                      className="h-4 w-4 text-zinc-400 hover:text-white"
                      title="Unstage All"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <Badge
                  variant="secondary"
                  className="bg-[#2a2a2a] text-zinc-300 text-[10px] px-1.5 py-0 h-4 rounded-full border-transparent"
                >
                  {stagedFiles.length}
                </Badge>
              </div>
            </div>

            {!isStagedCollapsed && (
              <div>
                {stagedFiles.length === 0 ? (
                  <div className="px-6 py-1 text-[11px] text-zinc-600 italic">
                    No staged changes
                  </div>
                ) : (
                  stagedFiles.map((file) => renderFileRow(file, true))
                )}
              </div>
            )}
          </div>

          {/* Unstaged Changes Section */}
          <div className="mt-2">
            <div
              onClick={() => setIsUnstagedCollapsed((prev) => !prev)}
              className="flex items-center justify-between px-3 py-1 hover:bg-[#252526] cursor-pointer text-zinc-300 group"
            >
              <div className="flex items-center space-x-1">
                {isUnstagedCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                )}
                <span className="text-xs">Changes</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                  {unstagedFiles.length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setChanges((prev) =>
                          prev.map((f) => ({ ...f, staged: true })),
                        );
                      }}
                      className="h-4 w-4 text-zinc-400 hover:text-white"
                      title="Stage All"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <Badge
                  variant="secondary"
                  className="bg-[#2a2a2a] text-zinc-300 text-[10px] px-1.5 py-0 h-4 rounded-full border-transparent"
                >
                  {unstagedFiles.length}
                </Badge>
              </div>
            </div>

            {!isUnstagedCollapsed && (
              <div>
                {unstagedFiles.length === 0 ? (
                  <div className="px-6 py-1 text-[11px] text-zinc-600 italic">
                    No working tree changes
                  </div>
                ) : (
                  unstagedFiles.map((file) => renderFileRow(file, false))
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Visual Git Graph Section (Bottom-Anchored) */}
      <SidebarGitGraph
        commits={commits}
        onResetChanges={() => setChanges(INITIAL_GIT_CHANGES)}
      />
    </div>
  );
}
