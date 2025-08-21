"use client";

import { useState, useEffect } from "react";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ScrollToTopButtonProps {
  className?: string;
}

export default function ScrollToTopButton({
  className,
}: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    // Check initial scroll position
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#B5975C] text-white shadow-lg transition-all duration-300 hover:bg-[#C4A66A] hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#B5975C] focus:ring-opacity-50",
            className
          )}
          aria-label="العودة إلى أعلى الصفحة"
        >
          <ChevronUpIcon className="h-4 w-4" />
        </button>
      )}
    </>
  );
}
