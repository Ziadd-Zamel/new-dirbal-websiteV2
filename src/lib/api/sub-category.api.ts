/* eslint-disable no-console */

export const getAllSubCategories = async () => {
  const url = `${process.env.API}/subcategories`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: APIResponse<SubCategory[]> = await response.json();

    if (!('data' in payload)) {
      throw new Error(payload.message || 'Unknown error occurred');
    }

    return payload;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

export const getSubCategoriesByCategory = async (categoryUuid: string) => {
  const url = `${process.env.API}/subcategories/category/${categoryUuid}`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: APIResponse<SubCategory[]> = await response.json();

    if (!('data' in payload)) {
      throw new Error(payload.message || 'Unknown error occurred');
    }

    return payload;
  } catch (error) {
    console.error('Error fetching subcategories by category:', error);
    throw error;
  }
};

export const getSubCategoryById = async (subcategoryUuid: string) => {
  const url = `${process.env.API}/subcategories/${subcategoryUuid}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const payload: APIResponse<SubCategory> = await response.json();

    if (!('data' in payload)) {
      throw new Error(payload.message || 'Unknown error occurred');
    }

    return payload;
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    throw error;
  }
};
