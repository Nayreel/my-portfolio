export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "",
    description: "",
    className: "lg:col-span-3 md:col-span-2 md:row-span-4 min-h-[30vh] lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/img/Barong.JPG",
    spareImgClassName: "",
    spareImg: "",
  },
  {
    id: 2,
    title: "I can adapt my schedule to any time zone.",
    description: "Time zone in Philippines (UTC +08:00)",
    className: "lg:col-span-2 md:col-span-4 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImgClassName: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I am willing to learn and adapt",
    className: "lg:col-span-2 md:col-span-4 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImgClassName: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Passionate about technology and development.",
    description: "",
    className: "text-center md:text-start lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "p-96",
    titleClassName: "justify-start",
    img: "/svg/grid.svg",
    spareImgClassName: "object-cover object-end w-48 h-48 md:w-40 md:h-40 lg:w-56 lg:h-56",
    spareImg: "/svg/innovation-animate.svg",
  },

  {
    id: 5,
    title: "My Computer Specifications",
    description: "",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 md:right-20 lg:right-0 bottom-0 w-40 md:w-52 lg:w-96",
    titleClassName: "justify-start md:justify-start lg:justify-start",
    img: "/svg/programming-animate.svg",
    spareImgClassName: "object-cover object-center w-full h-full",
    spareImg: "/svg/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImgClassName: "",
    spareImg: "",
  },
];

export const leftTechStack = [
    {
        id:0,
        name: "React.js"
    },
    {
        id:1,
        name:  "Next.js"
    },
    {
        id:2,
        name: "Node.js"
    },
];

export const rightTechStack = [
    {
        id: 0,
        name: "Tailwind CSS"
    },
    {
        id: 1,
        name:  "MongoDB"
    },
    {
        id: 2,
        name: "MySQL"
    },
];

export const leftSpecs = [
    {
        id:0,
        name: "16GB RAM"
    },
    {
        id:1,
        name:  "Ryzen 5 5600G"
    },
    {
        id:2,
        name: "1TB SSD Storage"
    },
];

export const rightSpecs= [
    {
        id: 0,
        name: "B450M Steel Legend"
    },
    {
        id: 1,
        name:  "Dual Monitor"
    },
    {
        id: 2,
        name: "PLDT FIBR 300mbps"
    },
];

export const projects = [
  {
    id: 1,
    title: "3D Solar System Planets to Explore",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://github.com/adrianhajdin?tab=repositories",
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://github.com/adrianhajdin/zoom-clone",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "https://github.com/adrianhajdin/ai_saas_app",
  },
  {
    id: 4,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://github.com/adrianhajdin/iphone",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Engineer Intern",
    desc: "Assisted in the development of a web-based platform using React.js, enhancing interactivity.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Mobile App Dev - JSM Tech",
    desc: "Designed and developed mobile app for both iOS & Android platforms using React Native.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance App Dev Project",
    desc: "Led the dev of a mobile app for a client, from initial concept to deployment on app stores.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Lead Frontend Developer",
    desc: "Developed and maintained user-facing features using modern frontend technologies.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
