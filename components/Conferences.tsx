"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { conferences } from "@/data";

const Conferences = () => {
  return <HeroParallax conferences={conferences} />;
}

export default Conferences;