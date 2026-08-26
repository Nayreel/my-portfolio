import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: 0,
    title: "AI Energy Shop - Software Engineer",
    tagline:
      "Australian e-commerce platform for solar power systems & automated energy solutions",
    description:
      "AI Energy Shop is an Australian-based e-commerce company specializing in solar power systems, battery storage, and energy-efficient solutions, with custom automation workflows, and scalable web systems.",
    des: "AI Energy Shop is an Australian-based e-commerce company specializing in solar power systems, battery storage, and energy-efficient solutions, with custom automation workflows, and scalable web systems.",
    category: "AI & Automation",
    tags: [
      "Next.js",
      "n8n Automation",
      "Tailwind CSS",
      "Redux",
      "TypeScript",
      "E-Commerce",
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
  {
    id: 3,
    title: "Narra Tree Sav - Project with Client",
    tagline:
      "Savannah's authentic Filipino restaurant website with GSAP animations",
    description:
      "The Narra Tree has become Savannah's best restaurant for authentic Filipino cuisine and exceptional hospitality.",
    des: "The Narra Tree has become Savannah's best restaurant for authentic Filipino cuisine and exceptional hospitality.",
    category: "Client Work",
    tags: ["Next.js", "Tailwind CSS", "Shadcn UI", "GSAP", "TypeScript"],
    metrics: [
      { label: "Location", value: "Savannah, GA" },
      { label: "Motion", value: "GSAP Interactive" },
      { label: "Responsiveness", value: "Mobile Optimized" },
    ],
    featured: true,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://www.narratreesav.com",
    link: "https://www.narratreesav.com",
    img: "/img/narratreesav.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/tail.svg",
      "/svg/shadcn.svg",
      "/svg/gsap.svg",
    ],
    stars: 74,
    forks: 9,
    imageColor: "from-emerald-600/30 via-green-600/20 to-lime-600/30",
    accent: "#10b981",
    highlightCode: `// GSAP Hero Entrance & Menu Interaction
export function initNarraTreeAnimations() {
  gsap.from('.hero-headline', {
    duration: 1.2,
    y: 40,
    opacity: 0,
    ease: 'power3.out',
    stagger: 0.15,
  });
}`,
  },
  {
    id: 4,
    title: "Silk Route Sav - Project with Client",
    tagline: "Fine dining and authentic culinary showcase in Savannah, Georgia",
    description:
      "SILK ROUTE is the best restaurant in Savannah, GA, offering exceptional fine dining, outstanding service, and unforgettable culinary experiences.",
    des: "SILK ROUTE is the best restaurant in Savannah, GA, offering exceptional fine dining, outstanding service, and unforgettable culinary experiences.",
    category: "Client Work",
    tags: ["Next.js", "Tailwind CSS", "Shadcn UI", "GSAP", "TypeScript"],
    metrics: [
      { label: "Niche", value: "Fine Dining" },
      { label: "UX Polish", value: "Premium GSAP" },
      { label: "SEO Score", value: "98/100" },
    ],
    featured: false,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://www.silkroutesav.com",
    link: "https://www.silkroutesav.com",
    img: "/img/silkroutesav.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/tail.svg",
      "/svg/shadcn.svg",
      "/svg/gsap.svg",
    ],
    stars: 65,
    forks: 8,
    imageColor: "from-purple-600/30 via-fuchsia-600/20 to-pink-600/30",
    accent: "#d946ef",
    highlightCode: `// Silk Route Menu Filtering & Image Gallery
export function filterMenuItems(category: string) {
  return silkRouteDishes.filter((dish) => 
    category === 'All' ? true : dish.course === category
  );
}`,
  },
  {
    id: 5,
    title: "Subic Spot - Personal Project",
    tagline:
      "Comprehensive tourism management and discovery portal for Subic Bay",
    description:
      "Tourism management system where you can find all tourists spot at Subic Bay!",
    des: "Tourism management system where you can find all tourists spot at Subic Bay!",
    category: "Personal & Capstone",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "MongoDB",
      "Node.js",
      "Aceternity UI",
      "TypeScript",
    ],
    metrics: [
      { label: "Region", value: "Subic Bay" },
      { label: "UI Effect", value: "Aceternity UI" },
      { label: "Database", value: "MongoDB" },
    ],
    featured: false,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://subicspot.vercel.app/",
    link: "https://subicspot.vercel.app/",
    img: "/img/subicspot.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/tail.svg",
      "/svg/mongodb.svg",
      "/svg/nodejs.svg",
      "/svg/aceternity-ui.svg",
    ],
    stars: 52,
    forks: 7,
    imageColor: "from-cyan-600/30 via-blue-600/20 to-indigo-600/30",
    accent: "#06b6d4",
    highlightCode: `// Subic Spot Location Discovery Algorithm
export async function getSpotsByDistance(lat: number, lng: number) {
  return await TouristSpotModel.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lng, lat] },
        distanceField: 'distanceMeters',
        spherical: true,
      },
    },
  ]);
}`,
  },
  {
    id: 6,
    title: "ByteMe - Personal Project",
    tagline:
      "Modern, responsive restaurant platform & Point-of-Sale (POS) system",
    description:
      "ByteMe is a sample restaurant platform built to showcase a modern POS system; fast, responsive, and designed for real-world efficiency.",
    des: "ByteMe is a sample restaurant platform built to showcase a modern POS system; fast, responsive, and designed for real-world efficiency.",
    category: "Personal & Capstone",
    tags: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js", "Shadcn UI"],
    metrics: [
      { label: "System", value: "POS & Ordering" },
      { label: "Real-time", value: "Live Cart" },
      { label: "Design", value: "Shadcn UI" },
    ],
    featured: false,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://byteme-hazel.vercel.app/",
    link: "https://byteme-hazel.vercel.app/",
    img: "/img/byteme.png",
    iconLists: [
      "/svg/next.svg",
      "/svg/tail.svg",
      "/svg/mongodb.svg",
      "/svg/nodejs.svg",
      "/svg/shadcn.svg",
    ],
    stars: 48,
    forks: 6,
    imageColor: "from-rose-600/30 via-orange-600/20 to-amber-600/30",
    accent: "#f43f5e",
    highlightCode: `// POS Cart Calculation & Table State
export function calculateOrderTotal(items: CartItem[], taxRate = 0.12) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  return { subtotal, tax, total: subtotal + tax };
}`,
  },
  {
    id: 7,
    title: "D-Leecious Tea - Personal Project",
    tagline: "Delightful milk tea brand showcase & interactive branch locator",
    description:
      "Showcasing our delightful milk tea varieties with a modern and engaging website. View locations for each branch.",
    des: "Showcasing our delightful milk tea varieties with a modern and engaging website. View locations for each branch.",
    category: "Personal & Capstone",
    tags: ["Next.js", "Tailwind CSS", "Responsive Design", "TypeScript"],
    metrics: [
      { label: "Type", value: "Product Showcase" },
      { label: "Branches", value: "Multi-Location" },
      { label: "Mobile", value: "Fluid Layout" },
    ],
    featured: false,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://d-leecious-tea.vercel.app",
    link: "https://d-leecious-tea.vercel.app",
    img: "/img/d-leecioustea.png",
    iconLists: ["/svg/next.svg", "/svg/tail.svg"],
    stars: 39,
    forks: 4,
    imageColor: "from-amber-600/30 via-rose-600/20 to-orange-600/30",
    accent: "#d97706",
    highlightCode: `// Branch Locator & Flavor Catalog
export function getBranchDetails(branchId: string) {
  return branches.find((b) => b.id === branchId) || branches[0];
}`,
  },
  {
    id: 8,
    title: "Squiz It - Project with Client",
    tagline:
      "Real-time interactive quiz platform with live score updates & socket rooms",
    description:
      "Real-time quiz application enabling interactive and engaging quizzes. Features include live score updates, leaderboard, and countdown.",
    des: "Real-time quiz application enabling interactive and engaging quizzes. Features include live score updates, leaderboard, and countdown.",
    category: "Client Work",
    tags: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "CSS",
      "Socket.io",
      "Real-Time",
    ],
    metrics: [
      { label: "Protocol", value: "WebSockets / Socket.io" },
      { label: "Feature", value: "Live Leaderboard" },
      { label: "Latency", value: "Real-time" },
    ],
    featured: true,
    githubUrl: "https://github.com/Nayreel",
    liveUrl: "https://squizit-chi.vercel.app/",
    link: "https://squizit-chi.vercel.app/",
    img: "/img/squizit.png",
    iconLists: [
      "/svg/mongodb.svg",
      "/svg/expressjs.svg",
      "/svg/reactjs.svg",
      "/svg/nodejs.svg",
      "/svg/css.svg",
      "/svg/socketio.svg",
    ],
    stars: 82,
    forks: 11,
    imageColor: "from-violet-600/30 via-purple-600/20 to-indigo-600/30",
    accent: "#8b5cf6",
    highlightCode: `// Socket.io Room & Real-Time Leaderboard Handler
io.on('connection', (socket) => {
  socket.on('submit_answer', ({ roomId, userId, answerId, timeLeft }) => {
    const isCorrect = validateAnswer(answerId);
    const points = isCorrect ? Math.floor(1000 * (timeLeft / 30)) : 0;
    updateRoomLeaderboard(roomId, userId, points);
    io.to(roomId).emit('leaderboard_update', getLeaderboard(roomId));
  });
});`,
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
];

export const projects = PROJECTS;
