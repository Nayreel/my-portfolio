import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/Text-Generate-Effect";

const Hero = () => {
  return (
    <div className="hero-container pb-20 pt-36">
      <div className="spotlight-container">
        {/* Spotlight effect */}
        <Spotlight
          className="spotlight1 -top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="spotlight2 top-10 left-full md:-left-32 md:-top-20 h-[80vh] w-[50vw]"
          fill="blue"
        />
        <Spotlight
          className="spotlight3 top-28 left-80 md:-left-32 md:-top-20 h-[80vh] w-[50vw]"
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
            words="Transform Ideas Into Realities"
          />
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Lee Ryan M. Garcia
          </h2>

          <p className="text-center md:tracking-wider text-blue-100 mb-4 text-sm md:text-lg lg:text-2xl">
            Frontend Developer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
