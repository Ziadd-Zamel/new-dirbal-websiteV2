"use client";

import HeadingText from "@/components/common/heading-text";
import SectionLogo from "@/components/common/section-logo";
import { useState, useMemo } from "react";
import RecentLeftSection from "./recent-left";
import RecentRightSection from "./recent-right";

const RecentTopics = ({
  LogoUrl,
  articles,
  onArticleClick,
}: {
  bgUrl: string;
  LogoUrl: string;
  articles: Article[];
  onArticleClick?: (article: Article) => void;
}) => {
  const sortedArticles = useMemo(
    () =>
      [...articles].sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      ),
    [articles]
  );

  // ✅ Initialize selectedArticle safely
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(
    sortedArticles.length > 0 ? sortedArticles[0] : null
  );

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    onArticleClick?.(article);
  };
  if (!selectedArticle) {
    return (
      <section
        id="RecentTopics"
        className="relative z-50 min-h-[50vh] flex items-center justify-center"
      >
        <p className="text-gray-500 text-lg font-tajawal">
          لا توجد مقالات متاحة حالياً
        </p>
      </section>
    );
  }

  return (
    <section
      id="RecentTopics"
      className="relative z-50 min-h-[100vh] pb-10 pt-16"
      aria-labelledby="recent-topics-heading"
    >
      <div className="main-padding relative z-50 2xl:box-container">
        <div className="flex-row-center">
          <SectionLogo LogoUrl={LogoUrl} />
        </div>

        <div className="mb-16 mt-6">
          <HeadingText
            title="   إلى الموقع"
            goldenText=" أحدث المدونات المرفوعة "
            text="الأحكام والموضوعات الأخيرة. تشمل أيضاً تحديثات الملفات القديمة"
          />
        </div>

        <div className="flex flex-col lg:items-end justify-between gap-10 pb-10 lg:flex-row lg:items-start">
          <RecentRightSection
            articles={sortedArticles}
            onArticleClick={handleArticleClick}
          />
          <RecentLeftSection selectedArticle={selectedArticle} />
        </div>
      </div>
    </section>
  );
};

export default RecentTopics;
