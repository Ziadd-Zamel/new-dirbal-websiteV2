/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface ArticleCardProps {
  article: Article;
  className?: string;
  onDelete?: (articleUuid: string) => void;
}

function stripHtmlTags(html: string): string {
  if (typeof window === "undefined") return html;
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Global state to track which article is currently expanded
let currentlyExpandedArticle: string | null = null;

const ArticleCard = ({
  article,
  className = "",
  onDelete,
}: ArticleCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const plainText = stripHtmlTags(article.description);
  const pathname = usePathname();
  const hasImage = article.image_url;
  const handleDelete = () => {
    if (onDelete) {
      onDelete(article.uuid);
    }
  };

  const hasVideo = article.video_url;
  console.log(article);
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

      setTimeout(() => {
        setIsExpanded(true);
      }, 250);
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

    // Fallback to text if no video or invalid video URL
    return (
      <div
        style={{ direction: "rtl" }}
        className="mt-5 text-justify font-tajawal text-gray-300 lg:text-base"
      >
        {plainText}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Article Title */}
      <div
        style={{ direction: "rtl" }}
        className="mt-12 flex cursor-pointer items-center justify-between gap-5 transition-opacity hover:opacity-80"
        onClick={toggleExpand}
      >
        <div>
          <span className="font-tajawal text-[12px] text-[#FAE1C6] sm:text-[16px] md:text-[16px] xl:text-[22px]">
            {article.title_number} {article.title_short}:
          </span>
          <span className="font-tajawal text-[12px] text-white sm:text-[16px] md:text-[16px] xl:text-[22px]">
            {article.title}
          </span>
        </div>
        {hasImage && !onDelete && (
          <Image
            src={article.image_url!}
            alt="article image"
            width={85} // 17 * 5
            height={120} // 24 * 5
          />
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="group flex items-center justify-center mt-3"
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
              {new Date(article.created_at)
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
              <Link
                href={`${pathname}/${article.uuid}`}
                className="flex w-fit items-center gap-2 self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 font-tajawal text-lg text-white hover:bg-[#C18F59]"
              >
                المزيد
                <span className="mr-2 mt-0.5">
                  <LeftArrowIcon height={10} width={10} dark={false} />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Divider */}
      <div className="mb-3 mt-3">
        <hr className="w-full border-t border-[#B5975C] opacity-70" />
      </div>
    </div>
  );
};

export default ArticleCard;
