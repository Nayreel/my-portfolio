"use client";

import React from "react";
import { Settings, Palette, Type, Cpu, Check, Flame, Moon } from "lucide-react";
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
import { IDEThemeMode } from "@/types/ide";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  ideThemeMode?: IDEThemeMode;
  setIdeThemeMode?: (theme: IDEThemeMode) => void;
  antigravityMode?: boolean;
  setAntigravityMode?: (mode: boolean | ((prev: boolean) => boolean)) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  accentColor,
  setAccentColor,
  fontSize,
  setFontSize,
  ideThemeMode = "nebula",
  setIdeThemeMode,
  antigravityMode = false,
  setAntigravityMode,
}: SettingsModalProps) {
  const colorOptions = [
    { name: "Nebula Cyan", hex: "#38bdf8" },
    { name: "Cyber Purple", hex: "#a855f7" },
    { name: "Matrix Emerald", hex: "#10b981" },
    { name: "Solar Amber", hex: "#f59e0b" },
    { name: "Crimson Rose", hex: "#f43f5e" },
    { name: "Electric Blue", hex: "#3b82f6" },
  ];

  const backgroundModes: {
    id: IDEThemeMode;
    name: string;
    desc: string;
    accentDefault: string;
  }[] = [
    {
      id: "nebula",
      name: "Dark Nebula",
      desc: "Balanced deep slate dark mode",
      accentDefault: "#38bdf8",
    },
    {
      id: "abyss",
      name: "Midnight Abyss",
      desc: "Pure OLED absolute black (#000000)",
      accentDefault: "#38bdf8",
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk Synthwave",
      desc: "Neon purple night vibes (#0b0713)",
      accentDefault: "#a855f7",
    },
    {
      id: "matrix",
      name: "Matrix Terminal",
      desc: "Hacker emerald dark atmosphere (#030d07)",
      accentDefault: "#10b981",
    },
    {
      id: "solar",
      name: "Solar Warm",
      desc: "Warm espresso amber tones (#120e06)",
      accentDefault: "#f59e0b",
    },
  ];

  React.useEffect(() => {
    if (ideThemeMode) {
      const root = document.documentElement;
      root.classList.remove(
        "ide-theme-nebula",
        "ide-theme-abyss",
        "ide-theme-cyberpunk",
        "ide-theme-matrix",
        "ide-theme-solar",
      );
      root.classList.add(`ide-theme-${ideThemeMode}`);
    }
  }, [ideThemeMode]);

  const handleSelectMode = (mode: (typeof backgroundModes)[0]) => {
    if (setIdeThemeMode) setIdeThemeMode(mode.id);
    toast.success(`Theme switched to ${mode.name}`, {
      description: mode.desc,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-[#18191e] border-[#2f313c] w-[95vw] max-w-[95vw] sm:max-w-2xl max-h-[85dvh] sm:max-h-[85vh] text-white shadow-2xl rounded-2xl p-0 gap-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-4 sm:p-6 pb-3 sm:pb-3.5 pr-12 shrink-0 border-b border-[#272932]/60 bg-[#18191e]">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />
            <DialogTitle className="text-white text-base sm:text-lg font-bold truncate">
              Portfolio IDE Preferences
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-zinc-400 mt-1">
            Customize typography, workspace themes, physics, and AI engine
            parameters.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain custom-scrollbar p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Background Theme Modes */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-white flex items-center space-x-1.5">
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Workspace Theme Mode</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
              {backgroundModes.map((mode) => {
                const isSelected = ideThemeMode === mode.id;
                return (
                  <Button
                    key={mode.id}
                    type="button"
                    variant="ghost"
                    size="default"
                    onClick={() => handleSelectMode(mode)}
                    className={`h-auto p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer flex-col items-stretch justify-start ${
                      isSelected
                        ? "bg-[#252834] border-sky-400 text-white shadow-md shadow-sky-500/10 hover:bg-[#2c303f] hover:text-white"
                        : "bg-[#141518] border-[#272932] hover:bg-[#1e2027] text-zinc-300 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full gap-1.5">
                      <span className="font-bold text-xs text-white truncate">
                        {mode.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 leading-snug font-normal text-left">
                      {mode.desc}
                    </p>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Accent Color */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-white flex items-center space-x-1.5">
              <Palette className="w-4 h-4 text-sky-400" />
              <span>Accent Color Palette</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {colorOptions.map((opt) => (
                <Button
                  key={opt.hex}
                  type="button"
                  variant="ghost"
                  size="default"
                  onClick={() => {
                    setAccentColor(opt.hex);
                    document.documentElement.style.setProperty(
                      "--accent-theme",
                      opt.hex,
                    );
                    toast.success(`Accent color set to ${opt.name}`);
                  }}
                  className={`h-auto px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl flex items-center justify-between border transition-all text-xs cursor-pointer min-w-0 ${
                    accentColor === opt.hex
                      ? "bg-[#252834] border-sky-400 text-white shadow-sm hover:bg-[#2c303f] hover:text-white"
                      : "bg-[#141518] border-[#272932] hover:bg-[#1e2027] text-zinc-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0 truncate">
                    <span
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ring-1 ring-white/20 shrink-0"
                      style={{ backgroundColor: opt.hex }}
                    />
                    <span className="truncate text-[11px] sm:text-xs font-medium">
                      {opt.name}
                    </span>
                  </div>
                  {accentColor === opt.hex && (
                    <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 ml-1" />
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-white flex items-center space-x-1.5">
                <Type className="w-4 h-4 text-sky-400" />
                <span>Layout & Code Typography Scale</span>
              </label>
              <span className="text-xs font-mono text-sky-400 font-bold">
                {fontSize}px
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {[12, 13, 14, 16, 18].map((size) => (
                <Button
                  key={size}
                  variant={fontSize === size ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setFontSize(size);
                    document.documentElement.style.setProperty(
                      "--app-font-size",
                      `${size}px`,
                    );
                    document.documentElement.style.fontSize = `${size}px`;
                    toast.success(`Typography scale set to ${size}px`);
                  }}
                  className={`w-full font-mono text-[11px] sm:text-xs rounded-xl h-8 sm:h-9 cursor-pointer px-1 sm:px-2 ${
                    fontSize === size
                      ? "bg-sky-500 hover:bg-sky-400 text-black font-bold shadow-md shadow-sky-500/20"
                      : "bg-[#141518] border-[#272932] hover:bg-[#20222a] text-zinc-300"
                  }`}
                >
                  {size}px
                </Button>
              ))}
            </div>
          </div>

          {/* Zero-G Mode */}
          {setAntigravityMode && (
            <div className="flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-[#141518] border border-[#272932]">
              <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">
                    Zero-Gravity Simulation
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1 sm:line-clamp-none">
                    Floating elements and gravity physics
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  const next = !antigravityMode;
                  setAntigravityMode(next);
                  if (next) toast.warning("Zero Gravity Mode Activated!");
                  else toast.info("Gravity restored.");
                }}
                className={`text-xs font-bold rounded-lg cursor-pointer shrink-0 h-8 sm:h-9 px-2.5 sm:px-3 ${
                  antigravityMode
                    ? "bg-amber-500 hover:bg-amber-400 text-black shadow-md shadow-amber-500/20"
                    : "bg-[#252834] text-zinc-300 hover:bg-[#303342]"
                }`}
              >
                {antigravityMode ? "Enabled" : "Disabled"}
              </Button>
            </div>
          )}

          {/* AI Engine Status */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#141518] border border-[#272932] space-y-1.5">
            <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
              <span className="font-mono text-sky-300 text-xs flex items-center space-x-2 min-w-0">
                <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-semibold truncate">
                  Gemini 3.7 Flash & 2.5 Pro
                </span>
              </span>
              <Badge
                variant="outline"
                className="text-[9px] bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shrink-0"
              >
                Online
              </Badge>
            </div>
            <div className="text-[11px] text-zinc-400 leading-relaxed">
              Connected to server-side Google GenAI SDK for live questions about
              Lee Ryan Garcia.
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 sm:p-6 pt-3 pb-5 sm:pb-6 border-t border-[#272932]/60 shrink-0 bg-[#18191e]/95 backdrop-blur-xs flex flex-row justify-end">
          <Button
            onClick={() => {
              onClose();
              toast.success("Preferences applied!");
            }}
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs rounded-xl shadow-md cursor-pointer h-9 sm:h-10 px-5"
          >
            Apply & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
