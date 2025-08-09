"use client";

import Image from "next/image";
import { useState } from "react";
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
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
  console.log(articleById);
  return (
    <div className="relative min-h-screen">
      {/* Page Heading with Background */}
      <MawdooaHeading
        bgImageSrc="/assets/mawdoo3at.png"
        title={articleById.title}
        articleById={articleById}
      />

      {/* Page Layout */}
      <section className="relative z-50 min-h-screen pb-32 pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/assets/mainbg-10.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        <div className="relative z-50 flex min-h-screen w-full justify-between main-padding gap-2">
          {/* Sidebar Container */}
          <div className="hidden w-fit md:block">
            <div className="sticky top-0">
              <Sidebar articleById={articleById} />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-[59%]">
            <Mawdooa articleById={articleById} searchTerm={searchTerm} />
            {/* Add id or data attribute for comments section */}
            <div id="comments-section">
              <CommentForm />
            </div>
          </div>
          {/* Related Topics - Hidden on Mobile */}

          <div className="hidden w-[30%] md:block">
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
  );
};

export default ArticlePage;
