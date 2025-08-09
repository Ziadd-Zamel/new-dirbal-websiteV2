import HighLightCard from "./high-light-card";

export default function SiteHighLights({
  bestArticles,
}: {
  bestArticles: Article[];
}) {
  const sections = [
    {
      articles: bestArticles.slice(0, 2),
      backgroundColor: "bg-[#FFFFFF55]",
      gradientColor: "from-gray-500",
    },
    {
      articles: bestArticles.slice(2, 4),
      backgroundColor: "bg-[#B5975C]/10",
      gradientColor: "from-gray-500",
    },
    {
      articles: bestArticles.slice(4, 6),
      backgroundColor: "bg-[#FFFFFF55]",
      gradientColor: "from-gray-500",
    },
  ];

  return (
    <section className="relative z-50" dir="rtl">
      {sections.map((section, index) => {
        if (section.articles.length === 0) return null;

        return (
          <div
            key={index}
            className={`main-padding m-auto ${section.backgroundColor} py-8`}
          >
            <div className="flex flex-col items-center justify-between gap-16 md:flex-row md:items-start">
              {section.articles.map((article) => (
                <HighLightCard
                  key={article.uuid}
                  article={article}
                  gradientColor={section.gradientColor}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
