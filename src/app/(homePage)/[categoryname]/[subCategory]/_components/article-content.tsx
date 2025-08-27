import Link from "next/link";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import {
  highlightText,
  getYouTubeVideoId,
  stripHtmlTags,
} from "./utils/text-utils";

interface ArticleContentProps {
  article: Article;
  searchTerm?: string;
  isExpanded: boolean;
  isAnimating: boolean;
  onAnimationComplete: () => void;
}

const ArticleContent = ({
  article,
  searchTerm,
  isExpanded,
  isAnimating,
  onAnimationComplete,
}: ArticleContentProps) => {
  const plainText = stripHtmlTags(article.description);
  const hasVideo = article.video_url;

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
        dangerouslySetInnerHTML={{
          __html: searchTerm ? highlightText(plainText, searchTerm) : plainText,
        }}
      />
    );
  };

  if (!isExpanded) return null;

  return (
    <div className="flex-col items-center justify-center overflow-hidden text-center">
      <h6 className="mt-8 font-tajawal text-xl text-[#B5975C]">
        {article.title_description}
      </h6>

      {renderVideoOrText()}

      <div className="mt-5 flex w-full items-end justify-start">
        <Link
          href={`/${article.sub_category.category.uuid}/${
            article.sub_category.uuid
          }/${article.uuid}${
            searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""
          }`}
          className="flex w-fit items-center gap-2 self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 font-tajawal text-lg text-white hover:bg-[#C18F59]"
        >
          المزيد
          <span className="mr-2 mt-0.5">
            <LeftArrowIcon height={10} width={10} dark={false} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ArticleContent;
