import {
  getArticlesBySubCategory,
  getArticlesBySubSubCategory,
} from "@/lib/api/article.api";
import { getSubCategoryById } from "@/lib/api/sub-category.api";
import {
  generateSubCategoryMetadata,
  generateActiveTabMetadata,
} from "@/lib/metadata/data";
import {
  generateSubCategoryStructuredData,
  generateActiveTabStructuredData,
} from "@/lib/Seo/data";
import MainPage from "./_components/main-page";
import Script from "next/script";
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ categoryname: string; subCategory: string }>;
  searchParams: Promise<{ subSubCategory?: string; page?: string }>;
}) {
  const { categoryname, subCategory } = await params;
  const { subSubCategory: selectedSubSubCategory } = await searchParams;

  const sub = await getSubCategoryById(subCategory);

  if (!sub?.data) {
    return {
      title: "الصفحة غير موجودة | ديربال",
      description: "الصفحة المطلوبة غير موجودة",
    };
  }

  // If a specific sub-subcategory is selected, use active tab metadata
  if (selectedSubSubCategory && sub.data.subSubCategory) {
    const selectedTab = sub.data.subSubCategory.find(
      (subSub) =>
        subSub.uuid === selectedSubSubCategory ||
        subSub.id.toString() === selectedSubSubCategory
    );

    if (selectedTab) {
      return generateActiveTabMetadata(selectedTab, sub.data, categoryname);
    }
  }

  // Otherwise, use regular subcategory metadata
  return generateSubCategoryMetadata(sub.data, undefined, categoryname);
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ categoryname: string; subCategory: string }>;

  searchParams: Promise<{ subSubCategory?: string; page?: string }>;
}) {
  const { categoryname, subCategory } = await params;
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

  // Get sub-subcategory data for structured data
  let subSubCategoryData;
  if (selectedSubSubCategory && sub.data.subSubCategory) {
    subSubCategoryData = sub.data.subSubCategory.find(
      (subSub) =>
        subSub.uuid === selectedSubSubCategory ||
        subSub.id.toString() === selectedSubSubCategory
    );
  }

  // Generate appropriate structured data based on selection
  const structuredData = subSubCategoryData
    ? generateActiveTabStructuredData(
        subSubCategoryData,
        sub.data,
        categoryname
      )
    : generateSubCategoryStructuredData(sub.data, undefined, categoryname);

  return (
    <>
      <Script
        id="subcategory-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
