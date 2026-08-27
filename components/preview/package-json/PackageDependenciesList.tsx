"use client";

import React from "react";
import { Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface DependencyItem {
  name: string;
  version: string;
  description: string;
  category: "Framework" | "UI & Components" | "Animation & FX" | "Utilities";
}

export const DEPENDENCIES: DependencyItem[] = [
  {
    name: "next",
    version: "16.3.2",
    description:
      "React framework with App Router, Server Components & SEO optimization",
    category: "Framework",
  },
  {
    name: "react",
    version: "19.2.8",
    description:
      "Core UI library with Actions, Compiler & Concurrent rendering",
    category: "Framework",
  },
  {
    name: "react-dom",
    version: "19.2.8",
    description: "DOM rendering and client-side hydration engine",
    category: "Framework",
  },
  {
    name: "@base-ui/react",
    version: "^1.7.0",
    description:
      "Accessible, unstyled UI component primitives for dialogs and menus",
    category: "UI & Components",
  },
  {
    name: "shadcn",
    version: "^4.19.0",
    description: "Accessible design component system built on Tailwind CSS",
    category: "UI & Components",
  },
  {
    name: "lucide-react",
    version: "^1.34.0",
    description: "Clean, customizable SVG icon set for modern web applications",
    category: "UI & Components",
  },
  {
    name: "react-resizable-panels",
    version: "^4.12.3",
    description: "Accessible multi-panel layout system for IDE split views",
    category: "UI & Components",
  },
  {
    name: "motion",
    version: "^13.1.1",
    description: "Declarative spring physics and layout animation engine",
    category: "Animation & FX",
  },
  {
    name: "canvas-confetti",
    version: "^1.9.4",
    description:
      "Interactive particle confetti generator for milestone triggers",
    category: "Animation & FX",
  },
  {
    name: "tw-animate-css",
    version: "^1.4.0",
    description: "Smooth CSS animation primitives for Tailwind CSS",
    category: "Animation & FX",
  },
  {
    name: "tailwind-merge",
    version: "^3.6.0",
    description:
      "Utility to merge Tailwind CSS classes dynamically without conflicts",
    category: "Utilities",
  },
  {
    name: "class-variance-authority",
    version: "^0.7.1",
    description: "Type-safe CSS variant composition and component styling",
    category: "Utilities",
  },
  {
    name: "clsx",
    version: "^2.1.1",
    description: "High-performance conditional className constructor utility",
    category: "Utilities",
  },
  {
    name: "zod",
    version: "^4.4.3",
    description:
      "TypeScript-first schema declaration and data validation library",
    category: "Utilities",
  },
  {
    name: "nodemailer",
    version: "^9.0.5",
    description: "Server-side email dispatch engine for contact form delivery",
    category: "Utilities",
  },
];

interface PackageDependenciesListProps {
  dependencies: DependencyItem[];
}

export function PackageDependenciesList({
  dependencies,
}: PackageDependenciesListProps) {
  return (
    <Card className="bg-[#12131a] border-zinc-800">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" /> Core Dependencies
            </CardTitle>
            <CardDescription className="text-xs text-zinc-400">
              Production libraries powering UI components, animation, styling, and interactions
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="border-sky-500/30 text-sky-400 text-[10px]"
          >
            {dependencies.length} Packages
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {dependencies.map((dep) => (
            <div
              key={dep.name}
              className="bg-[#161722] hover:bg-[#1b1c2b] border border-zinc-800/80 hover:border-sky-500/40 rounded-xl p-3.5 transition-all flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-white tracking-wide">
                    {dep.name}
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-sky-500/10 text-sky-300 font-mono text-[10px] px-1.5 py-0 border-sky-500/20"
                  >
                    {dep.version}
                  </Badge>
                </div>
                <span className="text-[10px] text-zinc-500 font-medium block mb-1.5">
                  {dep.category}
                </span>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                  {dep.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
