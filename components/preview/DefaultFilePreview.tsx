"use client";

import React from "react";
import { Code2 } from "lucide-react";
import { PortfolioFile } from "@/data";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DefaultFilePreviewProps {
  file: PortfolioFile;
  onSwitchToFile: (fileId: string) => void;
}

export function DefaultFilePreview({ file, onSwitchToFile }: DefaultFilePreviewProps) {
  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="min-h-full p-6 lg:p-10 flex items-center justify-center">
        <Card className="max-w-md bg-[#16171b] border-[#272930] text-center p-6 space-y-4 text-white">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
            <Code2 className="w-6 h-6" />
          </div>
          <CardTitle className="text-xl font-bold text-white">
            {file.name}
          </CardTitle>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {file.description}
          </p>
          <Button
            onClick={() => onSwitchToFile("bio.tsx")}
            className="bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs"
          >
            Return to Developer Bio
          </Button>
        </Card>
      </div>
    </ScrollArea>
  );
}
