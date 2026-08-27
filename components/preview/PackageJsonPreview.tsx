"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackageHeaderCard } from "./package-json/PackageHeaderCard";
import {
  PackageScriptsList,
  SCRIPTS,
} from "./package-json/PackageScriptsList";
import {
  PackageDependenciesList,
  DEPENDENCIES,
} from "./package-json/PackageDependenciesList";
import {
  PackageDevDepsList,
  DEV_DEPENDENCIES,
} from "./package-json/PackageDevDepsList";
import { PackageFooterNav } from "./package-json/PackageFooterNav";

interface PackageJsonPreviewProps {
  onSwitchToFile?: (fileId: string) => void;
}

export function PackageJsonPreview({
  onSwitchToFile,
}: PackageJsonPreviewProps) {
  const [searchFilter, setSearchFilter] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all" | "dependencies" | "scripts" | "devDeps"
  >("all");

  const filteredDependencies = DEPENDENCIES.filter(
    (dep) =>
      dep.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dep.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dep.category.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  return (
    <ScrollArea className="flex-1 w-full bg-[#0d0e12] text-zinc-200 min-h-0">
      <div className="max-w-6xl mx-auto p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Header Module */}
        <PackageHeaderCard
          dependenciesCount={DEPENDENCIES.length}
          scriptsCount={SCRIPTS.length}
          onSwitchToFile={onSwitchToFile}
        />

        {/* Tab Selection and Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-1.5 bg-[#14151b] p-1 rounded-lg border border-zinc-800 text-xs overflow-x-auto custom-scrollbar touch-pan-x max-w-full shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 h-auto rounded-md transition-colors shrink-0 cursor-pointer ${
                activeTab === "all"
                  ? "bg-sky-500 text-black font-semibold hover:bg-sky-400 hover:text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              Overview
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setActiveTab("dependencies")}
              className={`px-3 py-1 h-auto rounded-md transition-colors shrink-0 cursor-pointer ${
                activeTab === "dependencies"
                  ? "bg-sky-500 text-black font-semibold hover:bg-sky-400 hover:text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              Dependencies ({DEPENDENCIES.length})
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setActiveTab("scripts")}
              className={`px-3 py-1 h-auto rounded-md transition-colors shrink-0 cursor-pointer ${
                activeTab === "scripts"
                  ? "bg-sky-500 text-black font-semibold hover:bg-sky-400 hover:text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              Scripts ({SCRIPTS.length})
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => setActiveTab("devDeps")}
              className={`px-3 py-1 h-auto rounded-md transition-colors shrink-0 cursor-pointer ${
                activeTab === "devDeps"
                  ? "bg-sky-500 text-black font-semibold hover:bg-sky-400 hover:text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              Dev Tools ({DEV_DEPENDENCIES.length})
            </Button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-[#14151b] border border-zinc-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* NPM Scripts Section */}
        {(activeTab === "all" || activeTab === "scripts") && (
          <PackageScriptsList />
        )}

        {/* Dependencies Section */}
        {(activeTab === "all" || activeTab === "dependencies") && (
          <PackageDependenciesList dependencies={filteredDependencies} />
        )}

        {/* DevDependencies Section */}
        {(activeTab === "all" || activeTab === "devDeps") && (
          <PackageDevDepsList />
        )}

        {/* Footer Navigation */}
        <PackageFooterNav onSwitchToFile={onSwitchToFile} />
      </div>
    </ScrollArea>
  );
}
