/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

export const HeroParallax = ({
  conferences,
}: {
  conferences: {
    title: string;
    img: string;
    date: string;
  }[];
}) => {
  const firstRow = conferences.slice(0, 6);
  const secondRow = conferences.slice(0, 6);
  const thirdRow = conferences.slice(0, 6);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateXFirstRow = useSpring(
    useTransform(scrollYProgress, [0, 1], [1500, 2500]),
    springConfig
  );
  const translateXSecondRow = useSpring(
    useTransform(scrollYProgress, [0, 1], [-1000, 1000]),
    springConfig
  );
  const translateThirdRow = useSpring(
    useTransform(scrollYProgress, [0, 1], [-1000, 2000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-0 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((conference) => (
            <ConferenceCard
              conference={conference}
              translate={translateXFirstRow}
              key={conference.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((conference) => (
            <ConferenceCard
              conference={conference}
              translate={translateXSecondRow}
              key={conference.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((conference) => (
            <ConferenceCard
              conference={conference}
              translate={translateThirdRow}
              key={conference.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <section id="conference" className="project-container -mb-80">
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
        <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
          My journey through various compet
          <span className="text-blue-600">IT</span>ions.
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
          Our Capstone Project titled{" "}
          <b>
            "Empowering Feedback Management With Consumer Insights Using
            Tableau"
          </b>
          , we proudly participated in various competitions throughout our
          college journey.
        </p>
      </div>
    </section>
  );
};

export const ConferenceCard = ({
  conference,
  translate,
}: {
  conference: {
    title: string;
    img: string;
    date: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={conference.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Image
        src={conference.img}
        height="600"
        width="600"
        className="object-cover object-left-top absolute h-full w-full inset-0"
        alt={conference.title}
      />
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h1 className="absolute top-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {conference.date}
      </h1>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {conference.title}
      </h2>
    </motion.div>
  );
};
