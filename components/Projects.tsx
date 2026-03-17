import { projects } from "@/data";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3dCard";
import Image from "next/image";

const Projects = () => {
  return (
    <section id="project" className="project-container pb-20 pt-36">
      <h1 className="heading text-white">
        These projects represent my
        <span className="text-blue-600"> dedication </span>
        and
        <span className="text-blue-600"> hard work</span>
      </h1>

      {/* ✅ GRID */}
      <div className="project-container mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project) => (
          <div key={project.id} className="w-full h-full flex items-stretch">
            <CardContainer className="w-full h-full">
              <CardBody
                className="
                  h-full
                  flex flex-col justify-between
                  bg-gray-50
                  dark:bg-[#10132E]
                  border border-black/[0.1]
                  dark:border-white/[0.2]
                  rounded-xl
                  p-6
                  w-full
                "
              >
                {/* TITLE */}
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {project.title}
                </CardItem>

                {/* DESCRIPTION */}
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                >
                  {project.des}
                </CardItem>

                {/* IMAGE */}
                <CardItem translateZ="100" className="w-full mt-4">
                  <Image
                    src={project.img}
                    height={1000}
                    width={1000}
                    className="h-52 w-full object-contain rounded-xl"
                    alt="project"
                  />
                </CardItem>

                {/* ICONS */}
                <CardItem translateZ="100" className="w-full mt-4">
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    {project.iconLists.map((icon, i) => (
                      <Image
                        key={i}
                        src={icon}
                        width={40}
                        height={40}
                        alt="icon"
                        className="h-10 w-auto"
                      />
                    ))}
                  </div>
                </CardItem>

                {/* LINK */}
                <div className="flex justify-between items-center">
                  <CardItem
                    translateZ={20}
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    <a href={project.link}>
                      <p className="cursor-pointer opacity-50 hover:opacity-100">
                        Visit now →
                      </p>
                    </a>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
