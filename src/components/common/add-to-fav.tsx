import {
  addBookmark,
  isBookmarked,
  removeBookmark,
} from '@/lib/utils/articles';
import { Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BookmarkButtonProps {
  article: Article;
  width?: number;
  height?: number;
}

export default function BookmarkButton({
  article,
  width = 24,
  height = 24,
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
    <button onClick={handleClick} className="mt-0.5">
      <Bookmark
        width={width}
        height={height}
        fill={bookmarked ? 'currentColor' : 'none'}
        className={bookmarked ? 'text-yellow-500' : 'text-white'}
        strokeWidth={1}
      />
    </button>
  );
}
