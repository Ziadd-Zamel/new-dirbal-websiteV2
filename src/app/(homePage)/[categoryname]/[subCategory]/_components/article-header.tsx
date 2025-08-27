import Image from "next/image";
import { highlightText } from "./utils/text-utils";

interface ArticleHeaderProps {
  article: Article;
  searchTerm?: string;
  onDelete?: (articleUuid: string) => void;
  onToggleExpand: () => void;
}

const ArticleHeader = ({
  article,
  searchTerm,
  onDelete,
  onToggleExpand,
}: ArticleHeaderProps) => {
  const hasImage = article.image_url;

  return (
    <div
      style={{ direction: "rtl" }}
      className="mt-12 flex cursor-pointer items-center justify-between gap-5 transition-opacity hover:opacity-80"
      onClick={onToggleExpand}
    >
      <div>
        <span className="font-tajawal text-[12px] text-[#FAE1C6] sm:text-[16px] md:text-[16px] xl:text-[22px]">
          {article.title_number} {article.title_short}:{" "}
        </span>
        <span
          className="font-tajawal text-[12px] text-white sm:text-[16px] md:text-[16px] xl:text-[22px]"
          dangerouslySetInnerHTML={{
            __html: searchTerm
              ? highlightText(article.title, searchTerm)
              : article.title,
          }}
        />
      </div>

      {/* Original working logic - don't touch this! */}
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
            if (onDelete) {
              onDelete(article.uuid);
            }
          }}
          className="group flex items-center justify-center mt-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[#B5975C] transition-colors duration-200"
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
  );
};

export default ArticleHeader;
