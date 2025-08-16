import { getAllArticles } from "@/lib/api/article.api";
import { getAllCategories } from "@/lib/api/category.api";
import { getAllQabasat } from "@/lib/api/qabasat.api";
import HeroSection from "./hero/hero-section";
import Mokhtarat from "./mokhtarat/mokhtarat";
import RecentTopics from "./recent-topic/resnet-topics";
import {
  getBackgroundHomeImage,
  getFavouriteArticleImage,
} from "@/lib/api/settings.api";

export default async function HoomPage() {
  const bgUrl = `/assets/mainbg-1.png`;
  const LogoUrl = `/assets/sectionLogo-1.png`;
  const Categories = await getAllCategories();
  const Articles = await getAllArticles();
  const Qabasat = await getAllQabasat();
  const backgroundHomeImage = await getBackgroundHomeImage();
  const favouriteArticleImage = await getFavouriteArticleImage();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="relative z-50 flex-grow">
        <HeroSection
          backgroundHomeImage={backgroundHomeImage}
          Qabasat={Qabasat.data}
          categories={Categories.data}
        />
        <Mokhtarat />
        <div className="relative">
          <div
            className={`absolute inset-0 h-full w-full`}
            style={{
              backgroundImage: `url(${favouriteArticleImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-[rgba(37,37,37,0.9)]" />
          <RecentTopics
            articles={Articles.data}
            bgUrl={bgUrl}
            LogoUrl={LogoUrl}
          />
        </div>
      </div>
    </div>
  );
}
