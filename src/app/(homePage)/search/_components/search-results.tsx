"use client";
import ArticleCard from "../../[categoryname]/[subCategory]/_components/article-card";
import ArticlePagintation from "../../[categoryname]/[subCategory]/_components/articles-pagination";
import HeadingText from "@/components/common/heading-text";
import SectionLogo from "@/components/common/section-logo";
import { useTheme } from "next-themes";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchResultsProps {
  query: string;
  searchResults: {
    data: {
      articles: Article[];
      pagination: PaginationMeta;
    };
    message: string;
    search_query: string;
    search_results_count: number;
    success: boolean;
  } | null;
  currentPage: number;
}

export default function SearchResults({
  query,
  searchResults,
  currentPage,
}: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  const { theme } = useTheme();
  return (
    <section id="SearchResults" className="relative min-h-[100vh] pb-24">
      <div className="main-padding relative z-50 py-6 mt-20">
        <div className="flex-row-center">
          <SectionLogo LogoUrl={"/assets/sectionLogo-5.svg"} />
        </div>
        <div className="flex-row-center -mt-2">
          <HeadingText
            align="left"
            title=""
            text="نتائج البحث"
            containerClassName="-mr-4"
            className="text-3xl"
            black={theme === "light"}
          />
        </div>

        {/* Search Query Display */}
        {query && (
          <div className="mt-6 text-center">
            <p className="text-white light:text-black font-tajawal text-lg">
              البحث عن:{" "}
              <span className="text-[#B5975C] font-bold">
                &ldquo;{query}&rdquo;
              </span>
            </p>
          </div>
        )}

        {/* Search Results */}
        <div className="mt-8">
          {!query ? (
            <div className="text-center text-gray-300 light:text-gray-600 font-tajawal text-lg">
              أدخل كلمة البحث للبدء
            </div>
          ) : searchResults &&
            searchResults.data &&
            searchResults.data.articles &&
            searchResults.data.articles.length > 0 ? (
            <>
              {/* Articles List */}
              <div className="space-y-0 lg:mr-24 w-full md:max-w-[80%]">
                {searchResults.data.articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    className="mb-0"
                    searchTerm={query}
                  />
                ))}
              </div>

              {/* Pagination */}
              {searchResults.data.pagination &&
                searchResults.data.pagination.last_page > 1 && (
                  <div className="mt-8">
                    <ArticlePagintation
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      pagination={searchResults.data.pagination}
                    />
                  </div>
                )}
            </>
          ) : (
            <div className="text-center text-gray-300 light:text-gray-600 font-tajawal text-lg">
              لم يتم العثور على نتائج لـ &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
