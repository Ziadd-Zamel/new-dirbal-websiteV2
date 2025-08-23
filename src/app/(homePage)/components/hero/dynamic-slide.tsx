"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { stripHtmlTags } from "@/lib/utils/stripHtml";

// Lazy load sub-categories for bundle size optimization
const SubCategorySection = dynamic(() => import("./subCategories-section"), {
  ssr: false,
});

export default function DynamicSlide({ category }: { category: Category }) {
  const isDark = category.light;

  // Memoize description cleanup for performance
  const cleanDescription = useMemo(
    () => stripHtmlTags(category.description || ""),
    [category.description]
  );

  return (
    <div className="absolute inset-0 z-10 h-full flex-[0_0_100%] opacity-100 transition-opacity duration-1000 ease-in-out">
      {/* Background image optimized with Next.js */}
      <Image
        src={category.image_url || "/assets/bg-2.jpg"}
        alt={category.name || "Background"}
        fill
        priority
        className="object-cover animate-[zoomIn_20s_ease-in-out_infinite]"
      />

      {/* Dark overlay if needed */}
      {isDark && (
        <div className="absolute inset-0 bg-[rgba(37,37,37,0.9)]"></div>
      )}

      <div
        dir="rtl"
        className="relative flex h-full flex-col justify-between pb-5 text-right"
      >
        <div className="text-justify">
          <div className="px-10 pt-5 lg:px-20 xl:px-[71px]">
            {/* Main heading for SEO */}
            <h1 className="mt-20 text-justify font-tajawal text-[50px] font-[800] text-white sm:mt-20 sm:text-[70px] lg:mt-20">
              {category.name || ""}
            </h1>

            {/* Scrollable description with a11y */}
            <div
              role="region"
              aria-label={`${category.name} description`}
              className="scrollbar-hide mt-6 max-h-[400px] overflow-y-auto text-justify font-tajawal text-[18px] font-[400] text-gray-300 md:text-[21px] lg:h-full lg:max-h-none xl:w-[77%] xl:leading-[30px]"
            >
              {cleanDescription}
            </div>
          </div>
        </div>

        {/* Lazy-loaded subcategories */}
        <SubCategorySection
          categoryId={category.uuid}
          SubCategory={category.SubCategory}
        />
      </div>
    </div>
  );
}
