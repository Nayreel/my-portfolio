// types/ide.ts

export type PreviewType =
  | "bio"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "resume"
  | "config"
  | "package";

export interface PortfolioFileMetadata {
  lines?: number;
  size?: string;
  lastModified?: string;
}

export interface PortfolioFile {
  id: string;
  name: string;
  path: string;
  folder: string;
  icon: string;
  language: string;
  description: string;
  code: string;
  previewType: PreviewType;
  metadata?: PortfolioFileMetadata;
}

export interface TerminalCommandHelp {
  cmd: string;
  desc: string;
}

export type ActiveSidebarView =
  | "explorer"
  | "search"
  | "git"
  | "source-control"
  | "debug"
  | "extensions"
  | "none";
export type ViewMode = "preview" | "code" | "split";
export type IDEThemeMode =
  | "nebula"
  | "abyss"
  | "cyberpunk"
  | "matrix"
  | "solar";
