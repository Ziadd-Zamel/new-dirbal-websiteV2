/* eslint-disable no-console */

interface getCategoryResponse {
  data: Category;
}

// Categories API
export const getAllCategories = async () => {
  const baseUrl =
    typeof window === 'undefined'
      ? process.env.API
      : process.env.NEXT_PUBLIC_API;

  const url = `${baseUrl}/categories`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: APIResponse<Category[]> = await response.json();

    if (!('data' in payload)) {
      throw new Error(payload.message || 'Unknown error occurred');
    }

    return payload;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getCategoryById = async (categoryUuid: string) => {
  const url = `${process.env.API}/categories/${categoryUuid}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: APIResponse<getCategoryResponse> = await response.json();

    if (!('data' in payload)) {
      throw new Error(payload.message || 'Unknown error occurred');
    }

    return payload;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};
