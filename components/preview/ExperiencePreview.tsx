"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  Award,
  Check,
  Calendar,
  MapPin,
} from "lucide-react";
import { EXPERIENCES, DEVELOPER_PROFILE, CONFERENCES } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ExperiencePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Target the actual scrolling viewport inside the ScrollArea
    const viewport =
      container.querySelector<HTMLElement>(
        '[data-slot="scroll-area-viewport"]',
      ) || container;

    const calculateScroll = () => {
      if (!timelineRef.current || !viewport) return;
      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();

      // Trigger line fill as the timeline passes the center of the viewport
      const triggerPoint = viewportRect.top + viewportRect.height * 0.45;
      const currentPassed = triggerPoint - timelineRect.top;
      const totalHeight = timelineRect.height;

      const progress = Math.max(0, Math.min(1, currentPassed / totalHeight));
      setScrollProgress(progress);
    };

    viewport.addEventListener("scroll", calculateScroll, { passive: true });
    window.addEventListener("resize", calculateScroll, { passive: true });
    calculateScroll();

    return () => {
      viewport.removeEventListener("scroll", calculateScroll);
      window.removeEventListener("resize", calculateScroll);
    };
  }, []);

  return (
    <ScrollArea
      ref={containerRef}
      className="flex-1 w-full bg-[#121214] text-white min-h-0"
    >
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10 p-3.5 sm:p-6 lg:p-10">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Work Experience & Impact
          </h1>
        </div>

        {/* Scroll-Enhanced Timeline */}
        <div
          ref={timelineRef}
          className="relative pl-7 sm:pl-10 space-y-6 sm:space-y-8 select-none"
        >
          {/* Base Neutral Vertical Track Line */}
          <div className="absolute left-3.5 sm:left-5 top-6 bottom-6 w-[2px] -translate-x-1/2 bg-[#262833] rounded-full" />

          {/* Dynamic Illuminated Scroll Highlight Beam */}
          <div
            style={{
              height: `${Math.max(0, Math.min(100, scrollProgress * 100))}%`,
            }}
            className="absolute left-3.5 sm:left-5 top-6 w-[2px] -translate-x-1/2 bg-gradient-to-b from-sky-400 via-indigo-500 to-sky-300 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)] z-0 origin-top transition-all duration-100 ease-out"
          />

          {EXPERIENCES.map((exp, idx) => {
            // Milestone is activated once the fill progress reaches its relative position
            const itemThreshold = idx / Math.max(1, EXPERIENCES.length - 0.5);
            const isPassed = scrollProgress >= itemThreshold;

            return (
              <div key={idx} className="relative group">
                {/* Centered Node Circle */}
                <div className="absolute -left-7 sm:-left-10 top-6 sm:top-7 w-7 sm:w-10 flex items-center justify-center z-10 pointer-events-none">
                  <div
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isPassed
                        ? "bg-[#121214] border-2 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)] scale-110"
                        : "bg-[#16171b] border-2 border-[#383b48]"
                    } group-hover:scale-125`}
                  >
                    <div
                      className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors duration-300 ${
                        isPassed
                          ? "bg-sky-400 shadow-[0_0_6px_#38bdf8]"
                          : "bg-zinc-600"
                      } group-hover:bg-white`}
                    />
                  </div>
                </div>

                {/* Experience Card */}
                <Card
                  className={`bg-[#16171b] p-4 sm:p-6 space-y-3 sm:space-y-4 transition-all duration-300 text-white rounded-xl ${
                    isPassed
                      ? "border-[#384155] shadow-lg shadow-sky-500/5"
                      : "border-[#272930]"
                  } hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-sky-400 flex items-center space-x-2 mt-0.5">
                        <span>{exp.company}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-mono bg-[#20222a] border-[#2d303d] flex items-center gap-1.5 transition-colors ${
                          isPassed
                            ? "text-sky-300 border-sky-500/30"
                            : "text-zinc-300"
                        }`}
                      >
                        <Calendar className="w-3 h-3 text-sky-400" />
                        <span>{exp.period}</span>
                      </Badge>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2.5">
                        <Check
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors ${
                            isPassed ? "text-sky-400" : "text-zinc-500"
                          }`}
                        />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-[10px] font-mono bg-[#20222a] text-sky-300/90 border border-[#2d303d] hover:border-sky-500/30 transition-colors"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Education Card */}
        <Card className="bg-[#16171b] border-[#272930] p-4 sm:p-6 space-y-3 sm:space-y-4 text-white rounded-xl">
          <h2 className="text-base sm:text-lg font-bold flex items-center space-x-2 text-white">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Education</span>
          </h2>

          {DEVELOPER_PROFILE.education.map((edu, i) => (
            <div
              key={i}
              className="space-y-2 border-t border-[#252830] pt-4 first:border-0 first:pt-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-sm text-zinc-200">
                    {edu.school}
                  </h4>
                  <p className="text-xs text-sky-400 font-mono mt-0.5">
                    {edu.degree}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs font-mono text-emerald-300 border-emerald-500/40 bg-emerald-500/10 w-fit"
                >
                  {edu.honors}
                </Badge>
              </div>
              <div className="text-xs text-zinc-400 space-y-1.5 pt-1">
                <p>
                  <strong className="text-zinc-300">Capstone:</strong>{" "}
                  {edu.capstone}
                </p>
                <p>
                  <strong className="text-zinc-300">
                    Relevant Coursework:
                  </strong>{" "}
                  {edu.coursework}
                </p>
                <p className="text-zinc-500 font-mono text-[11px]">
                  {edu.period} • {edu.location}
                </p>
              </div>
            </div>
          ))}
        </Card>

        {/* Conferences & Competitions Card */}
        <Card className="bg-[#16171b] border-[#272930] p-4 sm:p-6 space-y-3 sm:space-y-4 text-white rounded-xl">
          <h2 className="text-lg font-bold flex items-center space-x-2 text-white">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Conferences & Pitching Competitions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONFERENCES.slice(0, 4).map((conf) => (
              <div
                key={conf.id}
                className="p-4 rounded-xl bg-[#121214] border border-[#252830] space-y-2 hover:border-[#383b48] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono text-amber-300 border-amber-500/30 bg-amber-500/10"
                  >
                    {conf.date}
                  </Badge>
                </div>
                <h4 className="font-semibold text-xs text-zinc-200 line-clamp-2">
                  {conf.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {conf.des}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
