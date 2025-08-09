"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

interface MawdooaHeadingProps {
  title?: string;
  bgImageSrc?: string;
  showOverlay?: boolean;
  articleById?: Article;
}

const MawdooaHeading: React.FC<MawdooaHeadingProps> = ({
  title = "المحكمة العليا",
  bgImageSrc = "/assets/bg-6.jpg",
  showOverlay = false,
  articleById,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  return (
    <div className="overflow-hidden" ref={sectionRef}>
      <div
        className="relative h-fit flex-[0_0_100%] bg-cover bg-center"
        style={{ position: "relative" }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${bgImageSrc}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: yBg,
          }}
        />
        {showOverlay && (
          <div className="absolute inset-0 bg-[rgba(37,37,37,0.9)]"></div>
        )}
        <div
          className="relative flex h-full flex-col justify-between px-10 pb-16 text-right lg:px-20 xl:px-20"
          dir="rtl"
        >
          <div dir="rtl" className="mt-5 text-right">
            <div className="mt-10 sm:mt-20 lg:mt-24">
              <div className="flex items-center gap-5 lg:w-[70%]">
                <div className="relative mt-[16px] flex h-24 w-28 flex-col items-center justify-center">
                  <Image
                    className="absolute z-0"
                    src={"/assets/bgbooks.jpg"}
                    alt="icon"
                    fill
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-20 flex flex-col items-center">
                    <p className="-mt-3 text-5xl font-semibold text-white">
                      {articleById?.title_number}
                    </p>
                    <p className="mt-1 font-tajawal text-3xl font-semibold text-white">
                      {articleById?.title_short}{" "}
                    </p>
                  </div>
                </div>
                <motion.h2
                  className="text-justify font-tajawal text-xl font-semibold text-[#B5975C] sm:text-3xl"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {title}
                </motion.h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MawdooaHeading;
