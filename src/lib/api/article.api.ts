export const getAllArticles = async (page: number = 1) => {
  const url = `${process.env.API}/articles?page=${page}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: ArticlesResponse = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload || "Unknown error occurred");
    }

    return payload;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const getBestArticles = async () => {
  const url = `${process.env.API}/articles/best`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: APIResponse<Article[]> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message || "Unknown error occurred");
    }

    return payload;
  } catch (error) {
    console.error("Error fetching best articles:", error);
    throw error;
  }
};

export const getArticlesBySubCategory = async (
  subcategoryUuid: string,
  currentPage?: number
) => {
  const url = `${process.env.API}/articles/subcategory/${subcategoryUuid}?page=${currentPage}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: ArticlesResponse = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload || "Unknown error occurred");
    }

    return payload;
  } catch (error) {
    console.error("Error fetching articles by subcategory:", error);
    throw error;
  }
};

export const getArticleById = async (articleUuid: string) => {
  const url = `${process.env.API}/articles/${articleUuid}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: APIResponse<Article> = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message || "Unknown error occurred");
    }

    return payload;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};
export const getArticlesBySubSubCategory = async (
  bySubSubCategory: string,
  currentPage?: number
) => {
  const url = `${process.env.API}/articles/subsubcategory/${bySubSubCategory}?page=${currentPage}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: ArticlesResponse = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload || "Unknown error occurred");
    }

    return payload;
  } catch (error) {
    console.error("Error fetching articles by subcategory:", error);
    throw error;
  }
};

export const getArticlesByTag = async (
  tag: string,
  page: number = 1,
  perPage: number = 15
) => {
  // Try using the search API with the tag as the search query
  const url = `${process.env.API}/articles/search?q=${encodeURIComponent(
    tag
  )}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message || "Unknown error occurred");
    }

    return payload;
  } catch (error) {
    console.error("Error fetching articles by tag:", error);
    throw error;
  }
};

export const getArticlesByTagNew = async (
  tag: string,
  page: number = 1,
  perPage: number = 15
) => {
  // Encode the tag name for the URL path
  const encodedTag = encodeURIComponent(tag);
  const url = `${process.env.API}/articles/by-tag/${encodedTag}?page=${page}&per_page=${perPage}`;
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message || "Unknown error occurred");
    }

    // Transform the API response to match the expected structure
    // API returns: { data: Article[], pagination: {...}, ... }
    // Component expects: { data: { articles: Article[], pagination: {...} }, ... }
    const transformedPayload = {
      ...payload,
      data: {
        articles: Array.isArray(payload.data) ? payload.data : [],
        pagination: payload.pagination || {},
      },
    };

    return transformedPayload;
  } catch (error) {
    console.error("Error fetching articles by tag:", error);
    throw error;
  }
};

export const searchArticles = async (
  query: string,
  page: number = 1,
  perPage: number = 15
) => {
  const url = `${process.env.API}/articles/search?q=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload = await response.json();

    if (!("data" in payload)) {
      throw new Error(payload.message || "Unknown error occurred");
    }

    return payload;
  } catch (error) {
    console.error("Error searching articles:", error);
    throw error;
  }
};
