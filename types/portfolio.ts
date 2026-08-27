// types/portfolio.ts

export type ProjectCategory =
  | "All"
  | "Web & Automation"
  | "Client Work"
  | "Personal & Capstone";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface WhatICanBuildItem {
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
}

export interface EngineeringPillar {
  number: string;
  label: string;
  title: string;
  tech: string;
  description: string;
}

export interface Project {
  id: string | number;
  title: string;
  tagline: string;
  description: string;
  des?: string;
  category: ProjectCategory;
  tags: string[];
  metrics: ProjectMetric[];
  featured: boolean;
  githubUrl?: string;
  liveUrl: string;
  link?: string;
  img?: string;
  iconLists?: string[];
  stars: number;
  forks: number;
  highlightCode: string;
  demoComponent?: string;
  imageColor: string;
  accent: string;
  problem?: string;
  solution?: string;
  architectureStack?: string[];
  whatISolved?: string[];
  businessImpact?: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  period: string;
  honors: string;
  capstone: string;
  coursework: string;
}

export interface DeveloperPhilosophy {
  firstPrinciples?: string;
  automationFirst?: string;
  craftsmanship?: string;
  architecture?: string;
  reliability?: string;
}

export interface DeveloperContact {
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface DeveloperProfile {
  name: string;
  title: string;
  handle: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter?: string;
  location: string;
  status: string;
  bio: string;
  resumePdfUrl?: string;
  avatarUrl?: string;
  stats: { label: string; value: string }[];
  education: EducationItem[];
  philosophy?: DeveloperPhilosophy;
  highlights?: string[];
  contact?: DeveloperContact;
  whatICanBuild?: WhatICanBuildItem[];
  pillars?: EngineeringPillar[];
}

export interface Conference {
  id: number;
  title: string;
  des: string;
  date: string;
  img?: string;
}

export interface SocialMedia {
  id: number;
  img: string;
  link?: string;
}
