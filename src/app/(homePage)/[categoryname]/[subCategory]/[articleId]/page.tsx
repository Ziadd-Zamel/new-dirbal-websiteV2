import {
  getArticleById,
  getArticlesBySubCategory,
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

  return (
    <>
      <ArticlePage
        articlesByCategory={articlesByCategory.data}
        articleById={articleById.data}
      />
    </>
  );
}
