"use client";

import React from "react";
import { Bot, HelpCircle } from "lucide-react";

interface BioAIPromptsSectionProps {
  onOpenAIQuery: (query: string) => void;
}

export function BioAIPromptsSection({ onOpenAIQuery }: BioAIPromptsSectionProps) {
  const suggestedQuestions: string[] = [
    "What projects has Lee built?",
    "What is his strongest technical skill?",
    "How does he use n8n for business automation?",
    "Explain the MineGo architecture",
    "What production problems has he solved?",
    "Why should we hire Lee Ryan Garcia?",
  ];

  return (
    <div className="rounded-xl bg-gradient-to-br from-[#1b1d24] to-[#14151a] border border-[#2b2e38] p-5 sm:p-6 space-y-4">
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4 text-sky-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">
            Ask My Portfolio Assistant
          </h3>
          <p className="text-xs text-zinc-400">
            Click any structured prompt below to query AI about my
            experience, architecture, and background.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
        {suggestedQuestions.map((question, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onOpenAIQuery(question)}
            className="text-left p-2.5 rounded-lg bg-[#20222a] hover:bg-[#282b35] border border-[#2e313c] hover:border-sky-500/40 text-xs text-zinc-200 transition-all cursor-pointer flex items-center justify-between group"
          >
            <span className="line-clamp-1 font-medium">{question}</span>
            <HelpCircle className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400 shrink-0 ml-1.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
