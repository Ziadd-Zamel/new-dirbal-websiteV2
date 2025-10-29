"use client";

import { stripHtmlTags } from "@/lib/utils/stripHtml";
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";

export default function QabasatBox({ Qabasat }: { Qabasat: Qabasat[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [boxHeight, setBoxHeight] = useState(200);
  const contentRef = useRef<HTMLDivElement>(null);
  console.log(Qabasat);
  // Group Qabasat by category
  const groupedQabasat = useMemo(() => {
    const groups: { [key: string]: Qabasat[] } = {};

    Qabasat.forEach((qabasat) => {
      const categoryName = qabasat.category.name;
      if (!groups[categoryName]) {
        groups[categoryName] = [];
      }
      groups[categoryName].push(qabasat);
    });

    return groups;
  }, [Qabasat]);

  // Flatten grouped Qabasat for sequential display
  const flattenedQabasat = useMemo(() => {
    const result: Qabasat[] = [];
    Object.values(groupedQabasat).forEach((categoryQabasat) => {
      result.push(...categoryQabasat);
    });
    return result;
  }, [groupedQabasat]);

  // Get category names for dots
  const categoryNames = useMemo(() => {
    return Object.keys(groupedQabasat);
  }, [groupedQabasat]);

  // Get current category index based on current Qabasat
  const getCurrentCategoryIndex = () => {
    const currentQabasat = flattenedQabasat[currentIndex];
    if (!currentQabasat) return 0;

    const categoryName = currentQabasat.category.name;
    return categoryNames.indexOf(categoryName);
  };

  // Get current category name
  const getCurrentCategoryName = () => {
    const currentQabasat = flattenedQabasat[currentIndex];
    return currentQabasat?.category.name || "";
  };

  const currentQuote = flattenedQabasat[currentIndex];

  // Update box height based on current content
  useEffect(() => {
    if (contentRef.current) {
      const newHeight = Math.min(
        Math.max(contentRef.current.scrollHeight + 200, 200),
        600
      );
      setBoxHeight(newHeight);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!currentQuote || isPaused) return;

    const duration = (currentQuote.time || 5) * 1000;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flattenedQabasat.length);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex, isPaused, currentQuote, flattenedQabasat.length]);

  const hasImage = currentQuote?.image;
  const currentCategoryIndex = getCurrentCategoryIndex();

  if (!currentQuote) return null;

  return (
    <div className="relative flex h-full items-center main-padding 2xl:box-container mt-20 sm:mt-0">
      <div className="flex w-full flex-col items-center gap-5 lg:flex-row-reverse lg:justify-between">
        <Image
          alt="Aya"
          height={800}
          width={400}
          src="/assets/Aya.png"
          className=" w-[200px] -mt-40 sm:w-[300px] sm:mt-[50px] lg:mt-[30px] lg:w-[40%]"
        />

        <div
          className="hover:border-1 hover:border-[#B5975C] w-full rounded-[12px] border border-[#2E394780] bg-[#FFFFFF26] px-[10px] pb-[16px] pt-5 sm:pt-10 transition-all duration-700 ease-in-out sm:px-[20px] md:w-[80%] lg:mt-16 lg:w-[51%] lg:px-[15px] xl:mt-28 xl:px-[45px] xl:py-[15px] cursor-pointer flex flex-col relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            height: boxHeight,
          }}
        >
          {/* HEADER AND IMAGE CONTAINER */}
          <div className="flex justify-between gap-5 w-full flex-row items-end">
            {/* IMAGE CONTAINER - Smooth collapse/expand */}
            <div
              className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                hasImage
                  ? "w-[150px] sm:w-[200px] lg:w-[200px] opacity-100"
                  : "w-0 opacity-0"
              }`}
              style={{
                height: hasImage ? "auto" : "0px",
                marginTop: hasImage ? "20px" : "0px",
              }}
            >
              {hasImage && (
                <Image
                  width={200}
                  height={100}
                  alt="Quote Image"
                  src={currentQuote.image || ""}
                  className="w-full h-auto object-cover transition-all duration-1000 ease-in-out xl:h-[120px]"
                />
              )}
            </div>

            <div
              className={`transition-all duration-1000 ease-in-out ${
                hasImage ? "flex-1 mr-4" : "w-full"
              }`}
            >
              <p className="text-end font-tajawal font-bold text-[#B5975C] sm:text-[40px] xl:text-2xl transition-all duration-1000 ease-in-out">
                {getCurrentCategoryName()}
              </p>

              {/* Category Dots Navigation - Under category name */}
              <div className="flex justify-end items-center gap-2 mt-3">
                {categoryNames.map((categoryName, index) => (
                  <button
                    key={categoryName}
                    onClick={() => {
                      // Find the first Qabasat of this category
                      const categoryQabasat = groupedQabasat[categoryName];
                      if (categoryQabasat.length > 0) {
                        const firstIndex = flattenedQabasat.findIndex(
                          (q) => q.uuid === categoryQabasat[0].uuid
                        );
                        if (firstIndex !== -1) {
                          setCurrentIndex(firstIndex);
                        }
                      }
                    }}
                    className={` w-2  h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-in-out ${
                      index === currentCategoryIndex
                        ? "bg-[#B5975C] scale-110"
                        : "bg-[#B5975C40] hover:bg-[#B5975C80]"
                    }`}
                    title={categoryName}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* DIVIDER LINE - Smooth appearance */}
          <div
            className={`w-full bg-[#B5975C] transition-all duration-700 ease-in-out ${
              hasImage ? "mt-6 h-[1px]" : "mt-4 h-[1px]"
            }`}
          />

          <div
            className={`flex flex-col justify-center transition-all duration-700 min-h-fit ease-in-out ${
              hasImage ? "mt-4" : "mt-6"
            }`}
          >
            {/* DESCRIPTION - All descriptions absolutely positioned with fade */}
            <div className="relative">
              {flattenedQabasat.map((quote, i) => (
                <p
                  key={quote.uuid}
                  ref={i === currentIndex ? contentRef : null}
                  style={{ direction: "rtl" }}
                  className={`font-tajawal text-sm font-[400] leading-8 text-gray-200 sm:text-base sm:leading-[25px] xl:text-[18px] transition-opacity duration-[1800ms] ${
                    i === currentIndex
                      ? "opacity-100 relative"
                      : "opacity-0 absolute inset-0"
                  }`}
                >
                  {stripHtmlTags(quote.description)}
                </p>
              ))}
            </div>
          </div>

          {/* SOURCE */}
          <div
            className={`transition-all duration-700 ease-in-out mt-auto pt-4 ${
              currentQuote.source ? "opacity-100" : "opacity-0"
            }`}
          >
            {currentQuote.source && (
              <p className="text-left font-tajawal text-base text-white">
                {currentQuote.source}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
