export const BIO_CODE_SNIPPET = `import React from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Bot, 
  FolderGit2, 
  Cpu, 
  Workflow, 
  Layers, 
  ShieldCheck 
} from "lucide-react";

export interface DeveloperProfile {
  name: string;
  title: string;
  location: string;
  status: string;
  bio: string;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
  stats: Array<{ label: string; value: string }>;
  pillars: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
  }>;
}

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: "Lee Ryan M. Garcia",
  title: "Software Engineer | Full-Stack & Automation Developer",
  location: "Olongapo City, Zambales, Philippines",
  status: "Available for Software Engineering & Automation Opportunities",
  bio: "Software Engineer specializing in scalable web development with Next.js, workflow automation with n8n, CRM/ERP integrations (Odoo, Strapi), and high-performance full-stack applications. Passionate about developer tooling, AI integrations, and intuitive UI/UX.",
  contact: {
    email: "leeryan307@gmail.com",
    phone: "+63 929-834-1434",
    github: "https://github.com/Nayreel",
    linkedin: "https://linkedin.com/in/el015",
  },
  stats: [
    { label: "Production Projects", value: "10" },
    { label: "Client & SaaS Systems", value: "6+" },
    { label: "Degree & Course", value: "BSIT" },
    { label: "Graduation Honors", value: "Cum Laude" },
  ],
  pillars: [
    {
      id: "01",
      title: "Workflow Automation (n8n)",
      description: "Designing end-to-end automated pipelines integrating Odoo ERP, Strapi CRM, and Next.js applications.",
      icon: Workflow,
    },
    {
      id: "02",
      title: "Full-Stack Next.js & React",
      description: "Building responsive, scalable web platforms and e-commerce systems with modern UI/UX, TypeScript, and robust state architecture.",
      icon: Layers,
    },
    {
      id: "03",
      title: "Cloud & Systems Reliability",
      description: "Extensive technical troubleshooting across Azure, M365, Docker containers, and real-time Socket.io communication channels.",
      icon: ShieldCheck,
    },
  ],
};

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-[#16171b] border border-[#272930] hover:border-sky-500/40 rounded-xl p-4 transition-colors">
      <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{value}</div>
      <div className="text-xs text-zinc-400 mt-1">{label}</div>
    </div>
  );
}

interface PillarCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

function PillarCard({ id, title, description, icon: Icon }: PillarCardProps) {
  return (
    <div className="bg-[#16171b] border border-[#272930] hover:border-[#383b47] rounded-xl p-5 space-y-3 transition-colors">
      <div className="flex items-center justify-between">
        <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
          {id}
        </div>
        <Icon className="w-4 h-4 text-sky-400" />
      </div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default function BioHero() {
  const profile = DEVELOPER_PROFILE;

  return (
    <section className="max-w-4xl mx-auto space-y-8 p-6 lg:p-10 text-white">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1d22] via-[#16171b] to-[#121316] border border-[#2d3039] p-6 lg:p-8 shadow-2xl">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-sky-500/10 border border-sky-500/30 text-sky-300 px-3 py-1 rounded-full text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{profile.status}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            {profile.name}
          </h1>

          <p className="text-base sm:text-lg text-sky-400 font-medium font-mono">
            {profile.title}
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 font-mono pt-2">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{profile.location}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{profile.contact.phone}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{profile.contact.email}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {profile.stats.map((stat, idx) => (
          <StatCard key={idx} label={stat.label} value={stat.value} />
        ))}
      </div>

      {/* Core Engineering Pillars */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center space-x-2 text-zinc-200">
          <Cpu className="w-5 h-5 text-sky-400" />
          <span>Core Engineering Pillars</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.pillars.map((pillar) => (
            <PillarCard key={pillar.id} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
`;
