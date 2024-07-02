import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { DownloadButton } from "./Buttons";
import { FaDownload } from "react-icons/fa";
import { TypewriterEffect } from "./ui/TypeWriterEffect";
import { words } from "@/data";

const Hero = () => {
  return (
    <div className="hero-container pb-20 pt-36">
      <div className="spotlight-container">
        {/* Spotlight effect */}
        <Spotlight
          className="spotlight1 -top-40 -left-10 md:left-96 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="spotlight2 top-10 left-full md:left-3/4 md:-top-20 h-[80vh] w-[50vw]"
          fill="blue"
        />
        <Spotlight
          className="spotlight3 top-40 left-56 md:-left-32 md:-top-20 h-[80vh] w-[50vw]"
          fill="blue"
        />
      </div>

      {/* Dot background */}
      <div className="dot-bg h-screen w-full dark:bg-black-100 bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center absolute top-0 left-0">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="desc-container flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <TextGenerateEffect
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
            words="Transforming ideas into interactive, responsive, and beautiful web applications."
          />
          <TypewriterEffect words={words}/>
          <DownloadButton icon={<FaDownload />} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
