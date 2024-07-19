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
    description: "Still willing to learn more",
    className: "lg:col-span-2 lg:row-span-5  md:col-span-4 md:row-span-2",
    imgClassName: "",
    titleClassName: "w-full items-center",
    img: "",
    spareImgClassName: "",
    spareImg: "",
  },

  {
    id: 4,
    title: "My Computer Specifications",
    description: "",
    className: "lg:col-span-3 lg:row-span-8 md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 md:right-20 lg:right-0 w-40 md:hidden lg:block lg:w-60 xl:w-80 lg:top-10 xl:-top-1",
    titleClassName: "w-full flex md:text-center lg:text-start lg:-top-5",
    img: "/svg/programming-animate.svg",
    spareImgClassName: "object-cover object-center w-full h-full",
    spareImg: "/svg/grid.svg",
  },
  {
    id: 5,
    title: "Passionate about technology and development.",
    description: "",
    className: "text-center md:justify-center md:text-start lg:col-span-2 lg:row-span-5 md:col-span-3 md:row-span-1",
    imgClassName: "p-96",
    titleClassName: "justify-start",
    img: "/svg/grid.svg",
    spareImgClassName: "object-cover object-end w-32 h-32 md:w-40 md:h-40 xl:w-56 xl:h-56",
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
        name:  "Next.js",
         svgpath:"/svg/next.svg"
    },
    {
        id: 2,
        name: "Git",
         svgpath:"/svg/git.svg"
    },
    {
      id: 3,
      name:"HTML",
       svgpath:"/svg/html.svg"
    }
];

export const rightTechStack = [
    {
      id: 0,
      name: "CSS",
       svgpath:"/svg/css.svg"
    },
    {
        id: 1,
        name: "Tailwind CSS",
         svgpath:"/svg/tail.svg"
    },
    {
        id: 2,
        name:  "MongoDB",
         svgpath:"/svg/mongodb.svg"
    },
    {
        id: 3,
        name: "MySQL",
         svgpath:"/svg/mysql.svg"
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
    title: "Philippine Startup Challenge 8 (PSC8) - Regional Pitching Competition",
    des: "Participated in the Regional Pitching Competition (RPC) by the ICT Industry Development Bureau, where we pitched our capstone project.",
    date: "October 04, 2023",
    img: "/img/PSC.jpeg",
  },
  {
    id: 2,
    title: "International Research Conference on Information Technology Education (IRCITE) - Poster Presentation",
    des: "Invited for Poster Presentation by the PSITE-Central Luzon where we showcase our capstone project.",
    date: "March 08, 2024",
    img: "/img/IRCITE-1.jpeg",
  },
  {
    id: 3,
    title: "Philippine Startup Challenge 8 (PSC8) - Regional Pitching Competition",
    des: "Participated in the Regional Pitching Competition (RPC) by the ICT Industry Development Bureau, where we pitched our capstone project.",
    date: "October 04, 2023",
    img: "/img/PSC-1.jpeg",
  },
  {
    id: 4,
    title: "International Research Conference on Information Technology Education (IRCITE) - Poster Presentation",
    des: "Invited for Poster Presentation by the PSITE-Central Luzon where we showcase our capstone project.",
    date: "March 08, 2024",
    img: "/img/IRCITE.jpeg",
  },
  {
    id: 5,
    title: "International Research Conference on Information Technology Education (IRCITE) - Poster Presentation",
    des: "Invited for Poster Presentation by the PSITE-Central Luzon where we showcase our capstone project.",
    date: "March 08, 2024",
    img: "/img/PSC-3.jpeg",
  },
  {
    id: 6,
    title: "International Research Conference on Information Technology Education (IRCITE) - Poster Presentation",
    des: "Invited for Poster Presentation by the PSITE-Central Luzon where we showcase our capstone project.",
    date: "March 08, 2024",
    img: "/img/PSC-2.jpeg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Hokei Subic Corporation (Feb. 2024 - July 2024)",
    desc: "I create a fast and smooth user experience using Next.js, Tailwind CSS, and Socket.io, with REST API methods connecting to server-side machine learning components.",
    className: "md:col-span-2",
    thumbnail: "/hokei.jfif",
  },
  {
    id: 2,
    title: "Intern",
    company: "CJR Graphics & Printing (Oct. 2019 - Dec. 2019)",
    desc: "Learned to use Adobe Photoshop for designing tarpaulins and ID lace sublimation for events like birthdays and christenings.",
    className: "md:col-span-2",
    thumbnail: "/img/cjr.jpg",
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
