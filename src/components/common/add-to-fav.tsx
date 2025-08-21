import {
  addBookmark,
  isBookmarked,
  removeBookmark,
} from "@/lib/utils/articles";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BookmarkButtonProps {
  article: Article;
  width?: number;
  height?: number;
}

export default function BookmarkButton({
  article,
  width = 80,
  height = 80,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(article.uuid));
  }, [article.uuid]);

  const handleClick = () => {
    if (bookmarked) {
      removeBookmark(article.uuid);
      setBookmarked(false);
    } else {
      addBookmark(article);
      setBookmarked(true);
    }
  };

  return (
    <div className="size-10 flex items-center justify-center -ml-3">
      <button onClick={handleClick} className="mt-0.5">
        {bookmarked ? (
          <Image
            src="/assets/bookmark-filled.svg"
            alt="Remove from favorites"
            width={30}
            height={30}
            className="text-yellow-500 w-[]"
          />
        ) : (
          <Image
            src="/assets/bookmark-w.svg"
            alt="Add to favorites"
            width={30}
            height={30}
            className="text-white"
          />
        )}
      </button>
    </div>
  );
}
