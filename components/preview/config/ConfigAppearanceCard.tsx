"use client";

import React, { useState } from "react";
import { Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

const ACCENT_COLORS = [
  { name: "Cyan (Default)", hex: "#38bdf8", class: "bg-sky-400" },
  { name: "Emerald", hex: "#10b981", class: "bg-emerald-400" },
  { name: "Purple", hex: "#a855f7", class: "bg-purple-400" },
  { name: "Amber", hex: "#f59e0b", class: "bg-amber-400" },
  { name: "Rose", hex: "#f43f5e", class: "bg-rose-400" },
];

export function ConfigAppearanceCard() {
  const [selectedAccent, setSelectedAccent] = useState("#38bdf8");
  const [minimapEnabled, setMinimapEnabled] = useState(true);
  const [bracketPairColor, setBracketPairColor] = useState(true);

  const handleAccentChange = (hex: string, name: string) => {
    setSelectedAccent(hex);
    toast.success(`Theme accent preview updated to ${name}`);
  };

  return (
    <Card className="bg-[#12131a] border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-purple-400" /> Theme &amp; Editor Styling
        </CardTitle>
        <CardDescription className="text-xs text-zinc-400">
          Visual aesthetics, typography styling, and code editor preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Accent Color Picker */}
        <div>
          <span className="text-xs font-semibold text-zinc-300 block mb-2">
            Accent Color Palette
          </span>
          <div className="flex items-center gap-2">
            {ACCENT_COLORS.map((accent) => (
              <Button
                key={accent.hex}
                type="button"
                variant="ghost"
                size="xs"
                onClick={() => handleAccentChange(accent.hex, accent.name)}
                className={`h-8 flex-1 p-0 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                  selectedAccent === accent.hex
                    ? "border-white ring-2 ring-white/30 scale-105"
                    : "border-zinc-800 opacity-70 hover:opacity-100"
                } ${accent.class}`}
                title={accent.name}
              />
            ))}
          </div>
        </div>

        {/* Editor Parameters */}
        <div className="space-y-2 pt-1 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#161722] border border-zinc-800">
            <div>
              <span className="text-white block font-medium">Font Family</span>
              <span className="text-[11px] text-zinc-500 font-mono">
                JetBrains Mono, Fira Code
              </span>
            </div>
            <Badge variant="outline" className="font-mono text-zinc-400 text-[10px]">
              13px / 1.6
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#161722] border border-zinc-800">
            <div>
              <span className="text-white block font-medium">Minimap Preview</span>
              <span className="text-[11px] text-zinc-500">Render miniature code outline</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setMinimapEnabled(!minimapEnabled)}
              className={`px-2.5 py-1 h-auto rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                minimapEnabled
                  ? "bg-sky-500 text-black hover:bg-sky-400 hover:text-black"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {minimapEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#161722] border border-zinc-800">
            <div>
              <span className="text-white block font-medium">Bracket Pair Colorization</span>
              <span className="text-[11px] text-zinc-500">Highlight matching bracket pairs</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setBracketPairColor(!bracketPairColor)}
              className={`px-2.5 py-1 h-auto rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                bracketPairColor
                  ? "bg-purple-500 text-white hover:bg-purple-400 hover:text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {bracketPairColor ? "Enabled" : "Disabled"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
