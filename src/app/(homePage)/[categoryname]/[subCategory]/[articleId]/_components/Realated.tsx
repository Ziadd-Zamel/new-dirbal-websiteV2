"use client";
import Image from "next/image";
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

  // Get related topics (excluding current article if needed)
  const relatedTopics = articlesByCategory.slice(0, 5);

  // Get latest topics with dates
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
      <div className="mb-6 mt-3 flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="ابحث في هذه الصفحة"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex h-[42px] w-full items-center border border-gray-300 bg-white px-4 pr-4 text-black outline-none placeholder:font-tajawal focus:border-[#B5975C] focus:ring-1 focus:ring-[#B5975C]"
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
          className="mr-1 h-[42px] bg-[#B5975C] px-4 text-white transition-colors hover:bg-[#9d7f45]"
        >
          بحث
        </button>
      </div>

      {/* Search Results Info */}
      {searchTerm && (
        <div className="mb-4 text-sm text-[#B5975C]">
          البحث عن: {searchTerm}
        </div>
      )}

      {/* Related Topics Section */}
      <div className="mb-6 mt-32">
        <h2 className="mb-2 font-tajawal text-lg">موضوعات ذات صلة:</h2>
        <div className="overflow-hidden rounded-md bg-white text-black">
          {relatedTopics.map((article) => (
            <p
              key={article.id}
              onClick={() => handleArticleClick(article.uuid)}
              className="cursor-pointer border-b border-gray-200 px-4 py-3.5 font-tajawal text-sm transition-colors last:border-none hover:bg-gray-50"
            >
              {article.title_number} {article.title_short}: {article.title}
            </p>
          ))}
        </div>
      </div>

      {/* Latest Branch Topics Section */}
      <div className="mt-20">
        <h2 className="mb-2 font-tajawal text-lg">آخر موضوعات الفرع:</h2>
        <div className="overflow-hidden rounded-md bg-white text-black">
          {latestTopics.map((article) => {
            const { day, month } = formatDateForDisplay(article.published_at);
            return (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article.uuid)}
                className="flex cursor-pointer flex-row-reverse items-center justify-between gap-2 border-b border-gray-200 py-2 pl-4 pr-1 transition-colors duration-200 last:border-none hover:bg-gray-50"
              >
                <p
                  className="min-w-0 flex-1 pr-2 font-tajawal text-sm"
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
                <div className="relative flex h-16 w-20 flex-shrink-0 flex-col items-center justify-center rounded-md text-xs text-white">
                  <span className="relative z-50 text-sm font-bold">{day}</span>
                  <span className="relative z-50">{month}</span>
                  <Image
                    className="absolute z-0"
                    src={"/assets/test.png"}
                    alt="icon"
                    fill
                  />
                  <div className="absolute inset-0 bg-[rgba(37,37,37,0.8)]"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedTopics;
