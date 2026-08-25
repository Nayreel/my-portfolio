// types/skills.ts

export interface SkillItem {
  name: string;
  level: number; // 1 - 100
  experience: string;
  favorite?: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: SkillItem[];
}
