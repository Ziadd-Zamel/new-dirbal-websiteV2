"use client";
import ArticleCard from "../../[categoryname]/[subCategory]/_components/article-card";
import ArticlePagintation from "../../[categoryname]/[subCategory]/_components/articles-pagination";
import HeadingText from "@/components/common/heading-text";
import SectionLogo from "@/components/common/section-logo";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface TagResultsProps {
  tag: string;
  tagResults: {
    data: {
      articles: Article[];
      pagination: PaginationMeta;
    };
    message: string;
    success: boolean;
  } | null;
  currentPage: number;
}

export default function TagResults({
  tag,
  tagResults,
  currentPage,
}: TagResultsProps) {
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

  return (
    <section id="TagResults" className="relative min-h-[100vh] pb-24">
      {/* Background image */}
      <div className="absolute inset-0 mt-0 h-full">
        <Image
          src={"/assets/mainbg-9.png"}
          alt=""
          height={1000}
          width={100}
          className="h-full w-full"
        />
      </div>

      <div className="main-padding relative z-50 py-6 mt-20">
        <div className="flex-row-center">
          <SectionLogo LogoUrl={"/assets/sectionLogo-5.svg"} />
        </div>
        <div className="flex-row-center -mt-2">
          <HeadingText
            align="left"
            title=""
            text="المقالات حسب المفتاحيات"
            containerClassName="-mr-4"
            className="text-3xl"
          />
        </div>

        {/* Tag Display */}
        {tag && (
          <div className="mt-6 text-center">
            <p className="text-white font-tajawal text-lg">
              المفتاح:{" "}
              <span className="text-[#B5975C] font-bold">
                &ldquo;{tag}&rdquo;
              </span>
            </p>
          </div>
        )}

        {/* Tag Results */}
        <div className="mt-8">
          {!tag ? (
            <div className="text-center text-gray-300 font-tajawal text-lg">
              اختر وسماً لعرض المقالات
            </div>
          ) : tagResults &&
            tagResults.data &&
            tagResults.data.articles &&
            tagResults.data.articles.length > 0 ? (
            <>
              {/* Articles List */}
              <div className="space-y-0 lg:mr-24 max-w-[80%]">
                {tagResults.data.articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    className="mb-0"
                  />
                ))}
              </div>

              {/* Pagination */}
              {tagResults.data.pagination &&
                tagResults.data.pagination.last_page > 1 && (
                  <div className="mt-8">
                    <ArticlePagintation
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      pagination={tagResults.data.pagination}
                    />
                  </div>
                )}
            </>
          ) : (
            <div className="text-center text-gray-300 font-tajawal text-lg">
              لم يتم العثور على مقالات للوسم &ldquo;{tag}&rdquo;
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
