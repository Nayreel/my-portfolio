"use client";

import React, { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  DEVELOPER_PROFILE,
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
  CONFERENCES,
  TERMINAL_COMMANDS_HELP,
} from "@/data";
import { downloadResumePdf } from "@/lib/download";
import { TerminalLog } from "@/types/ide";

interface TerminalTabProps {
  onSelectFile?: (fileId: string) => void;
  antigravityMode: boolean;
  setAntigravityMode: (active: boolean | ((prev: boolean) => boolean)) => void;
}

export function TerminalTab({
  onSelectFile,
  antigravityMode,
  setAntigravityMode,
}: TerminalTabProps) {
  const [commandInput, setCommandInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    {
      type: "system",
      content:
        '⚡ Portfolio IDE [Version 2.0.0]\n(c) 2026 Lee Ryan Garcia. All systems operational.\nType "help" for a list of interactive commands or "projects" to view projects.',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLogs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = commandInput.trim();
    if (!rawCmd) return;

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const nextLogs: TerminalLog[] = [
      ...terminalLogs,
      {
        type: "input",
        content: `PS C:\\Portfolio\\LeeRyanGarcia> ${rawCmd}`,
      },
    ];
    const cmd = rawCmd.toLowerCase();

    if (cmd === "help") {
      const helpText = TERMINAL_COMMANDS_HELP.map(
        (h) => `  ${h.cmd.padEnd(20)} - ${h.desc}`,
      ).join("\n");
      nextLogs.push({
        type: "output",
        content: `Available IDE Portfolio Commands:\n${helpText}`,
      });
    } else if (cmd === "bio") {
      nextLogs.push({
        type: "output",
        content: `👤 ${DEVELOPER_PROFILE.name} - ${DEVELOPER_PROFILE.title}\n📍 ${DEVELOPER_PROFILE.location}\n✉️ ${DEVELOPER_PROFILE.email}\n${DEVELOPER_PROFILE.bio}`,
      });
      if (onSelectFile) onSelectFile("bio.tsx");
    } else if (cmd === "projects") {
      const pList = PROJECTS.map(
        (p) =>
          `🚀 ${p.title} (${p.category})\n   ${p.tagline}\n   Tech: ${p.tags.join(", ")}\n   Live: ${p.liveUrl}`,
      ).join("\n\n");
      nextLogs.push({ type: "output", content: `Projects:\n\n${pList}` });
      if (onSelectFile) onSelectFile("projects.tsx");
    } else if (cmd === "skills") {
      const sList = SKILL_CATEGORIES.map(
        (c) =>
          `[${c.category}]\n  ` +
          c.skills.map((s) => `${s.name} [${s.level}]`).join(", "),
      ).join("\n\n");
      nextLogs.push({ type: "output", content: `Engineering Stack:\n\n${sList}` });
      if (onSelectFile) onSelectFile("tech-stack.json");
    } else if (cmd === "experience") {
      const eList = EXPERIENCES.map(
        (e) => `💼 ${e.role} @ ${e.company} (${e.period})\n   ${e.highlights[0]}`,
      ).join("\n\n");
      nextLogs.push({ type: "output", content: `Career Timeline:\n\n${eList}` });
      if (onSelectFile) onSelectFile("experience.tsx");
    } else if (cmd === "conferences") {
      const cList = CONFERENCES.map(
        (c) => `🏆 ${c.title}\n   📅 ${c.date}\n   ${c.des}`,
      ).join("\n\n");
      nextLogs.push({
        type: "output",
        content: `Conferences & Pitching Competitions:\n\n${cList}`,
      });
      if (onSelectFile) onSelectFile("resume.md");
    } else if (cmd === "contact") {
      nextLogs.push({
        type: "output",
        content: `📬 Email: ${DEVELOPER_PROFILE.email}\n📞 Phone: ${DEVELOPER_PROFILE.phone}\n🌐 GitHub: ${DEVELOPER_PROFILE.github}\n💼 LinkedIn: ${DEVELOPER_PROFILE.linkedin}\n📍 Location: ${DEVELOPER_PROFILE.location}`,
      });
      if (onSelectFile) onSelectFile("get-in-touch.tsx");
    } else if (cmd === "cat resume.md" || cmd === "resume") {
      nextLogs.push({
        type: "output",
        content: `📄 Opening Lee Ryan Garcia Formal Curriculum Vitae (resume.md)...`,
      });
      if (onSelectFile) onSelectFile("resume.md");
    } else if (
      cmd.startsWith("download") &&
      (cmd.includes("resume") || cmd.includes("cv"))
    ) {
      const fileUrl =
        DEVELOPER_PROFILE.resumePdfUrl || "/Lee_Ryan_Garcia_Resume.pdf";
      const fileName = fileUrl.split("/").pop() || "Lee_Ryan_Garcia_Resume.pdf";
      downloadResumePdf(fileUrl, fileName);
      confetti({ particleCount: 80, spread: 70 });
      nextLogs.push({
        type: "output",
        content: `📥 Initiating download for ${fileName}...`,
      });
    } else if (
      cmd === "cat package.json" ||
      cmd === "package" ||
      cmd === "packages"
    ) {
      nextLogs.push({ type: "output", content: `📦 Opening package.json...` });
      if (onSelectFile) onSelectFile("package.json");
    } else if (
      cmd === "cat config.ts" ||
      cmd === "config" ||
      cmd === "settings"
    ) {
      nextLogs.push({ type: "output", content: `⚙️ Opening config.ts...` });
      if (onSelectFile) onSelectFile("config.ts");
    } else if (
      cmd.includes("fly") ||
      cmd.includes("zero-g") ||
      cmd.includes("gravity")
    ) {
      const nextMode = !antigravityMode;
      setAntigravityMode(nextMode);
      confetti({ particleCount: 90, spread: 80 });
      nextLogs.push({
        type: "output",
        content: nextMode
          ? "🚀 Zero-G Physics: IGNITED!"
          : "🛬 Zero-G Physics: DEACTIVATED.",
      });
    } else if (cmd === "clear" || cmd === "cls") {
      setTerminalLogs([]);
      setCommandInput("");
      return;
    } else if (cmd === "neofetch") {
      nextLogs.push({
        type: "output",
        content: `\n      /\\        OS: Developer Portfolio IDE v2\n     /  \\       Host: Next.js App Router + React 19\n    / /\\ \\      Developer: Lee Ryan M. Garcia\n   / /  \\ \\     Role: Software Engineer | Full-Stack & Automation\n  / /_/\\_\\ \\    Stack: Next.js, n8n, MongoDB, PostgreSQL, Tailwind\n /________/ \\   Honors: Cum Laude (Gordon College)\n                Shell: IDE Terminal (pwsh/bash)`,
      });
    } else if (cmd === "npm run build" || cmd === "build") {
      confetti({ particleCount: 120, spread: 90 });
      nextLogs.push({
        type: "output",
        content: `> next build\n✓ Compiled successfully in 380ms\n✓ Linting and checking validity of types ...\n✓ Build complete! Ready for deployment.`,
      });
    } else if (cmd === "npm run test" || cmd === "npm test" || cmd === "test") {
      nextLogs.push({
        type: "output",
        content: `> vitest run\n✓ test/portfolio.spec.ts (17 tests) 142ms\nTest Files  3 passed (3)\n     Tests  17 passed (17)`,
      });
    } else {
      nextLogs.push({
        type: "output",
        content: `Command not recognized: "${rawCmd}". Type "help" for a list of valid commands.`,
      });
    }

    setTerminalLogs(nextLogs);
    setCommandInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommandInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCommandInput("");
        } else {
          setHistoryIndex(newIndex);
          setCommandInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div
      className="min-h-full flex flex-col space-y-1 cursor-text select-text"
      onClick={() => inputRef.current?.focus()}
    >
      {terminalLogs.map((log, i) => (
        <div
          key={i}
          className={`whitespace-pre-wrap leading-relaxed ${
            log.type === "input"
              ? "text-sky-300 font-semibold"
              : log.type === "system"
                ? "text-zinc-400 italic"
                : "text-[#d4d4d4]"
          }`}
        >
          {log.content}
        </div>
      ))}

      <form
        onSubmit={handleCommandSubmit}
        className="flex items-center space-x-2 pt-1"
      >
        <span className="text-emerald-400 font-bold shrink-0 select-none">
          PS C:\Portfolio\LeeRyanGarcia&gt;
        </span>
        <input
          ref={inputRef}
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command (e.g. 'help', 'projects', 'fly', 'config', 'package')..."
          className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs cursor-text"
        />
      </form>
      <div ref={terminalEndRef} />
    </div>
  );
}
