import HighLightCard from "./high-light-card";

export default function SiteHighLights({
  bestArticles,
}: {
  bestArticles: Article[];
}) {
  const chunkSize = 2;
  const sections = Array.from(
    { length: Math.ceil(bestArticles.length / chunkSize) },
    (_, i) => bestArticles.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  return (
    <section
      className="relative z-50"
      dir="rtl"
      aria-labelledby="site-highlights-heading"
    >
      <h2 id="site-highlights-heading" className="sr-only">
        مختارات المقالات المميزة
      </h2>

      {sections.map((articles, index) =>
        articles.length > 0 ? (
          <div
            key={index}
            className={`main-padding 2xl:px-0 m-auto ${
              index % 2 === 0 ? "bg-[#FFFFFF55]" : "bg-[#B5975C]/10"
            } py-8`}
          >
            <div className="flex flex-col items-center justify-between gap-16 md:flex-row md:items-start 2xl:box-container">
              {articles.map((article) => (
                <HighLightCard key={article.uuid} article={article} />
              ))}
            </div>
          </div>
        ) : null
      )}
    </section>
  );
}
