"use client";

import React from "react";
import { Settings, CheckCircle2, Monitor, Bot, Terminal, FileCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ConfigHeaderCardProps {
  onSwitchToFile?: (fileId: string) => void;
}

export function ConfigHeaderCard({ onSwitchToFile }: ConfigHeaderCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950/30 to-indigo-950/40 border border-sky-500/20 p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                config.ts
                <Badge
                  variant="outline"
                  className="border-sky-500/40 text-sky-400 bg-sky-500/10 text-xs font-mono"
                >
                  portfolioConfig
                </Badge>
              </h1>
              <p className="text-xs text-zinc-400">
                Workspace preferences, editor typography, theme parameters,
                and AI assistant settings
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30 text-xs py-1">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Environment: Production
          </Badge>
          <Badge className="bg-sky-500/10 text-sky-300 border-sky-500/30 text-xs py-1">
            Version 2.0.0
          </Badge>
        </div>
      </div>

      {/* Quick Config Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">Developer / Owner</span>
          <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
            <Monitor className="w-3.5 h-3.5 text-sky-400" /> Lee Ryan M. Garcia
          </span>
        </div>
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">AI Model Engine</span>
          <span className="text-purple-400 font-semibold flex items-center gap-1.5 mt-0.5">
            <Bot className="w-3.5 h-3.5" /> Gemini 3.7 Flash
          </span>
        </div>
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">Interactive Shell</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
            <Terminal className="w-3.5 h-3.5" /> PowerShell / Bash Emulation
          </span>
        </div>
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">Code Base Meta</span>
          <Button
            type="button"
            variant="link"
            size="xs"
            onClick={() => onSwitchToFile && onSwitchToFile("package.json")}
            className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 mt-0.5 p-0 h-auto underline transition-colors cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" /> package.json &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
