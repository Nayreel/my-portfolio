export const CONFIG_CODE_SNIPPET = `export interface IDEConfig {
  workspace: {
    name: string;
    version: string;
    developer: string;
    role: string;
    environment: "production" | "development";
    liveUrl: string;
    repository: string;
  };
  theme: {
    defaultMode: string;
    accentColors: {
      cyan: string;
      emerald: string;
      purple: string;
      amber: string;
      rose: string;
    };
    editor: {
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
      tabSize: number;
      minimap: boolean;
      bracketPairColorization: boolean;
      smoothScrolling: boolean;
    };
  };
  features: {
    terminal: boolean;
    aiAssistant: boolean;
    gravityPhysics: boolean;
    gitStats: boolean;
    soundEffects: boolean;
  };
  aiAssistant: {
    provider: string;
    model: string;
    temperature: number;
    capabilities: string[];
  };
}

export const portfolioConfig: IDEConfig = {
  workspace: {
    name: "Portfolio IDE",
    version: "2.4.0-production",
    developer: "Lee Ryan M. Garcia",
    role: "Software Engineer | Full-Stack & Automation Developer",
    environment: "production",
    liveUrl: "https://leeryan.dev",
    repository: "https://github.com/Nayreel/my-portfolio",
  },
  theme: {
    defaultMode: "dark-nebula",
    accentColors: {
      cyan: "#38bdf8",
      emerald: "#10b981",
      purple: "#a855f7",
      amber: "#f59e0b",
      rose: "#f43f5e",
    },
    editor: {
      fontFamily: "JetBrains Mono, Fira Code, monospace",
      fontSize: 13,
      lineHeight: 1.6,
      tabSize: 2,
      minimap: true,
      bracketPairColorization: true,
      smoothScrolling: true,
    },
  },
  features: {
    terminal: true,
    aiAssistant: true,
    gravityPhysics: true,
    gitStats: true,
    soundEffects: false,
  },
  aiAssistant: {
    provider: "Google AI",
    model: "gemini-3.7-flash",
    temperature: 0.7,
    capabilities: [
      "code-explanation",
      "project-deepdive",
      "tech-stack-analysis",
      "career-and-resume-query",
      "direct-dispatch",
    ],
  },
};
`;
