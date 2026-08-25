"use client";

import React, { useState } from "react";
import { Plus, ChevronDown, Check, ArrowRight, Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

interface ChatInputAreaProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export function ChatInputArea({
  inputPrompt,
  setInputPrompt,
  onSendMessage,
  isLoading,
}: ChatInputAreaProps) {
  const [selectedModel, setSelectedModel] = useState("Gemini 3.7 Flash Medium");
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  return (
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
              onSendMessage();
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
                  {["Gemini 3.7 Flash Medium", "Gemini 2.5 Pro", "Gemini 2.5 Flash"].map(
                    (model) => (
                      <button
                        key={model}
                        onClick={() => {
                          setSelectedModel(model);
                          setIsModelDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#2c2e38] text-[11px] text-[#e0e2ec] flex items-center justify-between"
                      >
                        <span>{model}</span>
                        {selectedModel === model && (
                          <Check className="w-3 h-3 text-sky-400" />
                        )}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Mic & Submit arrow */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => toast.info("Voice input requires microphone permission")}
              className="p-1 rounded text-[#7c7e8c] hover:text-[#d1d3dc] transition-colors cursor-pointer"
              title="Voice input"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onSendMessage}
              disabled={isLoading || !inputPrompt.trim()}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                inputPrompt.trim() && !isLoading
                  ? "bg-sky-500 hover:bg-sky-400 text-black shadow-md"
                  : "bg-[#282a33] text-[#6b6d7a] cursor-not-allowed"
              }`}
            >
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
