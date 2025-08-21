/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import HeadingText from "@/components/common/heading-text";
import SectionLogo from "@/components/common/section-logo";
import { useState } from "react";
import RecentLeftSection from "./recent-left";
import RecentRightSection from "./recent-right";

const RecentTopics = ({
  bgUrl,
  LogoUrl,
  articles,
  onArticleClick,
}: {
  bgUrl: string;
  LogoUrl: string;
  articles: Article[];
  onArticleClick?: (article: Article) => void;
}) => {
  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  const [selectedArticle, setSelectedArticle] = useState(sortedArticles[0]);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    if (onArticleClick) {
      onArticleClick(article);
    }
  };

  if (!selectedArticle) {
    return <div>No articles available</div>;
  }

  return (
    <section
      id="RecentTopics"
      className="relative z-50 min-h-[100vh] pb-10 pt-16"
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
            className=""
          />
        </div>
        <div className="flex flex-col items-end justify-between gap-10 pb-10 lg:flex-row lg:items-start">
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
