"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  FileCode,
  FolderGit2,
  Briefcase,
  Cpu,
  Mail,
  FileText,
  Terminal,
  Zap,
  Copy,
  Download,
  BookOpen,
} from "lucide-react";
import { downloadResumePdf } from "@/lib/download";
import { PORTFOLIO_FILES, DEVELOPER_PROFILE, PortfolioFile } from "@/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";
import confetti from "canvas-confetti";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFile: (file: PortfolioFile) => void;
  onToggleTerminal: () => void;
  onToggleAI: () => void;
  onOpenShortcuts?: () => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectFile,
  onToggleTerminal,
  onToggleAI,
  onOpenShortcuts,
  antigravityMode,
  setAntigravityMode,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleClose = () => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  const actions = [
    {
      id: "file-bio",
      title: "Open bio.tsx",
      subtitle: "About Lee Ryan Garcia, engineering pillars, and background",
      icon: FileCode,
      category: "Files",
      action: () => {
        const f = PORTFOLIO_FILES.find((x) => x.id === "bio.tsx");
        if (f) onSelectFile(f);
      },
    },
    {
      id: "file-projects",
      title: "Open featured-projects.tsx",
      subtitle: "AI Energy Shop, Feedback Fusion, Iontana, Narra Tree & more",
      icon: FolderGit2,
      category: "Files",
      action: () => {
        const f = PORTFOLIO_FILES.find((x) => x.id === "projects.tsx");
        if (f) onSelectFile(f);
      },
    },
    {
      id: "file-experience",
      title: "Open career-history.tsx",
      subtitle: "Software Engineer at JAV Resource, Buwelo & Hokei Subic",
      icon: Briefcase,
      category: "Files",
      action: () => {
        const f = PORTFOLIO_FILES.find((x) => x.id === "experience.tsx");
        if (f) onSelectFile(f);
      },
    },
    {
      id: "file-skills",
      title: "Open tech-stack.json",
      subtitle:
        "Next.js, TypeScript, n8n, MongoDB, PostgreSQL, Tailwind proficiencies",
      icon: Cpu,
      category: "Files",
      action: () => {
        const f = PORTFOLIO_FILES.find((x) => x.id === "tech-stack.json");
        if (f) onSelectFile(f);
      },
    },
    {
      id: "file-contact",
      title: "Open get-in-touch.tsx",
      subtitle: "Send direct message, schedule interview, or email",
      icon: Mail,
      category: "Files",
      action: () => {
        const f = PORTFOLIO_FILES.find((x) => x.id === "get-in-touch.tsx");
        if (f) onSelectFile(f);
      },
    },
    {
      id: "file-resume",
      title: "Open resume.md",
      subtitle: "Formal executive curriculum vitae and achievements",
      icon: FileText,
      category: "Files",
      action: () => {
        const f = PORTFOLIO_FILES.find((x) => x.id === "resume.md");
        if (f) onSelectFile(f);
      },
    },
    {
      id: "act-antigravity",
      title: antigravityMode
        ? "Disable Zero Gravity Physics"
        : "Enable Zero Gravity Physics Mode",
      subtitle: "Toggle floating physics animation across the IDE",
      icon: Zap,
      category: "Actions",
      action: () => {
        const next = !antigravityMode;
        setAntigravityMode(next);
        if (next) toast.warning("Zero Gravity Mode Activated!");
        else toast.info("Gravity restored.");
        confetti({ particleCount: 70 });
      },
    },
    {
      id: "act-ai",
      title: "Ask AI",
      subtitle: "Launch AI assistant panel",
      icon: Cpu,
      category: "Actions",
      action: () => onToggleAI(),
    },
    {
      id: "act-term",
      title: "Toggle Integrated Terminal",
      subtitle: "Open PowerShell / Bash runtime",
      icon: Terminal,
      category: "Actions",
      action: () => onToggleTerminal(),
    },
    {
      id: "act-copy-email",
      title: "Copy Email to Clipboard",
      subtitle: DEVELOPER_PROFILE.email,
      icon: Copy,
      category: "Actions",
      action: () => {
        navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
        toast.success("Email copied to clipboard", {
          description: DEVELOPER_PROFILE.email,
        });
      },
    },
    {
      id: "act-docs-shortcuts",
      title: "Documentation & Keyboard Shortcuts",
      subtitle: "View keybindings, terminal CLI reference, and IDE guide",
      icon: BookOpen,
      category: "Actions",
      action: () => {
        if (onOpenShortcuts) onOpenShortcuts();
      },
    },
    {
      id: "act-download-resume",
      title: "Download CV / Resume (PDF)",
      subtitle:
        "Download official Lee_Ryan_Garcia_Resume.pdf from public folder",
      icon: Download,
      category: "Actions",
      action: () => {
        const fileUrl =
          DEVELOPER_PROFILE.resumePdfUrl || "/Lee_Ryan_Garcia_Resume.pdf";
        const fileName =
          fileUrl.split("/").pop() || "Lee_Ryan_Garcia_Resume.pdf";
        confetti({ particleCount: 80, spread: 70 });
        toast.success("Downloading Resume...", {
          description: fileName,
        });
        downloadResumePdf(fileUrl, fileName);
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length),
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-20 px-2 sm:px-4 bg-black/60 backdrop-blur-sm select-none"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl max-h-[85dvh] bg-[#252526] border border-[#454545] rounded-xl shadow-2xl overflow-hidden text-xs text-[#cccccc] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-3 border-b border-[#333333] flex items-center space-x-2.5 bg-[#1f1f1f] shrink-0">
          <Search className="w-4 h-4 text-sky-400 shrink-0" />
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a file name, command, or action..."
            className="border-0 bg-transparent text-sm text-white placeholder-[#777777] focus-visible:ring-0 shadow-none font-mono p-0 h-auto"
          />
          <kbd className="text-[10px] bg-[#2a2a2a] text-[#888888] px-1.5 py-0.5 rounded border border-[#3c3c3c]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <ScrollArea className="h-72 w-full p-1.5 min-h-0">
          <div className="space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-6 text-center text-[#777777]">
                No matching files or commands found.
              </div>
            ) : (
              filtered.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      itemRefs.current[idx] = el;
                    }}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#094771] text-white"
                        : "hover:bg-[#2a2d2e] text-[#cccccc]"
                    }`}
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? "text-white" : "text-sky-400"
                        }`}
                      />
                      <div className="truncate">
                        <div className="font-medium text-xs truncate">
                          {item.title}
                        </div>
                        <div
                          className={`text-[11px] truncate ${
                            isSelected ? "text-sky-200" : "text-[#888888]"
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-mono shrink-0 ml-2 border-0 ${
                        isSelected
                          ? "bg-sky-400/20 text-white"
                          : "bg-[#2a2a2a] text-[#888888]"
                      }`}
                    >
                      {item.category}
                    </Badge>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        {/* Footer shortcuts helper */}
        <div className="px-3.5 py-2.5 bg-[#181818] border-t border-[#333333] flex items-center justify-between text-[11px] text-[#888888] shrink-0 select-none z-10">
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="inline-flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#2a2a2a] text-[#cccccc] border border-[#3c3c3c] rounded">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#2a2a2a] text-[#cccccc] border border-[#3c3c3c] rounded">
                ↵
              </kbd>
              <span>Select</span>
            </span>
            <span className="inline-flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#2a2a2a] text-[#cccccc] border border-[#3c3c3c] rounded">
                esc
              </kbd>
              <span>Close</span>
            </span>
          </div>

          <div className="text-[10px] text-zinc-500 font-mono">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </div>
        </div>
      </div>
    </div>
  );
}
