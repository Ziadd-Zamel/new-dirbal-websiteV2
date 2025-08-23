import { getAllArticles } from "@/lib/api/article.api";
import { getAllCategories } from "@/lib/api/category.api";
import { getAllQabasat } from "@/lib/api/qabasat.api";
import {
  getBackgroundHomeImage,
  getFavouriteArticleImage,
} from "@/lib/api/settings.api";

export async function fetchHomePageData() {
  try {
    const [
      categories,
      articles,
      qabasat,
      backgroundHomeImage,
      favouriteArticleImage,
    ] = await Promise.allSettled([
      getAllCategories(),
      getAllArticles(),
      getAllQabasat(),
      getBackgroundHomeImage(),
      getFavouriteArticleImage(),
    ]);

    return {
      categories:
        categories.status === "fulfilled" ? categories.value : { data: [] },
      articles: articles.status === "fulfilled" ? articles.value : { data: [] },
      qabasat: qabasat.status === "fulfilled" ? qabasat.value : { data: [] },
      backgroundHomeImage:
        backgroundHomeImage.status === "fulfilled"
          ? backgroundHomeImage.value
          : "/assets/default-bg.jpg",
      favouriteArticleImage:
        favouriteArticleImage.status === "fulfilled"
          ? favouriteArticleImage.value
          : "/assets/default-favourite-bg.jpg",
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      categories: { data: [] },
      articles: { data: [] },
      qabasat: { data: [] },
      backgroundHomeImage: "/assets/default-bg.jpg",
      favouriteArticleImage: "/assets/default-favourite-bg.jpg",
    };
  }
}
