"use client";

import Image from "next/image";
import Head from "next/head";
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
  articlesByTag,
}: {
  articleById: Article;
  articlesByCategory: Article[];
  articlesByTag: Article[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOffset, setSidebarOffset] = useState(0);
  const searchParams = useSearchParams();

  // Read search parameter from URL when component mounts
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [searchParams]);

  // Dynamic scroll-based sidebar animation
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Wait for user to stop scrolling (300ms delay)
      scrollTimeout = setTimeout(() => {
        // Ignore first 600px of scroll, then move sidebar 1:1 with remaining scroll
        if (scrollY <= 500) {
          setSidebarOffset(0);
          return;
        }

        // Calculate offset after ignoring first 400px
        const dynamicOffset = scrollY - 400;

        // Limit to 80% of the main content div height
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

  // Generate meta data for the article
  const generateMetaData = () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";
    const currentUrl =
      typeof window !== "undefined"
        ? window.location.href
        : `${siteUrl}/articles/${articleById.uuid || articleById.id}`;

    // Clean description from HTML tags
    const description =
      articleById.description ||
      articleById.description?.replace(/<[^>]*>/g, "").substring(0, 160) ||
      "اقرأ هذا المقال المميز على موقع ديربال";

    // Ensure image URL is absolute
    const imageUrl = articleById.image?.startsWith("http")
      ? articleById.image
      : `${siteUrl}${articleById.image || "/assets/default-article.jpg"}`;

    return {
      title: `${articleById.title} | ديربال`,
      description,
      imageUrl,
      currentUrl,
      author: articleById.published_at || "ديربال",
      publishedTime: articleById.published_at || new Date().toISOString(),
      modifiedTime:
        articleById.published_at ||
        articleById.published_at ||
        new Date().toISOString(),
      section: articleById.sub_category.name || "عام",
    };
  };

  const metaData = generateMetaData();

  // Generate JSON-LD structured data
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: articleById.title,
      description: metaData.description,
      image: metaData.imageUrl,
      author: {
        "@type": "Person",
        name: metaData.author,
      },
      publisher: {
        "@type": "Organization",
        name: "ديربال",
        logo: {
          "@type": "ImageObject",
          url: `${
            process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com"
          }/logo.png`,
        },
      },
      datePublished: metaData.publishedTime,
      dateModified: metaData.modifiedTime,
      articleSection: metaData.section,
      inLanguage: "ar",
      url: metaData.currentUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": metaData.currentUrl,
      },
      wordCount:
        articleById.description?.replace(/<[^>]*>/g, "").split(" ").length || 0,
    };
  };
  return (
    <>
      {/* Dynamic Meta Tags */}
      <Head>
        {/* Basic Meta Tags */}
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="author" content={metaData.author} />
        <link rel="canonical" href={metaData.currentUrl} />

        {/* Open Graph Meta Tags for Facebook */}
        <meta property="og:title" content={articleById.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={articleById.title} />
        <meta property="og:url" content={metaData.currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="ديربال" />
        <meta property="og:locale" content="ar_AR" />

        {/* Article specific Open Graph tags */}
        <meta property="article:author" content={metaData.author} />
        <meta
          property="article:published_time"
          content={metaData.publishedTime}
        />
        <meta
          property="article:modified_time"
          content={metaData.modifiedTime}
        />
        <meta property="article:section" content={metaData.section} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleById.title} />
        <meta name="twitter:description" content={metaData.description} />
        <meta name="twitter:image" content={metaData.imageUrl} />
        <meta name="twitter:site" content="@derbal" />
        <meta
          name="twitter:creator"
          content={`@${metaData.author.replace(/\s+/g, "")}`}
        />

        {/* Facebook App ID (if you have one) */}
        {process.env.NEXT_PUBLIC_FACEBOOK_APP_ID && (
          <meta
            property="fb:app_id"
            content={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
          />
        )}

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        {/* Language alternates */}
        <link rel="alternate" hrefLang="ar" href={metaData.currentUrl} />
        <link rel="alternate" hrefLang="x-default" href={metaData.currentUrl} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />

        {/* Prevent automatic telephone number detection */}
        <meta name="format-detection" content="telephone=no" />

        {/* Viewport meta tag for mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Theme color */}
        <meta name="theme-color" content="#1f2937" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen">
        {/* Page Heading with Background */}
        <MawdooaHeading
          bgImageSrc={
            articleById.sub_category.image_url || "/assets/mawdoo3at.png"
          }
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
            <div
              className="hidden w-fit md:block absolute top-0 transition-transform duration-300 ease-out"
              style={{
                transform: `translateY(${sidebarOffset}px)`,
              }}
            >
              <Sidebar articleById={articleById} />
            </div>
            <div className="w-[87px]" />
            {/* Main Content */}
            <div className="w-full md:w-[59%]">
              <Mawdooa articleById={articleById} searchTerm={searchTerm} />
              {/* Add id or data attribute for comments section */}
              <div id="comments-section" data-comments>
                <CommentForm />
              </div>
            </div>
            {/* Related Topics - Hidden on Mobile */}

            <div className="hidden w-[30%] md:block">
              <RelatedTopics
                articlesByCategory={articlesByCategory}
                articlesByTag={articlesByTag}
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
