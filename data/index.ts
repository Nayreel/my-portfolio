export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const words = [
  {
    text: "Hi!",
    className: "mt-10 text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl"
  },
  {
    text: "I'm",
     className: "text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl"
  },
  {
    text: "Lee",
     className: "text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl"
  },
  {
    text: "Ryan",
     className: "text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl"
  },
  {
    text: "M.",
     className: "text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl"
  },
  {
    text: "Garcia,",
     className: "text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl"
  },
  {
    text: "Your",
    className: "text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl",
  },
  {
    text: "Future",
    className: "text-center md:tracking-wider text-blue-100 mb-1 text-lg md:text-lg lg:text-2xl",
  },
  {
    text: "<Frontend",
    className: "text-center md:tracking-wider text-blue-600 dark:text-blue-600 mb-1 text-lg md:text-lg lg:text-2xl",
  },
  {
    text: "Developer/>",
    className: "text-center md:tracking-wider text-blue-600 dark:text-blue-600 mb-1 text-lg md:text-lg lg:text-2xl",
  },
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
    className: "lg:col-span-2 lg:row-span-4 lg:row-span-2 md:col-span-4 md:row-span-2",
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
    className: "lg:col-span-2 lg:row-span-5  md:col-span-4 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImgClassName: "",
    spareImg: "",
  },

  {
    id: 4,
    title: "My Computer Specifications",
    description: "",
    className: "lg:col-span-3 lg:row-span-8 md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 md:right-20 lg:right-0 w-40 md:hidden lg:block lg:w-80 -top-1",
    titleClassName: "w-full flex md:text-center lg:text-start lg:-top-5",
    img: "/svg/programming-animate.svg",
    spareImgClassName: "object-cover object-center w-full h-full",
    spareImg: "/svg/grid.svg",
  },
  {
    id: 5,
    title: "Passionate about technology and development.",
    description: "",
    className: "text-center md:text-start lg:col-span-2 lg:row-span-5 md:col-span-3 md:row-span-1",
    imgClassName: "p-96",
    titleClassName: "justify-start",
    img: "/svg/grid.svg",
    spareImgClassName: "object-cover object-end w-48 h-48 md:w-40 md:h-40 lg:w-56 lg:h-56",
    spareImg: "/svg/innovation-animate.svg",
  },
];

export const leftTechStack = [
    {
        id: 0,
        name: "React.js",
        svgpath:"/svg/reactjs.svg"
    },
    {
        id: 1,
        name:  "Next.js"
    },
    {
        id: 2,
        name: "Node.js"
    },
    {
      id: 3,
      name:"HTML"
    }
];

export const rightTechStack = [
    {
      id: 0,
      name: "CSS"
    },
    {
        id: 1,
        name: "Tailwind CSS"
    },
    {
        id: 2,
        name:  "MongoDB"
    },
    {
        id: 3,
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
        name: "PLDT FIBR"
    },
];

export const projects = [
  {
    id: 1,
    title: "Feedback Fusion - Customer Feedback Management System",
    des: "Analyzes customer feedback sentiment and generates survey QR codes by business owners.",
    img: "/img/feedbackfusion.png",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://feedbackfusion.online",
  },
  {
    id: 2,
    title: "ChatMoko - Messaging Chat",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/img/chatmoko.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://chat-moko.vercel.app",
  },
];

export const conferences = [
  {
    id: 1,
    title: "Philippine Startup Challenge 8",
    des: "Participated in the Regional Pitching Competition by the ICT Industry Development Bureau, where we pitched our capstone project.",
    date: "October 04, 2023",
    img: "/img/PSC.jpeg",
    link: "https://feedbackfusion.online",
  },
  {
    id: 2,
    title: "International Research Conference on Information Technology Education (IRCITE)",
    des: "Invited for Poster Presentation by the PSITE-Central Luzon where we showcase our capstone project.",
    date: "March 08, 2024",
    img: "/img/IRCITE.jpeg",
    link: "https://chat-moko.vercel.app",
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
