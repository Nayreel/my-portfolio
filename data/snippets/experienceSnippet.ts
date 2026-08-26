export const EXPERIENCE_CODE_SNIPPET = `import React from "react";
import { Briefcase, GraduationCap, Award, Check, Calendar, MapPin } from "lucide-react";

export interface ExperienceRecord {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationRecord {
  school: string;
  degree: string;
  period: string;
  location: string;
  honors: string;
  capstone: string;
  coursework: string;
}

export interface ConferenceRecord {
  title: string;
  date: string;
  description: string;
}

export const EXPERIENCES: ExperienceRecord[] = [
  {
    company: "JAV Resource Corporation",
    role: "Software Engineer",
    location: "Olongapo City, Philippines",
    period: "Nov. 2025 – Present",
    highlights: [
      "Design and implement automated workflows using n8n to integrate Odoo and Strapi CRM, ensuring seamless data synchronization across platforms.",
      "Help develop and maintain a scalable Next.js e-commerce website that enables customers to conveniently place orders online, supporting sales operations and expanding digital sales channels.",
      "Develop and optimize website features that improve reliability, customer experience, and the overall online ordering process.",
    ],
    technologies: ["Next.js", "n8n", "Odoo ERP", "Strapi CRM", "TypeScript", "Tailwind CSS", "Redux", "GraphQL"],
  },
  {
    company: "Buwelo - An Exactstar Company",
    role: "Technical Support Representative (Cloud Technical Support)",
    location: "SBFZ Subic Bay, Philippines",
    period: "Oct. 2024 – Oct. 2025",
    highlights: [
      "Assists customers via phone call by fixing different technical problems through remote access, using tools like Remote Desktop, Microsoft 365, Zendesk, and Azure for cloud-based SaaS applications.",
      "Applied problem-solving and logical thinking to fix issues with networks, printers, software installation/updating, and both Microsoft and cloud accounts.",
      "Maintained high SLA resolution rates and smooth user productivity across global business clients.",
    ],
    technologies: ["Microsoft Azure", "Microsoft 365", "Zendesk", "Remote Desktop", "SaaS Applications", "Active Directory"],
  },
  {
    company: "Hokei Subic Corporation",
    role: "Frontend Developer",
    location: "SBFZ Subic Bay, Philippines",
    period: "Feb. 2024 – July 2024",
    highlights: [
      "Developed responsive web applications using Next.js, Tailwind CSS, and Socket.io with REST API methods.",
      "Promoted from intern to full-time frontend developer by showing strong coding skills, problem-solving abilities, and delivering features on time.",
      "Created fast and smooth user experience connecting frontend interfaces to server-side machine learning components.",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Socket.io", "REST APIs", "JavaScript", "Machine Learning Integration"],
  },
];

export const EDUCATION: EducationRecord = {
  school: "Gordon College (2020-2024)",
  degree: "Bachelor of Science in Information Technology (BSIT)",
  period: "Graduated July 2024",
  location: "Olongapo City, Philippines",
  honors: "Cum Laude, Dean’s Lister",
  capstone: "Feedback Fusion: Empowering Feedback Management with Consumer Insights Using Tableau",
  coursework: "Web Development, System Administration, Networking",
};

export const CONFERENCES: ConferenceRecord[] = [
  {
    title: "Philippine Startup Challenge 8 (PSC8) - Regional Pitching Competition",
    date: "Oct 04, 2023",
    description: "Pitched capstone project (Feedback Fusion) hosted by the ICT Industry Development Bureau.",
  },
  {
    title: "International Research Conference on Information Technology Education (IRCITE)",
    date: "March 08, 2024",
    description: "Invited by PSITE-Central Luzon to showcase capstone research as a poster presentation.",
  },
];

function ExperienceCard({ exp }: { exp: ExperienceRecord }) {
  return (
    <div className="bg-[#16171b] border border-[#272930] hover:border-sky-500/40 rounded-xl p-6 space-y-4 text-white transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-white">{exp.role}</h3>
          <div className="text-sm font-medium text-sky-400 flex items-center space-x-2 mt-0.5">
            <span>{exp.company}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-500" />
              {exp.location}
            </span>
          </div>
        </div>

        <div className="text-xs font-mono bg-[#20222a] border border-[#2d303d] px-2.5 py-1 rounded-md text-zinc-300 flex items-center gap-1.5 w-fit">
          <Calendar className="w-3 h-3 text-sky-400" />
          <span>{exp.period}</span>
        </div>
      </div>

      <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start space-x-2">
            <Check className="w-3.5 h-3.5 mt-0.5 text-sky-400 shrink-0" />
            <span className="leading-relaxed">{h}</span>
          </li>
        ))}
      </ul>

      <div className="pt-2 flex flex-wrap gap-1.5">
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono bg-[#20222a] text-sky-300 px-2 py-0.5 rounded border border-[#2d303d]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CareerHistory() {
  return (
    <section className="max-w-4xl mx-auto space-y-8 p-6 lg:p-10 text-white">
      <div>
        <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Career Milestones</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Work Experience & Impact</h1>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {EXPERIENCES.map((exp, idx) => (
          <ExperienceCard key={idx} exp={exp} />
        ))}
      </div>

      {/* Education */}
      <div className="bg-[#16171b] border border-[#272930] rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-bold flex items-center space-x-2 text-white">
          <GraduationCap className="w-5 h-5 text-indigo-400" />
          <span>Education</span>
        </h2>
        <div className="flex justify-between items-start pt-2">
          <div>
            <h4 className="font-semibold text-sm text-zinc-200">{EDUCATION.school}</h4>
            <p className="text-xs text-sky-400 font-mono mt-0.5">{EDUCATION.degree}</p>
          </div>
          <span className="text-xs font-mono text-emerald-300 border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 rounded">
            {EDUCATION.honors}
          </span>
        </div>
        <div className="text-xs text-zinc-400 space-y-1 pt-1">
          <p><strong className="text-zinc-300">Capstone:</strong> {EDUCATION.capstone}</p>
          <p><strong className="text-zinc-300">Coursework:</strong> {EDUCATION.coursework}</p>
          <p className="text-zinc-500 font-mono text-[11px]">{EDUCATION.period} • {EDUCATION.location}</p>
        </div>
      </div>

      {/* Conferences */}
      <div className="bg-[#16171b] border border-[#272930] rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-bold flex items-center space-x-2 text-white">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Conferences & Competitions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {CONFERENCES.map((conf, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#121214] border border-[#252830] space-y-1.5">
              <span className="text-[10px] font-mono text-amber-300 border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded">
                {conf.date}
              </span>
              <h4 className="font-semibold text-xs text-zinc-200">{conf.title}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">{conf.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
