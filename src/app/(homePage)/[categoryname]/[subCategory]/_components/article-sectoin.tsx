"use client";
import { ChevronRight } from "lucide-react";
import ArticlePagintation from "./articles-pagination";
import ArticleCard from "./article-card";

interface MainItemsProps {
  title?: string;
  articles?: Article[];
  pagination: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery?: string; // Add search query prop
}

const ArticleSectoin = ({
  title = "العنوان",
  articles = [],
  pagination,
  currentPage,
  onPageChange,
  searchQuery = "",
}: MainItemsProps) => {
  const isSearching = searchQuery.trim().length > 0;
  const hasResults = articles.length > 0;

  const renderEmptyState = () => {
    if (isSearching) {
      // Search-specific empty state
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mx-auto max-w-md text-center">
            {/* Search empty state icon */}
            <div className="mb-6">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Search empty state text */}
            <h3 className="mb-3 font-tajawal text-xl font-semibold text-gray-700">
              لم يتم العثور على نتائج
            </h3>
            <p className="mb-6 font-tajawal leading-relaxed text-gray-500">
              لم نتمكن من العثور على أي مقالات تتطابق مع بحثك عن &rdquo;
              {searchQuery}
              &#34;. جرب كلمات مختلفة أو تأكد من صحة الكتابة.
            </p>

            {/* Search action buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-tajawal text-gray-700 transition-colors duration-200 hover:bg-gray-50"
              >
                العودة للخلف
              </button>
              <button
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.delete("search");
                  params.delete("page");
                  window.history.replaceState(
                    null,
                    "",
                    `?${params.toString()}`
                  );
                  window.location.reload();
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-[#B5975C] px-6 py-2.5 font-tajawal text-white transition-colors duration-200 hover:bg-[#A08750]"
              >
                مسح البحث
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default empty state (no articles)
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-md text-center">
          {/* Empty state icon */}
          <div className="mb-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          {/* Empty state text */}
          <h3 className="mb-3 font-tajawal text-xl font-semibold text-gray-700">
            عذراً
          </h3>
          <p className="mb-6 font-tajawal leading-relaxed text-gray-500">
            لم تُرفع موضوعات هذا الفرع بعد. يرجى الزيارة لاحقاً.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-2 font-tajawal text-gray-700 transition-colors duration-200 hover:bg-gray-50"
            >
              <ChevronRight />
              العودة للخلف
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#B5975C] px-6 py-2.5 font-tajawal text-white transition-colors duration-200 hover:bg-[#A08750]"
            >
              إعادة تحميل
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative z-30 pb-20 pt-10 ">
      {/* Page Title */}
      <h4 className="mb-[65px] mt-7 text-right font-tajawal text-4xl font-bold text-[#B5975C]">
        {title}
      </h4>

      {/* Search results count */}
      {isSearching && hasResults && (
        <div className="mb-4 text-right font-tajawal text-sm text-gray-600">
          تم العثور على {articles.length} نتيجة
        </div>
      )}

      {/* Articles List */}
      <div className="space-y-0">
        {hasResults
          ? articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                className="mb-0"
              />
            ))
          : renderEmptyState()}
      </div>

      {/* Pagination - only show if not searching and has multiple pages */}
      {!isSearching && pagination.last_page > 1 && (
        <ArticlePagintation
          currentPage={currentPage}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      )}
    </div>
  );
};

export default ArticleSectoin;
