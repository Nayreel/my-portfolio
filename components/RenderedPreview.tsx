"use client";

import React from "react";
import { PortfolioFile } from "@/data";
import { BioPreview } from "@/components/preview/BioPreview";
import { ProjectsPreview } from "@/components/preview/ProjectsPreview";
import { ExperiencePreview } from "@/components/preview/ExperiencePreview";
import { SkillsPreview } from "@/components/preview/SkillsPreview";
import { ContactPreview } from "@/components/preview/ContactPreview";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { PackageJsonPreview } from "@/components/preview/PackageJsonPreview";
import { ConfigPreview } from "@/components/preview/ConfigPreview";
import { DefaultFilePreview } from "@/components/preview/DefaultFilePreview";

interface RenderedPreviewProps {
  activeFile: PortfolioFile;
  onSwitchToFile: (fileId: string) => void;
  onOpenAIQuery: (query: string) => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

export function RenderedPreview({
  activeFile,
  onSwitchToFile,
  onOpenAIQuery,
}: RenderedPreviewProps) {
  switch (activeFile.id) {
    case "bio.tsx":
      return (
        <BioPreview
          onSwitchToFile={onSwitchToFile}
          onOpenAIQuery={onOpenAIQuery}
        />
      );

    case "projects.tsx":
      return <ProjectsPreview onOpenAIQuery={onOpenAIQuery} />;

    case "experience.tsx":
      return <ExperiencePreview />;

    case "tech-stack.json":
      return <SkillsPreview />;

    case "get-in-touch.tsx":
      return <ContactPreview />;

    case "resume.md":
      return <ResumePreview />;

    case "package.json":
      return <PackageJsonPreview onSwitchToFile={onSwitchToFile} />;

    case "config.ts":
      return (
        <ConfigPreview
          onSwitchToFile={onSwitchToFile}
          onOpenAIQuery={onOpenAIQuery}
        />
      );

    default:
      return (
        <DefaultFilePreview file={activeFile} onSwitchToFile={onSwitchToFile} />
      );
  }
}
