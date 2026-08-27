"use client";

import React from "react";
import { Blocks, Layers, Workflow, Server, Bot } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BioWhatICanBuildSection() {
  if (!DEVELOPER_PROFILE.whatICanBuild || DEVELOPER_PROFILE.whatICanBuild.length === 0) {
    return null;
  }

  const getBuildIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 1:
        return <Workflow className="w-4 h-4 text-sky-400" />;
      case 2:
        return <Server className="w-4 h-4 text-sky-400" />;
      default:
        return <Bot className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2 text-white">
          <Blocks className="w-4 h-4 text-sky-400" />
          <span>What I Can Build</span>
        </h2>
        <span className="text-xs text-zinc-500 font-mono hidden sm:inline-block">
          Full-Lifecycle Solutions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEVELOPER_PROFILE.whatICanBuild.map((item, idx) => (
          <Card
            key={idx}
            className="bg-[#16171b] border-[#272930] hover:border-sky-500/30 transition-all group"
          >
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center space-x-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-md bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                  {getBuildIcon(idx)}
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </CardTitle>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-[#20222a] border border-[#2e313b] text-[11px] font-mono text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
