"use client";

import React, { useState, useMemo } from "react";
import {
  Cpu,
  Code2,
  Server,
  Bot,
  Wrench,
  Search,
  Star,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data";
import { SkillLevel } from "@/types/skills";
import { LEVEL_CONFIG } from "@/utils/skills";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Code2,
  Server,
  Bot,
  Wrench,
};


export function SkillsPreview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((cat) => {
      const filteredSkills = cat.skills.filter((skill) => {
        const matchesSearch =
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.level.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLevel =
          selectedLevel === "ALL" ||
          skill.level.toUpperCase() === selectedLevel.toUpperCase();
        return matchesSearch && matchesLevel;
      });
      return {
        ...cat,
        skills: filteredSkills,
      };
    }).filter((cat) => cat.skills.length > 0);
  }, [searchQuery, selectedLevel]);

  const totalFilteredSkills = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  }, [filteredCategories]);

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 p-3.5 sm:p-6 lg:p-10">
        {/* Header section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="inline-flex items-center space-x-1.5 text-xs text-amber-400 font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Engineering Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-100">
            Engineering Stack
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Technologies I use to design, build, integrate, and deploy reliable,
            full-stack web applications.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#16171b] border border-[#272930] p-4 rounded-xl">
          {/* Search input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Filter by tech (e.g., Next.js, n8n, PostgreSQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#1a1c23] border-[#272930] text-xs text-zinc-200 placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-sky-500"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white hover:bg-transparent h-6 w-6 cursor-pointer"
              >
                ✕
              </Button>
            )}
          </div>

          {/* Capability Level Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setSelectedLevel("ALL")}
              className={`text-xs px-2.5 py-1 h-auto rounded-md font-mono transition-colors cursor-pointer ${
                selectedLevel === "ALL"
                  ? "bg-zinc-200 text-zinc-950 font-semibold hover:bg-white hover:text-zinc-950"
                  : "bg-[#1a1c23] text-zinc-400 hover:text-white hover:bg-[#20222a] border border-[#272930]"
              }`}
            >
              ALL
            </Button>
            {(["Core", "Production", "Advanced", "Integration", "Working"] as SkillLevel[]).map(
              (lvl) => {
                const isSelected = selectedLevel === lvl.toUpperCase();
                return (
                  <Button
                    key={lvl}
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={() => setSelectedLevel(isSelected ? "ALL" : lvl.toUpperCase())}
                    className={`text-[11px] px-2 py-1 h-auto rounded-md font-mono transition-all flex items-center space-x-1.5 border cursor-pointer ${
                      isSelected
                        ? LEVEL_CONFIG[lvl].badgeClass + " ring-1 ring-white/20 font-bold hover:brightness-110"
                        : "bg-[#1a1c23] text-zinc-400 hover:text-zinc-200 hover:bg-[#20222a] border-[#272930]"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_CONFIG[lvl].dotClass}`} />
                    <span>{LEVEL_CONFIG[lvl].label}</span>
                  </Button>
                );
              }
            )}
          </div>
        </div>

        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#272930] rounded-xl space-y-3">
            <Search className="w-8 h-8 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 text-sm">
              No matching technologies found for &quot;{searchQuery}&quot;
            </p>
            <Button
              type="button"
              variant="link"
              size="xs"
              onClick={() => {
                setSearchQuery("");
                setSelectedLevel("ALL");
              }}
              className="text-xs text-sky-400 hover:underline cursor-pointer p-0 h-auto"
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCategories.map((cat, idx) => {
              const IconComponent = CATEGORY_ICONS[cat.icon] || Code2;
              return (
                <Card
                  key={idx}
                  className="bg-[#16171b] border-[#272930] p-5 space-y-4 text-white hover:border-[#383b47] transition-all"
                >
                  <div className="flex items-center justify-between border-b border-[#24262e] pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#20222a] border border-[#2e313b] flex items-center justify-center text-sky-400">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-zinc-100 tracking-wide">
                        {cat.category}
                      </h3>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-mono text-zinc-400 border-[#272930] bg-[#1a1c23]"
                    >
                      {cat.skills.length} {cat.skills.length === 1 ? "tech" : "techs"}
                    </Badge>
                  </div>

                  {/* Skills List in Card */}
                  <div className="grid grid-cols-1 gap-2">
                    {cat.skills.map((skill, sIdx) => {
                      const cfg = LEVEL_CONFIG[skill.level];
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1a1c22]/70 hover:bg-[#20222b] border border-transparent hover:border-[#2b2e38] transition-all group"
                        >
                          <div className="flex items-center space-x-2.5">
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dotClass}`}
                            />
                            <span className="text-xs font-mono font-medium text-zinc-200 group-hover:text-white transition-colors flex items-center space-x-1.5">
                              <span>{skill.name}</span>
                              {skill.favorite && (
                                <Star
                                  className="w-3 h-3 text-amber-400 fill-amber-400/30"
                                  aria-label="Core Flagship"
                                />
                              )}
                            </span>
                          </div>

                          <Badge
                            variant="outline"
                            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${cfg.badgeClass}`}
                          >
                            {cfg.label}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Footer info note */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-t border-[#202228] pt-4">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Showing {totalFilteredSkills} technologies in active stack</span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-zinc-400">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
            <span>= Flagship Stack</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
