import { Metadata } from "next";

export function generateGlobalMetadata(
  customTitle?: string,
  customDescription?: string,
  customUrl?: string,
  customImage?: string
): Metadata {
  const siteName = "موقع د. عياد دربال";
  const siteDescription = "موقع دربال للمقالات والقبسات والمواضيع المختارة";
  const siteUrl = "https://yoursite.com";

  const title = customTitle ? `${customTitle} | ${siteName}` : siteName;
  const description = customDescription || siteDescription;
  const url = customUrl || "/";
  const image = customImage || "/assets/og-image.jpg";

  return {
    title,
    description,
    keywords: ["دربال", "مقالات", "قبسات", "مواضيع", "موقع"],
    authors: [{ name: "دربال" }],
    creator: "دربال",
    publisher: "دربال",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "ar_SA",
      url: `${siteUrl}${url}`,
      siteName,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@derbal",
      creator: "@derbal",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `${siteUrl}${url}`,
      languages: {
        "ar-SA": url,
        "en-US": `/en${url}`,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
    category: "website",
    classification: "content",
    other: {
      "msapplication-TileColor": "#B5975C",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": siteName,
      "application-name": siteName,
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

export async function generateHomeMetadata(): Promise<Metadata> {
  return generateGlobalMetadata(
    "الصفحة الرئيسية",
    "اكتشف أحدث المقالات والقبسات والمواضيع المختارة",
    "/",
    "/assets/og-image.jpg"
  );
}

export async function generateSubCategoryMetadata(
  subCategory: {
    name: string;
    description: string;
    image_url: string;
    category: { name: string } | null;
  },
  subSubCategory?: { name: string },
  categoryName?: string
): Promise<Metadata> {
  const pageTitle = subSubCategory
    ? `${subSubCategory.name} - ${subCategory.name} | دربال`
    : `${subCategory.name} | دربال`;

  const pageDescription = subSubCategory
    ? `اكتشف مقالات ${subSubCategory.name} في قسم ${subCategory.name} على موقع دربال`
    : `اكتشف مقالات ${subCategory.name} على موقع دربال. ${
        subCategory.description || ""
      }`;

  const pageUrl = subSubCategory
    ? `/${categoryName || subCategory.category?.name || "category"}/${
        subCategory.name
      }/${subSubCategory.name}`
    : `/${categoryName || subCategory.category?.name || "category"}/${
        subCategory.name
      }`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      subCategory.name,
      subSubCategory?.name,
      "مقالات",
      "دربال",
    ].filter((keyword): keyword is string => Boolean(keyword)),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      locale: "ar_SA",
      url: pageUrl,
      images: [
        {
          url: subCategory.image_url || "/assets/default-category.jpg",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [subCategory.image_url || "/assets/default-category.jpg"],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "ar-SA": pageUrl,
        "en-US": `/en${pageUrl}`,
      },
    },
  };
}

export async function generateArticleMetadata(
  article: {
    title: string;
    description: string;
    image: string;
    published_at: string;
    written_by: string;
    sub_category: {
      name: string;
      category: { name: string };
    };
  },
  categoryName?: string
): Promise<Metadata> {
  const pageTitle = `${article.title} | دربال`;

  // Clean description from HTML tags and limit length
  const cleanDescription =
    article.description?.replace(/<[^>]*>/g, "").substring(0, 160) ||
    "اقرأ هذا المقال المميز على موقع دربال";

  const pageUrl = `/${categoryName || article.sub_category.category.name}/${
    article.sub_category.name
  }/${article.title}`;

  return {
    title: pageTitle,
    description: cleanDescription,
    keywords: [
      article.title,
      article.sub_category.name,
      "مقالات",
      "دربال",
    ].filter((keyword): keyword is string => Boolean(keyword)),
    openGraph: {
      title: pageTitle,
      description: cleanDescription,
      type: "article",
      locale: "ar_SA",
      url: pageUrl,
      images: [
        {
          url: article.image || "/assets/default-article.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: cleanDescription,
      images: [article.image || "/assets/default-article.jpg"],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "ar-SA": pageUrl,
        "en-US": `/en${pageUrl}`,
      },
    },
  };
}

export async function generateActiveTabMetadata(
  activeTab: {
    name: string;
    uuid: string;
  },
  subCategory: {
    name: string;
    description: string;
    image_url: string;
    category: { name: string } | null;
  },
  categoryName?: string
): Promise<Metadata> {
  const pageTitle = `${activeTab.name} - ${subCategory.name} | دربال`;

  const pageDescription = `اكتشف مقالات ${activeTab.name} في قسم ${
    subCategory.name
  } على موقع دربال. ${subCategory.description || ""}`;

  const pageUrl = `/${
    categoryName || subCategory.category?.name || "category"
  }/${subCategory.name}/${activeTab.name}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [activeTab.name, subCategory.name, "مقالات", "دربال"].filter(
      (keyword): keyword is string => Boolean(keyword)
    ),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "website",
      locale: "ar_SA",
      url: pageUrl,
      images: [
        {
          url: subCategory.image_url || "/assets/default-category.jpg",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [subCategory.image_url || "/assets/default-category.jpg"],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        "ar-SA": pageUrl,
        "en-US": `/en${pageUrl}`,
      },
    },
  };
}

export async function generateArchiveMetadata(): Promise<Metadata> {
  return {
    title: "المفضلة | دربال",
    description:
      "استعرض المقالات المفضلة والمحفوظة على موقع دربال. احتفظ بمقالاتك المفضلة للقراءة لاحقاً",
    keywords: ["المفضلة", "المحفوظة", "مقالات", "دربال", "أرشيف"],
    openGraph: {
      title: "المفضلة | دربال",
      description:
        "استعرض المقالات المفضلة والمحفوظة على موقع دربال. احتفظ بمقالاتك المفضلة للقراءة لاحقاً",
      type: "website",
      locale: "ar_SA",
      url: "/archive",
      images: [
        {
          url: "/assets/sectionLogo-5.svg",
          width: 1200,
          height: 630,
          alt: "المفضلة - دربال",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "المفضلة | دربال",
      description:
        "استعرض المقالات المفضلة والمحفوظة على موقع دربال. احتفظ بمقالاتك المفضلة للقراءة لاحقاً",
      images: ["/assets/sectionLogo-5.svg"],
    },
    alternates: {
      canonical: "/archive",
      languages: {
        "ar-SA": "/archive",
        "en-US": "/en/archive",
      },
    },
  };
}

export async function generateSearchMetadata(
  query?: string
): Promise<Metadata> {
  if (query) {
    // Search results page
    return {
      title: `نتائج البحث عن "${query}" | دربال`,
      description: `نتائج البحث عن "${query}" على موقع دربال. اكتشف المقالات والمحتوى المتعلق ببحثك`,
      keywords: [query, "بحث", "نتائج", "مقالات", "دربال"],
      openGraph: {
        title: `نتائج البحث عن "${query}" | دربال`,
        description: `نتائج البحث عن "${query}" على موقع دربال. اكتشف المقالات والمحتوى المتعلق ببحثك`,
        type: "website",
        locale: "ar_SA",
        url: `/search?q=${encodeURIComponent(query)}`,
        images: [
          {
            url: "/assets/search-icon.svg",
            width: 1200,
            height: 630,
            alt: `نتائج البحث عن ${query}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `نتائج البحث عن "${query}" | دربال`,
        description: `نتائج البحث عن "${query}" على موقع دربال. اكتشف المقالات والمحتوى المتعلق ببحثك`,
        images: ["/assets/search-icon.svg"],
      },
      alternates: {
        canonical: `/search?q=${encodeURIComponent(query)}`,
        languages: {
          "ar-SA": `/search?q=${encodeURIComponent(query)}`,
          "en-US": `/en/search?q=${encodeURIComponent(query)}`,
        },
      },
    };
  }

  // Empty search page
  return {
    title: "البحث | دربال",
    description:
      "ابحث في المقالات والمحتوى على موقع دربال. استخدم كلمات البحث للعثور على المقالات المطلوبة",
    keywords: ["بحث", "مقالات", "محتوى", "دربال", "البحث"],
    openGraph: {
      title: "البحث | دربال",
      description:
        "ابحث في المقالات والمحتوى على موقع دربال. استخدم كلمات البحث للعثور على المقالات المطلوبة",
      type: "website",
      locale: "ar_SA",
      url: "/search",
      images: [
        {
          url: "/assets/search-icon.svg",
          width: 1200,
          height: 630,
          alt: "البحث - دربال",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "البحث | دربال",
      description:
        "ابحث في المقالات والمحتوى على موقع دربال. استخدم كلمات البحث للعثور على المقالات المطلوبة",
      images: ["/assets/search-icon.svg"],
    },
    alternates: {
      canonical: "/search",
      languages: {
        "ar-SA": "/search",
        "en-US": "/en/search",
      },
    },
  };
}

export async function generateTagsMetadata(tag?: string): Promise<Metadata> {
  if (tag) {
    // Tag results page
    return {
      title: `مقالات الوسم "${tag}" | دربال`,
      description: `اكتشف جميع المقالات المرتبطة بالوسم "${tag}" على موقع دربال. تصفح المحتوى المنظم حسب المواضيع`,
      keywords: [tag, "وسم", "مقالات", "مواضيع", "دربال", "تصنيف"],
      openGraph: {
        title: `مقالات الوسم "${tag}" | دربال`,
        description: `اكتشف جميع المقالات المرتبطة بالوسم "${tag}" على موقع دربال. تصفح المحتوى المنظم حسب المواضيع`,
        type: "website",
        locale: "ar_SA",
        url: `/tags?tag=${encodeURIComponent(tag)}`,
        images: [
          {
            url: "/assets/tag-icon.svg",
            width: 1200,
            height: 630,
            alt: `مقالات الوسم ${tag}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `مقالات الوسم "${tag}" | دربال`,
        description: `اكتشف جميع المقالات المرتبطة بالوسم "${tag}" على موقع دربال. تصفح المحتوى المنظم حسب المواضيع`,
        images: ["/assets/tag-icon.svg"],
      },
      alternates: {
        canonical: `/tags?tag=${encodeURIComponent(tag)}`,
        languages: {
          "ar-SA": `/tags?tag=${encodeURIComponent(tag)}`,
          "en-US": `/en/tags?tag=${encodeURIComponent(tag)}`,
        },
      },
    };
  }

  // Empty tags page
  return {
    title: "الوسوم | دربال",
    description:
      "تصفح المقالات حسب الوسوم والمواضيع على موقع دربال. اكتشف المحتوى المنظم حسب التصنيفات",
    keywords: ["وسوم", "تصنيف", "مقالات", "مواضيع", "دربال", "تصفح"],
    openGraph: {
      title: "الوسوم | دربال",
      description:
        "تصفح المقالات حسب الوسوم والمواضيع على موقع دربال. اكتشف المحتوى المنظم حسب التصنيفات",
      type: "website",
      locale: "ar_SA",
      url: "/tags",
      images: [
        {
          url: "/assets/tag-icon.svg",
          width: 1200,
          height: 630,
          alt: "الوسوم - دربال",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "الوسوم | دربال",
      description:
        "تصفح المقالات حسب الوسوم والمواضيع على موقع دربال. اكتشف المحتوى المنظم حسب التصنيفات",
      images: ["/assets/tag-icon.svg"],
    },
    alternates: {
      canonical: "/tags",
      languages: {
        "ar-SA": "/tags",
        "en-US": "/en/tags",
      },
    },
  };
}
