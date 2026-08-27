// types/skills.ts

export type SkillLevel =
  | "Core"
  | "Production"
  | "Advanced"
  | "Working"
  | "Integration";

export interface SkillItem {
  name: string;
  level: SkillLevel;
  favorite?: boolean;
}

export interface SkillLevelConfig {
  label: string;
  badgeClass: string;
  dotClass: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: SkillItem[];
}


