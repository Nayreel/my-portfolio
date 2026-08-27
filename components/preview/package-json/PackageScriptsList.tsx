"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";
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

export interface ScriptItem {
  name: string;
  command: string;
  description: string;
  category: "development" | "build" | "quality";
}

export const SCRIPTS: ScriptItem[] = [
  {
    name: "dev",
    command: "next dev",
    description:
      "Start development server on localhost:3000 with Turbopack fast refresh",
    category: "development",
  },
  {
    name: "build",
    command: "next build",
    description:
      "Compile and optimize production bundle with static & SSR generation",
    category: "build",
  },
  {
    name: "start",
    command: "next start",
    description: "Run standalone production server instance",
    category: "build",
  },
  {
    name: "lint",
    command: "eslint",
    description:
      "Run ESLint code quality & type safety analysis across repository",
    category: "quality",
  },
];

export function PackageScriptsList() {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(label);
    toast.success(`Copied: ${text}`);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  return (
    <Card className="bg-[#12131a] border-zinc-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-400" /> NPM Execution Scripts
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              CLI commands to run, build, and lint the portfolio repository
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="border-purple-500/30 text-purple-400 text-[10px]"
          >
            package.json &gt; scripts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SCRIPTS.map((script) => (
          <div
            key={script.name}
            className="group bg-[#161722] hover:bg-[#1a1c2a] border border-zinc-800 hover:border-purple-500/40 rounded-xl p-3.5 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold text-sky-400">
                  {script.name}
                </span>
                <span className="text-[10px] text-zinc-500 uppercase font-mono px-1.5 py-0.5 bg-zinc-800/80 rounded">
                  {script.category}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  copyToClipboard(`npm run ${script.name}`, script.name)
                }
                className="h-7 px-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700/50"
              >
                {copiedScript === script.name ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>

            <div className="bg-[#0b0c10] px-2.5 py-1.5 rounded font-mono text-xs text-emerald-400 border border-zinc-800/80 flex items-center justify-between">
              <span>npm run {script.name}</span>
              <span className="text-[10px] text-zinc-500">
                &rarr; {script.command}
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-normal">
              {script.description}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
