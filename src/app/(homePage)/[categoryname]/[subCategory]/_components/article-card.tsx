"use client";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ArticleCardProps {
  article: Article;
  className?: string;
  onDelete?: (articleUuid: string) => void;
  searchTerm?: string;
}

function stripHtmlTags(html: string): string {
  if (typeof window === "undefined") return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

// Function to remove only font-size and font-family from inline styles
function removeParagraphStylesOnly(html: string): string {
  return html.replace(/style="([^"]*)"/gi, (_, styleContent) => {
    const cleanedStyle = styleContent
      .split(";")
      .map((rule: any) => rule.trim())
      .filter(
        (rule: any) =>
          rule &&
          !rule.toLowerCase().startsWith("font-size") &&
          !rule.toLowerCase().startsWith("font-family")
      )
      .join("; ");

    return cleanedStyle ? `style="${cleanedStyle}"` : "";
  });
}

// Function to highlight text in HTML content
function highlightHtmlContent(html: string, searchTerm: string): string {
  if (!searchTerm || !html) return html;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const highlightTextNodes = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
        const regex = new RegExp(
          `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
          "gi"
        );
        const highlightedText = text.replace(
          regex,
          '<mark class="search-highlight bg-yellow-300 text-black px-1 rounded font-bold">$1</mark>'
        );
        const span = document.createElement("span");
        span.innerHTML = highlightedText;
        node.parentNode?.replaceChild(span, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      if (element.tagName !== "SCRIPT" && element.tagName !== "STYLE") {
        const children = Array.from(node.childNodes);
        children.forEach(highlightTextNodes);
      }
    }
  };

  highlightTextNodes(tempDiv);
  return tempDiv.innerHTML;
}

// Function to detect if content is primarily English
function isContentEnglish(text: string): boolean {
  if (!text) return false;
  const plainText = stripHtmlTags(text);
  const englishChars = (plainText.match(/[a-zA-Z]/g) || []).length;
  const arabicChars = (
    plainText.match(
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g
    ) || []
  ).length;
  const totalLetters = englishChars + arabicChars;
  if (totalLetters === 0) return false;
  return englishChars / totalLetters > 0.6;
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function scrollToElement(element: HTMLElement, targetElement: HTMLElement) {
  const targetRect = targetElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  if (targetRect.bottom > viewportHeight) {
    const scrollAmount = targetRect.bottom - viewportHeight + 100;
    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth",
    });
  } else if (targetRect.top < 0) {
    const scrollAmount = targetRect.top - 100;
    window.scrollBy({
      top: scrollAmount,
      behavior: "smooth",
    });
  }
}

let currentlyExpandedArticle: string | null = null;

const ArticleCard = ({
  article,
  className = "",
  onDelete,
  searchTerm,
}: ArticleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const hasImage = article.image_url;
  const hasVideo = article.video_url;
  const isEnglish = isContentEnglish(article.description);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(article.uuid);
    }
  };

  useEffect(() => {
    const handleCloseOthers = (event: CustomEvent) => {
      if (event.detail.exceptId !== article.uuid && isExpanded) {
        setIsCollapsing(true);
        setIsExpanded(false);
        setTimeout(() => {
          setIsCollapsing(false);
        }, 1600);
      }
    };

    window.addEventListener(
      "closeOtherArticles",
      handleCloseOthers as EventListener
    );

    return () => {
      window.removeEventListener(
        "closeOtherArticles",
        handleCloseOthers as EventListener
      );
    };
  }, [article.uuid, isExpanded]);

  const toggleExpand = () => {
    if (currentlyExpandedArticle && currentlyExpandedArticle !== article.uuid) {
      window.dispatchEvent(
        new CustomEvent("closeOtherArticles", {
          detail: { exceptId: article.uuid },
        })
      );
    }

    if (isExpanded) {
      setIsCollapsing(true);
      setIsExpanded(false);
      currentlyExpandedArticle = null;

      setTimeout(() => {
        setIsCollapsing(false);
      }, 400);
    } else {
      setIsAnimating(true);
      currentlyExpandedArticle = article.uuid;

      setIsExpanded(true);
      setTimeout(() => {
        const element = document.getElementById(`article-${article.uuid}`);
        if (element) {
          scrollToElement(element, element);
        }
      }, 300);
    }
  };

  const metadataVariants = {
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const renderVideoOrText = () => {
    if (hasVideo) {
      const videoId = getYouTubeVideoId(hasVideo);
      if (videoId) {
        return (
          <div className="mt-5 w-full">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );
      }
    }

    return (
      <div
        style={{ direction: isEnglish ? "ltr" : "rtl" }}
        className={`mt-5 font-tajawal text-base text-gray-300 light:text-gray-600 ${
          isEnglish ? "text-left" : "text-justify"
        }`}
        dangerouslySetInnerHTML={{
          __html: searchTerm
            ? highlightHtmlContent(
                removeParagraphStylesOnly(article.description),
                searchTerm
              )
            : removeParagraphStylesOnly(article.description),
        }}
      />
    );
  };

  return (
    <div id={`article-${article.uuid}`} className={`w-full ${className}`}>
      {/* Article Title */}
      <div
        style={{ direction: "rtl" }}
        className="mt-12 flex cursor-pointer items-center justify-between gap-5 transition-opacity hover:opacity-80"
        onClick={toggleExpand}
      >
        <div>
          <span className="font-tajawal text-base text-[#B5975C]  md:text-[16px] xl:text-[22px]">
            {article.title_number} {article.title_short}:{" "}
          </span>
          <span
            className="font-tajawal text-base text-white light:text-black  md:text-[16px] xl:text-[22px]"
            dangerouslySetInnerHTML={{
              __html: searchTerm
                ? highlightHtmlContent(article.title, searchTerm)
                : article.title,
            }}
          />
        </div>
        {hasImage && !onDelete && (
          <Image
            src={article.image_url!}
            alt="article image"
            width={85}
            height={120}
          />
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="group mt-3 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#B5975C] transition-colors duration-200 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        <motion.div
          // @ts-ignore
          initial={
            isCollapsing
              ? metadataVariants.hidden
              : { opacity: 1, height: "auto" }
          }
          // @ts-ignore
          animate={metadataVariants.visible}
          // @ts-ignore
          exit={metadataVariants.hidden}
          style={{ direction: "rtl" }}
          className="flex items-center gap-10 text-white"
        >
          <div className="mt-1 flex items-center">
            <Image
              src={"/assets/date.png"}
              alt="Home Icon"
              width={35}
              height={0}
            />{" "}
            <span className="font-tajawal text-[12px] text-[#B5975C] sm:text-[14px] xl:text-[16px]">
              {new Date(article.published_at)
                .toLocaleDateString("en-GB")
                .split("/")
                .reverse()
                .join("-")}
            </span>
          </div>
          <div className="ml-6 mt-1 flex items-center">
            <Image
              src={"/assets/Author.svg"}
              alt="Home Icon"
              width={30}
              height={0}
            />{" "}
            <span className="font-tajawal text-[12px] text-[#B5975C] sm:text-[14px] xl:text-[16px]">
              {article.written_by}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            // @ts-ignore
            initial={contentVariants.hidden}
            // @ts-ignore
            animate={contentVariants.visible}
            // @ts-ignore
            exit={contentVariants.hidden}
            className="flex-col items-center justify-center overflow-hidden text-center"
            onAnimationComplete={() => {
              if (isAnimating) {
                setIsAnimating(false);
              }
            }}
          >
            <h6 className="mt-8 font-tajawal text-xl text-[#B5975C]">
              {article.title_description}
            </h6>

            {renderVideoOrText()}

            <div className="mt-5 flex w-full items-end justify-start">
              {article.description && (
                <Link
                  href={`/${article.sub_category.category.uuid}/${
                    article.sub_category.uuid
                  }/${article.uuid}${
                    searchTerm
                      ? `?search=${encodeURIComponent(searchTerm)}`
                      : ""
                  }`}
                  className="flex w-fit items-center gap-2 self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 font-tajawal text-lg text-white hover:bg-[#C18F59]"
                >
                  المزيد
                  <span className="mr-2 mt-0.5">
                    <LeftArrowIcon height={10} width={10} dark={false} />
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Divider */}
      <div className="mb-3 mt-3">
        <hr className="w-full border-t border-[#B5975C] opacity-70" />
      </div>

      {/* Global styles for search highlighting with animation */}
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

export default ArticleCard;
