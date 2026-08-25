"use client";

import React from "react";
import { Download } from "lucide-react";
import confetti from "canvas-confetti";
import { DEVELOPER_PROFILE, EXPERIENCES } from "@/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";

export function ResumePreview() {
  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#38bdf8", "#818cf8", "#34d399", "#f59e0b"],
    });
    toast.success("Resume downloaded!", {
      description: "Lee_Ryan_Garcia_Resume.pdf",
    });
    window.print();
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-3xl mx-auto space-y-6 p-6 lg:p-10">
        <Card className="bg-[#16171b] border-[#272930] p-6 lg:p-10 shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2c35] pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {DEVELOPER_PROFILE.name}
              </h1>
              <p className="text-sky-400 font-mono text-sm mt-0.5">
                {DEVELOPER_PROFILE.title}
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                📍 {DEVELOPER_PROFILE.location} • 📞 {DEVELOPER_PROFILE.phone} • ✉️ {DEVELOPER_PROFILE.email}
              </p>
            </div>

            <Button
              onClick={handleDownload}
              className="bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shrink-0"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Download CV (PDF)</span>
            </Button>
          </div>

          {/* CV Content */}
          <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pt-6">
            <div>
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-2 font-mono">
                🎯 Professional Summary
              </h3>
              <p className="text-zinc-300">
                Software Engineer with strong experience in building scalable web applications with Next.js, automating business workflows using n8n, integrating ERP/CRM systems (Odoo, Strapi), and delivering high-performance full-stack solutions. Proven background in technical support, cloud services (Azure, M365), and real-time frontend architectures.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono">
                💼 Experience
              </h3>

              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm">
                      {exp.role} | {exp.company}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs font-mono text-zinc-400 border-[#333333]"
                    >
                      {exp.period}
                    </Badge>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono">
                🎓 Education
              </h3>
              <div className="flex justify-between text-xs">
                <span>
                  <strong>Gordon College</strong> — Bachelor of Science in Information Technology (Cum Laude, Dean’s Lister)
                </span>
                <span className="text-zinc-400 font-mono">Graduated July 2024</span>
              </div>
              <p className="text-zinc-400 text-xs">
                <strong>Capstone:</strong> Feedback Fusion: Empowering Feedback Management with Consumer Insights Using Tableau
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono">
                🏆 Conferences & Pitching Competitions
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-1">
                <li>
                  <strong>Philippine Startup Challenge 8 (PSC8)</strong> (Oct 2023) — Regional Pitching Competition (RPC) by ICT Industry Development Bureau.
                </li>
                <li>
                  <strong>International Research Conference on IT Education (IRCITE)</strong> (March 2024) — Poster Presentation by PSITE-Central Luzon.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono">
                🛠️ Skills & Tech Stack
              </h3>
              <p className="text-xs text-zinc-400">
                <strong>Frontend:</strong> Next.js, React, TypeScript, JavaScript, Tailwind CSS, GSAP, Shadcn UI, Aceternity UI, Redux<br />
                <strong>Backend & DB:</strong> MongoDB, MySQL, PostgreSQL, Prisma, Node.js, NestJS, Express.js, Socket.io<br />
                <strong>Automation & APIs:</strong> n8n, Odoo ERP, Strapi CRM, GraphQL, REST API, Shopify, VAPI<br />
                <strong>DevOps & Cloud:</strong> Docker, Git, GitHub Actions, Microsoft Azure, Vercel, Railway, Render, DigitalOcean
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
