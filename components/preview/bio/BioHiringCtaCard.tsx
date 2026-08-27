"use client";

import React from "react";
import { Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BioHiringCtaCardProps {
  onSwitchToFile: (fileId: string) => void;
}

export function BioHiringCtaCard({ onSwitchToFile }: BioHiringCtaCardProps) {
  return (
    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-950/40 via-[#181a22] to-[#15161d] border border-sky-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
      <div className="space-y-1.5 max-w-xl">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Have a project or system that needs to be built?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          I can help with full-stack development, automation pipelines, API
          integrations, and reliable production deployment.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
        <Button
          onClick={() => onSwitchToFile("get-in-touch.tsx")}
          className="h-9 px-5 bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer"
        >
          <Briefcase className="w-4 h-4 shrink-0" />
          <span>Hire Me</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onSwitchToFile("projects.tsx")}
          className="h-9 px-4 bg-[#232630] hover:bg-[#2c303c] border-[#3a3f4e] text-white text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Explore Projects</span>
          <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
        </Button>
      </div>
    </div>
  );
}
