"use client";

import React from "react";
import { Package, Globe, ShieldCheck, Terminal, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PackageHeaderCardProps {
  dependenciesCount: number;
  scriptsCount: number;
  onSwitchToFile?: (fileId: string) => void;
}

export function PackageHeaderCard({
  dependenciesCount,
  scriptsCount,
  onSwitchToFile,
}: PackageHeaderCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-slate-900/60 border border-blue-500/20 p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                lee-ryan-garcia-portfolio
                <Badge
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-xs font-mono"
                >
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
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">Runtime Environment</span>
          <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" /> Modern Web Browsers
          </span>
        </div>
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">Production Dependencies</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5" /> {dependenciesCount} Packages
          </span>
        </div>
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">Scripts Configured</span>
          <span className="text-purple-400 font-semibold flex items-center gap-1.5 mt-0.5">
            <Terminal className="w-3.5 h-3.5" /> {scriptsCount} NPM Commands
          </span>
        </div>
        <div className="bg-[#12131a]/80 p-3 rounded-lg border border-white/5">
          <span className="text-zinc-500 block text-[11px]">Workspace Config</span>
          <Button
            type="button"
            variant="link"
            size="xs"
            onClick={() => onSwitchToFile && onSwitchToFile("config.ts")}
            className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 mt-0.5 p-0 h-auto underline transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" /> config.ts &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
