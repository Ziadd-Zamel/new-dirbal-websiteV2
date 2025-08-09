"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

export default function QabasatBox({ Qabasat }: { Qabasat: Qabasat[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const currentQuote = Qabasat[currentIndex];

  useEffect(() => {
    const duration = (currentQuote.time || 5) * 1000;

    const fadeOut = setTimeout(() => setFade(false), duration - 500);
    const switchQuote = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % Qabasat.length);
      setFade(true);
    }, duration);

    return () => {
      clearTimeout(fadeOut);
      clearTimeout(switchQuote);
    };
  }, [currentIndex, currentQuote.time, Qabasat.length]);

  // Check if current quote has image
  const hasImage = currentQuote.image;

  return (
    <div className="relative  flex h-full items-center px-10 lg:px-20 xl:px-[70px]">
      <div className="flex w-full flex-col items-center gap-5 lg:flex-row-reverse lg:justify-between">
        <Image
          alt="Aya"
          height={800}
          width={400}
          src="/assets/Aya.png"
          className="w-[300px] sm:mt-[50px] lg:mt-[30px] lg:w-[40%]"
        />

        {/* Main content box with smooth height transitions */}
        <div className="h-fit min-h-[400px] w-full rounded-[12px] border border-[#2E394780] bg-[#FFFFFF26] px-[10px] pb-[16px] pt-10 transition-all duration-700 ease-in-out sm:px-[20px] md:w-[80%] lg:mt-16 lg:w-[51%] lg:px-[15px] xl:mt-28 xl:px-[45px] xl:py-[15px]">
          <div
            key={currentQuote.uuid}
            className={`transition-all duration-500 ease-in-out ${
              fade
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-2"
            }`}
            style={{ direction: "rtl" }}
          >
            {/* HEADER AND IMAGE CONTAINER */}
            <div className="flex justify-between  w-full flex-row-reverse items-end">
              {/* IMAGE CONTAINER - Smooth collapse/expand */}
              <div
                className={`overflow-hidden transition-all duration-700 ease-in-out ${
                  hasImage
                    ? "w-[150px] sm:w-[200px] lg:w-[200px] xl:w-[250px] opacity-100 mb-6"
                    : "w-0 opacity-0 mb-0"
                }`}
                style={{
                  height: hasImage ? "auto" : "0px",
                  marginTop: hasImage ? "20px" : "0px",
                }}
              >
                {hasImage && (
                  <Image
                    width={250}
                    height={170}
                    alt="Quote Image"
                    src={currentQuote.image || ""}
                    className="w-full h-auto object-cover transition-all duration-700 ease-in-out xl:h-[150px]"
                  />
                )}
              </div>

              <div
                className={`transition-all duration-700 ease-in-out ${
                  hasImage ? "flex-1 mr-4" : "w-full"
                }`}
              >
                <p className="text-start font-tajawal text-[20px] font-bold text-[#B5975C] sm:text-[40px] xl:text-[30px] transition-all duration-500">
                  {currentQuote.category.name}
                </p>
              </div>
            </div>

            {/* DIVIDER LINE - Smooth appearance */}
            <div
              className={`w-full bg-[#B5975C] transition-all duration-700 ease-in-out ${
                hasImage ? "mt-6 h-[1px]" : "mt-4 h-[1px]"
              }`}
            />

            {/* CONTENT CONTAINER - Smooth text transitions */}
            <div
              className={`flex flex-col  justify-center transition-all duration-500 ease-in-out ${
                hasImage ? "mt-4" : "mt-6 h-[240px]"
              }`}
            >
              {/* DESCRIPTION */}
              <p className="text-justify font-tajawal text-[18px] font-[400] leading-8 text-gray-200 sm:text-[18px] sm:leading-[25px] lg:text-[16px] xl:text-[18px] transition-all duration-500">
                {stripHtml(currentQuote.description)}
              </p>

              {/* SOURCE */}
            </div>
            <p className="text-left font-tajawal self-end justify-self-end text-base text-white lg:mt-[6px] xl:mt-4 transition-all duration-500">
              {currentQuote.source}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
