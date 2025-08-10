"use client";
import Image from "next/image";
import Link from "next/link";

// Utility to strip HTML
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

// Highlight Card Component
export default function HighLightCard({
  article,
}: {
  article: Article;
  gradientColor: string;
}) {
  const cleanDescription = stripHtml(article.description);
  const words = cleanDescription.split(" ");

  // Split text into parts: before fade (0-119), fade part (120-130), and ellipsis
  const beforeFade = words.slice(0, 120).join(" ");
  const fadeWords = words.slice(120, 130);
  const hasMoreWords = words.length > 130;

  return (
    <div className="flex w-full flex-col pb-10 pt-5 md:w-[350px] lg:w-[500px] xl:w-[630px] ">
      {article.sub_category.icon_url && (
        <Image
          src={article.sub_category.icon_url}
          alt="Icon"
          width={30}
          height={0}
          className="mt-5"
        />
      )}
      <h3 className="mt-5 text-center font-tajawal text-xl font-[700] text-[#B5975C]">
        {article.sub_category.name}
      </h3>

      <h4 className="my-7 min-h-[80px] text-right font-tajawal text-xl font-[500] text-black">
        <span className="font-[600] text-[#B5975C]">
          {article.title_number}
          {article.title_short} :
        </span>{" "}
        {article.sub_title}
      </h4>

      <p className="-mt-8 min-h-[100px] text-justify font-tajawal text-[16px] text-gray-500">
        {beforeFade}
        {fadeWords.length > 0 && (
          <span className="fade-text">{" " + fadeWords.join(" ")}</span>
        )}
        {hasMoreWords}
      </p>

      <Link
        href={`/${article.sub_category.category.name}/${article.sub_category.uuid}/${article.uuid}`}
        className="mt-5 text-left font-tajawal text-sm font-[500] text-[#B5975C]"
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
    </div>
  );
}
