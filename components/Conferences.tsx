"use client";
import React from "react";
import { BackgroundGradient } from "./ui/BackgroundGradient";
import Image from "next/image";
import { conferences } from "@/data";

const Conferences = () => {
  return (
    <section id="conferences" className="project-container py-40">
      <h1 className="heading text-white">
        My journey through various compet
        <span className="text-blue-600">IT</span>ions.
      </h1>

      <div className="conferences-container flex flex-col md:flex-col lg:flex-row gap-10 justify-between p-20">
        {conferences.map((conference) => (
          <div key={conference.id}>
            <BackgroundGradient className="rounded-[22px] lg:max-w-lg p-10 lg:p-15 sm:p-10 bg-white dark:bg-zinc-900">
            <Image
              src={conference.img}
              alt="conference"
              height="400"
              width="400"
              className="cursor-pointer object-contain justify-center flex content-center w-auto h-auto"
            />
            <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
              {conference.title}
            </p>

            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {conference.des}
            </p>
            <p className="text-end text-md text-neutral-600 dark:text-neutral-400">
              {conference.date}
            </p>
          </BackgroundGradient>
          </div>
        ))}
        </div>
    </section>
  );
};

export default Conferences;
