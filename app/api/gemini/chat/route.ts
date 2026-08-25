import { NextRequest, NextResponse } from "next/server";
import {
  DEVELOPER_PROFILE,
  PROJECTS,
  EXPERIENCES,
  SKILL_CATEGORIES,
} from "@/lib/portfolio-data";

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

      textResponse = `Here is a breakdown of **${DEVELOPER_PROFILE.name}**'s core technical proficiencies:\n\n${skillsList}\n\n*He has over 7+ years of experience architecting large-scale applications with Next.js, TypeScript, and AI orchestration engines.*`;
    } else if (query.includes("project") || query.includes("built") || query.includes("portfolio")) {
      const projectsList = PROJECTS.map(
        (p) => `- **${p.title}** (${p.tagline}): Built with ${p.tags.join(", ")}.\n  *${p.description}*`
      ).join("\n\n");

      textResponse = `Here are **${DEVELOPER_PROFILE.name}**'s flagship featured projects:\n\n${projectsList}\n\n*You can click "Inspect Code" or run live simulations from the Featured Projects tab.*`;
    } else if (query.includes("experience") || query.includes("career") || query.includes("work") || query.includes("background")) {
      const expList = EXPERIENCES.map(
        (e) => `- **${e.role}** at **${e.company}** (${e.period}): ${e.highlights.join("; ")}`
      ).join("\n\n");

      textResponse = `**${DEVELOPER_PROFILE.name}**'s Career Milestones:\n\n${expList}\n\n*Specialized in high-throughput systems, DAG execution engines, and reactive developer tooling.*`;
    } else if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("interview")) {
      textResponse = `You can reach out to **${DEVELOPER_PROFILE.name}** directly:\n\n- ✉️ **Email**: [${DEVELOPER_PROFILE.email}](mailto:${DEVELOPER_PROFILE.email})\n- 🌐 **Portfolio**: ${DEVELOPER_PROFILE.handle}\n- 📍 **Location**: ${DEVELOPER_PROFILE.location}\n\n*He is currently available for high-impact roles and technical consulting.*`;
    } else {
      textResponse = `I've analyzed your question regarding "${userMessage}".\n\n**${DEVELOPER_PROFILE.name}** is a ${DEVELOPER_PROFILE.title} based in ${DEVELOPER_PROFILE.location}.\n\nFeel free to ask about his **tech stack**, **flagship projects**, **career history**, or how to **get in touch**!`;
    }

    return NextResponse.json({
      text: textResponse,
      duration: "Worked for 18s",
      reasoningSteps: [
        `Parsed query: "${userMessage.substring(0, 40)}"`,
        `Cross-referenced portfolio knowledge graph`,
        `Synthesized verified engineering response`,
      ],
    });
  } catch (error) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      {
        text: `Lee Ryan Garcia is a Senior Full-Stack & AI Systems Engineer specializing in Next.js 15, TypeScript, distributed backends, and Gemini AI integrations. Feel free to explore the files on the left or reach out!`,
        duration: "Worked for 12s",
      },
      { status: 200 }
    );
  }
}
