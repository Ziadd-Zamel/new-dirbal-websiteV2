"use client";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import ArrowIcon from "@/components/Icons/RightArrowIcon";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import MainSlide from "./main-slide";
import DynamicSlide from "./dynamic-slide";

interface Props {
  categories: Category[];
  Qabasat: Qabasat[];
}
export default function HeroSection({ Qabasat, categories }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalSlides = 1 + (categories?.length || 0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const goToPrev = () => {
    if (!emblaApi) return;
    const prevIndex = selectedIndex === 0 ? totalSlides - 1 : selectedIndex - 1;
    emblaApi.scrollTo(prevIndex);
  };

  const goToNext = () => {
    if (!emblaApi) return;
    const nextIndex = selectedIndex === totalSlides - 1 ? 0 : selectedIndex + 1;
    emblaApi.scrollTo(nextIndex);
  };

  return (
    <div
      style={{ direction: "ltr" }}
      className="relative z-50 h-[150vh] w-full overflow-hidden lg:h-screen"
    >
      <div className="h-full w-full" ref={emblaRef}>
        <div className="flex h-full w-full">
          {/* First slide - always present */}
          <div className="relative min-w-full flex-none overflow-hidden">
            <div className="h-full w-full">
              <MainSlide Qabasat={Qabasat} />
            </div>
          </div>

          {/* Dynamic slides based on categories */}
          {categories?.map((category) => (
            <div
              key={category.uuid}
              className="relative min-w-full flex-none overflow-hidden"
            >
              <div className="h-full w-full">
                <DynamicSlide category={category} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="pointer-events-auto absolute -left-32 top-1/2 z-[100] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#D7D7D71A] text-white transition-all hover:bg-[#D7D7D730] md:left-4"
        onClick={goToPrev}
        type="button"
      >
        <LeftArrowIcon width={20} height={20} dark={false} />
      </button>
      <button
        className="pointer-events-auto absolute -right-32 top-1/2 z-[100] flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-center rounded-full bg-[#D7D7D71A] text-white transition-all hover:bg-[#D7D7D730] md:right-4"
        onClick={goToNext}
        type="button"
      >
        <ArrowIcon width={20} height={20} dark={false} />
      </button>
    </div>
  );
}
