"use client";

import React from "react";
import { Bot, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

interface ConfigAICopilotCardProps {
  onOpenAIQuery?: (query: string) => void;
}

export function ConfigAICopilotCard({ onOpenAIQuery }: ConfigAICopilotCardProps) {
  return (
    <Card className="bg-[#12131a] border-zinc-800">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-purple-400" /> AI Copilot Configuration
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Parameters and capabilities for the integrated portfolio intelligent assistant
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
            <span className="text-zinc-500 block text-[11px]">Provider</span>
            <span className="text-white font-medium mt-0.5 block">
              Google AI Studio
            </span>
          </div>
          <div className="bg-[#161722] p-3 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 block text-[11px]">Temperature</span>
            <span className="text-emerald-400 font-mono font-medium mt-0.5 block">
              0.7 (Balanced)
            </span>
          </div>
          <div className="bg-[#161722] p-3 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 block text-[11px]">Streaming Response</span>
            <span className="text-sky-400 font-medium mt-0.5 block">
              Enabled (Real-time)
            </span>
          </div>
          <div className="bg-[#161722] p-3 rounded-lg border border-zinc-800">
            <span className="text-zinc-500 block text-[11px]">Response Mode</span>
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
            <span className="text-xs text-zinc-400">Try quick questions:</span>
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
  );
}
