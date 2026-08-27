// data/projects.ts
import { Project } from "@/types/portfolio";
import { FEATURED_PROJECTS } from "./projects/featuredProjects";
import { OTHER_PROJECTS } from "./projects/otherProjects";

export const PROJECTS: Project[] = [...FEATURED_PROJECTS, ...OTHER_PROJECTS];
export const projects = PROJECTS;

export * from "./projects/featuredProjects";
export * from "./projects/otherProjects";
