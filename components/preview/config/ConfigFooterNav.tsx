"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ConfigFooterNavProps {
  onSwitchToFile?: (fileId: string) => void;
}

export function ConfigFooterNav({ onSwitchToFile }: ConfigFooterNavProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#14151e] border border-zinc-800 text-xs gap-3">
      <div className="text-zinc-400">
        Ready to explore projects, technical skills, or send an inquiry?
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          onClick={() => onSwitchToFile && onSwitchToFile("projects.tsx")}
          className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs cursor-pointer"
        >
          View Projects
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onSwitchToFile && onSwitchToFile("get-in-touch.tsx")}
          className="border-zinc-700 text-zinc-300 hover:text-white text-xs cursor-pointer"
        >
          Contact Lee Ryan
        </Button>
      </div>
    </div>
  );
}
