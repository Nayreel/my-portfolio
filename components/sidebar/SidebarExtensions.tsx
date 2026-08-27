"use client";

import React, { useState } from "react";
import {
  Puzzle,
  Search,
  Star,
  Download,
  Settings,
  Check,
  Zap,
  Atom,
  Database,
  GitBranch,
  FileCode2,
  Sparkles,
  X,
  Layers,
} from "lucide-react";
import { EXTENSIONS_CATALOG } from "@/data/sidebarData";
import { ExtensionItem, ExtensionCategory } from "@/types/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarExtensionsProps {
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
  onClose?: () => void;
}

export function SidebarExtensions({
  antigravityMode,
  setAntigravityMode,
  onClose,
}: SidebarExtensionsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Installed" | "Recommended">("All");
  const [extensions, setExtensions] = useState<ExtensionItem[]>(EXTENSIONS_CATALOG);

  const toggleExtensionState = (extId: string) => {
    if (extId === "antigravity-physics-engine") {
      // Toggle physics mode live in portfolio
      setAntigravityMode((prev) => !prev);
    }

    setExtensions((prev) =>
      prev.map((ext) => {
        if (ext.id === extId) {
          if (!ext.isInstalled) {
            return { ...ext, isInstalled: true, isEnabled: true };
          }
          return { ...ext, isEnabled: !ext.isEnabled };
        }
        return ext;
      }),
    );
  };

  const getExtensionIcon = (iconType: ExtensionItem["iconType"]) => {
    switch (iconType) {
      case "physics":
        return <Zap className="w-5 h-5 text-amber-400" />;
      case "ai":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "react":
        return <Atom className="w-5 h-5 text-cyan-400" />;
      case "tailwind":
        return <span className="font-bold text-sky-400 text-xs font-mono">TW</span>;
      case "typescript":
        return <span className="font-bold text-blue-400 text-xs font-mono">TS</span>;
      case "database":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "git":
        return <GitBranch className="w-5 h-5 text-orange-400" />;
      case "prettier":
        return <FileCode2 className="w-5 h-5 text-pink-400" />;
      case "eslint":
        return <span className="font-bold text-indigo-400 text-xs font-mono">ES</span>;
      default:
        return <Puzzle className="w-5 h-5 text-sky-400" />;
    }
  };

  const filteredExtensions = extensions.filter((ext) => {
    const matchesSearch =
      ext.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === "Installed") {
      return ext.isInstalled;
    }
    if (selectedCategory === "Recommended") {
      return ext.isInstalled === false || ext.rating >= 4.9;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-[#181818] border-r border-[#2d2d2d] text-zinc-300 select-none text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d2d2d] shrink-0 bg-[#1f1f1f]">
        <div className="flex items-center space-x-2">
          <Puzzle className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold tracking-wider text-[11px] uppercase text-zinc-200">
            Extensions
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {onClose && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-[#2d2d2d]"
              title="Close Extensions"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-3 border-b border-[#282828] space-y-2 bg-[#161616] shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-zinc-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Extensions in Marketplace..."
            className="h-7 text-xs bg-[#1f1f1f] border-[#3c3c3c] focus-visible:ring-1 focus-visible:ring-sky-500 pl-8 pr-2.5 text-zinc-200 placeholder:text-zinc-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1">
          {(["All", "Installed", "Recommended"] as const).map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "secondary" : "outline"}
              size="xs"
              onClick={() => setSelectedCategory(cat)}
              className={`h-5 px-2 py-0 text-[10px] font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
                  : "bg-[#222] text-zinc-400 hover:text-zinc-200 border-[#333]"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Extensions List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {filteredExtensions.length === 0 ? (
            <div className="px-4 py-8 text-center text-zinc-500">
              <p className="text-xs">No extensions found matching &ldquo;{searchQuery}&rdquo;</p>
            </div>
          ) : (
            filteredExtensions.map((ext) => {
              // Special status for physics engine
              const isPhysicsExt = ext.id === "antigravity-physics-engine";
              const isEnabled = isPhysicsExt ? antigravityMode : ext.isEnabled;

              return (
                <div
                  key={ext.id}
                  className="p-2.5 rounded-md bg-[#1d1d1d] border border-[#2c2c2c] hover:border-[#3d3d3d] transition-all group"
                >
                  <div className="flex items-start space-x-2.5">
                    {/* Icon frame */}
                    <div className="w-8 h-8 rounded bg-[#272727] border border-[#383838] flex items-center justify-center shrink-0">
                      {getExtensionIcon(ext.iconType)}
                    </div>

                    {/* Metadata & Description */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-zinc-200 truncate text-xs group-hover:text-sky-300 transition-colors">
                          {ext.displayName}
                        </h4>
                        <span className="font-mono text-[9px] text-zinc-500">
                          v{ext.version}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5 leading-snug">
                        {ext.description}
                      </p>

                      {/* Publisher & Stats */}
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#272727] text-[10px] text-zinc-500">
                        <span className="truncate max-w-[90px]">{ext.publisher}</span>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center space-x-0.5 text-amber-400">
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                            <span>{ext.rating}</span>
                          </span>
                          <span className="flex items-center space-x-0.5">
                            <Download className="w-2.5 h-2.5 text-zinc-500" />
                            <span>{ext.installs}</span>
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between mt-2 pt-1">
                        <div className="flex flex-wrap gap-1">
                          {ext.tags.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] bg-[#252525] text-zinc-400 px-1 py-0.2 rounded border border-[#333]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <Button
                          size="sm"
                          onClick={() => toggleExtensionState(ext.id)}
                          className={`h-6 text-[10px] px-2 py-0 font-medium ${
                            isEnabled
                              ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                              : "bg-sky-600 hover:bg-sky-500 text-white"
                          }`}
                        >
                          {isEnabled ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
