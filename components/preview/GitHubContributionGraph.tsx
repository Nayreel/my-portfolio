"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GithubIcon } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  GitHubContributionDay,
  GitHubContributionsResponse,
} from "@/types/github";
import { ArrowUpRight, ChevronDown, ExternalLink } from "lucide-react";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const COLOR_MAP: Record<number, string> = {
  0: "bg-[#161b22] border border-[#30363d]/40",
  1: "bg-[#0e4429] border border-[#0e4429]",
  2: "bg-[#006d32] border border-[#006d32]",
  3: "bg-[#26a641] border border-[#26a641]",
  4: "bg-[#39d353] border border-[#39d353]",
};

interface WeekColumn {
  days: (GitHubContributionDay | null)[];
  monthLabel?: string;
}

export function GitHubContributionGraph() {
  const [selectedYear] = useState<string>("last");
  const [data, setData] = useState<GitHubContributionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchContributions = async () => {
      try {
        const res = await fetch(`/api/github/contributions?year=${selectedYear}`);
        if (!res.ok) {
          if (isMounted) setIsLoading(false);
          return;
        }
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          if (isMounted) setIsLoading(false);
          return;
        }
        const json: GitHubContributionsResponse = await res.json();
        if (isMounted) {
          setData(json);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error fetching contributions:", err);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchContributions();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  // Organize days into weeks (columns)
  const weeks = useMemo(() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return [];
    }

    const cols: WeekColumn[] = [];
    let currentWeek: (GitHubContributionDay | null)[] = [];
    let lastMonth = -1;

    // Fill initial empty days in first week if first contribution day is not Sunday (0)
    const firstDate = new Date(data.contributions[0].date);
    const firstDayOfWeek = firstDate.getDay(); // 0 is Sun, 1 is Mon...

    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    data.contributions.forEach((day) => {
      const d = new Date(day.date);
      const month = d.getMonth();

      let monthLabel: string | undefined = undefined;
      if (month !== lastMonth && currentWeek.length === 0) {
        monthLabel = MONTH_NAMES[month];
        lastMonth = month;
      } else if (
        month !== lastMonth &&
        currentWeek.length > 0 &&
        cols.length > 0
      ) {
        lastMonth = month;
      }

      currentWeek.push(day);

      if (currentWeek.length === 7) {
        cols.push({
          days: currentWeek,
          monthLabel,
        });
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      cols.push({ days: currentWeek });
    }

    // Assign month labels across weeks logically
    let prevMonth = -1;
    cols.forEach((col) => {
      const firstValidDay = col.days.find((d) => d !== null);
      if (firstValidDay) {
        const d = new Date(firstValidDay.date);
        const m = d.getMonth();
        if (m !== prevMonth) {
          col.monthLabel = MONTH_NAMES[m];
          prevMonth = m;
        }
      }
    });

    return cols;
  }, [data]);

  const displayTotal = data?.totalContributions?.toLocaleString() || "3,693";
  const displayYearText =
    selectedYear === "last" ? "in the last year" : `in ${selectedYear}`;

  return (
    <div className="w-full space-y-3 font-sans">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-medium text-white tracking-tight">
          <span className="font-semibold">{displayTotal}</span> contributions{" "}
          <span className="text-zinc-400">{displayYearText}</span>
        </h2>
      </div>

      {/* Main Container: Heatmap Card + Year Buttons */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Heatmap Card with shadcn ScrollArea */}
        <div className="flex-1 w-full bg-[#0d1117] border border-[#30363d] rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <div className="h-44 flex flex-col items-center justify-center space-y-3 p-4 sm:p-5">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-zinc-400 font-mono">
                Fetching GitHub contribution matrix...
              </p>
            </div>
          ) : (
            <ScrollArea className="w-full">
              <div className="p-4 sm:p-5 min-w-[740px] select-none">
                {/* Month Labels */}
                <div className="flex text-[11px] text-[#7d8590] mb-2 pl-8 font-mono">
                  {weeks.map((week, idx) => (
                    <div
                      key={idx}
                      className="w-[13px] mr-[3px] text-left text-[11px]"
                    >
                      {week.monthLabel && idx % 4 === 0 ? week.monthLabel : ""}
                    </div>
                  ))}
                </div>

                {/* Grid: Day Labels + Week Columns */}
                <div className="flex items-start">
                  {/* Day of Week Labels (Mon, Wed, Fri) */}
                  <div className="flex flex-col justify-between h-[109px] text-[10px] text-[#7d8590] pr-2 font-mono py-[1px]">
                    <span className="h-[11px] leading-[11px] opacity-0">
                      Sun
                    </span>
                    <span className="h-[11px] leading-[11px]">Mon</span>
                    <span className="h-[11px] leading-[11px] opacity-0">
                      Tue
                    </span>
                    <span className="h-[11px] leading-[11px]">Wed</span>
                    <span className="h-[11px] leading-[11px] opacity-0">
                      Thu
                    </span>
                    <span className="h-[11px] leading-[11px]">Fri</span>
                    <span className="h-[11px] leading-[11px] opacity-0">
                      Sat
                    </span>
                  </div>

                  {/* Week Columns */}
                  <div className="flex gap-[3px]">
                    {weeks.map((week, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-[3px]">
                        {week.days.map((day, rowIdx) => {
                          if (!day) {
                            return (
                              <div
                                key={rowIdx}
                                className="w-[11px] h-[11px] rounded-[2px] opacity-0"
                              />
                            );
                          }

                          const colorClass =
                            COLOR_MAP[day.level] || COLOR_MAP[0];
                          const dateFormatted = new Date(
                            day.date,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          });

                          return (
                            <Tooltip key={day.date}>
                              <TooltipTrigger>
                                <a
                                  href="https://github.com/Nayreel"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`w-[11px] h-[11px] rounded-[2px] ${colorClass} transition-transform hover:scale-125 cursor-pointer block`}
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-[#1f242c] text-white text-xs border border-[#30363d] px-2.5 py-1.5 shadow-xl font-mono"
                              >
                                <span className="font-semibold text-emerald-400">
                                  {day.count === 0
                                    ? "No contributions"
                                    : `${day.count} ${
                                        day.count === 1
                                          ? "contribution"
                                          : "contributions"
                                      }`}
                                </span>{" "}
                                on {dateFormatted}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-4 pt-3 flex flex-wrap items-center justify-between text-xs text-[#7d8590] border-t border-[#21262d] font-mono">
                  <a
                    href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Learn how we count contributions</span>
                  </a>

                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      <span className="w-[11px] h-[11px] rounded-[2px] bg-[#161b22] border border-[#30363d]/40" />
                      <span className="w-[11px] h-[11px] rounded-[2px] bg-[#0e4429]" />
                      <span className="w-[11px] h-[11px] rounded-[2px] bg-[#006d32]" />
                      <span className="w-[11px] h-[11px] rounded-[2px] bg-[#26a641]" />
                      <span className="w-[11px] h-[11px] rounded-[2px] bg-[#39d353]" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>
              <ScrollBar
                orientation="horizontal"
                className="h-2 bg-[#12151b]/40 hover:bg-[#1a1e27]"
              />
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}
