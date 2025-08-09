/* eslint-disable no-console */
// utils.ts - Simple bookmark functions

const BOOKMARK_KEY = 'bookmarked_articles';

// Add article to localStorage
export const addBookmark = (article: Article): boolean => {
  try {
    const bookmarks = getBookmarkedArticles();
    const exists = bookmarks.some((b) => b.uuid === article.uuid);

    if (exists) return false;

    const updated = [...bookmarks, article];
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return false;
  }
};

// Get all bookmarked articles
export const getBookmarkedArticles = (): Article[] => {
  try {
    const stored = localStorage.getItem(BOOKMARK_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

// Remove article from localStorage
export const removeBookmark = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedArticles();
    const filtered = bookmarks.filter((b) => b.uuid !== uuid);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }
};

// Check if article is bookmarked
export const isBookmarked = (uuid: string): boolean => {
  try {
    const bookmarks = getBookmarkedArticles();
    return bookmarks.some((b) => b.uuid === uuid);
  } catch (error) {
    return false;
  }
};
