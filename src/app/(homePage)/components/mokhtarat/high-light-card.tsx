"use client";

import { stripHtmlTags } from "@/lib/utils/stripHtml";
import Image from "next/image";
import Link from "next/link";

export default function HighLightCard({ article }: { article: Article }) {
  const cleanDescription = stripHtmlTags(article.description);
  const words = cleanDescription.split(" ");

  // Split text into parts: before fade (0-119), fade part (120-130), and ellipsis
  const beforeFade = words.slice(0, 120).join(" ");
  const fadeWords = words.slice(120, 130);
  // const hasMoreWords = words.length > 130;
  console.log(article);

  // Determine which icon to use
  const iconUrl = article.subSubCategory?.icon || article.sub_category.icon_url;
  const iconAlt = article.subSubCategory?.name || article.sub_category.name;

  return (
    <article
      className="flex w-full flex-col  pb-10 pt-5 md:w-[350px] lg:w-[500px] xl:w-[630px]"
      aria-labelledby={`article-${article.uuid}`}
    >
      <div className="w-full flex justify-center mb-3">
        {/* Icon for subcategory or subSubCategory (if available) */}
        {iconUrl && (
          <Image
            src={iconUrl}
            alt={`${iconAlt} icon`}
            width={40}
            height={40}
            className="mt-5"
          />
        )}
      </div>

      {/* Subcategory Name */}
      <h3
        id={`article-${article.uuid}`}
        className="mt-5 text-center font-tajawal text-xl font-bold text-[#B5975C]"
      >
        {article.subSubCategory?.name
          ? article.subSubCategory?.name
          : article.sub_category.name}
      </h3>

      {/* Title + subtitle */}
      <h4 className="my-7 min-h-[80px] text-right font-tajawal text-lg sm:text-xl font-medium text-black">
        <span className="font-semibold text-[#B5975C]">
          {article.title_number}
          {article.title_short}:
        </span>{" "}
        {article.sub_title}
      </h4>

      {/* Truncated description with fade */}
      <p className="sm:-mt-8 min-h-[100px] text-justify font-tajawal text-[16px] text-gray-500">
        {beforeFade}
        {fadeWords.length > 0 && (
          <span className="fade-text">{" " + fadeWords.join(" ")}</span>
        )}
      </p>

      {/* Read more link */}
      <Link
        href={`/${article.sub_category.category.name}/${article.sub_category.uuid}/${article.uuid}`}
        aria-label={`اقرأ المزيد عن ${article.sub_title}`}
        className="mt-5 text-left font-tajawal text-sm font-medium text-[#B5975C] hover:underline focus:outline-none focus:ring-2 focus:ring-[#B5975C]"
      >
        المزيد
      </Link>

      <style jsx>{`
        .fade-text {
          background: linear-gradient(to left, rgb(107 114 128), transparent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </article>
  );
}
