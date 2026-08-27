"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfigHeaderCard } from "./config/ConfigHeaderCard";
import { ConfigWorkspaceSettingsCard } from "./config/ConfigWorkspaceSettingsCard";
import { ConfigAppearanceCard } from "./config/ConfigAppearanceCard";
import { ConfigAICopilotCard } from "./config/ConfigAICopilotCard";
import { ConfigFooterNav } from "./config/ConfigFooterNav";

interface ConfigPreviewProps {
  onSwitchToFile?: (fileId: string) => void;
  onOpenAIQuery?: (query: string) => void;
}

export function ConfigPreview({
  onSwitchToFile,
  onOpenAIQuery,
}: ConfigPreviewProps) {
  return (
    <ScrollArea className="flex-1 w-full bg-[#0d0e12] text-zinc-200 min-h-0">
      <div className="max-w-6xl mx-auto p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Header Module */}
        <ConfigHeaderCard onSwitchToFile={onSwitchToFile} />

        {/* Section 1: Workspace & Editor System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConfigWorkspaceSettingsCard />
          <ConfigAppearanceCard />
        </div>

        {/* Section 2: AI Assistant Configuration */}
        <ConfigAICopilotCard onOpenAIQuery={onOpenAIQuery} />

        {/* Footer Navigation */}
        <ConfigFooterNav onSwitchToFile={onSwitchToFile} />
      </div>
    </ScrollArea>
  );
}
