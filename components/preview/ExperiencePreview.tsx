"use client";

import React from "react";
import { Briefcase, GraduationCap, Award, Check } from "lucide-react";
import { EXPERIENCES, DEVELOPER_PROFILE, CONFERENCES } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ExperiencePreview() {
  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-4xl mx-auto space-y-8 p-6 lg:p-10">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Work Experience & Impact
          </h1>
        </div>

        {/* Timeline */}
        <div className="space-y-6 relative border-l-2 border-[#2a2c35] pl-6 ml-3">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#18191e] border-2 border-sky-400 group-hover:scale-125 transition-transform" />

              <Card className="bg-[#16171b] border-[#272930] p-6 space-y-4 hover:border-sky-500/40 transition-colors text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <div className="text-sm font-medium text-sky-400 flex items-center space-x-2">
                      <span>{exp.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs text-zinc-400">{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className="text-xs font-mono bg-[#20222a] text-zinc-300 border-[#2d303d]"
                    >
                      {exp.period}
                    </Badge>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="text-[10px] font-mono bg-[#20222a] text-sky-300/90 border border-[#2d303d]"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Education Card */}
        <Card className="bg-[#16171b] border-[#272930] p-6 space-y-4 text-white">
          <h2 className="text-lg font-bold flex items-center space-x-2 text-white">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>Education</span>
          </h2>

          {DEVELOPER_PROFILE.education.map((edu, i) => (
            <div
              key={i}
              className="space-y-2 border-t border-[#252830] pt-3 first:border-0 first:pt-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-zinc-200">{edu.school}</h4>
                  <p className="text-xs text-sky-400 font-mono">{edu.degree}</p>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs font-mono text-zinc-300 border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                >
                  {edu.honors}
                </Badge>
              </div>
              <div className="text-xs text-zinc-400 space-y-1">
                <p><strong>Capstone:</strong> {edu.capstone}</p>
                <p><strong>Relevant Coursework:</strong> {edu.coursework}</p>
                <p className="text-zinc-500 font-mono text-[11px]">{edu.period} • {edu.location}</p>
              </div>
            </div>
          ))}
        </Card>

        {/* Conferences & Competitions Card */}
        <Card className="bg-[#16171b] border-[#272930] p-6 space-y-4 text-white">
          <h2 className="text-lg font-bold flex items-center space-x-2 text-white">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Conferences & Pitching Competitions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CONFERENCES.slice(0, 4).map((conf) => (
              <div
                key={conf.id}
                className="p-4 rounded-xl bg-[#121214] border border-[#252830] space-y-2"
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
