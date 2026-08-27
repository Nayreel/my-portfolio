"use client";

import React, { useState } from "react";
import {
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Square,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Bug,
  Activity,
  X,
} from "lucide-react";
import {
  DEBUG_CONFIGURATIONS,
  INITIAL_DEBUG_VARIABLES,
  INITIAL_DEBUG_WATCH,
  INITIAL_DEBUG_BREAKPOINTS,
  INITIAL_DEBUG_CALLSTACK,
} from "@/data/sidebarData";
import {
  DebugVariableItem,
  DebugWatchExpression,
  DebugBreakpointItem,
} from "@/types/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarRunDebugProps {
  onStartDebug?: (configName: string) => void;
  onClose?: () => void;
}

export function SidebarRunDebug({
  onStartDebug,
  onClose,
}: SidebarRunDebugProps) {
  const [selectedConfigId, setSelectedConfigId] = useState(
    DEBUG_CONFIGURATIONS[0].id,
  );
  const [isDebugging, setIsDebugging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [variables] = useState<DebugVariableItem[]>(INITIAL_DEBUG_VARIABLES);
  const [watchExpressions, setWatchExpressions] =
    useState<DebugWatchExpression[]>(INITIAL_DEBUG_WATCH);
  const [breakpoints, setBreakpoints] = useState<DebugBreakpointItem[]>(
    INITIAL_DEBUG_BREAKPOINTS,
  );
  const [expandedVars, setExpandedVars] = useState<Record<string, boolean>>({
    "v-runtime": true,
    "v-skills": true,
  });
  const [newWatchInput, setNewWatchInput] = useState("");
  const [isAddingWatch, setIsAddingWatch] = useState(false);

  const selectedConfig =
    DEBUG_CONFIGURATIONS.find((c) => c.id === selectedConfigId) ||
    DEBUG_CONFIGURATIONS[0];

  const toggleVarExpand = (id: string) => {
    setExpandedVars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartDebugging = () => {
    setIsDebugging(true);
    setIsPaused(false);
    if (onStartDebug) {
      onStartDebug(selectedConfig.name);
    }
  };

  const handleStopDebugging = () => {
    setIsDebugging(false);
    setIsPaused(false);
  };

  const handleRestart = () => {
    setIsDebugging(false);
    setTimeout(() => {
      setIsDebugging(true);
      if (onStartDebug) onStartDebug(selectedConfig.name);
    }, 200);
  };

  const handleAddWatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWatchInput.trim()) {
      setIsAddingWatch(false);
      return;
    }
    const newWatch: DebugWatchExpression = {
      id: `w-${Date.now()}`,
      expression: newWatchInput.trim(),
      value: '"Evaluated OK"',
      type: "string",
    };
    setWatchExpressions((prev) => [...prev, newWatch]);
    setNewWatchInput("");
    setIsAddingWatch(false);
  };

  const removeWatch = (id: string) => {
    setWatchExpressions((prev) => prev.filter((w) => w.id !== id));
  };

  const toggleBreakpoint = (id: string) => {
    setBreakpoints((prev) =>
      prev.map((bp) => (bp.id === id ? { ...bp, enabled: !bp.enabled } : bp)),
    );
  };

  const renderVariableTree = (item: DebugVariableItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = !!expandedVars[item.id];

    return (
      <div key={item.id} className="py-0.5 font-mono text-[11px]">
        <div
          className="flex items-center space-x-1.5 hover:bg-[#252526] px-2 py-0.5 rounded cursor-pointer group"
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => hasChildren && toggleVarExpand(item.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-3 h-3 text-zinc-400 shrink-0" />
            ) : (
              <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
            )
          ) : (
            <span className="w-3 shrink-0" />
          )}

          <span className="text-sky-300 font-medium shrink-0">
            {item.name}:
          </span>
          <span
            className={`truncate ${
              item.type === "string"
                ? "text-emerald-300"
                : item.type === "number"
                  ? "text-amber-300"
                  : item.type === "boolean"
                    ? "text-purple-300"
                    : "text-zinc-400"
            }`}
          >
            {item.value}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {item.children!.map((child) =>
              renderVariableTree(child, level + 1),
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#181818] border-r border-[#2d2d2d] text-zinc-300 select-none text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2d2d2d] shrink-0 bg-[#1f1f1f]">
        <div className="flex items-center space-x-2">
          <Bug className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold tracking-wider text-[11px] uppercase text-zinc-200">
            Run and Debug
          </span>
        </div>
        <div className="flex items-center space-x-1">
          {onClose && (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onClose}
              className="text-zinc-400 hover:text-white hover:bg-[#2d2d2d]"
              title="Close Debug Panel"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Target Config & Action Bar */}
      <div className="p-3 border-b border-[#282828] space-y-2.5 bg-[#161616] shrink-0">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-semibold text-zinc-400">
            Debug Target
          </label>
          <select
            value={selectedConfigId}
            onChange={(e) => setSelectedConfigId(e.target.value)}
            className="w-full h-7 bg-[#1f1f1f] border border-[#3c3c3c] rounded px-2 text-xs text-sky-200 focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            {DEBUG_CONFIGURATIONS.map((c) => (
              <option
                key={c.id}
                value={c.id}
                className="bg-[#1f1f1f] text-zinc-200"
              >
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Debug Controls Bar */}
        <div className="flex items-center space-x-2">
          {!isDebugging ? (
            <Button
              size="sm"
              onClick={handleStartDebugging}
              className="flex-1 h-7 text-xs cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm"
            >
              <PlayCircle className="w-3.5 h-3.5 mr-1" />
              Start Debugging (F5)
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full bg-[#202020] border border-[#333] rounded px-2 py-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-mono">
                  {isPaused ? "Paused" : "Running"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Tooltip>
                  <TooltipTrigger
                    onClick={() => setIsPaused((prev) => !prev)}
                    className="p-1 text-zinc-300 hover:text-amber-400 cursor-pointer"
                  >
                    {isPaused ? (
                      <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <PauseCircle className="w-3.5 h-3.5" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="text-[11px] bg-[#222]"
                  >
                    {isPaused ? "Continue (F5)" : "Pause (F6)"}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    onClick={handleRestart}
                    className="p-1 text-zinc-300 hover:text-sky-400 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="text-[11px] bg-[#222]"
                  >
                    Restart (Ctrl+Shift+F5)
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger
                    onClick={handleStopDebugging}
                    className="p-1 text-zinc-300 hover:text-red-400 cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="text-[11px] bg-[#222]"
                  >
                    Stop Debugging (Shift+F5)
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Debug Inspector Panels Scroll Area */}
      <ScrollArea className="flex-1">
        <div className="py-1">
          {/* Variables Inspector */}
          <div className="mb-2">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-y border-[#282828] text-zinc-300 font-semibold text-[11px] uppercase tracking-wider">
              <span>Variables (Portfolio State)</span>
              <Badge
                variant="secondary"
                className="bg-[#2a2a2a] text-zinc-400 text-[9px] px-1 py-0 h-4 border-[#333]"
              >
                Live
              </Badge>
            </div>
            <div className="py-1">
              {variables.map((item) => renderVariableTree(item))}
            </div>
          </div>

          {/* Watch Expressions */}
          <div className="mb-2">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-y border-[#282828] text-zinc-300 font-semibold text-[11px] uppercase tracking-wider">
              <span>Watch</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setIsAddingWatch(true)}
                className="h-5 w-5 text-zinc-400 hover:text-white"
                title="Add Expression"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>

            {isAddingWatch && (
              <form
                onSubmit={handleAddWatch}
                className="p-2 bg-[#202020] border-b border-[#282828]"
              >
                <Input
                  value={newWatchInput}
                  onChange={(e) => setNewWatchInput(e.target.value)}
                  onBlur={() => {
                    if (!newWatchInput.trim()) setIsAddingWatch(false);
                  }}
                  placeholder="e.g. portfolio.isReady"
                  autoFocus
                  className="h-6 text-[11px] bg-[#181818] border-[#383838] text-zinc-200"
                />
              </form>
            )}

            <div className="py-1 px-2 space-y-0.5 font-mono text-[11px]">
              {watchExpressions.map((w) => (
                <div
                  key={w.id}
                  className="flex items-center justify-between px-2 py-0.5 rounded hover:bg-[#252526] group"
                >
                  <div className="flex items-center space-x-1.5 truncate">
                    <span className="text-sky-300 truncate">
                      {w.expression}:
                    </span>
                    <span className="text-emerald-300 truncate">{w.value}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => removeWatch(w.id)}
                    className="opacity-0 group-hover:opacity-100 h-5 w-5 text-zinc-500 hover:text-red-400 transition-opacity"
                    title="Delete Expression"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Call Stack */}
          <div className="mb-2">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-y border-[#282828] text-zinc-300 font-semibold text-[11px] uppercase tracking-wider">
              <span>Call Stack</span>
              <Activity className="w-3 h-3 text-sky-400" />
            </div>
            <div className="py-1 px-2 space-y-0.5 font-mono text-[11px]">
              {INITIAL_DEBUG_CALLSTACK.map((frame, idx) => (
                <div
                  key={frame.id}
                  className={`px-2 py-1 rounded hover:bg-[#252526] cursor-pointer ${
                    idx === 0
                      ? "text-sky-300 bg-sky-950/20 font-medium"
                      : "text-zinc-400"
                  }`}
                >
                  <div className="truncate">{frame.functionName}()</div>
                  <div className="text-[10px] text-zinc-500 truncate">
                    {frame.fileName}:{frame.lineNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakpoints */}
          <div className="mb-2">
            <div className="flex items-center justify-between px-3 py-1 bg-[#1e1e1e] border-y border-[#282828] text-zinc-300 font-semibold text-[11px] uppercase tracking-wider">
              <span>Breakpoints</span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {breakpoints.filter((b) => b.enabled).length} active
              </span>
            </div>
            <div className="py-1 px-2 space-y-0.5 text-[11px]">
              {breakpoints.map((bp) => (
                <div
                  key={bp.id}
                  onClick={() => toggleBreakpoint(bp.id)}
                  className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-[#252526] cursor-pointer group"
                >
                  {bp.enabled ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 ring-1 ring-red-400" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full border border-zinc-500 shrink-0" />
                  )}
                  <div className="truncate flex-1">
                    <span className="text-zinc-300">{bp.fileName}</span>
                    <span className="text-zinc-500 ml-1.5 font-mono text-[10px]">
                      line {bp.lineNumber}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
