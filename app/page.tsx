import React from "react";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import Conferences from "@/components/Conferences";
import { FaPeopleGroup } from "react-icons/fa6";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <FaHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <IoPerson className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: (
      <CgWebsite className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    name: "Conferences",
    link: "#conferences",
    icon: (
      <FaPeopleGroup className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems}/>
        <Hero />
        <Grid/>
        <Projects/>
        <Conferences/>
      </div>
    </main>
  );
}
