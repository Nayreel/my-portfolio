"use client";
import { cn } from "@/utils/cn";
import { GlobeDemo } from "./GridGlobe";
import { leftSpecs, leftTechStack, rightSpecs, rightTechStack } from "@/data";
import Image from "next/image";

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
            <Image
              src={img}
              alt={img}
              width={500}
              height={500}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>

        <div
          className={`absolute right-0 -bottom-5 ${
            id === 4 && "w-full opacity-80"
          } `}
        >
          {spareImg && (
            <Image
              src={spareImg}
              alt={spareImg}
              width={500}
              height={500}
              className={spareImgClassName}
            />
          )}
        </div>

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-8"
          )}
        >
          <div className="font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-sm xl:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-white text-lg lg:text-xl xl:text-3xl max-w-96 z-10">
            {title}
          </div>

          {id === 2 && <GlobeDemo />}

          {id === 3 && (
            <div className="flex flex-col lg:flex-row justify-center mt-5 gap-2 lg:gap-10">
              <div className="flex flex-row md:flex-row lg:flex-col gap-1 md:gap-5 lg:gap-8">
                {leftTechStack.map((item) => (
                  <span
                    key={item.id}
                    className="flex gap-2 items-center lg:py-4 lg:px-3 py-2 px-3 text-[10px] md:text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center text-white bg-[#10132E]"
                  >
                    <Image
                      src={item.svgpath}
                      alt="icon"
                      height={30}
                      width={30}
                      className="w-5 lg:w-8 "
                    />
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-row md:flex-row lg:flex-col gap-1 md:gap-5 lg:gap-8">
                {rightTechStack.map((item) => (
                  <span
                    key={item.id}
                    className="flex gap-2 items-center lg:py-4 lg:px-3 py-2 px-3 text-[10px] md:text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center text-white bg-[#10132E]"
                  >
                    <Image
                      src={item.svgpath}
                      alt="icon"
                      height={30}
                      width={30}
                      className="w-5 lg:w-8 "
                    />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 4 && (
            <div className="flex flex-col md:flex-row lg:flex-col gap-2 md:gap-10 lg:gap-5 w-fit absolute left-3 top-16 md:top-14 lg:mt-28">
              <div className="flex text-center content-center h-auto md:flex-col lg:flex-row gap-3 md:gap-2 lg:gap-2">
                {leftSpecs.map((item) => (
                  <span
                    key={item.id}
                    className="lg:py-4 md:px-10 lg:px-3 py-2 px-3 text-[10px] md:text-xs lg:text-base
                    lg:opacity-100 rounded-lg text-center text-white bg-[#10132E]"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
              <div className="flex text-center content-center h-auto md:flex-col lg:flex-row gap-3 md:gap-2 lg:gap-2">
                {rightSpecs.map((item) => (
                  <span
                    key={item.id}
                    className="lg:py-4 lg:px-3 py-2 px-3 text-[10px] md:text-xs lg:text-base
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
