/* eslint-disable no-console */

export const getAllQabasat = async () => {
  const url = `${process.env.API}/qabasat`;

  try {
    const response = await fetch(url, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const payload: QabasatResponse = await response.json();

    if (!('data' in payload)) {
      throw new Error(payload || 'Unknown error occurred');
    }

    return payload;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
