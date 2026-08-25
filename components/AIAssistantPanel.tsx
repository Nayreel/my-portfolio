"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Plus,
  X,
  History,
  MoreHorizontal,
  ArrowLeft,
  FileText,
  FileCode,
  Loader2,
} from "lucide-react";
import { PortfolioFile } from "@/data";
import { ChatMessage } from "@/types/ai";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/toast";
import { ChatMessageItem } from "@/components/ai/ChatMessageItem";
import { ChatInputArea } from "@/components/ai/ChatInputArea";

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
  externalPrompt,
  clearExternalPrompt,
}: AIAssistantPanelProps) {
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
- The suggested prompt to **"What is Lee Ryan's tech stack?"**
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

  const sendMessage = useCallback(
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
      setInputPrompt("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMessage: text }),
        });

        const data = await res.json();
        const aiResponseId = "ai-" + Date.now();

        setMessages((prev) => [
          ...prev,
          {
            id: aiResponseId,
            role: "assistant",
            duration: data.duration || "Worked for 14s",
            content:
              data.text ||
              "I'm ready to answer any questions about Lee Ryan Garcia's portfolio!",
            timestamp: "Just now",
          },
        ]);
      } catch (err) {
        console.error("AI chat error:", err);
        setMessages((prev) => [
          ...prev,
          {
            id: "err-" + Date.now(),
            role: "assistant",
            duration: "Worked for 8s",
            content: `Lee Ryan Garcia is a Software Engineer specializing in Next.js, n8n workflow automation, and scalable web apps. Feel free to ask more questions!`,
            timestamp: "Just now",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [inputPrompt, isLoading],
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
        content: `New session started. Ask anything about Lee Ryan Garcia's background, system architectures, or request code inspections.`,
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
            Ask Questions About Me
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
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} msg={msg} />
          ))}

          {isLoading && (
            <div className="p-3 rounded-xl bg-[#1a1b20] border border-[#272831] flex items-center space-x-2 text-[11px] text-sky-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing portfolio knowledge base...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Context strip */}
      <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-[#868896] bg-[#141416] border-t border-[#1e1f25] shrink-0">
        <div className="flex items-center space-x-1.5 cursor-pointer hover:text-[#d1d3dc] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 text-[#6c6e7a]" />
          <FileCode className="w-3.5 h-3.5 text-[#6c6e7a]" />
          <span className="truncate max-w-[130px] font-mono text-[10.5px]">
            Portfolio Context
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

      {/* Chat Input Area */}
      <ChatInputArea
        inputPrompt={inputPrompt}
        setInputPrompt={setInputPrompt}
        onSendMessage={() => sendMessage()}
        isLoading={isLoading}
      />
    </div>
  );
}
