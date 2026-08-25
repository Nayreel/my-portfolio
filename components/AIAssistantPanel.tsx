// components/antigravity/AIAssistantPanel.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  X,
  History,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  FileText,
  Mic,
  ArrowRight,
  AtSign,
  FileCode,
  Loader2,
} from "lucide-react";
import { PortfolioFile } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  duration?: string;
  codeSnippet?: {
    lang: string;
    code: string;
  };
  fileChanges?: {
    filesCount: number;
    additions: number;
    deletions: number;
  };
}

interface AIAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeFile: PortfolioFile;
  onRunAction?: (action: string) => void;
  onSelectFile?: (fileId: string) => void;
  externalPrompt?: string | null;
  clearExternalPrompt?: () => void;
}

export function AIAssistantPanel({
  isOpen,
  onClose,
  activeFile,
  externalPrompt,
  clearExternalPrompt,
}: AIAssistantPanelProps) {
  const [selectedModel, setSelectedModel] = useState("Gemini 3.7 Flash Medium");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean | null>>({});
  const [isWorkedExpanded, setIsWorkedExpanded] = useState<
    Record<string, boolean>
  >({
    "init-2": true,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      role: "user",
      content:
        'can you change it like ask more questions about me, or any etc...\n<span className="font-mono text-xs">Know More About Me</span>',
      timestamp: "2 min ago",
    },
    {
      id: "init-2",
      role: "assistant",
      duration: "Worked for 43s",
      content: `I have updated the header in \`AIAssistantPanel.tsx\` to:

\`\`\`tsx
<span className="font-mono text-xs">Ask Questions About Me</span>
\`\`\`

I also updated:
- The suggested prompt from **"What is Alex's tech stack?"** to **"What is Lee Ryan's tech stack?"**
- The message author header label to \`AI Assistant\`.

If you prefer another phrase like **"Ask Me Anything"** or **"Ask About Lee Ryan"**, let me know and I can tweak it right away!`,
      codeSnippet: {
        lang: "tsx",
        code: '<span className="font-mono text-xs">Ask Questions About Me</span>',
      },
      fileChanges: {
        filesCount: 1,
        additions: 3,
        deletions: 3,
      },
      timestamp: "Just now",
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (msgId: string, isLike: boolean) => {
    setLikedMap((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === isLike ? null : isLike,
    }));
    toast.info(isLike ? "Thanks for the feedback!" : "Feedback recorded");
  };

  const sendMessage = React.useCallback(
    async (promptToSend?: string) => {
      const text = promptToSend || inputPrompt;
      if (!text.trim() || isLoading) return;

      const userMsgId = "u-" + Date.now();
      const newMsg: ChatMessage = {
        id: userMsgId,
        role: "user",
        content: text,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, newMsg]);
      if (!promptToSend) setInputPrompt("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userMessage: text,
            model: selectedModel,
            messages: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botMsgId = "b-" + Date.now();

        setMessages((prev) => [
          ...prev,
          {
            id: botMsgId,
            role: "assistant",
            duration: data.duration || "Worked for 12s",
            content:
              data.text ||
              "I have analyzed the portfolio codebase and verified all components.",
            timestamp: "Just now",
            fileChanges: {
              filesCount: 1,
              additions: 1,
              deletions: 0,
            },
          },
        ]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          {
            id: "b-err-" + Date.now(),
            role: "assistant",
            duration: "Worked for 8s",
            content: `Lee Ryan Garcia is a Senior Full-Stack & AI Systems Engineer specializing in Next.js 15, TypeScript, distributed backends, and Gemini AI integrations. Feel free to ask more questions!`,
            timestamp: "Just now",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputPrompt, isLoading, messages, selectedModel],
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalPrompt) {
      const timer = setTimeout(() => {
        sendMessage(externalPrompt);
        if (clearExternalPrompt) clearExternalPrompt();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [externalPrompt, clearExternalPrompt, sendMessage]);

  const handleNewChat = () => {
    setMessages([
      {
        id: "new-1",
        role: "assistant",
        duration: "Worked for 5s",
        content: `New session started with **${selectedModel}**. Ask anything about Lee Ryan Garcia's background, system architectures, or request code inspections.`,
        timestamp: "Just now",
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#141416] flex flex-col select-none text-xs text-[#d1d3dc] min-h-0 overflow-hidden font-sans">
      {/* Top Header Bar */}
      <div className="h-9 px-3 flex items-center justify-between border-b border-[#24252b] text-xs text-[#a0a2af] bg-[#141416] shrink-0">
        <div className="flex items-center space-x-1.5 truncate flex-1 min-w-0 mr-2">
          <span className="font-normal text-xs text-[#e0e2ec] truncate">
            Fixing Motion Module Erro...
          </span>
        </div>

        <div className="flex items-center space-x-1 text-[#8b8d98]">
          <Tooltip>
            <TooltipTrigger
              onClick={handleNewChat}
              className="p-1 hover:bg-[#202127] rounded text-[#8b8d98] hover:text-[#e0e2ec] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              New Chat
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={() =>
                toast.info("Conversation History", {
                  description: "Showing 1 active session",
                })
              }
              className="p-1 hover:bg-[#202127] rounded text-[#8b8d98] hover:text-[#e0e2ec] transition-colors cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              History
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={() => toast.info("More Options")}
              className="p-1 hover:bg-[#202127] rounded text-[#8b8d98] hover:text-[#e0e2ec] transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              More Options
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              onClick={onClose}
              className="p-1 hover:bg-[#202127] rounded text-[#8b8d98] hover:text-[#e0e2ec] transition-colors cursor-pointer ml-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="text-xs bg-[#1f1f1f] text-zinc-200 border-[#3c3c3c]"
            >
              Close Sidebar (⌘L)
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <ScrollArea className="flex-1 px-3 py-3 min-h-0">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === "user";

            if (isUser) {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="bg-[#202127] text-[#e6e8f0] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed max-w-[92%] border border-[#2b2d35] whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="space-y-2.5 pt-1 text-[12.5px]">
                {/* Worked for XXs status pill */}
                {msg.duration && (
                  <button
                    onClick={() =>
                      setIsWorkedExpanded((prev) => ({
                        ...prev,
                        [msg.id]: !prev[msg.id],
                      }))
                    }
                    className="flex items-center space-x-1 text-[11.5px] text-[#828490] hover:text-[#c4c6d2] transition-colors group cursor-pointer"
                  >
                    <span>{msg.duration}</span>
                    <ChevronRight className="w-3 h-3 text-[#6c6e7a] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}

                {/* Main Response Content */}
                <div className="text-[#d8d9e4] leading-[1.65] space-y-3 whitespace-pre-wrap">
                  {msg.content.split("\n\n").map((para, pIdx) => {
                    if (para.startsWith("```")) {
                      const cleanCode = para.replace(/```[a-z]*\n?/g, "");
                      return (
                        <div
                          key={pIdx}
                          className="my-2 rounded-xl bg-[#111215] border border-[#24252c] overflow-hidden"
                        >
                          <div className="px-3 py-1.5 bg-[#16171b] border-b border-[#24252c] flex items-center justify-between text-[11px] text-[#8b8d98]">
                            <span className="font-mono text-[10.5px]">tsx</span>
                            <div className="flex items-center space-x-2">
                              <AtSign className="w-3 h-3 cursor-pointer hover:text-white" />
                              <button
                                onClick={() => handleCopyText(cleanCode, "c-" + pIdx)}
                                className="cursor-pointer hover:text-white transition-colors"
                              >
                                {copiedId === "c-" + pIdx ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="p-3 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed bg-[#111215]">
                            <span className="text-sky-300">&lt;span</span>{" "}
                            <span className="text-amber-300">className</span>=
                            <span className="text-emerald-300">
                              &quot;font-mono text-xs&quot;
                            </span>
                            <span className="text-sky-300">&gt;</span>
                            Ask Questions About Me
                            <span className="text-sky-300">&lt;/span&gt;</span>
                          </div>
                        </div>
                      );
                    }

                    if (para.startsWith("- ") || para.startsWith("* ")) {
                      return (
                        <ul key={pIdx} className="space-y-1.5 pl-4 list-disc text-[#c8cad6]">
                          {para.split("\n").map((line, lIdx) => (
                            <li key={lIdx} className="leading-snug">
                              {line.replace(/^[-*]\s*/, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return <p key={pIdx}>{para}</p>;
                  })}
                </div>

                {/* File Changed Bar (Review Pill) */}
                {msg.fileChanges && (
                  <div className="mt-3 flex items-center justify-between p-2 rounded-xl bg-[#1a1b20] border border-[#262831] text-[11.5px] text-[#9a9ca8]">
                    <div className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition-colors">
                      <span>
                        {msg.fileChanges.filesCount} file changed
                      </span>
                      <span className="text-emerald-400 font-mono font-medium">
                        +{msg.fileChanges.additions}
                      </span>
                      <span className="text-rose-400 font-mono font-medium">
                        -{msg.fileChanges.deletions}
                      </span>
                      <ChevronRight className="w-3 h-3 text-[#6b6d79]" />
                    </div>

                    <button
                      onClick={() =>
                        toast.success("Reviewing modified file changes")
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#22242c] hover:bg-[#2c2e38] border border-[#31333e] text-[11px] text-[#e0e2ec] flex items-center space-x-1.5 transition-colors cursor-pointer font-medium"
                    >
                      <FileText className="w-3 h-3 text-[#8e909e]" />
                      <span>Review</span>
                    </button>
                  </div>
                )}

                {/* Response Action Icons: Copy, Thumbs Up, Thumbs Down */}
                <div className="flex items-center justify-end space-x-2.5 pt-1 text-[#6e707e]">
                  <button
                    onClick={() => handleCopyText(msg.content, msg.id)}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleFeedback(msg.id, true)}
                    className={`p-1 hover:text-white transition-colors cursor-pointer ${
                      likedMap[msg.id] === true ? "text-sky-400" : ""
                    }`}
                    title="Good response"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleFeedback(msg.id, false)}
                    className={`p-1 hover:text-white transition-colors cursor-pointer ${
                      likedMap[msg.id] === false ? "text-rose-400" : ""
                    }`}
                    title="Bad response"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="p-3 rounded-xl bg-[#1a1b20] border border-[#272831] flex items-center space-x-2 text-[11px] text-sky-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing portfolio knowledge base...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Context / Review Changes docked strip above prompt */}
      <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-[#868896] bg-[#141416] border-t border-[#1e1f25] shrink-0">
        <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#d1d3dc] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 text-[#6c6e7a]" />
          <FileCode className="w-3.5 h-3.5 text-[#6c6e7a]" />
          <span className="truncate max-w-[130px] font-mono text-[10.5px]">
            0 Files With ...
          </span>
        </div>

        <button
          onClick={() =>
            toast.info("No uncommitted changes in current working tree")
          }
          className="px-2 py-0.5 rounded-md bg-[#1f2026] hover:bg-[#282a32] border border-[#2c2d36] text-[10.5px] text-[#c0c2cf] flex items-center space-x-1 transition-colors cursor-pointer"
        >
          <FileText className="w-3 h-3 text-[#7f8190]" />
          <span>Review Changes</span>
        </button>
      </div>

      {/* Antigravity Chat Input Bar Container */}
      <div className="p-3 pt-1 bg-[#141416] shrink-0">
        <div className="relative rounded-2xl bg-[#1c1d22] border border-[#2d2f38] focus-within:border-[#424450] transition-colors p-2.5 flex flex-col justify-between min-h-[85px] shadow-sm">
          {/* Main Textarea */}
          <Textarea
            rows={2}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything, @ to mention, / for actions"
            className="w-full bg-transparent text-[12px] text-[#e4e6f0] placeholder-[#656775] focus-visible:ring-0 border-0 p-0 shadow-none resize-none min-h-[36px]"
          />

          {/* Bottom Bar inside Input Box */}
          <div className="flex items-center justify-between pt-1.5 text-xs">
            {/* Left: Plus icon & Model Selector */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => toast.info("Add context, files, or attachments")}
                className="p-1 rounded text-[#7c7e8c] hover:text-[#d1d3dc] hover:bg-[#252730] transition-colors cursor-pointer"
                title="Add attachment or context"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              {/* Model Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="px-2 py-0.5 rounded-lg text-[11px] text-[#a6a8b6] hover:text-white hover:bg-[#262831] flex items-center space-x-1 transition-colors cursor-pointer font-sans"
                >
                  <span>{selectedModel}</span>
                  <ChevronDown className="w-3 h-3 text-[#777987]" />
                </button>

                {isModelDropdownOpen && (
                  <div className="absolute bottom-7 left-0 w-48 rounded-xl bg-[#202127] border border-[#32343e] p-1 shadow-2xl z-50 text-xs">
                    <button
                      onClick={() => {
                        setSelectedModel("Gemini 3.7 Flash Medium");
                        setIsModelDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#2c2e38] text-[11px] text-[#e0e2ec] flex items-center justify-between"
                    >
                      <span>Gemini 3.7 Flash Medium</span>
                      {selectedModel === "Gemini 3.7 Flash Medium" && (
                        <Check className="w-3 h-3 text-sky-400" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedModel("Gemini 2.5 Pro High");
                        setIsModelDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#2c2e38] text-[11px] text-[#e0e2ec] flex items-center justify-between"
                    >
                      <span>Gemini 2.5 Pro High</span>
                      {selectedModel === "Gemini 2.5 Pro High" && (
                        <Check className="w-3 h-3 text-sky-400" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Mic & Submit Arrow */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() =>
                  sendMessage("Give me a quick tour of Lee Ryan Garcia's portfolio.")
                }
                className="p-1 rounded text-[#7c7e8c] hover:text-[#d1d3dc] hover:bg-[#252730] transition-colors cursor-pointer"
                title="Voice input"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!inputPrompt.trim() || isLoading}
                className="w-6 h-6 rounded-full bg-[#2a2c36] hover:bg-[#383a47] disabled:opacity-40 disabled:hover:bg-[#2a2c36] text-[#b4b6c4] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

