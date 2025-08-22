import {
  addBookmark,
  isBookmarked,
  removeBookmark,
} from "@/lib/utils/articles";
import { TfiBookmark } from "react-icons/tfi";
import { IoIosBookmark } from "react-icons/io";
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
          <IoIosBookmark
            strokeWidth={0.01}
            size={35}
            className="transition-colors duration-300 text-[#B5975C]"
          />
        ) : (
          <TfiBookmark
            strokeWidth={0.01}
            size={30}
            className="transition-colors text-white duration-300"
          />
        )}
      </button>
    </div>
  );
}
