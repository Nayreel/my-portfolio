"use client";

import React from "react";
import { Wrench } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DEV_DEPENDENCIES = [
  { name: "typescript", version: "^5", role: "Strict Type System" },
  { name: "tailwindcss", version: "^4.3.3", role: "Utility CSS Engine" },
  {
    name: "@tailwindcss/postcss",
    version: "^4.3.3",
    role: "Tailwind PostCSS Plugin",
  },
  { name: "eslint", version: "^9", role: "Static Code Analysis" },
  { name: "eslint-config-next", version: "16.3.2", role: "Next.js Lint Rules" },
  { name: "@types/react", version: "^19", role: "React 19 Typings" },
  { name: "@types/react-dom", version: "^19", role: "DOM Typings" },
  { name: "@types/node", version: "^20", role: "Node Runtime Typings" },
  { name: "@types/nodemailer", version: "^8.0.1", role: "Nodemailer Typings" },
  {
    name: "@types/canvas-confetti",
    version: "^1.9.0",
    role: "Confetti Typings",
  },
];

export function PackageDevDepsList() {
  return (
    <Card className="bg-[#12131a] border-zinc-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-white flex items-center gap-2">
          <Wrench className="w-4 h-4 text-emerald-400" /> Development &amp; Tooling Packages
        </CardTitle>
        <CardDescription className="text-xs text-zinc-400">
          Compiler utilities, type definitions, linters, and build toolchains
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {DEV_DEPENDENCIES.map((dev) => (
            <div
              key={dev.name}
              className="bg-[#161722] border border-zinc-800/80 rounded-lg p-2.5 text-xs space-y-1"
            >
              <div className="font-mono font-medium text-white truncate">
                {dev.name}
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 truncate mr-1">{dev.role}</span>
                <span className="font-mono text-emerald-400 text-[10px] shrink-0">
                  {dev.version}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
