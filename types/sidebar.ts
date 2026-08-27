// types/sidebar.ts
import { PreviewType } from "./ide";

export interface SearchMatch {
  lineNumber: number;
  lineContent: string;
  previewSnippet: string;
}

export interface SearchResultFileGroup {
  fileId: string;
  fileName: string;
  filePath: string;
  previewType: PreviewType;
  matches: SearchMatch[];
}

export type GitFileStatus = "M" | "A" | "D" | "U";

export interface GitChangeFile {
  id: string;
  fileName: string;
  filePath: string;
  folderDisplay?: string;
  status: GitFileStatus;
  changeCountDisplay?: string;
  staged: boolean;
  additions: number;
  deletions: number;
  previewType: PreviewType;
}

export interface GitCommitRecord {
  hash: string;
  message: string;
  author: string;
  timeAgo: string;
  branch: string;
  filesChangedCount: number;
  isHead?: boolean;
  cloudSynced?: boolean;
}

export interface DebugVariableItem {
  id: string;
  name: string;
  value: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  children?: DebugVariableItem[];
}

export interface DebugWatchExpression {
  id: string;
  expression: string;
  value: string;
  type: string;
}

export interface DebugBreakpointItem {
  id: string;
  fileName: string;
  lineNumber: number;
  enabled: boolean;
  fileId: string;
}

export interface DebugCallStackFrame {
  id: string;
  functionName: string;
  fileName: string;
  lineNumber: number;
}

export interface DebugConfiguration {
  id: string;
  name: string;
  type: string;
  description: string;
}

export type ExtensionCategory = "All" | "Themes & UI" | "Languages" | "Linters" | "AI & Tools";

export interface ExtensionItem {
  id: string;
  name: string;
  displayName: string;
  publisher: string;
  version: string;
  description: string;
  iconType: "react" | "tailwind" | "physics" | "ai" | "typescript" | "database" | "git" | "prettier" | "eslint";
  rating: number;
  reviewCount: number;
  installs: string;
  category: ExtensionCategory;
  isInstalled: boolean;
  isEnabled: boolean;
  isBuiltin?: boolean;
  tags: string[];
}
