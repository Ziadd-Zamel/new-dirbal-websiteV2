const BOOKMARK_KEY = "bookmarked_articles";

export const addBookmark = (article: Article): boolean => {
  try {
    const bookmarks = getBookmarkedArticles();
    if (bookmarks.some((b) => b.uuid === article.uuid)) return false;

    const updated = [...bookmarks, article];
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));

    // 🔹 Trigger in same tab
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return false;
  }
};

export const removeBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedArticles();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(filtered));

    // 🔹 Trigger in same tab
    window.dispatchEvent(new Event("bookmarks-changed"));
    return true;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return false;
  }
};

export const getBookmarkedArticles = (): Article[] => {
  try {
    const stored = localStorage.getItem(BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const isBookmarked = (uuid: string): boolean =>
  getBookmarkedArticles().some((b) => b.uuid === uuid);

export { BOOKMARK_KEY };
