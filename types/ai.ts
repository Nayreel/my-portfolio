// types/ai.ts

export interface ChatMessageSnippet {
  lang: string;
  code: string;
}

export interface ChatMessageFileChanges {
  filesCount: number;
  additions: number;
  deletions: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  duration?: string;
  codeSnippet?: ChatMessageSnippet;
  fileChanges?: ChatMessageFileChanges;
}
