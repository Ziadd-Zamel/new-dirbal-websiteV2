import { searchArticles } from "@/lib/api/article.api";
import { generateSearchMetadata } from "@/lib/metadata/data";
import { generateSearchStructuredData } from "@/lib/Seo/data";
import SearchResults from "./_components/search-results";
import Script from "next/script";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  return generateSearchMetadata(query);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const currentPage = parseInt(params.page || "1");

  const structuredData = generateSearchStructuredData(query);

  if (!query) {
    return (
      <>
        {/* ✅ Structured data via next/script */}
        <Script
          id="search-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <SearchResults
          query={query}
          searchResults={null}
          currentPage={currentPage}
        />
      </>
    );
  }

  try {
    const searchResults = await searchArticles(query, currentPage, 15);

    if (!searchResults?.data) {
      return (
        <>
          {/* ✅ Structured data via next/script */}
          <Script
            id="search-structured-data"
            type="application/ld+json"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <SearchResults
            query={query}
            searchResults={null}
            currentPage={currentPage}
          />
        </>
      );
    }

    return (
      <>
        {/* ✅ Structured data via next/script */}
        <Script
          id="search-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <SearchResults
          query={query}
          searchResults={searchResults}
          currentPage={currentPage}
        />
      </>
    );
  } catch (err) {
    return (
      <>
        {/* ✅ Structured data via next/script */}
        <Script
          id="search-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <SearchResults
          query={query}
          searchResults={null}
          currentPage={currentPage}
        />
      </>
    );
  }
}
