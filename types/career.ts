// types/career.ts

export interface Experience {
  id?: number;
  role: string;
  title?: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  desc?: string;
  technologies: string[];
  logoText: string;
  badgeColor: string;
  thumbnail?: string;
  className?: string;
}

export interface ExperienceRecord {
  company: string;
  role: string;
  period: string;
  impact: string[];
}
