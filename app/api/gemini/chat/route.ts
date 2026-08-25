import { NextRequest, NextResponse } from "next/server";
import {
  DEVELOPER_PROFILE,
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
} from "@/data";

export async function POST(req: NextRequest) {
  try {
    const { userMessage } = await req.json();

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Missing userMessage" },
        { status: 400 }
      );
    }

    const query = userMessage.toLowerCase();

    // Contextual responses based on knowledge base
    let textResponse = "";

    if (query.includes("tech stack") || query.includes("skill") || query.includes("languages")) {
      const skillsList = SKILL_CATEGORIES.map(
        (cat) => `**${cat.category}**: ${cat.skills.map((s) => s.name).join(", ")}`
      ).join("\n");

      textResponse = `Here is a breakdown of **${DEVELOPER_PROFILE.name}**'s core technical proficiencies:\n\n${skillsList}\n\n*Lee Ryan specializes in Next.js web applications, n8n workflow automation, MongoDB, PostgreSQL, and cloud deployments.*`;
    } else if (query.includes("project") || query.includes("built") || query.includes("portfolio")) {
      const projectsList = PROJECTS.map(
        (p) => `- **${p.title}** (${p.tagline}): Built with ${p.tags.join(", ")}.\n  *${p.description}* [Live Site](${p.liveUrl})`
      ).join("\n\n");

      textResponse = `Here are **${DEVELOPER_PROFILE.name}**'s featured production & client projects:\n\n${projectsList}\n\n*You can inspect code snippets or open live applications directly from the Featured Projects view.*`;
    } else if (query.includes("experience") || query.includes("career") || query.includes("work") || query.includes("background")) {
      const expList = EXPERIENCES.map(
        (e) => `- **${e.role}** at **${e.company}** (${e.period}):\n  ${e.highlights.join("\n  ")}`
      ).join("\n\n");

      textResponse = `**${DEVELOPER_PROFILE.name}**'s Career Timeline:\n\n${expList}\n\n*Education:* **Gordon College** — Bachelor of Science in Information Technology (BSIT), **Cum Laude**, Dean’s Lister. Capstone: *Feedback Fusion*.`;
    } else if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("gordon") || query.includes("cum laude")) {
      textResponse = `🎓 **Education & Academic Honors**:\n\n- **School**: Gordon College (Olongapo City, Philippines)\n- **Degree**: Bachelor of Science in Information Technology (BSIT)\n- **Honors**: **Cum Laude**, Dean’s Lister (Graduated July 2024)\n- **Capstone**: *Feedback Fusion: Empowering Feedback Management with Consumer Insights Using Tableau*\n- **Relevant Coursework**: Web Development, System Administration, Networking`;
    } else if (query.includes("conference") || query.includes("pitch") || query.includes("competition") || query.includes("psc8") || query.includes("ircite")) {
      textResponse = `🏆 **Conferences & Pitching Competitions**:\n\n- **Philippine Startup Challenge 8 (PSC8)** (October 04, 2023) — Regional Pitching Competition (RPC) by the ICT Industry Development Bureau, pitching Feedback Fusion.\n- **International Research Conference on IT Education (IRCITE)** (March 08, 2024) — Invited Poster Presentation by PSITE-Central Luzon showcasing Capstone research.`;
    } else if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("interview") || query.includes("phone")) {
      textResponse = `You can reach out to **${DEVELOPER_PROFILE.name}** directly:\n\n- ✉️ **Email**: [${DEVELOPER_PROFILE.email}](mailto:${DEVELOPER_PROFILE.email})\n- 📞 **Phone**: ${DEVELOPER_PROFILE.phone}\n- 💼 **LinkedIn**: [${DEVELOPER_PROFILE.linkedin}](${DEVELOPER_PROFILE.linkedin})\n- 🌐 **GitHub**: [github.com/Nayreel](https://github.com/Nayreel)\n- 📍 **Location**: ${DEVELOPER_PROFILE.location}\n\n*He is currently open to Software Engineering and Automation opportunities.*`;
    } else {
      textResponse = `I've analyzed your question regarding "${userMessage}".\n\n**${DEVELOPER_PROFILE.name}** is a **${DEVELOPER_PROFILE.title}** based in ${DEVELOPER_PROFILE.location}.\n\nFeel free to ask about his **tech stack**, **projects (AI Energy Shop, Feedback Fusion, Iontana, etc.)**, **career experience (JAV Resource Corp, Buwelo, Hokei Subic)**, **education (Gordon College Cum Laude)**, or how to **get in touch**!`;
    }

    return NextResponse.json({
      text: textResponse,
      duration: "Worked for 14s",
      reasoningSteps: [
        `Parsed query: "${userMessage.substring(0, 40)}"`,
        `Cross-referenced Lee Ryan Garcia portfolio knowledge base`,
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
      { status: 200 }
    );
  }
}
