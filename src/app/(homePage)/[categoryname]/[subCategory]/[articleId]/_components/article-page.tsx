"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RelatedTopics from "./Realated";
import Mawdooa from "./mawdooa";
import CommentForm from "./CommentFormUI";
import Sidebar from "./Sidebar";
import MawdooaHeading from "./mawdooa-heading";

const ArticlePage = ({
  articlesByCategory,
  articleById,
}: {
  articleById: Article;
  articlesByCategory: Article[];
  articlesByTag: Article[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOffset, setSidebarOffset] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (scrollY <= 500) {
          setSidebarOffset(0);
          return;
        }

        const dynamicOffset = scrollY - 400;

        const mainContent = document.querySelector(".main-content");
        const maxOffset = mainContent
          ? mainContent.scrollHeight * 0.8
          : window.innerHeight * 0.8;
        const clampedOffset = Math.min(dynamicOffset, maxOffset);

        setSidebarOffset(clampedOffset);
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  console.log(articleById);
  return (
    <>
      <div className="relative min-h-screen bg-background">
        {/* Page Heading with Background */}
        <MawdooaHeading
          bgImageSrc={
            articleById.sub_category.image_url || "/assets/mawdoo3at.png"
          }
          title={articleById.title}
          articleById={articleById}
          showOverlay={articleById.sub_category.light}
        />

        {/* Page Layout */}
        <section className="relative z-50 min-h-screen pb-32 pt-20">
          <div className="relative z-50 flex min-h-screen w-full justify-between main-padding gap-2">
            {/* Sidebar Container */}
            <div
              className="hidden w-fit md:block absolute top-0 transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${sidebarOffset}px)`,
              }}
            >
              <Sidebar articleById={articleById} />
            </div>
            <div className="w-[87px] hidden md:block" />
            {/* Main Content */}
            <div className="w-full md:w-[65%]">
              <Mawdooa articleById={articleById} searchTerm={searchTerm} />
              <div className="md:hidden">
                <RelatedTopics
                  articlesByCategory={articlesByCategory}
                  onSearch={handleSearch}
                />
              </div>
              <div id="comments-section" data-comments>
                <CommentForm uuid={articleById.uuid} />
              </div>
            </div>
            {/* Related Topics - Hidden on Mobile */}

            <div className="hidden w-[25%] md:block">
              <RelatedTopics
                articlesByCategory={articlesByCategory}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </section>

        {/* Global styles for search highlighting */}
        <style>{`
          .search-highlight {
            background-color: #fef08a !important;
            color: #000 !important;
            font-weight: bold !important;
            padding: 2px !important;
            border-radius: 2px !important;
            box-shadow: 0 0 0 1px #eab308;
          }

          .search-highlight:first-of-type {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default ArticlePage;
