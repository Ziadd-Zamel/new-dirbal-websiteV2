import { generateHomeMetadata } from "@/lib/metadata/data";
import { fetchHomePageData } from "@/lib/api/homepage";
import { generateHomeStructuredData } from "@/lib/Seo/data";
import { STATIC_ASSETS } from "@/lib/constants/api.constant";
import Script from "next/script";
import dynamic from "next/dynamic";
import Image from "next/image";

const HeroSection = dynamic(() => import("./hero/hero-section"), {
  loading: () => <div className="h-[300px] w-full animate-pulse" />,
});
const Mokhtarat = dynamic(() => import("./mokhtarat/mokhtarat"), {
  loading: () => <div className="h-[200px] w-full animate-pulse" />,
});
const RecentTopics = dynamic(() => import("./recent-topic/resnet-topics"), {
  loading: () => <div className="h-[400px] w-full animate-pulse" />,
});

export async function generateMetadata() {
  return generateHomeMetadata();
}

export default async function HomePage() {
  const data = await fetchHomePageData();
  const structuredData = generateHomeStructuredData();

  return (
    <>
      {/* ✅ Structured data via next/script */}
      <Script
        id="home-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                   focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        انتقل إلى المحتوى الرئيسي
      </a>

      <main
        id="main-content"
        className="relative flex min-h-screen flex-col overflow-hidden"
        aria-label="الصفحة الرئيسية"
      >
        {data?.qabasat?.data ? (
          <HeroSection
            backgroundHomeImage={data.backgroundHomeImage}
            Qabasat={data.qabasat.data}
            categories={data.categories.data}
          />
        ) : null}

        <Mokhtarat />

        <section className="relative" aria-label="المواضيع الحديثة">
          {/* ✅ Use Next/Image instead of raw bg-image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src={data.favouriteArticleImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <div
            className="absolute inset-0 bg-[rgba(37,37,37,0.9)]"
            aria-hidden="true"
          />

          <RecentTopics
            articles={data.articles.data}
            bgUrl={STATIC_ASSETS.bgUrl}
            LogoUrl={STATIC_ASSETS.logoUrl}
          />
        </section>
      </main>
    </>
  );
}
