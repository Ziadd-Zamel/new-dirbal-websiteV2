import {
  getArticleById,
  getArticlesBySubCategory,
  getArticlesByTag,
} from "@/lib/api/article.api";
import { generateArticleMetadata } from "@/lib/metadata/data";
import { generateArticleStructuredData } from "@/lib/Seo/data";
import ArticlePage from "./_components/article-page";
import Script from "next/script";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    articleId: string;
    subCategory: string;
    categoryname: string;
  }>;
}) {
  const { articleId, categoryname } = await params;

  const article = await getArticleById(articleId);

  if (!article?.data) {
    return {
      title: "المقال غير موجود | ديربال",
      description: "المقال المطلوب غير موجود",
    };
  }

  return generateArticleMetadata(article.data, categoryname);
}

export default async function Page({
  params,
}: {
  params: Promise<{
    articleId: string;
    subCategory: string;
    categoryname: string;
  }>;
}) {
  const { articleId, subCategory, categoryname } = await params;
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

  if (!articleById?.data) {
    return null;
  }

  const structuredData = generateArticleStructuredData(
    articleById.data,
    categoryname
  );

  return (
    <>
      {/* ✅ Structured data via next/script */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ArticlePage
        articlesByCategory={articlesByCategory.data}
        articleById={articleById.data}
        articlesByTag={articlesByTag?.data || []}
      />
    </>
  );
}
