"use client";

import React, { useState } from "react";
import {
  Sliders,
  Settings,
  Palette,
  Bot,
  Terminal,
  Cpu,
  Zap,
  CheckCircle2,
  Monitor,
  FileCode,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";

interface ConfigPreviewProps {
  onSwitchToFile?: (fileId: string) => void;
  onOpenAIQuery?: (query: string) => void;
}

const ACCENT_COLORS = [
  { name: "Cyan (Default)", hex: "#38bdf8", class: "bg-sky-400" },
  { name: "Emerald", hex: "#10b981", class: "bg-emerald-400" },
  { name: "Purple", hex: "#a855f7", class: "bg-purple-400" },
  { name: "Amber", hex: "#f59e0b", class: "bg-amber-400" },
  { name: "Rose", hex: "#f43f5e", class: "bg-rose-400" },
];

const AI_CAPABILITIES = [
  {
    title: "Code Explanation",
    desc: "Provides architectural breakdown of React & Next.js components",
  },
  {
    title: "Project Deep-Dive",
    desc: "Explains full-stack architecture of AI Energy Shop, Feedback Fusion & Iontana",
  },
  {
    title: "Tech Stack Analysis",
    desc: "Inspects frontend, backend, databases, n8n automations & cloud services",
  },
  {
    title: "Career & Resume Queries",
    desc: "Summarizes employment history, collegiate honors (Cum Laude), and research awards",
  },
  {
    title: "Direct Dispatch",
    desc: "Helps visitors draft inquiries and direct email messages",
  },
];

export function ConfigPreview({
  onSwitchToFile,
  onOpenAIQuery,
}: ConfigPreviewProps) {
  const [selectedAccent, setSelectedAccent] = useState("#38bdf8");
  const [minimapEnabled, setMinimapEnabled] = useState(true);
  const [bracketPairColor, setBracketPairColor] = useState(true);
  const [smoothScroll, setSmoothScroll] = useState(true);

  const handleAccentChange = (hex: string, name: string) => {
    setSelectedAccent(hex);
    toast.success(`Theme accent preview updated to ${name}`);
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#0d0e12] text-zinc-200 min-h-0">
      <div className="max-w-5xl mx-auto p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Header Module */}
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
                <CheckCircle2 className="w-3 h-3 mr-1" /> Environment:
                Production
              </Badge>
              <Badge className="bg-sky-500/10 text-sky-300 border-sky-500/30 text-xs py-1">
                Version 2.0.0
              </Badge>
            </div>
          </div>

          {/* Quick Config Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">
                Developer / Owner
              </span>
              <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                <Monitor className="w-3.5 h-3.5 text-sky-400" /> Lee Ryan M.
                Garcia
              </span>
            </div>
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">
                AI Model Engine
              </span>
              <span className="text-purple-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <Bot className="w-3.5 h-3.5" /> Gemini 3.7 Flash
              </span>
            </div>
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">
                Interactive Shell
              </span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <Terminal className="w-3.5 h-3.5" /> PowerShell / Bash Emulation
              </span>
            </div>
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">
                Code Base Meta
              </span>
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

        {/* Section 1: Workspace & Editor System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Workspace Settings */}
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
                      <Terminal className="w-3.5 h-3.5 text-emerald-400" />{" "}
                      Terminal Shell
                    </span>
                    <Badge className="bg-emerald-500/20 text-emerald-300 text-[10px] py-0">
                      ON
                    </Badge>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#161722] border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-purple-400" /> AI
                      Assistant
                    </span>
                    <Badge className="bg-purple-500/20 text-purple-300 text-[10px] py-0">
                      ACTIVE
                    </Badge>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#161722] border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Zero-G
                      Engine
                    </span>
                    <Badge className="bg-amber-500/20 text-amber-300 text-[10px] py-0">
                      READY
                    </Badge>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#161722] border border-zinc-800 flex items-center justify-between">
                    <span className="text-zinc-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-sky-400" /> Git
                      Contribution
                    </span>
                    <Badge className="bg-sky-500/20 text-sky-300 text-[10px] py-0">
                      SYNCED
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editor & Appearance */}
          <Card className="bg-[#12131a] border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-purple-400" /> Theme &amp;
                Editor Styling
              </CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Visual aesthetics, typography styling, and code editor
                preferences
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
                      onClick={() =>
                        handleAccentChange(accent.hex, accent.name)
                      }
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
                    <span className="text-white block font-medium">
                      Font Family
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      JetBrains Mono, Fira Code
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-zinc-400 text-[10px]"
                  >
                    13px / 1.6
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#161722] border border-zinc-800">
                  <div>
                    <span className="text-white block font-medium">
                      Minimap Preview
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Render miniature code outline
                    </span>
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
                    <span className="text-white block font-medium">
                      Bracket Pair Colorization
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Highlight matching bracket pairs
                    </span>
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
        </div>

        {/* Section 2: AI Assistant Configuration */}
        <Card className="bg-[#12131a] border-zinc-800">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base text-white flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-400" /> AI Copilot
                  Configuration
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Parameters and capabilities for the integrated portfolio
                  intelligent assistant
                </CardDescription>
              </div>
              <Badge className="bg-purple-500/10 text-purple-300 border-purple-500/30 font-mono text-xs w-fit">
                model: gemini-3.7-flash
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Model Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-[#161722] p-3 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[11px]">
                  Provider
                </span>
                <span className="text-white font-medium mt-0.5 block">
                  Google AI Studio
                </span>
              </div>
              <div className="bg-[#161722] p-3 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[11px]">
                  Temperature
                </span>
                <span className="text-emerald-400 font-mono font-medium mt-0.5 block">
                  0.7 (Balanced)
                </span>
              </div>
              <div className="bg-[#161722] p-3 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[11px]">
                  Streaming Response
                </span>
                <span className="text-sky-400 font-medium mt-0.5 block">
                  Enabled (Real-time)
                </span>
              </div>
              <div className="bg-[#161722] p-3 rounded-lg border border-zinc-800">
                <span className="text-zinc-500 block text-[11px]">
                  Response Mode
                </span>
                <span className="text-purple-400 font-medium mt-0.5 block">
                  Interactive Chat
                </span>
              </div>
            </div>

            {/* Capabilities List */}
            <div>
              <span className="text-xs font-semibold text-zinc-300 block mb-2.5">
                Integrated Assistant Capabilities
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {AI_CAPABILITIES.map((cap) => (
                  <div
                    key={cap.title}
                    className="bg-[#161722] border border-zinc-800/80 rounded-xl p-3 space-y-1 hover:border-purple-500/30 transition-all"
                  >
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-purple-400" />
                      {cap.title}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask AI Quick Prompt */}
            {onOpenAIQuery && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-400">
                  Try quick questions:
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() =>
                    onOpenAIQuery(
                      "Tell me about Lee Ryan's experience building automated workflows",
                    )
                  }
                  className="px-2.5 py-1 h-auto rounded-md bg-[#1a1c2a] hover:bg-[#202236] border border-purple-500/30 text-purple-300 text-xs transition-colors cursor-pointer"
                >
                  &ldquo;Tell me about workflow automations&rdquo; &rarr;
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="xs"
                  onClick={() =>
                    onOpenAIQuery(
                      "What projects has Lee Ryan deployed to production?",
                    )
                  }
                  className="px-2.5 py-1 h-auto rounded-md bg-[#1a1c2a] hover:bg-[#202236] border border-sky-500/30 text-sky-300 text-xs transition-colors cursor-pointer"
                >
                  &ldquo;What projects are deployed?&rdquo; &rarr;
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#14151e] border border-zinc-800 text-xs gap-3">
          <div className="text-zinc-400">
            Ready to explore projects, technical skills, or send an inquiry?
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => onSwitchToFile && onSwitchToFile("projects.tsx")}
              className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs"
            >
              View Projects
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onSwitchToFile && onSwitchToFile("get-in-touch.tsx")
              }
              className="border-zinc-700 text-zinc-300 hover:text-white text-xs"
            >
              Contact Lee Ryan
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
