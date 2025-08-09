import HeadingText from "@/components/common/heading-text";
import SectionLogo from "@/components/common/section-logo";
import { getBestArticles } from "@/lib/api/article.api";
import SiteHighLights from "./site-high-lights";

export default async function Mokhtarat() {
  const bestArticles = await getBestArticles();
  return (
    <section id="Mokhtarat" className="relative z-50 min-h-[100vh] bg-white">
      <div className="relative z-50 pt-16">
        <div className="flex-row-center">
          <SectionLogo LogoUrl={`/assets/sectionLogo-1.png`} />
        </div>

        <div className="mb-10 mt-5">
          <HeadingText
            title="   من فروع الموقع  "
            goldenText="  مدوّنات منتقاة  "
            text="يقترحها مدير الموقع لما تنطوي عليه من مسائل مهمة أو موضوعات جدلية أو جديدة"
            className="text-black"
            black={true}
          />
        </div>
        <SiteHighLights bestArticles={bestArticles.data} />
      </div>
    </section>
  );
}
