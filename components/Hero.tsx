"use client";
import React from "react";
import { WavyBackground } from "./ui/Wavy-background";

const Hero = () => {
  return (
    <div className="hero-container">
      <WavyBackground className="max-w-4xl mx-auto pb-40">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          Lee Ryan M. Garcia
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          a frontend developer who turns visions into interactive realities
        </p>
      </WavyBackground>
    </div>
  );
};

export default Hero;
