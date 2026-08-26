"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  AtSign,
  FileText,
} from "lucide-react";
import { ChatMessage } from "@/types/ai";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

interface ChatMessageItemProps {
  msg: ChatMessage;
}

export function ChatMessageItem({ msg }: ChatMessageItemProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [isWorkedExpanded, setIsWorkedExpanded] = useState(false);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (like: boolean) => {
    setIsLiked((prev) => (prev === like ? null : like));
    toast.info(like ? "Thanks for the feedback!" : "Feedback recorded");
  };

  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-[#202127] text-[#e6e8f0] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed max-w-[92%] border border-[#2b2d35] whitespace-pre-wrap">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2.5 pt-1 text-[12.5px]">
      {msg.duration && (
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setIsWorkedExpanded(!isWorkedExpanded)}
          className="flex items-center space-x-1 text-[11.5px] text-[#828490] hover:text-[#c4c6d2] hover:bg-transparent p-0 h-auto font-normal transition-colors group cursor-pointer"
        >
          <span>{msg.duration}</span>
          <ChevronRight className="w-3 h-3 text-[#6c6e7a] group-hover:translate-x-0.5 transition-transform" />
        </Button>
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
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleCopyText(cleanCode, "c-" + pIdx)}
                      className="cursor-pointer hover:text-white hover:bg-transparent p-0 h-4 w-4 transition-colors text-[#8b8d98]"
                    >
                      {copiedId === "c-" + pIdx ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
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

      {/* File Changed Bar */}
      {msg.fileChanges && (
        <div className="mt-3 flex items-center justify-between p-2 rounded-xl bg-[#1a1b20] border border-[#262831] text-[11.5px] text-[#9a9ca8]">
          <div className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition-colors">
            <span>{msg.fileChanges.filesCount} file changed</span>
            <span className="text-emerald-400 font-mono font-medium">
              +{msg.fileChanges.additions}
            </span>
            <span className="text-rose-400 font-mono font-medium">
              -{msg.fileChanges.deletions}
            </span>
            <ChevronRight className="w-3 h-3 text-[#6b6d79]" />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => toast.success("Reviewing modified file changes")}
            className="px-2.5 py-1 h-auto rounded-lg bg-[#22242c] hover:bg-[#2c2e38] border border-[#31333e] text-[11px] text-[#e0e2ec] hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer font-medium"
          >
            <FileText className="w-3 h-3 text-[#8e909e]" />
            <span>Review</span>
          </Button>
        </div>
      )}

      {/* Action Icons */}
      <div className="flex items-center justify-end space-x-1.5 pt-1 text-[#6e707e]">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => handleCopyText(msg.content, msg.id)}
          className="p-1 h-6 w-6 rounded hover:text-white hover:bg-[#202127] transition-colors cursor-pointer text-[#6e707e]"
          title="Copy message"
        >
          {copiedId === msg.id ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => handleFeedback(true)}
          className={`p-1 h-6 w-6 rounded hover:text-white hover:bg-[#202127] transition-colors cursor-pointer ${
            isLiked === true ? "text-sky-400" : "text-[#6e707e]"
          }`}
          title="Good response"
        >
          <ThumbsUp className="w-3.5 h-3.5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() => handleFeedback(false)}
          className={`p-1 h-6 w-6 rounded hover:text-white hover:bg-[#202127] transition-colors cursor-pointer ${
            isLiked === false ? "text-rose-400" : "text-[#6e707e]"
          }`}
          title="Bad response"
        >
          <ThumbsDown className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
