/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import dynamic from "next/dynamic";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import ArrowIcon from "@/components/Icons/RightArrowIcon";
import MainSlide from "./main-slide";

const DynamicSlide = dynamic(() => import("./dynamic-slide"));

interface Props {
  categories: Category[];
  Qabasat: Qabasat[];
  backgroundHomeImage: string;
}

export default function HeroSection({
  Qabasat,
  categories,
  backgroundHomeImage,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = 1 + (categories?.length || 0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const goToPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const goToNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div
      style={{ direction: "ltr" }}
      className="relative z-50 h-[170vh] sm:h-[150vh] w-full overflow-hidden lg:h-screen"
    >
      <div className="h-full w-full" ref={emblaRef}>
        <div className="flex h-full w-full">
          {/* First slide - always present */}
          <div className="relative min-w-full flex-none overflow-hidden">
            <MainSlide
              backgroundHomeImage={backgroundHomeImage}
              Qabasat={Qabasat}
            />
          </div>

          {/* Dynamic slides based on categories */}
          {categories?.map((category) => (
            <div
              key={category.uuid}
              className="relative min-w-full flex-none overflow-hidden"
            >
              <DynamicSlide category={category} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="pointer-events-auto absolute -left-32 top-1/2 z-[100] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#D7D7D71A] text-white transition-all hover:bg-[#D7D7D730] md:left-4"
        onClick={goToPrev}
        type="button"
        aria-label="الشريحة السابقة"
      >
        <LeftArrowIcon width={20} height={20} dark={false} />
      </button>

      <button
        className="pointer-events-auto absolute -right-32 top-1/2 z-[100] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#D7D7D71A] text-white transition-all hover:bg-[#D7D7D730] md:right-4"
        onClick={goToNext}
        type="button"
        aria-label="الشريحة التالية"
      >
        <ArrowIcon width={20} height={20} dark={false} />
      </button>
    </div>
  );
}
