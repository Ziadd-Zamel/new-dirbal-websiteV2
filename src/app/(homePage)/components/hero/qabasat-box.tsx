"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";

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
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

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
  const nextQuote = flattenedQabasat[nextIndex];

  useEffect(() => {
    if (!currentQuote || isPaused) return;

    const duration = (currentQuote.time || 5) * 1000;

    const startTransition = setTimeout(() => {
      const newNextIndex = (currentIndex + 1) % flattenedQabasat.length;
      setNextIndex(newNextIndex);
      setIsTransitioning(true);
    }, duration - 500);

    const completeTransition = setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTransitioning(false);
    }, duration);

    return () => {
      clearTimeout(startTransition);
      clearTimeout(completeTransition);
    };
  }, [currentIndex, isPaused, nextIndex]); // Removed currentQuote?.time from dependencies

  // Measure content height when content changes
  useEffect(() => {
    if (contentRef.current) {
      // Use a small delay to ensure DOM is updated
      setTimeout(() => {
        if (contentRef.current) {
          const height = contentRef.current.scrollHeight;
          setContentHeight(height);
        }
      }, 100);
    }
  }, [currentQuote.description, nextQuote?.description, isTransitioning]);

  const hasImage = currentQuote?.image;
  const currentCategoryIndex = getCurrentCategoryIndex();

  if (!currentQuote) return null;

  return (
    <div className="relative flex h-full items-center px-10 lg:px-20 xl:px-[70px] 2xl:box-container">
      <div className="flex w-full flex-col items-center gap-5 lg:flex-row-reverse lg:justify-between">
        <Image
          alt="Aya"
          height={800}
          width={400}
          src="/assets/Aya.png"
          className="w-[300px] sm:mt-[50px] lg:mt-[30px] lg:w-[40%]"
        />

        <div
          className="h-fit min-h-[200px] hover:border-1 hover:border-[#B5975C] w-full rounded-[12px] border border-[#2E394780] bg-[#FFFFFF26] px-[10px] pb-[16px] pt-10 transition-all duration-[2000ms] ease-in-out sm:px-[20px] md:w-[80%] lg:mt-16 lg:w-[51%] lg:px-[15px] xl:mt-28 xl:px-[45px] xl:py-[15px] cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* HEADER AND IMAGE CONTAINER */}
          <div className="flex justify-between w-full flex-row items-end">
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
              <p className="text-end font-tajawal text-[20px] font-bold text-[#B5975C] sm:text-[40px] xl:text-2xl transition-all duration-1000 ease-in-out">
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
                          setIsTransitioning(false);
                        }
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
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
            ref={contentRef}
            className={`flex flex-col justify-center transition-all duration-[2000ms] ease-in-out ${
              hasImage ? "mt-4" : "mt-6"
            }`}
            style={{
              minHeight: hasImage ? "150px" : "100px",
              height: "auto",
            }}
          >
            {/* DESCRIPTION - Crossfade Animation Container */}
            <div className="relative">
              {/* Current Description */}
              <p
                style={{ direction: "rtl" }}
                className={`text-justify font-tajawal text-[18px] font-[400] leading-8 text-gray-200 sm:text-[18px] sm:leading-[25px] lg:text-[16px] xl:text-[18px] transition-opacity duration-[2000ms] ease-in-out ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {stripHtml(currentQuote.description)}
              </p>

              {/* Next Description - Overlaid during transition */}
              {isTransitioning && nextQuote && (
                <p
                  style={{ direction: "rtl" }}
                  className={`absolute top-0 left-0 right-0 text-justify font-tajawal text-[18px] font-[400] leading-8 text-gray-200 sm:text-[18px] sm:leading-[25px] lg:text-[16px] xl:text-[18px] transition-opacity duration-[2000ms] ease-in-out ${
                    isTransitioning ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {stripHtml(nextQuote.description)}
                </p>
              )}
            </div>
          </div>

          {/* SOURCE */}
          <div
            className={`transition-all duration-[2000ms] ease-in-out ${
              currentQuote.source ? "opacity-100" : "opacity-0"
            }`}
          >
            {currentQuote.source && (
              <p className="text-left font-tajawal self-end justify-self-start text-base text-white lg:mt-[6px] xl:mt-4">
                {currentQuote.source}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
