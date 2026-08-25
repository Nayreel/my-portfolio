"use client";

import React, { useState } from "react";
import { Zap, Flame, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";

interface PlaygroundPreviewProps {
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

export function PlaygroundPreview({
  antigravityMode,
  setAntigravityMode,
}: PlaygroundPreviewProps) {
  const [miniGameScore, setMiniGameScore] = useState(0);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-3xl mx-auto space-y-8 p-6 lg:p-10">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Sandbox</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Antigravity Physics & Easter Eggs
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zero-G Toggle Card */}
          <Card className="p-6 bg-[#16171b] border-[#272930] space-y-4 text-white">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg font-bold text-white">
              Zero Gravity Physics Engine
            </CardTitle>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Experience the Google Antigravity simulation! When enabled, UI
              elements float and drift smoothly across the workspace.
            </p>

            <Button
              onClick={() => {
                const next = !antigravityMode;
                setAntigravityMode(next);
                if (next) toast.warning("Zero Gravity Mode Activated!");
                else toast.info("Gravity restored.");
              }}
              className={`w-full text-xs font-bold transition-all ${
                antigravityMode
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/30"
                  : "bg-[#252830] hover:bg-[#2e323d] text-amber-300 border border-amber-500/30"
              }`}
            >
              {antigravityMode
                ? "🚀 Zero-G Mode Active (Click to Land)"
                : "🚀 Ignite Zero-G Mode"}
            </Button>
          </Card>

          {/* Bug Hunter Mini Game */}
          <Card className="p-6 bg-[#16171b] border-[#272930] space-y-4 text-white">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-white">
                Bug Hunter Minigame
              </CardTitle>
              <Badge
                variant="outline"
                className="text-xs font-mono text-sky-400 border-sky-500/30"
              >
                Score: {miniGameScore}
              </Badge>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Click the elusive memory-leak bug to optimize system latency!
            </p>

            <div className="h-28 bg-[#121214] border border-[#272930] rounded-xl relative flex items-center justify-center overflow-hidden">
              <Button
                onClick={() => {
                  setMiniGameScore((s) => s + 1);
                  toast.success(`Bug eliminated! Latency reduced by 12ms`, {
                    description: `Total score: ${miniGameScore + 1}`,
                  });
                  triggerConfetti();
                }}
                className="bg-rose-500 hover:bg-rose-400 text-white font-mono text-xs font-bold transition-transform hover:scale-110 shadow-lg"
              >
                🐛 Fix Bug (-12ms)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
