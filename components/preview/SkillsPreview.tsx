"use client";

import React from "react";
import { Cpu } from "lucide-react";
import { SKILL_CATEGORIES } from "@/data";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SkillsPreview() {
  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-4xl mx-auto space-y-8 p-6 lg:p-10">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering Matrix</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Skill Proficiency & Technologies
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <Card
              key={idx}
              className="bg-[#16171b] border-[#272930] p-6 space-y-4 text-white"
            >
              <h3 className="font-bold text-base text-zinc-200 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>{cat.category}</span>
              </h3>

              <div className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-200 font-mono font-medium flex items-center space-x-1.5">
                        <span>{skill.name}</span>
                        {skill.favorite && (
                          <span
                            className="text-amber-400 text-[10px]"
                            title="Flagship Favorite"
                          >
                            ★
                          </span>
                        )}
                      </span>
                      <span className="text-zinc-400 font-mono">
                        {skill.experience}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1.5 bg-[#252830] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
