import HeadingText from "@/components/common/heading-text";
import SectionLogo from "@/components/common/section-logo";
import { getBestArticles } from "@/lib/api/article.api";
import SiteHighLights from "./site-high-lights";

export default async function Mokhtarat() {
  // ✅ Cache request for better perf (ISR or static fetch if possible)
  const bestArticles = await getBestArticles();

  return (
    <section
      id="mokhtarat"
      className="relative z-50 min-h-[100vh] bg-white"
      aria-labelledby="mokhtarat-heading"
    >
      <div className="relative z-50 pt-16">
        <div className="flex-row-center">
          {/* ✅ Ensure SectionLogo adds descriptive alt text */}
          <SectionLogo LogoUrl="/assets/sectionLogo-1.png" />
        </div>

        <div className="mb-10 mt-5 text-center">
          <HeadingText
            title=" من مختلف الفروع"
            goldenText="مدونات منتقاة"
            text="تقترحها إدارة الموقع بالنظر إلى أهمية مسائلها أو جدة موضوعاتها"
            className="text-black"
            black
          />
        </div>

        {/* ✅ Articles list */}
        <SiteHighLights bestArticles={bestArticles.data} />
      </div>
    </section>
  );
}
