// data/projects/featuredProjects.ts
import { Project } from "@/types/portfolio";

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 0,
    title: "MineGo - Live Commerce Platform",
    tagline:
      "Philippine-focused live-shopping platform with real-time bidding, streaming, and automated seller workflows",
    description:
      "A high-concurrency live commerce web platform featuring sub-second real-time bidding, live streaming broadcasts, secure escrow payments, automated shipping integration, and end-to-end seller order management.",
    des: "Live commerce platform featuring real-time bidding, streaming broadcasts, payments, shipping integration, and seller workflows.",
    category: "Web & Automation",
    tags: [
      "Next.js",
      "GraphQL",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "LiveKit",
      "Docker",
      "TypeScript",
    ],
    architectureStack: [
      "Next.js",
      "GraphQL",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "LiveKit",
      "Docker",
    ],
    problem:
      "Traditional live selling in the Philippines relies on manual chat comments ('mine'), leading to order disputes, ghost buyers, lost inventory counts, and slow manual bank verification.",
    solution:
      "Engineered an integrated live commerce web app with WebRTC video streaming, synchronized real-time countdown bidding, automatic winner carting, and integrated courier rate estimation.",
    whatISolved: [
      "Real-time synchronized countdown bidding with Redis lock handling",
      "Low-latency WebRTC live streaming integration via LiveKit",
      "Automated winner checkout, payment verification, and escrow flow",
      "Multi-tenant seller inventory and automated shipping label generation",
      "Containerized microservices deployed with Docker and PostgreSQL",
    ],
    metrics: [
      { label: "Bidding Latency", value: "<150ms" },
      { label: "Architecture", value: "GraphQL + Redis" },
      { label: "Streaming", value: "WebRTC LiveKit" },
    ],
    featured: true,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://minego.app",
    link: "https://minego.app",
    img: "/img/aienergyshop.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/graphql.svg",
      "/svg/postgresql.svg",
      "/svg/redis.svg",
      "/svg/docker.svg",
    ],
    stars: 180,
    forks: 34,
    imageColor: "from-sky-600/30 via-indigo-600/20 to-blue-600/30",
    accent: "#38bdf8",
    highlightCode: `// Real-Time Bidding Lock & Atomic Bid Verification
export async function processLiveBid({ auctionId, bidderId, bidAmount }: BidPayload) {
  const lockKey = \`auction:lock:\${auctionId}\`;
  const acquired = await redis.set(lockKey, bidderId, 'PX', 500, 'NX');
  if (!acquired) throw new Error('Concurrent bid in progress');
  
  try {
    const currentHighest = await redis.get(\`auction:highest:\${auctionId}\`);
    if (bidAmount <= Number(currentHighest || 0)) {
      throw new Error('Bid must be strictly higher than current amount');
    }
    await redis.set(\`auction:highest:\${auctionId}\`, bidAmount);
    await pubsub.publish(\`AUCTION_UPDATED_\${auctionId}\`, { highestBid: bidAmount, bidderId });
    return { success: true, bidAmount };
  } finally {
    await redis.del(lockKey);
  }
}`,
  },
  {
    id: 9,
    title: "SIPAT - Tactical Radar & Citizen Recon Network",
    tagline:
      "Community-driven real-time geospatial radar & tactical sightings network",
    description:
      "A community-driven real-time radar and sightings platform (inspired by Spidey Tracker) where citizens report, discover, and track live neighborhood events, road hazards, lost pets, weather alerts, and public safety updates around them in real time.",
    des: "Community-driven real-time radar & sightings platform to report, discover, and track live neighborhood events, road hazards, and public safety in real time.",
    category: "Personal & Capstone",
    tags: [
      "Next.js 16",
      "NestJS",
      "GraphQL",
      "Socket.io",
      "Leaflet",
      "PostgreSQL",
      "Prisma",
      "Web Audio API",
      "TypeScript",
    ],
    architectureStack: [
      "Next.js 16",
      "NestJS",
      "GraphQL",
      "Socket.io",
      "PostgreSQL",
      "Prisma",
      "Leaflet",
      "Web Audio API",
    ],
    problem:
      "Community hazard reporting usually happens through fragmented social media groups where location data is imprecise, updates aren't synchronized in real-time, and emergency alerts get buried.",
    solution:
      "Engineered a real-time tactical radar web platform combining Leaflet mapping, WebSockets for sub-second incident broadcasts, and customized audio synthesis.",
    whatISolved: [
      "Real-time geospatial telemetry & incident broadcast via WebSockets / Socket.io",
      "Sub-second radar sweep and sighting distribution with geo-indexed PostgreSQL",
      "Dynamic sound effect synthesis in the browser using Web Audio API",
      "Type-safe GraphQL mutations and subscriptions backed by Prisma ORM",
    ],
    metrics: [
      { label: "Live Telemetry", value: "Socket.io + Leaflet" },
      { label: "Data Layer", value: "GraphQL + PostgreSQL" },
      { label: "Audio Synthesis", value: "Web Audio API" },
    ],
    featured: true,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://sipat-eta.vercel.app/",
    link: "https://sipat-eta.vercel.app/",
    img: "/img/sipat.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/nodejs.svg",
      "/svg/socketio.svg",
      "/svg/tail.svg",
    ],
    stars: 145,
    forks: 22,
    imageColor: "from-amber-500/30 via-yellow-600/20 to-orange-500/30",
    accent: "#f59e0b",
    highlightCode: `// Socket.io Tactical Radar Sighting Broadcast Gateway
@WebSocketGateway({ cors: { origin: '*' } })
export class SightingsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('sighting:create')
  handleNewSighting(@MessageBody() payload: CreateSightingDto) {
    this.server.emit('sighting:broadcast', {
      ...payload,
      coordinates: [payload.lat, payload.lng],
      timestamp: new Date().toISOString(),
    });
  }
}`,
  },
  {
    id: 10,
    title: "AI Energy Shop - Software Engineer",
    tagline:
      "Australian e-commerce platform for solar power systems & automated energy solutions",
    description:
      "AI Energy Shop is an Australian-based e-commerce company specializing in solar power systems, battery storage, and energy-efficient solutions, with custom automation workflows, and scalable web systems.",
    des: "AI Energy Shop is an Australian-based e-commerce company specializing in solar power systems, battery storage, and energy-efficient solutions, with custom automation workflows, and scalable web systems.",
    category: "Web & Automation",
    tags: [
      "Next.js",
      "n8n Automation",
      "Tailwind CSS",
      "Redux",
      "TypeScript",
      "E-Commerce",
    ],
    architectureStack: [
      "Next.js",
      "n8n",
      "Tailwind CSS",
      "Redux",
      "TypeScript",
      "Webhooks",
    ],
    problem:
      "Manual processing of complex solar system quotes and multi-step distributor inventory sync was slowing down quote turnaround times and order fulfillment.",
    solution:
      "Architected custom n8n pipelines coupled with a Next.js frontend to automate product catalog synchronization, lead qualification, and customer notifications.",
    whatISolved: [
      "10+ n8n automated workflows connecting CRM, ERP, and customer alerts",
      "Dynamic solar capacity estimator calculating ROI based on Australian regional tariffs",
      "High-performance responsive UI with Redux state persistence and clean UX",
    ],
    metrics: [
      { label: "Workflows", value: "10+ n8n" },
      { label: "Architecture", value: "Scalable Next.js" },
      { label: "Target Market", value: "Australia" },
    ],
    featured: true,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://aienergyshop.com.au",
    link: "https://aienergyshop.com.au",
    img: "/img/aienergyshop.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/n8n.svg",
      "/svg/tail.svg",
      "/svg/redux.svg",
    ],
    stars: 124,
    forks: 18,
    imageColor: "from-amber-600/30 via-orange-600/20 to-yellow-600/30",
    accent: "#f59e0b",
    highlightCode: `// n8n Automated Order & ERP Sync Pipeline
export async function syncOrderToERP(orderPayload: OrderDetails) {
  const workflowResponse = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: orderPayload.id,
      customer: orderPayload.customer,
      items: orderPayload.items,
      syncedAt: new Date().toISOString(),
    }),
  });
  return workflowResponse.json();
}`,
  },
  {
    id: 1,
    title: "Feedback Fusion - Capstone Project",
    tagline:
      "Customer sentiment analysis & dynamic QR feedback generation platform",
    description:
      "Analyzes customer feedback sentiment and generates survey QR codes by business owners. Presented at regional pitching competitions and research conferences.",
    des: "Analyzes customer feedback sentiment and generates survey QR codes by business owners.",
    category: "Personal & Capstone",
    tags: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "CSS",
      "Sentiment Analysis",
      "Tableau",
    ],
    metrics: [
      { label: "Competition", value: "PSC8 RPC" },
      { label: "Research", value: "IRCITE 2024" },
      { label: "Stack", value: "MERN + Analytics" },
    ],
    featured: true,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://feedbackfusion.vercel.app",
    link: "https://feedbackfusion.vercel.app",
    img: "/img/feedbackfusion.png",
    iconLists: [
      "/svg/mongodb.svg",
      "/svg/expressjs.svg",
      "/svg/reactjs.svg",
      "/svg/nodejs.svg",
      "/svg/css.svg",
    ],
    stars: 88,
    forks: 14,
    imageColor: "from-blue-600/30 via-indigo-600/20 to-purple-600/30",
    accent: "#38bdf8",
    highlightCode: `// Sentiment Analysis & QR Generation Engine
export async function analyzeFeedbackSentiment(feedbackText: string) {
  const score = computePolarityScore(feedbackText);
  const qrCodeData = await generateDynamicQRCode({
    businessId: currentBusiness.id,
    targetSurveyUrl: \`https://feedbackfusion.vercel.app/survey/\${currentBusiness.slug}\`,
  });
  return { sentiment: score > 0 ? 'POSITIVE' : 'NEUTRAL_OR_NEGATIVE', qrCodeData };
}`,
  },
  {
    id: 2,
    title: "Iontana - Project with Client",
    tagline:
      "Modern scalable website with real-time AI Voice Support via n8n + VAPI",
    description:
      "Iontana builds modern, fast, and secure websites designed for scalability, with an AI Voice Support using n8n + VAPI for real-time automated website assistance.",
    des: "Iontana builds modern, fast, and secure websites designed for scalability, with an AI Voice Support using n8n + VAPI for real-time automated website assistance.",
    category: "Client Work",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "MongoDB",
      "Node.js",
      "Shadcn UI",
      "n8n",
      "VAPI (AI Voice)",
    ],
    metrics: [
      { label: "AI Voice", value: "VAPI + n8n" },
      { label: "UI Library", value: "Shadcn UI" },
      { label: "Performance", value: "100 Lighthouse" },
    ],
    featured: true,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://www.iontana.com",
    link: "https://www.iontana.com",
    img: "/img/iontana.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/tail.svg",
      "/svg/mongodb.svg",
      "/svg/nodejs.svg",
      "/svg/shadcn.svg",
      "/svg/n8n.svg",
    ],
    stars: 96,
    forks: 12,
    imageColor: "from-teal-600/30 via-cyan-600/20 to-sky-600/30",
    accent: "#14b8a6",
    highlightCode: `// VAPI Voice Agent & n8n Assistant Hook
export const useAIVoiceAssistant = () => {
  const startVoiceSession = async () => {
    const vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_KEY!);
    await vapiInstance.start({
      assistantId: process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!,
      variableValues: { userName: 'Valued Client' },
    });
  };
  return { startVoiceSession };
};`,
  },
];
