"use client";

import React from "react";
import { Settings, Palette, Type, Cpu, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  accentColor,
  setAccentColor,
  fontSize,
  setFontSize,
}: SettingsModalProps) {
  const colorOptions = [
    { name: "Sky Cyan (Antigravity Default)", hex: "#38bdf8" },
    { name: "Emerald Green", hex: "#34d399" },
    { name: "Indigo Purple", hex: "#818cf8" },
    { name: "Amber Gold", hex: "#fbbf24" },
    { name: "Rose Coral", hex: "#fb7185" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#252526] border-[#3c3c3c] max-w-md text-white">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-sky-400" />
            <DialogTitle className="text-white text-base">
              Antigravity IDE Preferences
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-zinc-400">
            Customize typography, themes, and AI parameters.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Accent Color */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-white flex items-center space-x-1.5">
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              <span>Theme Accent Palette</span>
            </label>

            <div className="grid grid-cols-1 gap-1.5">
              {colorOptions.map((opt) => (
                <button
                  key={opt.hex}
                  onClick={() => {
                    setAccentColor(opt.hex);
                    toast.success(`Theme updated to ${opt.name}`);
                  }}
                  className={`px-3 py-2 rounded-lg flex items-center justify-between border transition-all text-left text-xs ${
                    accentColor === opt.hex
                      ? "bg-[#181818] border-sky-400 text-white"
                      : "bg-[#1e1e1e] border-transparent hover:bg-[#202020] text-zinc-300"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full ring-1 ring-white/20"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <span>{opt.name}</span>
                  </div>
                  {accentColor === opt.hex && (
                    <Check className="w-3.5 h-3.5 text-sky-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-white flex items-center space-x-1.5">
              <Type className="w-3.5 h-3.5 text-sky-400" />
              <span>Editor Typography Size</span>
            </label>

            <div className="flex items-center space-x-2">
              {[12, 13, 14, 16].map((size) => (
                <Button
                  key={size}
                  variant={fontSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFontSize(size);
                    toast.success(`Editor font set to ${size}px`);
                  }}
                  className={`flex-1 font-mono text-xs ${
                    fontSize === size
                      ? "bg-sky-500 hover:bg-sky-400 text-black font-bold"
                      : "bg-[#1e1e1e] border-[#333333] hover:bg-[#2a2a2a] text-zinc-300"
                  }`}
                >
                  {size}px
                </Button>
              ))}
            </div>
          </div>

          {/* Default AI Engine */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Copilot Engine</span>
            </label>
            <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[#333333] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sky-300 text-xs">
                  Gemini 3.7 Flash & 2.5 Pro
                </span>
                <Badge
                  variant="outline"
                  className="text-[9px] bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                >
                  Online
                </Badge>
              </div>
              <div className="text-[11px] text-zinc-400 leading-relaxed">
                Connected via Server-Side Google GenAI SDK with AST reasoning
                and streaming analysis.
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              onClose();
              toast.success("Preferences saved");
            }}
            className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs"
          >
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
