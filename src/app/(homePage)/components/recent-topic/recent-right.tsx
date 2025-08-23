import { useEffect, useState } from "react";

export default function RecentRightSection({
  articles,
  onArticleClick,
}: {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCards, setActiveCards] = useState<number[]>([0, 1, 2]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const formatDate = (dateString: string): { day: string; month: string } => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const monthNames = [
      "يناير",
      "فبراير",
      "مارس",
      "إبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];
    const month = monthNames[date.getMonth()];
    return { day, month };
  };

  const handleCardClick = (article: Article) => {
    if (!isTransitioning) {
      onArticleClick(article);
    }
  };

  // Split articles into groups of 3
  const limitedArticles = articles.slice(0, 9);
  const articleGroups: Article[][] = [];
  for (let i = 0; i < limitedArticles.length; i += 3) {
    articleGroups.push(limitedArticles.slice(i, i + 3));
  }
  const handleNavigation = (index: number) => {
    if (currentIndex === index || isTransitioning) return;

    setIsTransitioning(true);

    // Clear all cards with staggered effect
    setActiveCards([]);

    setTimeout(() => {
      setCurrentIndex(index);

      // Bring cards back one by one
      setTimeout(() => setActiveCards([0]), 100);
      setTimeout(() => setActiveCards([0, 1]), 250);
      setTimeout(() => {
        setActiveCards([0, 1, 2]);
        setIsTransitioning(false);
      }, 400);
    }, 500);
  };

  // Initialize cards on mount
  useEffect(() => {
    const timeout1 = setTimeout(() => setActiveCards([0]), 100);
    const timeout2 = setTimeout(() => setActiveCards([0, 1]), 250);
    const timeout3 = setTimeout(() => setActiveCards([0, 1, 2]), 400);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  // Don't render if no articles
  if (!articles.length || !articleGroups.length) {
    return null;
  }

  return (
    <div className="mt-3 flex w-full flex-col items-start justify-end sm:w-[80%] lg:w-[48%] sm:-5 md:pr-0 lg:pr-5">
      <div className="w-full">
        <div className="flex w-full flex-col items-start space-y-2">
          {articleGroups[currentIndex]?.map((article, cardIndex) => {
            const { day, month } = formatDate(article.updated_at);

            return (
              <div
                key={article.id}
                className={`z-0 w-full cursor-pointer transition-all duration-300 ${
                  activeCards.includes(cardIndex)
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  transitionDelay: `${cardIndex * 150}ms`,
                }}
                onClick={() => handleCardClick(article)}
              >
                <div>
                  <div
                    className="flex h-[200x] w-full cursor-pointer flex-col bg-white p-6 pr-10 shadow-md transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:py-[18px] sm:pl-5 sm:pr-[44px]"
                    style={{ direction: "rtl" }}
                  >
                    {/* Title and content */}
                    <p className="mb-2 mr-2 mt-1 h-auto font-tajawal text-sm font-medium leading-[30px] text-[#3A4553] sm:mb-0 sm:h-[80px] sm:text-base md:text-lg">
                      <span className="text-[18px] font-medium text-[#B5975C] sm:text-[20px]">
                        {article.title_number}
                        {article.title_short}:{" "}
                      </span>
                      {article.title.length > 100
                        ? `${article.title.substring(0, 100)}...`
                        : article.title}
                    </p>

                    {/* Subcategory - hidden on small screens */}
                    <span className="mt-2 hidden items-center gap-1 font-tajawal text-xs font-medium text-[#B49471] sm:absolute sm:bottom-3 sm:left-4 sm:mt-0 sm:flex sm:text-sm">
                      <p>{article.sub_category.name}</p>
                    </span>
                  </div>
                  <div className="absolute -right-6 top-[50%] z-30 hidden translate-y-[-50%] flex-col items-center bg-[#2E3A47] font-tajawal text-white sm:flex">
                    <span className="py-1 text-md font-bold">{day}</span>
                    <span className="min-w-[20px] bg-[#B5975C] px-[12px] py-1 text-[10px] text-white">
                      {month}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {articleGroups.length > 1 && (
        <div className="mt-4 flex w-full items-center justify-start flex-row-reverse">
          {articleGroups.map((_, index) => (
            <button
              key={index}
              className={`rounded-full transition-colors mx-1 ${
                currentIndex === index
                  ? "h-4 w-4 bg-[#B5975C]"
                  : "h-3 w-3 bg-gray-400"
              }`}
              onClick={() => handleNavigation(index)}
              disabled={isTransitioning}
              aria-label={`Go to group ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
