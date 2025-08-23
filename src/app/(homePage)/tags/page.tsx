import { getArticlesByTag } from "@/lib/api/article.api";
import { generateTagsMetadata } from "@/lib/metadata/data";
import { generateTagsStructuredData } from "@/lib/Seo/data";
import TagResults from "./_components/tag-results";
import Script from "next/script";

export const dynamic = "force-dynamic";

interface TagsPageProps {
  searchParams: Promise<{ tag?: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const encodedTag = params.tag || "";
  const tag = decodeURIComponent(encodedTag);

  return generateTagsMetadata(tag);
}

export default async function TagsPage({ searchParams }: TagsPageProps) {
  const params = await searchParams;
  const encodedTag = params.tag || "";
  const tag = decodeURIComponent(encodedTag);
  const currentPage = parseInt(params.page || "1");

  const structuredData = generateTagsStructuredData(tag);

  if (!tag) {
    return (
      <>
        {/* ✅ Structured data via next/script */}
        <Script
          id="tags-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <TagResults tag={tag} tagResults={null} currentPage={currentPage} />
      </>
    );
  }

  try {
    const tagResults = await getArticlesByTag(tag, currentPage, 15);

    if (!tagResults?.data) {
      return (
        <>
          {/* ✅ Structured data via next/script */}
          <Script
            id="tags-structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <TagResults tag={tag} tagResults={null} currentPage={currentPage} />
        </>
      );
    }

    return (
      <>
        {/* ✅ Structured data via next/script */}
        <Script
          id="tags-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <TagResults tag={tag} tagResults={tagResults} currentPage={currentPage} />
      </>
    );
  } catch (err) {
    return (
      <>
        {/* ✅ Structured data via next/script */}
        <Script
          id="tags-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <TagResults tag={tag} tagResults={null} currentPage={currentPage} />
      </>
    );
  }
}
