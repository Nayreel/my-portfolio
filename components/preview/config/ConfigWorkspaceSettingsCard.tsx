"use client";

import React from "react";
import { Sliders, Terminal, Bot, Zap, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ConfigWorkspaceSettingsCard() {
  return (
    <Card className="bg-[#12131a] border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" /> Workspace Settings
        </CardTitle>
        <CardDescription className="text-xs text-zinc-400">
          Core runtime metadata and developer identity configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 rounded-xl bg-[#161722] border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Workspace Title</span>
            <span className="font-mono text-white font-medium">
              Portfolio IDE
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Primary Role</span>
            <span className="text-sky-400 font-medium">
              Full-Stack &amp; Automation Engineer
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Education</span>
            <span className="text-amber-400 font-medium">
              BSIT, Cum Laude (Gordon College)
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Live Repository</span>
            <a
              href="https://github.com/Nayreel/my-portfolio"
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 hover:underline font-mono"
            >
              Nayreel/my-portfolio
            </a>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-zinc-300 block">
            Workspace Capabilities
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#161722] border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" /> Terminal Shell
              </span>
              <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px] py-0">
                ON
              </Badge>
            </div>
            <div className="p-2.5 rounded-lg bg-[#161722] border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-purple-400" /> AI Assistant
              </span>
              <Badge className="bg-purple-500/20 text-purple-300 text-[10px] py-0">
                ACTIVE
              </Badge>
            </div>
            <div className="p-2.5 rounded-lg bg-[#161722] border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Zero-G Engine
              </span>
              <Badge className="bg-amber-500/20 text-amber-300 text-[10px] py-0">
                READY
              </Badge>
            </div>
            <div className="p-2.5 rounded-lg bg-[#161722] border border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400" /> Git Contribution
              </span>
              <Badge className="bg-sky-500/20 text-sky-300 text-[10px] py-0">
                SYNCED
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
