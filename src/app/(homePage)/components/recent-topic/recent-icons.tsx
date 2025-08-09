import BookmarkButton from "@/components/common/add-to-fav";
import ShareIcon from "@/components/Icons/ShareIcon";
import { Copy } from "lucide-react";
import { useState } from "react";

export default function RecentIcons({ article }: { article: Article }) {
  const [copied, setCopied] = useState(false);
  const [copiedDesc, setCopiedDesc] = useState(false);

  const handleShareClick = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const handleCopyDescription = () => {
    if (article?.description) {
      navigator.clipboard.writeText(article.description).then(() => {
        setCopiedDesc(true);
        setTimeout(() => setCopiedDesc(false), 1000);
      });
    }
  };

  return (
    <div className="relative flex w-fit items-center gap-3 -mb-1">
      <div className="px-1.5 py-1.5">
        <BookmarkButton article={article} width={25} height={25} />
      </div>
      <div
        className="cursor-pointer border-x-[1px] border-solid border-gray-400 px-5 py-1.5"
        onClick={handleCopyDescription}
      >
        <Copy strokeWidth={1.2} color="white" size={25} />
      </div>
      <div className="cursor-pointer px-1.5 py-1.5" onClick={handleShareClick}>
        <ShareIcon width={25} height={25} />
      </div>

      {copied && (
        <span className="absolute -bottom-6 right-0 rounded bg-black px-2 py-0.5 text-[12px] text-white">
          تم نسخ الرابط
        </span>
      )}

      {copiedDesc && (
        <span className="absolute -bottom-6 right-0 rounded bg-black px-2 py-0.5 text-[12px] text-white">
          تم نسخ الوصف
        </span>
      )}
    </div>
  );
}
