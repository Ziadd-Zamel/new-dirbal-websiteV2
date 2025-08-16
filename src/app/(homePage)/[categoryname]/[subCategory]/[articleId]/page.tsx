import {
  getArticleById,
  getArticlesBySubCategory,
  getArticlesByTag,
} from "@/lib/api/article.api";
import ArticlePage from "./_components/article-page";
export const dynamic = "force-dynamic";
export default async function Page({
  params,
}: {
  params: Promise<{ articleId: string; subCategory: string }>;
}) {
  const { articleId, subCategory } = await params;
  const articlesByCategory = await getArticlesBySubCategory(subCategory);
  const articleById = await getArticleById(articleId);

  // Fetch articles by the first tag if tags exist
  let articlesByTag = null;
  if (articleById.data.tags && articleById.data.tags.length > 0) {
    const firstTag = articleById.data.tags[0];
    try {
      articlesByTag = await getArticlesByTag(firstTag);
    } catch (error) {
      console.error("Error fetching articles by tag:", error);
    }
  }

  return (
    <>
      <ArticlePage
        articlesByCategory={articlesByCategory.data}
        articleById={articleById.data}
        articlesByTag={articlesByTag?.data || []}
      />
    </>
  );
}
