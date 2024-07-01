"use client";
import { cn } from "@/utils/cn";
import { BackgroundGradientAnimation } from "./GradientBg";
import { GlobeDemo } from "./GridGlobe";
import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import animationData from "@/data/confetti.json";
import { CopyButton } from "../Buttons";
import { IoCopyOutline } from "react-icons/io5";
import { leftSpecs, leftTechStack, rightSpecs, rightTechStack } from "@/data";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImgClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImgClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("leeryan307@gmail.com");
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(196,222,235,0) 2%, rgba(0,121,255,1) 11%, rgba(34,34,246,1) 46%, rgba(75,75,204,1) 67%, rgba(33,65,128,1) 80%, rgba(0,0,0,1) 100%, rgba(0,212,255,1) 800%)",
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>

        <div
          className={`absolute right-0 -bottom-5 ${
            id === 5 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className={spareImgClassName}
            />
          )}
        </div>
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-white  text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>

          {id === 2 && <GlobeDemo />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftTechStack.map((item) => (
                  <span
                    key={item.id}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center text-white bg-[#10132E]"
                  >
                    {item.name}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
                {rightTechStack.map((item) => (
                  <span
                    key={item.id}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center text-white bg-[#10132E]"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="copy-btn-container mt-5 relative pb-5">
              <div
                className={`absolute -bottom-5 right-0 ${
                  copied ? "block" : "block"
                }`}
              >
                {/* <img src="/confetti.gif" alt="confetti" /> */}
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>
              <div className="btn-container absolute flex w-full justify-center">
                <CopyButton
                  title={copied ? "Email Copied!" : "Copy email"}
                  icon={<IoCopyOutline />}
                  position="left"
                  onClick={handleCopy}
                />
              </div>
            </div>
          )}

          {id === 5 && (
            <div className="flex flex-col md:flex-row lg:flex-row gap-2 md:gap-10 lg:gap-5 w-fit absolute left-3 top-16 md:top-20 lg:top-32 ">
              <div className="flex text-center content-center h-auto md:flex-col lg:flex-col gap-3 md:gap-3 lg:gap-8">
                {leftSpecs.map((item) => (
                  <span
                    key={item.id}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-[10px] md:text-sm lg:text-base
                    lg:opacity-100 rounded-lg text-center text-white bg-[#10132E]"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="flex text-center content-center h-auto md:flex-col lg:flex-col gap-3 md:gap-3 lg:gap-8">
                {rightSpecs.map((item) => (
                  <span
                    key={item.id}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-[10px] md:text-sm lg:text-base
                    lg:opacity-100 rounded-lg text-center text-white bg-[#10132E]"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
