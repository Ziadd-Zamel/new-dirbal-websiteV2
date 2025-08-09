import {
  getArticlesBySubCategory,
  getArticlesBySubSubCategory,
} from "@/lib/api/article.api";
import { getSubCategoryById } from "@/lib/api/sub-category.api";
import MainPage from "./_components/main-page";
export const dynamic = "force-dynamic";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ subCategory: string }>;

  searchParams: Promise<{ subSubCategory?: string; page?: string }>;
}) {
  const { subCategory } = await params;
  const { subSubCategory: selectedSubSubCategory, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const sub = await getSubCategoryById(subCategory);

  if (!subCategory || !sub?.data) {
    return null;
  }

  const hasSubSubCategories =
    sub.data.subSubCategory && sub.data.subSubCategory.length > 0;
  let articles;

  if (hasSubSubCategories) {
    if (selectedSubSubCategory) {
      // Fetch articles for the selected sub-subcategory with pagination
      articles = await getArticlesBySubSubCategory(
        selectedSubSubCategory,
        currentPage
      );
    } else {
      // If no sub-subcategory is selected, fetch articles for the first one with pagination
      const firstSubSubCategory = sub.data.subSubCategory[0];
      articles = await getArticlesBySubSubCategory(
        firstSubSubCategory.uuid || firstSubSubCategory.id.toString(),
        currentPage
      );
    }
  } else {
    // If no sub-subcategories exist, get articles by main subcategory with pagination
    articles = await getArticlesBySubCategory(subCategory, currentPage);
  }

  if (!articles?.data) {
    return null;
  }

  return (
    <>
      <MainPage
        subCategory={sub.data}
        articles={articles.data}
        pagination={articles.pagination}
        selectedSubSubCategory={selectedSubSubCategory}
        currentPage={currentPage}
      />
    </>
  );
}
