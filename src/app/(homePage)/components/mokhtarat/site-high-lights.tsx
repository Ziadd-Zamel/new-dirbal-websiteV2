import HighLightCard from "./high-light-card";

export default function SiteHighLights({
  bestArticles,
}: {
  bestArticles: Article[];
}) {
  // Chunk size is 2 for md screens and up, 1 for smaller screens
  const chunkSizeMd = 2;
  const chunkSizeSm = 1;

  const sectionsMd = Array.from(
    { length: Math.ceil(bestArticles.length / chunkSizeMd) },
    (_, i) => bestArticles.slice(i * chunkSizeMd, i * chunkSizeMd + chunkSizeMd)
  );

  const sectionsSm = Array.from(
    { length: Math.ceil(bestArticles.length / chunkSizeSm) },
    (_, i) => bestArticles.slice(i * chunkSizeSm, i * chunkSizeSm + chunkSizeSm)
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

      {/* For md screens and up (768px+) - show 2 per row */}
      <div className="hidden md:block">
        {sectionsMd.map((articles, index) =>
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
      </div>

      {/* For smaller screens - show 1 per row */}
      <div className="block md:hidden">
        {sectionsSm.map((articles, index) =>
          articles.length > 0 ? (
            <div
              key={index}
              className={`main-padding 2xl:px-0 m-auto ${
                index % 2 === 0 ? "bg-[#FFFFFF55]" : "bg-[#B5975C]/10"
              } py-8`}
            >
              <div className="flex flex-col items-center justify-between gap-16 2xl:box-container">
                {articles.map((article) => (
                  <HighLightCard key={article.uuid} article={article} />
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}
