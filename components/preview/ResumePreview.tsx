"use client";

import React from "react";
import { Download } from "lucide-react";
import confetti from "canvas-confetti";
import { DEVELOPER_PROFILE } from "@/data";
import { downloadResumePdf } from "@/lib/download";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";

export function ResumePreview() {
  const resumeUrl = DEVELOPER_PROFILE.resumePdfUrl || "/Lee_Ryan_Garcia_Resume.pdf";
  const resumeFilename = resumeUrl.split("/").pop() || "Lee_Ryan_Garcia_Resume.pdf";

  const handleDownload = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#38bdf8", "#818cf8", "#34d399", "#f59e0b"],
    });
    toast.success("Downloading CV...", {
      description: resumeFilename,
    });
    downloadResumePdf(resumeUrl, resumeFilename);
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 p-3.5 sm:p-6 lg:p-10">
        <Card className="bg-[#16171b] border-[#272930] p-4 sm:p-6 lg:p-10 shadow-2xl text-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#2a2c35] pb-5 sm:pb-6">
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
                LEE RYAN M. GARCIA
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1 font-sans flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>Olongapo City, Zambales, Philippines</span>
                <span className="text-zinc-500">|</span>
                <span>+63 929-834-1434</span>
                <span className="text-zinc-500">|</span>
                <a
                  href="mailto:leeryan307@gmail.com"
                  className="text-sky-400 hover:underline"
                >
                  leeryan307@gmail.com
                </a>
                <span className="text-zinc-500">|</span>
                <a
                  href="https://linkedin.com/in/el015"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  linkedin.com/in/el015
                </a>
              </p>
            </div>

            <Button
              onClick={handleDownload}
              className="bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shrink-0 cursor-pointer w-full sm:w-auto"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Download CV (PDF)</span>
            </Button>
          </div>

          {/* CV Content */}
          <div className="space-y-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans pt-6">
            {/* 1. Experience */}
            <div className="space-y-5">
              <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono border-b border-[#2a2c35]/80 pb-1">
                Experience
              </h2>

              {/* JAV Resource Corp */}
              <div className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <span className="font-bold text-white text-sm sm:text-base">
                    JAV Resource Corp
                  </span>
                  <span className="text-xs text-zinc-400">
                    Olongapo City, Philippines
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 text-xs">
                  <span className="font-medium text-sky-300 italic">
                    Software Engineer
                  </span>
                  <span className="font-mono text-zinc-400">
                    Nov. 2025 – Present
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-300 pt-1">
                  <li>
                    Design and implement automated workflows with n8n to integrate
                    Odoo and Strapi CRM, ensuring seamless data synchronization
                    across platforms.
                  </li>
                  <li>
                    Help develop and maintain a scalable Next.js e-commerce
                    website that enables customers to conveniently place orders
                    online, supporting the company&apos;s sales operations and
                    expanding its digital sales channel.
                  </li>
                  <li>
                    Develop and optimize website features that improve
                    reliability, customer experience, and the overall online
                    ordering process.
                  </li>
                </ul>
              </div>

              {/* Buwelo an Exactstar Company */}
              <div className="space-y-1.5 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <span className="font-bold text-white text-sm sm:text-base">
                    Buwelo an Exactstar Company
                  </span>
                  <span className="text-xs text-zinc-400">
                    SBFZ Subic Bay, Philippines
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 text-xs">
                  <span className="font-medium text-sky-300 italic">
                    Technical Support Representative
                  </span>
                  <span className="font-mono text-zinc-400">
                    Oct. 2024 – Oct. 2025
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-300 pt-1">
                  <li>
                    Assists customers via phone call by fixing different technical
                    problems through remote access, using tools like Remote
                    Desktop, Microsoft 365, Zendesk, and Azure for cloud-based
                    applications.
                  </li>
                  <li>
                    Applied problem-solving and logical thinking to fix issues
                    with networks, printers, software (installing/updating), and
                    both Microsoft and cloud accounts.
                  </li>
                </ul>
              </div>

              {/* Hokei Subic Corporation */}
              <div className="space-y-1.5 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <span className="font-bold text-white text-sm sm:text-base">
                    Hokei Subic Corporation
                  </span>
                  <span className="text-xs text-zinc-400">
                    SBFZ Subic Bay, Philippines
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5 text-xs">
                  <span className="font-medium text-sky-300 italic">
                    Frontend Developer
                  </span>
                  <span className="font-mono text-zinc-400">
                    February 2024 – July 2024
                  </span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-zinc-300 pt-1">
                  <li>
                    Developed responsive web applications using Next.js, Tailwind
                    CSS, and Socket.io with REST API methods.
                  </li>
                  <li>
                    Promoted from intern to full-time frontend developer by
                    showing strong coding skills, problem-solving abilities, and
                    delivering features on time.
                  </li>
                </ul>
              </div>
            </div>

            {/* 2. Skills & Interests */}
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono border-b border-[#2a2c35]/80 pb-1">
                Skills & Interests
              </h2>
              <div className="space-y-2 text-xs text-zinc-300">
                <p>
                  <strong className="text-white">Tools & Software:</strong> Visual
                  Studio Code, Antigravity, GitHub, Postman, MongoDB Compass,
                  Trello, Figma, Docker Desktop
                </p>
                <div>
                  <strong className="text-white">Tech Stack:</strong>
                  <ul className="list-disc list-outside ml-4 mt-1 space-y-1 text-zinc-300">
                    <li>
                      <strong className="text-zinc-200">Frontend:</strong> HTML,
                      CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS
                    </li>
                    <li>
                      <strong className="text-zinc-200">Backend & Databases:</strong>{" "}
                      MongoDB, MySQL, PostgreSQL, Prisma, Node.js, NestJS
                    </li>
                    <li>
                      <strong className="text-zinc-200">APIs & Integrations:</strong>{" "}
                      GraphQL, REST API, Shopify, n8n, Cloudinary
                    </li>
                    <li>
                      <strong className="text-zinc-200">Infrastructure & DevOps:</strong>{" "}
                      Docker, Git, GitHub Actions
                    </li>
                    <li>
                      <strong className="text-zinc-200">Deployment & Cloud:</strong>{" "}
                      Vercel, Railway, DigitalOcean, Render
                    </li>
                  </ul>
                </div>
                <p className="pt-1">
                  <strong className="text-white">Languages:</strong> English,
                  Tagalog
                </p>
              </div>
            </div>

            {/* 3. Education */}
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-bold text-sky-400 uppercase tracking-wider font-mono border-b border-[#2a2c35]/80 pb-1">
                Education
              </h2>
              <div className="space-y-1.5 text-xs text-zinc-300">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <span className="font-bold text-white text-sm sm:text-base">
                    Gordon College
                  </span>
                  <span className="text-xs text-zinc-400">
                    Olongapo City, Philippines
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <span className="font-medium text-zinc-200">
                    Bachelor of Science in Information Technology.
                  </span>
                  <span className="font-mono text-zinc-400">July 2024</span>
                </div>
                <p className="pt-1">
                  <strong className="text-white">Awards:</strong> Cum Laude,
                  Dean&apos;s Lister
                </p>
                <p>
                  <strong className="text-white">Relevant Coursework:</strong> Web
                  Development, System Administration, Networking
                </p>
                <p>
                  <strong className="text-white">Capstone Title:</strong> Feedback
                  Fusion: Empowering Feedback Management with Consumer Insights
                  Using Tableau
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
}
