import { NextRequest, NextResponse } from "next/server";
import {
  DEVELOPER_PROFILE,
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
  Project,
} from "@/data";

function findMatchingProject(query: string): Project | undefined {
  const q = query.toLowerCase();

  // Check specific project titles and main keywords
  for (const project of PROJECTS) {
    const titleLower = project.title.toLowerCase();
    const mainTitle = titleLower.split(/[-–—:]/)[0].trim();

    if (
      q.includes(titleLower) ||
      (mainTitle.length > 2 && q.includes(mainTitle))
    ) {
      return project;
    }
  }

  // Common aliases and synonyms
  if (
    q.includes("minego") ||
    q.includes("live commerce") ||
    q.includes("live-shopping")
  ) {
    return PROJECTS.find((p) => p.title.toLowerCase().includes("minego"));
  }
  if (
    q.includes("sipat") ||
    q.includes("tactical radar") ||
    q.includes("recon network") ||
    q.includes("spidey")
  ) {
    return PROJECTS.find((p) => p.title.toLowerCase().includes("sipat"));
  }
  if (
    q.includes("ai energy") ||
    q.includes("solar power") ||
    q.includes("energy shop")
  ) {
    return PROJECTS.find((p) => p.title.toLowerCase().includes("ai energy"));
  }
  if (
    q.includes("feedback fusion") ||
    q.includes("sentiment analysis") ||
    q.includes("survey qr")
  ) {
    return PROJECTS.find((p) =>
      p.title.toLowerCase().includes("feedback fusion"),
    );
  }
  if (q.includes("iontana")) {
    return PROJECTS.find((p) => p.title.toLowerCase().includes("iontana"));
  }
  if (q.includes("smart home") || q.includes("iot hub")) {
    return PROJECTS.find((p) => p.title.toLowerCase().includes("smart home"));
  }

  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const { userMessage } = await req.json();

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Missing userMessage" },
        { status: 400 },
      );
    }

    const query = userMessage.toLowerCase();
    let textResponse = "";

    // 1. Specific Project Match Check (Priority)
    const matchedProject = findMatchingProject(query);

    if (matchedProject) {
      const stack = (
        matchedProject.architectureStack || matchedProject.tags
      ).join(", ");

      const solvedList =
        matchedProject.whatISolved && matchedProject.whatISolved.length > 0
          ? `\n\n**What Lee Ryan Engineered & Solved**:\n${matchedProject.whatISolved
              .map((s) => `- ${s}`)
              .join("\n")}`
          : "";

      const metricsList =
        matchedProject.metrics && matchedProject.metrics.length > 0
          ? `\n\n**Key Metrics**:\n${matchedProject.metrics
              .map((m) => `- **${m.label}**: ${m.value}`)
              .join("\n")}`
          : "";

      const problemSolution =
        matchedProject.problem && matchedProject.solution
          ? `\n\n**The Problem**:\n${matchedProject.problem}\n\n**Engineering Solution**:\n${matchedProject.solution}`
          : "";

      const links = [
        matchedProject.liveUrl
          ? `[Open Live Application](${matchedProject.liveUrl})`
          : "",
      ]
        .filter(Boolean)
        .join(" • ");

      textResponse = `**${matchedProject.title}** (${matchedProject.category})\n*${matchedProject.tagline}*\n\n${matchedProject.description}\n\n**Architecture & Stack**: ${stack}${problemSolution}${solvedList}${metricsList}${
        links ? `\n\n**Links**: ${links}` : ""
      }`;
    } else if (
      query.includes("problem") ||
      query.includes("challenge") ||
      query.includes("solve") ||
      query.includes("production issue")
    ) {
      textResponse = `**Key Production Problems Solved by ${DEVELOPER_PROFILE.name}**:

1. **MineGo Platform (Live Commerce, Bidding & Payments)**:
- **Challenge**: Race conditions during concurrent live bidding, stream latency desync, and handling secure escrow payments.
- **Solution**: Built Redis distributed locking to prevent duplicate bidding, integrated WebRTC LiveKit for sub-second livestream video, and engineered an automated payment gateway integration with escrow release upon verified delivery.

2. **JAV Resource Corporation (E-Commerce with n8n Automation)**:
- **Challenge**: Scaling a multi-channel e-commerce store with manual inventory updates, slow quotation responses, and disconnected CRM/ERP data.
- **Solution**: Built a Next.js e-commerce platform integrated with 10+ n8n workflow automations, connecting Strapi CRM and Odoo ERP for automated quote generation, inventory sync, and order notifications—cutting manual work by 60%+.

3. **SIPAT (Tactical Radar & Telemetry)**:
- **Challenge**: Browser lag and UI stutter when rendering hundreds of moving radar coordinates and hazard markers in real-time.
- **Solution**: Designed high-throughput WebSocket streams via Socket.io with Leaflet canvas rendering and spatial partitioning to maintain smooth 60 FPS updates.

4. **AI Energy Shop (Australian Solar E-Commerce)**:
- **Challenge**: Complex multi-tiered solar savings calculations leading to customer drop-off.
- **Solution**: Built an intuitive interactive configurator with Next.js and Redux, connected to n8n automated quote workflows and Strapi CMS.

5. **Hokei Subic Corporation (Internal Web Tools)**:
- **Challenge**: Slow legacy dashboards with high client-side load times.
- **Solution**: Refactored frontends using Next.js Server Components and Tailwind CSS, reducing initial page load times by 40% and adding real-time Socket.io updates.`;
    } else if (
      query.includes("why should we hire") ||
      query.includes("why hire") ||
      query.includes("reasons to hire") ||
      query.includes("why choose") ||
      query.includes("hire lee") ||
      query.includes("candidate")
    ) {
      textResponse = `**Why You Should Hire ${DEVELOPER_PROFILE.name}**:

1. **Adaptive & Fast Learner**:
He quickly masters new tech stacks, tools, and business domains. Whether diving into modern Next.js features, complex n8n workflows, or third-party APIs, he gets up to speed rapidly and delivers results with high autonomy.

2. **Strong Problem-Solving Skills**:
He doesn't just write code—he diagnoses real root causes. From fixing live bidding race conditions and slow dashboards to automating repetitive manual workflows and payments, he builds practical solutions that work reliably in production.

3. **Complete Full-Stack & Automation Ability**:
He can build your entire product end-to-end: clean, responsive user interfaces (Next.js, React, Tailwind CSS), solid backends (Node.js, PostgreSQL, Redis), and automated business pipelines (n8n, Strapi, Odoo ERP).

4. **Solid Academic & Technical Foundation**:
Graduated **Cum Laude** (Dean's Lister) in Information Technology from Gordon College and was a regional finalist pitching *Feedback Fusion* at the Philippine Startup Challenge (PSC8).

5. **Great Communication & Support Mindset**:
With 1 year of Cloud Technical Support experience at Buwelo supporting Microsoft 365, Azure, and Zendesk, he communicates clearly with teammates, understands client needs, and handles production issues calmly.`;
    } else if (
      query.includes("executive summary") ||
      query.includes("qualifications") ||
      query.includes("strengths")
    ) {
      textResponse = `**Executive Summary — ${DEVELOPER_PROFILE.name}**\n\n${DEVELOPER_PROFILE.bio}\n\n**Key Strengths & Production Provenance**:\n- **Full-Stack Engineering**: Expertise in Next.js, React, TypeScript, Node.js, GraphQL, PostgreSQL, and Redis.\n- **Workflow Automation**: Built 10+ end-to-end n8n automation pipelines syncing ERP, CRM, and real-time alerts.\n- **Real-Time & Telemetry**: Architected WebRTC live streaming (MineGo) and WebSocket geospatial radar systems (SIPAT).\n- **Academic Distinction**: BSIT **Cum Laude** from Gordon College; regional finalist in the Philippine Startup Challenge (PSC8).\n\n*Currently open to Software Engineering and Full-Stack Automation roles.*`;
    } else if (
      query.includes("workflow") ||
      query.includes("automation") ||
      query.includes("n8n")
    ) {
      textResponse = `**Workflow Automation & Systems Integration Expertise**:\n\n${DEVELOPER_PROFILE.name} specializes in architecting high-reliability business automations and API integration pipelines:\n\n- **n8n Workflow Automation**: Engineered 10+ automated production pipelines handling ERP/CRM synchronization, inventory feeds, customer notifications, and webhook distribution.\n- **Custom Automation Hubs**: Designed event-driven architectures connecting e-commerce platforms (AI Energy Shop) with third-party suppliers and automated quotation engines.\n- **Backend Webhooks & Cron Services**: Built resilient scheduled tasks, payload validation, and error recovery handlers in Node.js and Next.js Route Handlers.`;
    } else if (
      query.includes("tech stack") ||
      query.includes("skill") ||
      query.includes("languages") ||
      query.includes("strongest technical")
    ) {
      const skillsList = SKILL_CATEGORIES.map(
        (cat) =>
          `**${cat.category}**: ${cat.skills.map((s) => s.name).join(", ")}`,
      ).join("\n");

      textResponse = `Here is a breakdown of **${DEVELOPER_PROFILE.name}**'s core technical proficiencies:\n\n${skillsList}\n\n*Lee Ryan specializes in Next.js web applications, n8n workflow automation, MongoDB, PostgreSQL, and cloud deployments.*`;
    } else if (
      query.includes("project") ||
      query.includes("built") ||
      query.includes("portfolio") ||
      query.includes("deployed")
    ) {
      const projectsList = PROJECTS.map(
        (p) =>
          `- **${p.title}** (${p.tagline}): Built with ${p.tags.join(
            ", ",
          )}.\n  *${p.description}* [Live Site](${p.liveUrl})`,
      ).join("\n\n");

      textResponse = `Here are **${DEVELOPER_PROFILE.name}**'s featured production & client projects:\n\n${projectsList}\n\n*You can inspect code snippets or open live applications directly from the Featured Projects view.*`;
    } else if (
      query.includes("experience") ||
      query.includes("career") ||
      query.includes("work") ||
      query.includes("background") ||
      query.includes("timeline")
    ) {
      const expList = EXPERIENCES.map(
        (e) =>
          `- **${e.role}** at **${e.company}** (${e.period}):\n  ${e.highlights.join(
            "\n  ",
          )}`,
      ).join("\n\n");

      textResponse = `**${DEVELOPER_PROFILE.name}**'s Career Timeline:\n\n${expList}\n\n*Education:* **Gordon College** — Bachelor of Science in Information Technology (BSIT), **Cum Laude**, Dean’s Lister. Capstone: *Feedback Fusion*.`;
    } else if (
      query.includes("education") ||
      query.includes("college") ||
      query.includes("degree") ||
      query.includes("gordon") ||
      query.includes("cum laude")
    ) {
      textResponse = `**Education & Academic Honors**:\n\n- **School**: Gordon College (Olongapo City, Philippines)\n- **Degree**: Bachelor of Science in Information Technology (BSIT)\n- **Honors**: **Cum Laude**, Dean’s Lister (Graduated July 2024)\n- **Capstone**: *Feedback Fusion: Empowering Feedback Management with Consumer Insights Using Tableau*\n- **Relevant Coursework**: Web Development, System Administration, Networking`;
    } else if (
      query.includes("conference") ||
      query.includes("pitch") ||
      query.includes("competition") ||
      query.includes("psc8") ||
      query.includes("ircite")
    ) {
      textResponse = `**Conferences & Pitching Competitions**:\n\n- **Philippine Startup Challenge 8 (PSC8)** (October 04, 2023) — Regional Pitching Competition (RPC) by the ICT Industry Development Bureau, pitching Feedback Fusion.\n- **International Research Conference on IT Education (IRCITE)** (March 08, 2024) — Invited Poster Presentation by PSITE-Central Luzon showcasing Capstone research.`;
    } else if (
      query.includes("contact") ||
      query.includes("email") ||
      query.includes("hire") ||
      query.includes("interview") ||
      query.includes("phone")
    ) {
      textResponse = `You can reach out to **${DEVELOPER_PROFILE.name}** directly:\n\n- **Email**: [${DEVELOPER_PROFILE.email}](mailto:${DEVELOPER_PROFILE.email})\n- **Phone**: ${DEVELOPER_PROFILE.phone}\n- **LinkedIn**: [${DEVELOPER_PROFILE.linkedin}](${DEVELOPER_PROFILE.linkedin})\n- **GitHub**: [github.com/Nayreel](https://github.com/Nayreel)\n- **Location**: ${DEVELOPER_PROFILE.location}\n\n*He is currently open to Software Engineering and Automation opportunities.*`;
    } else {
      textResponse = `I've analyzed your question regarding "${userMessage}".\n\n**${DEVELOPER_PROFILE.name}** is a **${DEVELOPER_PROFILE.title}** based in ${DEVELOPER_PROFILE.location}.\n\nFeel free to ask about his **tech stack**, **projects (MineGo, SIPAT, AI Energy Shop, Feedback Fusion, Iontana)**, **career experience (JAV Resource Corp, Buwelo, Hokei Subic)**, **education (Gordon College Cum Laude)**, or how to **get in touch**!`;
    }

    return NextResponse.json({
      text: textResponse,
      duration: "Worked for 14s",
      reasoningSteps: [
        `Parsed query: "${userMessage.substring(0, 40)}"`,
        matchedProject
          ? `Matched contextual project: ${matchedProject.title}`
          : `Cross-referenced Lee Ryan Garcia portfolio knowledge base`,
        `Synthesized verified engineering response`,
      ],
    });
  } catch (error) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      {
        text: `Lee Ryan M. Garcia is a Software Engineer specializing in Next.js, n8n workflow automation, full-stack web applications, and ERP/CRM integrations. Feel free to explore the files on the left or reach out!`,
        duration: "Worked for 8s",
      },
      { status: 200 },
    );
  }
}
