"use client";

import { stripHtmlTags } from "@/lib/utils/stripHtml";
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";

// Helper function to detect if text is primarily Arabic
function isArabicText(text: string): boolean {
  const arabicPattern = /[\u0600-\u06FF]/;
  const arabicChars = text.match(/[\u0600-\u06FF]/g);
  const totalChars = text.replace(/\s/g, "").length;

  // If more than 30% of characters are Arabic, consider it Arabic text
  return arabicChars ? arabicChars.length / totalChars > 0.3 : false;
}

export default function QabasatBox({ Qabasat }: { Qabasat: Qabasat[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [boxHeight, setBoxHeight] = useState(200);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);

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
  const hasImage = currentQuote?.image;

  // Update box height based on current content - FIXED
  useEffect(() => {
    if (contentRef.current && headerRef.current) {
      // Measure each section individually
      const headerHeight = headerRef.current.offsetHeight;
      const contentHeight = contentRef.current.scrollHeight;
      const sourceHeight = sourceRef.current?.offsetHeight || 0;

      // Add extra height when image exists
      const imageExtraSpace = hasImage ? 60 : 0;

      // Add up all parts + padding and margins
      // Header + divider (1px) + margins (mt-4 = 16px) + content + source (if exists) + padding + extra space for image
      const totalHeight =
        headerHeight +
        1 +
        16 +
        contentHeight +
        sourceHeight +
        80 +
        imageExtraSpace;

      // Set min/max bounds
      const newHeight = Math.min(Math.max(totalHeight, 250), 600);
      setBoxHeight(newHeight);
    }
  }, [currentIndex, hasImage]);

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

  const currentCategoryIndex = getCurrentCategoryIndex();

  if (!currentQuote) return null;

  // Detect if current description is Arabic or English
  const currentDescription = stripHtmlTags(currentQuote.description);
  const isArabic = isArabicText(currentDescription);

  return (
    <div className="relative flex h-full items-center main-padding 2xl:box-container mt-12 sm:mt-0">
      <div className="flex w-full flex-col items-center gap-5 lg:flex-row-reverse lg:justify-between">
        <Image
          alt="Aya"
          height={800}
          width={400}
          src="/assets/Aya.png"
          className=" w-[200px] -mt-40 sm:w-[300px] sm:mt-[50px] lg:mt-[30px] lg:w-[40%]"
        />

        <div
          className="hover:border-1 hover:border-[#B5975C] w-full rounded-[12px] border border-[#2E394780] bg-[#FFFFFF26] px-[10px] pb-[16px] pt-5 sm:pt-10 transition-all duration-700 ease-in-out sm:px-[20px] md:w-[80%] lg:mt-16 lg:w-[51%] lg:px-[15px] xl:mt-28 xl:px-[45px] xl:py-[15px] cursor-pointer relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            height: boxHeight,
          }}
        >
          {/* CONTAINER WITH REF - FIXED: Now wraps everything */}
          <div className="flex flex-col h-full">
            {/* HEADER AND IMAGE CONTAINER */}
            <div
              ref={headerRef}
              className="flex justify-between gap-3 w-full flex-row items-start"
            >
              {/* IMAGE CONTAINER - FIXED: Better sizing and positioning with smooth disappear */}
              <div
                className={`flex-shrink-0 overflow-hidden transition-all duration-1000 ease-in-out ${
                  hasImage
                    ? "w-[120px] sm:w-[180px] lg:w-[200px] opacity-100"
                    : "w-0 opacity-0"
                }`}
              >
                <Image
                  width={200}
                  height={100}
                  alt="Quote Image"
                  src={currentQuote.image || "/assets/placeholder.png"}
                  className={`w-full h-auto object-cover rounded-md transition-all duration-1000 ease-in-out ${
                    hasImage ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* HEADER - FIXED: Better flex properties */}
              <div className="flex-1 min-w-0">
                <p className="text-end font-tajawal font-bold text-[#B5975C] text-[28px] sm:text-[40px] xl:text-2xl transition-all duration-1000 ease-in-out">
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
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-in-out ${
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

            {/* DIVIDER LINE - FIXED: Always visible */}
            <div className="w-full bg-[#B5975C] h-[1px] mt-4 transition-all duration-700 ease-in-out" />

            {/* DESCRIPTION CONTAINER - FIXED: Proper flex growth */}
            <div className="flex-1 flex flex-col justify-start mt-4 min-h-0">
              {/* DESCRIPTION - All descriptions absolutely positioned with fade */}
              <div className="relative">
                {flattenedQabasat.map((quote, i) => {
                  const description = stripHtmlTags(quote.description);
                  const isDescriptionArabic = isArabicText(description);

                  return (
                    <p
                      key={quote.uuid}
                      ref={i === currentIndex ? contentRef : null}
                      style={{
                        direction: isDescriptionArabic ? "rtl" : "ltr",
                      }}
                      className={`font-tajawal ${
                        isDescriptionArabic ? "text-justify" : "text-left"
                      } text-sm font-[400] ${
                        isDescriptionArabic
                          ? "leading-7 sm:leading-[25px] "
                          : "leading-6 sm:leading-[22px] xl:leading-7"
                      } text-gray-200 sm:text-base xl:text-[18px] transition-opacity duration-[1800ms] ${
                        i === currentIndex
                          ? "opacity-100 relative"
                          : "opacity-0 absolute inset-0 pointer-events-none"
                      }`}
                    >
                      {description}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* SOURCE - FIXED: Better positioning */}
            <div
              ref={sourceRef}
              className={`mt-auto pt-4 transition-all duration-700 ease-in-out ${
                currentQuote.source ? "opacity-100" : "opacity-0 h-0"
              }`}
            >
              {currentQuote.source && (
                <p className="text-left font-tajawal text-sm sm:text-base text-white">
                  {currentQuote.source}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
