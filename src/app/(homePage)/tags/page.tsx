import { getArticlesByTag } from "@/lib/api/article.api";
import TagResults from "./_components/tag-results";

export const dynamic = "force-dynamic";

interface TagsPageProps {
  searchParams: Promise<{ tag?: string; page?: string }>;
}

export default async function TagsPage({ searchParams }: TagsPageProps) {
  const params = await searchParams;
  const encodedTag = params.tag || "";
  const tag = decodeURIComponent(encodedTag);
  const currentPage = parseInt(params.page || "1");

  if (!tag) {
    return <TagResults tag={tag} tagResults={null} currentPage={currentPage} />;
  }

  try {
    const tagResults = await getArticlesByTag(tag, currentPage, 15);

    if (!tagResults?.data) {
      return (
        <TagResults tag={tag} tagResults={null} currentPage={currentPage} />
      );
    }

    return (
      <TagResults tag={tag} tagResults={tagResults} currentPage={currentPage} />
    );
  } catch (err) {
    return <TagResults tag={tag} tagResults={null} currentPage={currentPage} />;
  }
}
