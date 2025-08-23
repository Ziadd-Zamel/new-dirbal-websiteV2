"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  // Generate breadcrumbs based on article structure
  const breadcrumbs = articleById
    ? [
        {
          name: articleById.sub_category.name,
          href: `/${articleById.sub_category.category.uuid}/${articleById.sub_category.uuid}`,
        },
      ]
    : [];

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
          className="relative flex h-full flex-col justify-between px-10 pb-20 text-right lg:px-20 xl:px-20"
          dir="rtl"
        >
          <div dir="rtl" className="text-right relative">
            <div className="mt-36">
              <div className="flex flex-col justify-between sm:flex-row sm:items-center lg:w-[70%]">
                <div className="flex items-center gap-5">
                  <div className="relative flex h-24 w-42 flex-col items-center justify-center">
                    <Image
                      className="absolute z-0"
                      src={"/assets/bgbooks.jpg"}
                      alt="icon"
                      fill
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-20 flex flex-col items-center">
                      <p className="-mt-3 text-3xl sm:text-5xl font-semibold text-white">
                        {articleById?.title_number}
                      </p>
                      <p className="mt-1 font-tajawal text-xl sm:text-3xl font-semibold text-white">
                        {articleById?.title_short}
                      </p>
                    </div>
                  </div>
                  <motion.h2
                    className="text-right font-tajawal text-md font-semibold text-[#B5975C] sm:text-3xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {title}
                  </motion.h2>
                </div>

                {/* Breadcrumbs */}
                {breadcrumbs.length > 0 && (
                  <motion.div
                    className="absolute top-28 -left-[22px] flex items-center font-tajawal text-[#B5975C]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <ol className="flex items-center space-x-1 space-x-reverse rtl:space-x-reverse">
                      <li>
                        <Link
                          href="/"
                          className="text-[#B5975C] hover:text-[#d1b283]"
                        >
                          <Image
                            src={"/assets/HomePage.svg"}
                            alt="Home Icon"
                            width={20}
                            height={0}
                          />
                        </Link>
                      </li>
                      {breadcrumbs.map((item, index) => (
                        <React.Fragment key={index}>
                          <li className="mx-1 text-[18px]">
                            <span className="text-[18px] text-[#B5975C]">
                              <ChevronLeft size={20} />
                            </span>
                          </li>
                          <li>
                            <Link
                              href={item.href}
                              className="text-[#B5975C] hover:text-[#d1b283]"
                            >
                              {item.name}
                            </Link>
                          </li>
                        </React.Fragment>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MawdooaHeading;
