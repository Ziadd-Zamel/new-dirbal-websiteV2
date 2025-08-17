import { searchArticles } from "@/lib/api/article.api";
import SearchResults from "./_components/search-results";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const currentPage = parseInt(params.page || "1");

  if (!query) {
    return (
      <SearchResults
        query={query}
        searchResults={null}
        currentPage={currentPage}
      />
    );
  }

  try {
    const searchResults = await searchArticles(query, currentPage, 15);

    if (!searchResults?.data) {
      return (
        <SearchResults
          query={query}
          searchResults={null}
          currentPage={currentPage}
        />
      );
    }

    return (
      <SearchResults
        query={query}
        searchResults={searchResults}
        currentPage={currentPage}
      />
    );
  } catch (err) {
    return (
      <SearchResults
        query={query}
        searchResults={null}
        currentPage={currentPage}
      />
    );
  }
}
