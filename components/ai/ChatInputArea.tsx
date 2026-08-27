"use client";

import React, { useState } from "react";
import { Plus, ChevronDown, Check, ArrowRight, Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { SuggestedPrompt } from "@/types/ai";

interface ChatInputAreaProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  suggestedPrompts?: SuggestedPrompt[];
  onSelectPrompt?: (query: string) => void;
}

export function ChatInputArea({
  inputPrompt,
  setInputPrompt,
  onSendMessage,
  isLoading,
  suggestedPrompts,
  onSelectPrompt,
}: ChatInputAreaProps) {
  const [selectedModel, setSelectedModel] = useState("Simulated AI (Resume Mode)");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  return (
    <div className="p-3 pt-1 bg-[#141416] shrink-0 space-y-2">
      {/* Quick Suggestions Chips Strip */}
      {suggestedPrompts && suggestedPrompts.length > 0 && onSelectPrompt && (
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-0.5 shrink-0">
          <span className="text-[10px] text-[#787a88] font-mono shrink-0">
            Quick Ask:
          </span>
          {suggestedPrompts.slice(0, 5).map((item, idx) => (
            <Button
              key={idx}
              type="button"
              variant="outline"
              size="xs"
              onClick={() => onSelectPrompt(item.query)}
              disabled={isLoading}
              className="h-6 px-2 py-0 text-[11px] rounded-lg bg-[#1a1b22] hover:bg-[#252834] border-[#2b2d39] hover:border-sky-500/40 text-[#c4c6d4] hover:text-white shrink-0 font-normal transition-colors cursor-pointer"
            >
              {item.icon && <span className="mr-1">{item.icon}</span>}
              <span>{item.label}</span>
            </Button>
          ))}
        </div>
      )}

      <div className="relative rounded-2xl bg-[#1c1d22] border border-[#2d2f38] focus-within:border-[#424450] transition-colors p-2.5 flex flex-col justify-between min-h-[85px] shadow-sm">
        {/* Main Textarea */}
        <Textarea
          rows={2}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSendMessage();
            }
          }}
          placeholder="Ask anything about Lee Ryan's projects, experience, or skills..."
          className="w-full bg-transparent text-[12px] text-[#e4e6f0] placeholder-[#656775] focus-visible:ring-0 border-0 p-0 shadow-none resize-none min-h-[36px]"
        />

        {/* Bottom Bar inside Input Box */}
        <div className="flex items-center justify-between pt-1.5 text-xs">
          {/* Left: Plus icon & Model Selector */}
          <div className="flex items-center space-x-1.5">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => toast.info("Add context, files, or attachments")}
              className="p-1 h-6 w-6 rounded text-[#7c7e8c] hover:text-[#d1d3dc] hover:bg-[#252730] transition-colors cursor-pointer"
              title="Add attachment or context"
            >
              <Plus className="w-3.5 h-3.5" />
            </Button>

            {/* Model Selector Dropdown */}
            <div className="relative">
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="px-2 py-0.5 h-auto rounded-lg text-[11px] text-[#a6a8b6] hover:text-white hover:bg-[#262831] flex items-center space-x-1 transition-colors cursor-pointer font-sans font-normal"
              >
                <span>{selectedModel}</span>
                <ChevronDown className="w-3 h-3 text-[#777987]" />
              </Button>

              {isModelDropdownOpen && (
                <div className="absolute bottom-7 left-0 w-56 rounded-xl bg-[#202127] border border-[#32343e] p-1 shadow-2xl z-50 text-xs">
                  {[
                    "Simulated AI (Resume Mode)",
                    "Gemini 3.7 Flash Medium",
                    "Gemini 2.5 Pro",
                  ].map((model) => (
                    <Button
                      key={model}
                      type="button"
                      variant="ghost"
                      size="xs"
                      onClick={() => {
                        setSelectedModel(model);
                        setIsModelDropdownOpen(false);
                      }}
                      className="w-full text-left justify-between px-2.5 py-1.5 h-auto rounded-lg hover:bg-[#2c2e38] text-[11px] text-[#e0e2ec] hover:text-white flex items-center font-normal cursor-pointer"
                    >
                      <span>{model}</span>
                      {selectedModel === model && (
                        <Check className="w-3 h-3 text-sky-400" />
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Mic & Submit arrow */}
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => toast.info("Voice input simulated")}
              className="p-1 h-6 w-6 rounded text-[#7c7e8c] hover:text-[#d1d3dc] hover:bg-transparent transition-colors cursor-pointer"
              title="Voice input"
            >
              <Mic className="w-3.5 h-3.5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={onSendMessage}
              disabled={isLoading || !inputPrompt.trim()}
              className={`w-6 h-6 p-0 rounded-full flex items-center justify-center transition-all ${
                inputPrompt.trim() && !isLoading
                  ? "bg-sky-500 hover:bg-sky-400 text-black shadow-md cursor-pointer"
                  : "bg-[#282a33] text-[#6b6d7a] cursor-not-allowed opacity-60"
              }`}
            >
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Simulated AI Indicator */}
      <div className="flex items-center justify-center space-x-1.5 text-[10px] text-[#6b6d7c] font-sans pb-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
        <span>Simulated Portfolio AI • Responses generated from verified resume data</span>
      </div>
    </div>
  );
}
