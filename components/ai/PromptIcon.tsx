"use client";

import React from "react";
import {
  Workflow,
  ShoppingCart,
  Radio,
  Sun,
  Briefcase,
  GraduationCap,
  Trophy,
  Mail,
  Sparkles,
  Zap,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

interface PromptIconProps {
  name?: string;
  label?: string;
  className?: string;
}

export function PromptIcon({
  name,
  label,
  className = "w-3.5 h-3.5 shrink-0",
}: PromptIconProps) {
  const n = (name || "").toLowerCase();
  const l = (label || "").toLowerCase();

  // Tech Stack / Skills
  if (
    n === "zap" ||
    n === "code" ||
    n === "tech" ||
    n.includes("⚡") ||
    l.includes("tech") ||
    l.includes("skill")
  ) {
    return <Zap className={`${className} text-sky-400`} />;
  }

  // Automations / n8n
  if (
    n === "workflow" ||
    n === "n8n" ||
    n.includes("🔄") ||
    l.includes("automation") ||
    l.includes("workflow") ||
    l.includes("n8n")
  ) {
    return <Workflow className={`${className} text-amber-400`} />;
  }

  // MineGo / Commerce
  if (
    n === "shopping-cart" ||
    n === "minego" ||
    n.includes("🛒") ||
    l.includes("minego") ||
    l.includes("commerce")
  ) {
    return <ShoppingCart className={`${className} text-emerald-400`} />;
  }

  // SIPAT / Radar
  if (
    n === "radio" ||
    n === "sipat" ||
    n.includes("📡") ||
    l.includes("sipat") ||
    l.includes("radar")
  ) {
    return <Radio className={`${className} text-rose-400`} />;
  }

  // AI Energy Shop / Solar
  if (
    n === "sun" ||
    n === "ai-energy" ||
    n.includes("☀️") ||
    l.includes("energy") ||
    l.includes("solar")
  ) {
    return <Sun className={`${className} text-amber-400`} />;
  }

  // Experience / Career / Work
  if (
    n === "briefcase" ||
    n === "work" ||
    n.includes("💼") ||
    l.includes("experience") ||
    l.includes("work") ||
    l.includes("career")
  ) {
    return <Briefcase className={`${className} text-indigo-400`} />;
  }

  // Education / Honors / Gordon College
  if (
    n === "graduation-cap" ||
    n === "education" ||
    n.includes("🎓") ||
    l.includes("education") ||
    l.includes("honors") ||
    l.includes("gordon")
  ) {
    return <GraduationCap className={`${className} text-violet-400`} />;
  }

  // Conferences / Pitching / Competitions
  if (
    n === "trophy" ||
    n === "awards" ||
    n.includes("🏆") ||
    l.includes("conference") ||
    l.includes("pitch") ||
    l.includes("competition")
  ) {
    return <Trophy className={`${className} text-yellow-400`} />;
  }

  // Production Problems Solved
  if (
    n === "shield-check" ||
    n === "problem" ||
    n === "problems" ||
    l.includes("problem") ||
    l.includes("challenge") ||
    l.includes("solved")
  ) {
    return <ShieldCheck className={`${className} text-emerald-400`} />;
  }

  // Why Hire / Candidate Fit
  if (
    n === "user-check" ||
    n === "hire" ||
    n === "why-hire" ||
    l.includes("why hire") ||
    l.includes("hire")
  ) {
    return <UserCheck className={`${className} text-sky-400`} />;
  }

  // Contact / Hire
  if (
    n === "mail" ||
    n === "contact" ||
    n.includes("✉️") ||
    l.includes("contact")
  ) {
    return <Mail className={`${className} text-sky-400`} />;
  }

  return <Sparkles className={`${className} text-sky-400`} />;
}

