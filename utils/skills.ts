import { SkillLevel, SkillLevelConfig } from "@/types/skills";

export const LEVEL_CONFIG: Record<SkillLevel, SkillLevelConfig> = {
  Core: {
    label: "CORE",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    dotClass: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
    description: "Primary technologies & daily drivers",
  },
  Production: {
    label: "PRODUCTION",
    badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    dotClass: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]",
    description: "Shipped in production client apps",
  },
  Advanced: {
    label: "ADVANCED",
    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    dotClass: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]",
    description: "Deep implementation & workflow mastery",
  },
  Working: {
    label: "WORKING",
    badgeClass: "bg-zinc-500/15 text-zinc-300 border-zinc-500/30",
    dotClass: "bg-zinc-400",
    description: "Proficient & comfortable when needed",
  },
  Integration: {
    label: "INTEGRATION",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    dotClass: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
    description: "Platform APIs & connected ecosystems",
  },
};
