"use client";

import React, { useState } from "react";
import {
  Package,
  Copy,
  Check,
  Layers,
  Terminal,
  Cpu,
  Wrench,
  ShieldCheck,
  Search,
  Code2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";

interface PackageJsonPreviewProps {
  onSwitchToFile?: (fileId: string) => void;
}

interface ScriptItem {
  name: string;
  command: string;
  description: string;
  category: "development" | "build" | "quality";
}

interface DependencyItem {
  name: string;
  version: string;
  description: string;
  category: "Framework" | "UI & Components" | "Animation & FX" | "Utilities";
}

const SCRIPTS: ScriptItem[] = [
  {
    name: "dev",
    command: "next dev",
    description: "Start development server on localhost:3000 with Turbopack fast refresh",
    category: "development",
  },
  {
    name: "build",
    command: "next build",
    description: "Compile and optimize production bundle with static & SSR generation",
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
    description: "Run Next.js ESLint and strict type-safety verification",
    category: "quality",
  },
  {
    name: "typecheck",
    command: "tsc --noEmit",
    description: "Verify TypeScript strict mode without compiling output files",
    category: "quality",
  },
];

const DEPENDENCIES: DependencyItem[] = [
  {
    name: "next",
    version: "^16.3.2",
    description: "React framework with App Router, Server Components & Image Optimization",
    category: "Framework",
  },
  {
    name: "react",
    version: "^19.2.8",
    description: "Core UI library with Actions, Compiler & Concurrent features",
    category: "Framework",
  },
  {
    name: "react-dom",
    version: "^19.2.8",
    description: "DOM rendering and client-side hydration engine",
    category: "Framework",
  },
  {
    name: "lucide-react",
    version: "^1.34.0",
    description: "High-performance SVG icon collection for IDE & UI components",
    category: "UI & Components",
  },
  {
    name: "react-resizable-panels",
    version: "^4.12.3",
    description: "Accessible, responsive multi-panel layout system for IDE split views",
    category: "UI & Components",
  },
  {
    name: "shadcn",
    version: "^4.19.0",
    description: "Radix UI & Tailwind-based accessible design primitives",
    category: "UI & Components",
  },
  {
    name: "motion",
    version: "^13.1.1",
    description: "Declarative spring physics and layout animation engine",
    category: "Animation & FX",
  },
  {
    name: "canvas-confetti",
    version: "^1.9.4",
    description: "Interactive particle confetti generator for milestone triggers",
    category: "Animation & FX",
  },
  {
    name: "tailwind-merge",
    version: "^3.6.0",
    description: "Utility function to cleanly merge Tailwind CSS classes dynamically",
    category: "Utilities",
  },
  {
    name: "sonner",
    version: "^2.0.7",
    description: "Minimalist, stackable notification toast system",
    category: "UI & Components",
  },
];

const DEV_DEPENDENCIES = [
  { name: "typescript", version: "^5.9.3", role: "Strict Type System" },
  { name: "@types/node", version: "^20.0.0", role: "Node Runtime Typings" },
  { name: "@types/react", version: "^19.0.0", role: "React 19 Typings" },
  { name: "@types/react-dom", version: "^19.0.0", role: "DOM Typings" },
  { name: "tailwindcss", version: "^4.0.0", role: "Utility CSS Engine" },
  { name: "eslint", version: "^9.0.0", role: "Static Code Analysis" },
  { name: "eslint-config-next", version: "^16.3.2", role: "Next.js Lint Rules" },
];

export function PackageJsonPreview({ onSwitchToFile }: PackageJsonPreviewProps) {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "dependencies" | "scripts" | "devDeps">("all");

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(label);
    toast.success(`Copied: ${text}`);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const filteredDependencies = DEPENDENCIES.filter(
    (dep) =>
      dep.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dep.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dep.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <ScrollArea className="flex-1 w-full bg-[#0d0e12] text-zinc-200 min-h-0">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Module */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-slate-900/60 border border-blue-500/20 p-6 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    lee-ryan-garcia-portfolio
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs font-mono">
                      v2.0.0
                    </Badge>
                  </h1>
                  <p className="text-xs text-zinc-400">
                    Interactive IDE developer portfolio application for Lee Ryan M. Garcia
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-sky-500/10 text-sky-300 border-sky-500/30 text-xs py-1">
                Next.js 16 (App Router)
              </Badge>
              <Badge className="bg-purple-500/10 text-purple-300 border-purple-500/30 text-xs py-1">
                React 19.2
              </Badge>
              <Badge className="bg-emerald-500/10 text-emerald-300 border-emerald-500/30 text-xs py-1">
                TypeScript Strict
              </Badge>
              <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/30 text-xs py-1">
                MIT License
              </Badge>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">Runtime Environment</span>
              <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" /> Node.js &amp; Edge
              </span>
            </div>
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">Production Dependencies</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 10 Optimized Packages
              </span>
            </div>
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">Scripts Configured</span>
              <span className="text-purple-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <Terminal className="w-3.5 h-3.5" /> 5 NPM Commands
              </span>
            </div>
            <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
              <span className="text-zinc-500 block text-[11px]">Workspace Config</span>
              <button
                onClick={() => onSwitchToFile && onSwitchToFile("config.ts")}
                className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 mt-0.5 underline transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" /> config.ts &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection and Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-1.5 bg-[#14151b] p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "all" ? "bg-sky-500 text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("dependencies")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "dependencies" ? "bg-sky-500 text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Dependencies ({DEPENDENCIES.length})
            </button>
            <button
              onClick={() => setActiveTab("scripts")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "scripts" ? "bg-sky-500 text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Scripts ({SCRIPTS.length})
            </button>
            <button
              onClick={() => setActiveTab("devDeps")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "devDeps" ? "bg-sky-500 text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              Dev Tools ({DEV_DEPENDENCIES.length})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-[#14151b] border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* NPM Scripts Section */}
        {(activeTab === "all" || activeTab === "scripts") && (
          <Card className="bg-[#12131a] border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-purple-400" /> NPM Execution Scripts
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400">
                    CLI commands to run, build, test, and lint the portfolio repository
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-[10px]">
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
                      <span className="font-mono text-sm font-bold text-sky-400">{script.name}</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono px-1.5 py-0.5 bg-zinc-800/80 rounded">
                        {script.category}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(`npm run ${script.name}`, script.name)}
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
                    <span className="text-[10px] text-zinc-500">&rarr; {script.command}</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-normal">{script.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Dependencies Section */}
        {(activeTab === "all" || activeTab === "dependencies") && (
          <Card className="bg-[#12131a] border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" /> Core Dependencies
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400">
                    Production libraries powering UI components, animation, styling, and interactions
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-sky-500/30 text-sky-400 text-[10px]">
                  {filteredDependencies.length} Packages
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredDependencies.map((dep) => (
                  <div
                    key={dep.name}
                    className="bg-[#161722] hover:bg-[#1b1c2b] border border-zinc-800/80 hover:border-sky-500/40 rounded-xl p-3.5 transition-all flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-bold text-white tracking-wide">
                          {dep.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-sky-500/10 text-sky-300 font-mono text-[10px] px-1.5 py-0 border-sky-500/20"
                        >
                          {dep.version}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-medium block mb-1.5">
                        {dep.category}
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                        {dep.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* DevDependencies Section */}
        {(activeTab === "all" || activeTab === "devDeps") && (
          <Card className="bg-[#12131a] border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400" /> Development &amp; Tooling Packages
              </CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Compiler utilities, type definitions, linters, and build toolchains
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {DEV_DEPENDENCIES.map((dev) => (
                  <div
                    key={dev.name}
                    className="bg-[#161722] border border-zinc-800/80 rounded-lg p-2.5 text-xs space-y-1"
                  >
                    <div className="font-mono font-medium text-white truncate">{dev.name}</div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-zinc-500">{dev.role}</span>
                      <span className="font-mono text-emerald-400 text-[10px]">{dev.version}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#14151e] border border-zinc-800 text-xs gap-3">
          <div className="text-zinc-400">
            Looking for IDE runtime settings, accent themes, or AI parameters?
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={() => onSwitchToFile && onSwitchToFile("config.ts")}
              className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs"
            >
              Open config.ts
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSwitchToFile && onSwitchToFile("bio.tsx")}
              className="border-zinc-700 text-zinc-300 hover:text-white text-xs"
            >
              Developer Profile
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
