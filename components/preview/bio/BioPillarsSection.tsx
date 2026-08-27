"use client";

import React from "react";
import { Cpu, Layers, Workflow, Server } from "lucide-react";
import { DEVELOPER_PROFILE } from "@/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BioPillarsSection() {
  if (!DEVELOPER_PROFILE.pillars || DEVELOPER_PROFILE.pillars.length === 0) {
    return null;
  }

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-4 h-4 text-sky-400" />;
      case 1:
        return <Workflow className="w-4 h-4 text-sky-400" />;
      case 2:
        return <Server className="w-4 h-4 text-sky-400" />;
      default:
        return <Cpu className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg sm:text-xl font-bold flex items-center space-x-2 text-white">
        <Cpu className="w-4 h-4 text-sky-400" />
        <span>Core Engineering Pillars</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEVELOPER_PROFILE.pillars.map((pillar, idx) => (
          <Card
            key={idx}
            className="bg-[#16171b] border-[#272930] hover:border-sky-500/30 transition-colors"
          >
            <CardHeader className="p-5 pb-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono text-xs">
                    {pillar.number}
                  </div>
                  <div className="w-6 h-6 rounded-md bg-[#22242c] flex items-center justify-center">
                    {getPillarIcon(idx)}
                  </div>
                </div>
                <span className="text-[11px] font-mono text-sky-400 uppercase font-semibold">
                  {pillar.label}
                </span>
              </div>
              <CardTitle className="text-sm font-semibold text-white">
                {pillar.title}
              </CardTitle>
              <p className="text-[11px] font-mono text-zinc-500 pt-0.5">
                {pillar.tech}
              </p>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {pillar.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
