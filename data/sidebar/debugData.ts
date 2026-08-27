// data/sidebar/debugData.ts
import {
  DebugVariableItem,
  DebugWatchExpression,
  DebugBreakpointItem,
  DebugCallStackFrame,
  DebugConfiguration,
} from "@/types/sidebar";

export const DEBUG_CONFIGURATIONS: DebugConfiguration[] = [
  {
    id: "launch-portfolio",
    name: "Launch Portfolio (Next.js 15 App Router)",
    type: "pwa-node",
    description: "Launch Next.js dev server with server-side rendering and HMR.",
  },
  {
    id: "debug-profile-api",
    name: "Inspect Profile & Career API",
    type: "node-terminal",
    description: "Inspect live profile states, experience data, and contact dispatch.",
  },
  {
    id: "run-jest-tests",
    name: "Run Component & Unit Test Suite",
    type: "node",
    description: "Run automated Jest & React Testing Library test suites.",
  },
];

export const INITIAL_DEBUG_VARIABLES: DebugVariableItem[] = [
  {
    id: "v-developer",
    name: "developer",
    value: '"Lee Ryan Garcia"',
    type: "string",
  },
  {
    id: "v-role",
    name: "title",
    value: '"Full-Stack Software Engineer & AI Builder"',
    type: "string",
  },
  {
    id: "v-status",
    name: "availability",
    value: '"Open for Opportunities (Full-time / High Impact)"',
    type: "string",
  },
  {
    id: "v-exp",
    name: "yearsOfExperience",
    value: "4",
    type: "number",
  },
  {
    id: "v-runtime",
    name: "environment",
    value: "Object",
    type: "object",
    children: [
      {
        id: "v-runtime-node",
        name: "nodeVersion",
        value: '"v20.14.0"',
        type: "string",
      },
      {
        id: "v-runtime-framework",
        name: "framework",
        value: '"Next.js 15.2.0 (App Router)"',
        type: "string",
      },
      {
        id: "v-runtime-physics",
        name: "physicsEngine",
        value: "active",
        type: "boolean",
      },
      {
        id: "v-runtime-location",
        name: "location",
        value: '"Philippines • Open to Remote & Relocation"',
        type: "string",
      },
    ],
  },
  {
    id: "v-skills",
    name: "coreCompetencies",
    value: "Array(6)",
    type: "array",
    children: [
      { id: "s-0", name: "[0]", value: '"Next.js / React 19"', type: "string" },
      { id: "s-1", name: "[1]", value: '"TypeScript (Strict)"', type: "string" },
      { id: "s-2", name: "[2]", value: '"Node.js / Express / NestJS"', type: "string" },
      { id: "s-3", name: "[3]", value: '"PostgreSQL / Supabase / Redis"', type: "string" },
      { id: "s-4", name: "[4]", value: '"Docker / AWS / Cloud Architecture"', type: "string" },
      { id: "s-5", name: "[5]", value: '"AI Agents & LLM Integrations"', type: "string" },
    ],
  },
];

export const INITIAL_DEBUG_WATCH: DebugWatchExpression[] = [
  {
    id: "w-1",
    expression: "isReadyForHire",
    value: "true",
    type: "boolean",
  },
  {
    id: "w-2",
    expression: "portfolio.metrics.impact",
    value: '"300% API throughput increase"',
    type: "string",
  },
  {
    id: "w-3",
    expression: "awards.latinHonors",
    value: '"Cum Laude - BS Information Technology"',
    type: "string",
  },
];

export const INITIAL_DEBUG_BREAKPOINTS: DebugBreakpointItem[] = [
  {
    id: "bp-1",
    fileName: "bio.tsx",
    lineNumber: 18,
    enabled: true,
    fileId: "bio.tsx",
  },
  {
    id: "bp-2",
    fileName: "projects.tsx",
    lineNumber: 34,
    enabled: true,
    fileId: "projects.tsx",
  },
  {
    id: "bp-3",
    fileName: "get-in-touch.tsx",
    lineNumber: 22,
    enabled: false,
    fileId: "get-in-touch.tsx",
  },
];

export const INITIAL_DEBUG_CALLSTACK: DebugCallStackFrame[] = [
  {
    id: "cs-1",
    functionName: "renderPortfolioWorkspace",
    fileName: "app/page.tsx",
    lineNumber: 142,
  },
  {
    id: "cs-2",
    functionName: "loadDeveloperProfile",
    fileName: "lib/portfolioEngine.ts",
    lineNumber: 58,
  },
  {
    id: "cs-3",
    functionName: "initializeZeroGPhysics",
    fileName: "components/AntigravityPhysics.tsx",
    lineNumber: 24,
  },
];
