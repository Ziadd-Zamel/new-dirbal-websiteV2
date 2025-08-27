"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface RelatedTopicsProps {
  articlesByCategory: Article[];
  onSearch?: (searchTerm: string) => void;
}

const RelatedTopics = ({
  articlesByCategory,
  onSearch,
}: RelatedTopicsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");

  // Get related topics from tag-based articles only

  // Get latest topics with dates from category-based articles
  const latestTopics = articlesByCategory
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    .slice(0, 5);

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    const month = months[date.getMonth()];
    return { day, month };
  };

  // Handle article click navigation
  const handleArticleClick = (articleId: string) => {
    const segments = pathname.split("/");
    segments[segments.length - 1] = articleId;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch?.(searchTerm.trim());

      // Scroll to first highlighted result after a brief delay
      setTimeout(() => {
        const firstHighlight = document.querySelector(".search-highlight");
        if (firstHighlight) {
          firstHighlight.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  };

  // Handle search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch?.("");
  };

  return (
    <div className=" text-right text-white">
      {/* Search Section */}
      <div className="mb-6 mt-3 hidden md:flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ابحث في هذه الصفحة"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex h-[42px] w-full font-tajawal items-center placeholder:text-sm text-sm border border-gray-300 bg-white px-4 pr-4 text-black outline-none placeholder:font-tajawal focus:border-[#B5975C] focus:ring-1 focus:ring-[#B5975C]"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              title="مسح البحث"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="mr-1 h-[42px] bg-[#B5975C] px-4 text-white font-tajawal transition-colors hover:bg-[#9d7f45]"
        >
          بحث
        </button>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-4 text-sm text-[#B5975C] font-tajawal">
          البحث عن: {searchTerm}
        </div>
      )}

      {/* Latest Branch Topics Section */}
      <div className="mt-20">
        <h2 className="mb-2 font-tajawal text-lg light:text-black">
          آخر موضوعات الفرع:
        </h2>
        <div className="overflow-hidden  bg-white text-black">
          {latestTopics.map((article) => {
            const { day, month } = formatDateForDisplay(article.published_at);
            return (
              <Link
                href={`/${article.sub_category.category.name}/${article.sub_category.uuid}/${article.uuid}`}
                key={article.id}
                onClick={() => handleArticleClick(article.uuid)}
                className="flex cursor-pointer flex-row-reverse items-center justify-between gap-2 border-b border-gray-200 py-2 pl-4 pr-1 transition-colors duration-200 last:border-none hover:bg-gray-50"
              >
                <p
                  className="min-w-0 flex-1 pr-2 font-tajawal text-xs"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    lineHeight: "1.4",
                    maxHeight: "2.8em",
                  }}
                >
                  {article.title_number} {article.title_short}: {article.title}
                </p>
                <div className="relative flex h-12 w-14 flex-shrink-0 flex-col items-center justify-center  text-xs text-white">
                  <span className="relative z-50 text-xs font-bold font-tajawal">
                    {day}
                  </span>
                  <span className="relative z-50 font-tajawal text-xs">
                    {month}
                  </span>
                  <Image
                    className="absolute z-0"
                    src={"/assets/test.jpg"}
                    alt="icon"
                    fill
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedTopics;
