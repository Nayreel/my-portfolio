import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, Flame, Rocket, Atom } from "lucide-react";

interface AntigravityPhysicsProps {
  active: boolean;
  onDeactivate: () => void;
}

export function AntigravityPhysics({
  active,
  onDeactivate,
}: AntigravityPhysicsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles array
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      symbol: string;
      rotation: number;
      vRot: number;
    }[] = [];

    const symbols = ["⚛", "{ }", "</>", "Δ", "01", "λ", "★", "⚡", "∞"];
    const colors = ["#38bdf8", "#818cf8", "#34d399", "#f59e0b", "#ec4899"];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -0.5 - Math.random() * 2, // Floating upwards!
        size: 12 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.04,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around top
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillText(p.symbol, -p.size / 2, p.size / 2);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Floating Status Notification Pill at Top */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 20, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-12 left-1/2 -translate-x-1/2 pointer-events-auto bg-[#18191e]/95 backdrop-blur-md border border-amber-500/50 px-4 py-2 rounded-full shadow-2xl flex items-center space-x-3 text-xs text-amber-300 select-none"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        <span className="font-mono font-bold">
          ZERO GRAVITY PHYSICS ACTIVATED
        </span>
        <button
          onClick={onDeactivate}
          className="px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px] transition-colors ml-2"
        >
          Restore Gravity
        </button>
      </motion.div>
    </div>
  );
}
