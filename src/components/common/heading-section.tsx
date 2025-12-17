"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface HeadingSectionProps {
  title?: string;
  text?: string;
  bgImageSrc?: string;
  textcolor?: string;
  showOverlay?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

const HeadingSection: React.FC<HeadingSectionProps> = ({
  title = " ",
  text = "",
  bgImageSrc = "/assets/bg-6.jpg",
  textcolor,
  showOverlay = false,
  breadcrumbs = [],
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div className="overflow-hidden" ref={sectionRef}>
      <div className="relative h-fit flex-[0_0_100%] bg-cover bg-center pt-20 md:pt-5">
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
          className="relative flex h-full flex-col justify-between  pb-24 text-right main-padding"
          dir="rtl"
        >
          <div dir="rtl" className="text-right">
            <div className="mt-10 sm:mt-20 lg:mt-24">
              <div className="flex flex-col justify-between sm:flex-row sm:items-center xl:w-[90%]">
                <motion.h2
                  className="text-justify font-tajawal text-2xl font-semibold text-white sm:text-4xl min-[1900px]:text-6xl!"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {title}
                </motion.h2>

                {breadcrumbs.length > 0 && (
                  <motion.div
                    className="mt-2 flex items-center self-end justify-self-end font-tajawal text-[#B4935C] sm:mt-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <ol className="flex items-center space-x-1 space-x-reverse rtl:space-x-reverse">
                      <li>
                        <Link
                          href="/"
                          className="text-[#B4935C] hover:text-[#d1b283]"
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
                          <li className="mx-1 text-[18px] min-[1900px]:text-2xl!">
                            <span className="text-[18px] min-[1900px]:text-2xl! text-[#B4935C]">
                              <ChevronLeft size={20} />
                            </span>
                          </li>
                          <li>
                            {index === breadcrumbs.length - 1 ? (
                              <span className="text-[#B4935C]">
                                {item.name}
                              </span>
                            ) : (
                              <Link
                                href={item.href}
                                className="text-[#B4935C] hover:text-[#d1b283]"
                              >
                                {item.name}
                              </Link>
                            )}
                          </li>
                        </React.Fragment>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </div>

              <motion.p
                className={`scrollbar-hide mt-6 max-h-[400px] overflow-y-auto text-justify font-tajawal font-[400] text-gray-300 md:text-[21px] min-[1900px]:text-3xl! lg:h-full lg:max-h-none xl:w-[90%] xl:leading-[30px] min-[1900px]:leading-[50px]! ${textcolor}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {text}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingSection;
