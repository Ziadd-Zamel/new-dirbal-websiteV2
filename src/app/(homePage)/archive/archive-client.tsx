"use client";
import HeadingText from "@/components/common/heading-text";
import SectionLogo from "@/components/common/section-logo";
import { getBookmarkedArticles, removeBookmark } from "@/lib/utils/articles";
import Image from "next/image";
import { useEffect, useState } from "react";
import ArticleCard from "../[categoryname]/[subCategory]/_components/article-card";

export default function ArchiveClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const bookmarkedArticles = await getBookmarkedArticles();
      setArticles(bookmarkedArticles || []);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const handleRemoveBookmark = async (articleUuid: string) => {
    await removeBookmark(articleUuid);

    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.uuid !== articleUuid)
    );
  };

  return (
    <section id="RecentTopics" className="relative min-h-[100vh] pb-24">
      <div className="main-padding relative z-50 py-6 mt-20">
        <div className="flex-row-center">
          <SectionLogo LogoUrl={"/assets/sectionLogo-5.svg"} />
        </div>
        <div className="flex-row-center -mt-2 mr-1.5">
          <HeadingText
            align="left"
            title=""
            text="المفضلة"
            containerClassName="-mr-4"
            className="text-3xl"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h3 className="mb-2 text-xl text-white font-tajawal">
              المفضلة خالية{" "}
            </h3>
            <p className="text-sm text-[#FAE1C6] font-tajawal">
              لم تضف من عندك أي موضوع بعد{" "}
            </p>
          </div>
        ) : (
          <div className="mt-6 w-full md:max-w-[80%] h-full lg:mr-24">
            {articles.map((article) => (
              <ArticleCard
                key={article.uuid}
                article={article}
                className="mb-4"
                onDelete={handleRemoveBookmark}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
