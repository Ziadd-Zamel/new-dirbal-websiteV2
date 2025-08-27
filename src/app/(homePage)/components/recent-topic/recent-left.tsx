"use client";

import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import Link from "next/link";
import RecentIcons from "./recent-icons";
import Image from "next/image";
import Divider from "@/components/common/Divider";
import { stripHtmlTags } from "@/lib/utils/stripHtml";

export default function RecentLeftSection({
  selectedArticle,
}: {
  selectedArticle: Article;
}) {
  const renderDescriptionWithFade = (description: string) => {
    const cleanDescription = stripHtmlTags(description);
    const words = cleanDescription.split(" ");

    if (words.length <= 120) return cleanDescription;

    const beforeFade = words.slice(0, 120).join(" ");
    const fadeWords = words.slice(120, 130).join(" ");
    const hasMoreWords = words.length > 130;

    return (
      <>
        {beforeFade}
        {fadeWords && <span className="fade-text"> {fadeWords}</span>}
        {hasMoreWords && " ..."}
      </>
    );
  };

  return (
    <div className="w-full lg:w-[47%]" id="left-recent">
      <div className="mb-3 mt-10 flex items-center gap-4 text-[16px] font-semibold text-white sm:text-[25px] lg:mb-3 lg:mt-2 lg:text-lg">
        {selectedArticle.sub_category.icon_url && (
          <Image
            src={selectedArticle.sub_category.icon_url}
            alt={selectedArticle.sub_category.name || "Subcategory Icon"}
            height={50}
            width={50}
            className="h-[50px] w-[50px] object-contain"
          />
        )}
        <h4 className="font-tajawal leading-snug">
          <span className="text-lg text-[#B5975C]">
            {selectedArticle.title_number} {selectedArticle.title_short}:{" "}
          </span>
          {selectedArticle.title}
        </h4>
      </div>

      <Divider
        orientation="horizontal"
        color="bg-[#B4947180]"
        thickness="h-[2px]"
      />

      <p className="pl-2 pt-6 text-justify font-tajawal text-[16px] font-medium leading-[25px] text-gray-300 sm:text-[16px] md:text-[20px] lg:text-[13px] xl:text-[15.5px]">
        {renderDescriptionWithFade(selectedArticle.description)}
      </p>

      <div className="mt-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center">
        <Link
          href={`/${selectedArticle.sub_category.category.uuid}/${selectedArticle.sub_category.uuid}/${selectedArticle.uuid}`}
          className="flex w-fit  items-center gap-2 self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 font-tajawal text-lg text-white hover:bg-[#C18F59]"
        >
          المزيد
          <span className="mr-2">
            <LeftArrowIcon height={12} width={12} dark={false} />
          </span>
        </Link>
        <RecentIcons article={selectedArticle} />
      </div>

      {/* ✅ Fade Gradient */}
      <style jsx>{`
        .fade-text {
          background: linear-gradient(to right, rgb(209 213 219), transparent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}
