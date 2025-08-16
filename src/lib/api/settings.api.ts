export interface FooterSettings {
  footerImage: string;
  footerMainImage: string;
}

export interface HomeSettings {
  backgroundHomeImage: string;
}

export interface AboutMeSettings {
  aboutMe: string;
}

export const getFooterSettings = async (): Promise<FooterSettings> => {
  const baseUrl = process.env.API || process.env.NEXT_PUBLIC_API || "";

  // Fetch footer image
  const footerImageResponse = await fetch(`${baseUrl}/settings/footer-image`, {
    cache: "no-store",
  });
  console.log(footerImageResponse);
  if (!footerImageResponse.ok) {
    throw new Error(`HTTP error! status: ${footerImageResponse.status}`);
  }
  const footerImageData = await footerImageResponse.json();

  // Fetch footer main image
  const footerMainImageResponse = await fetch(
    `${baseUrl}/settings/footer-main-image`,
    {
      cache: "no-store",
    }
  );

  if (!footerMainImageResponse.ok) {
    throw new Error(`HTTP error! status: ${footerMainImageResponse.status}`);
  }

  const footerMainImageData = await footerMainImageResponse.json();

  return {
    footerImage: footerImageData.data.footer_image,
    footerMainImage: footerMainImageData.data.footer_main_image,
  };
};

export const getBackgroundHomeImage = async (): Promise<string> => {
  const baseUrl = process.env.API || process.env.NEXT_PUBLIC_API || "";

  const response = await fetch(`${baseUrl}/settings/background-home-image`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.background_home_image;
};

export const getFavouriteArticleImage = async (): Promise<string> => {
  const baseUrl = process.env.API || process.env.NEXT_PUBLIC_API || "";

  const response = await fetch(`${baseUrl}/settings/favourite-article-image`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.favourite_article_image;
};

export const getAboutMe = async (): Promise<string> => {
  const baseUrl = process.env.API || process.env.NEXT_PUBLIC_API || "";

  const response = await fetch(`${baseUrl}/settings/about-me`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data.about_me;
};
