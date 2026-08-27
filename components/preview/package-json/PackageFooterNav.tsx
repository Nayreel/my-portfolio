"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface PackageFooterNavProps {
  onSwitchToFile?: (fileId: string) => void;
}

export function PackageFooterNav({ onSwitchToFile }: PackageFooterNavProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#14151e] border border-zinc-800 text-xs gap-3">
      <div className="text-zinc-400">
        Looking for IDE workspace settings, accent themes, or AI parameters?
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          onClick={() => onSwitchToFile && onSwitchToFile("config.ts")}
          className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs cursor-pointer"
        >
          Open config.ts
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSwitchToFile && onSwitchToFile("bio.tsx")}
          className="border-zinc-700 text-zinc-300 hover:text-white text-xs cursor-pointer"
        >
          Developer Profile
        </Button>
      </div>
    </div>
  );
}
