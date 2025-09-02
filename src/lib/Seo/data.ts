export function generateHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "دربال",
    url: "https://yoursite.com",
    description: "موقع دربال للمقالات والقبسات والمواضيع المختارة",
    inLanguage: "ar-SA",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://yoursite.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateGlobalStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "موقع د. عياد دربال",
    url: "https://yoursite.com",
    logo: {
      "@type": "ImageObject",
      url: "https://yoursite.com/assets/logo.png",
      width: 200,
      height: 200,
    },
    description: "موقع دربال للمقالات والقبسات والمواضيع المختارة",
    sameAs: [
      "https://facebook.com/dirbal",
      "https://twitter.com/dirbal",
      "https://instagram.com/dirbal",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Arabic", "English"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LY",
      addressLocality: "Libya",
    },
  };
}

export function generateSubCategoryStructuredData(
  subCategory: {
    name: string;
    description: string;
    image_url: string;
    category: { name: string } | null;
  },
  subSubCategory?: { name: string },
  categoryName?: string
) {
  const pageUrl = subSubCategory
    ? `/${categoryName || subCategory.category?.name || "category"}/${
        subCategory.name
      }/${subSubCategory.name}`
    : `/${categoryName || subCategory.category?.name || "category"}/${
        subCategory.name
      }`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: subSubCategory
      ? `${subSubCategory.name} - ${subCategory.name}`
      : subCategory.name,
    description: subSubCategory
      ? `مقالات ${subSubCategory.name} في قسم ${subCategory.name}`
      : `مقالات ${subCategory.name}`,
    url: `https://yoursite.com${pageUrl}`,
    inLanguage: "ar-SA",
    image: subCategory.image_url || "/assets/default-category.jpg",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://yoursite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryName || subCategory.category?.name || "الفئات",
          item: `https://yoursite.com/${
            categoryName || subCategory.category?.name || "category"
          }`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: subCategory.name,
          item: `https://yoursite.com/${
            categoryName || subCategory.category?.name || "category"
          }/${subCategory.name}`,
        },
        ...(subSubCategory
          ? [
              {
                "@type": "ListItem",
                position: 4,
                name: subSubCategory.name,
                item: `https://yoursite.com${pageUrl}`,
              },
            ]
          : []),
      ],
    },
  };
}

export function generateArticleStructuredData(
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
) {
  const pageUrl = `/${categoryName || article.sub_category.category.name}/${
    article.sub_category.name
  }/${article.title}`;

  // Clean description from HTML tags
  const cleanDescription =
    article.description?.replace(/<[^>]*>/g, "").substring(0, 160) ||
    "اقرأ هذا المقال المميز على موقع دربال";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: cleanDescription,
    image: article.image || "/assets/default-article.jpg",
    author: {
      "@type": "Person",
      name: article.written_by,
    },
    publisher: {
      "@type": "Organization",
      name: "دربال",
      logo: {
        "@type": "ImageObject",
        url: "https://yoursite.com/assets/logo.png",
      },
    },
    datePublished: article.published_at,
    dateModified: article.published_at,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yoursite.com${pageUrl}`,
    },
    inLanguage: "ar-SA",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://yoursite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: article.sub_category.category.name,
          item: `https://yoursite.com/${article.sub_category.category.name}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: article.sub_category.name,
          item: `https://yoursite.com/${article.sub_category.category.name}/${article.sub_category.name}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: article.title,
          item: `https://yoursite.com${pageUrl}`,
        },
      ],
    },
  };
}

export function generateActiveTabStructuredData(
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
) {
  const pageUrl = `/${
    categoryName || subCategory.category?.name || "category"
  }/${subCategory.name}/${activeTab.name}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${activeTab.name} - ${subCategory.name}`,
    description: `مقالات ${activeTab.name} في قسم ${subCategory.name}`,
    url: `https://yoursite.com${pageUrl}`,
    inLanguage: "ar-SA",
    image: subCategory.image_url || "/assets/default-category.jpg",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://yoursite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: categoryName || subCategory.category?.name || "الفئات",
          item: `https://yoursite.com/${
            categoryName || subCategory.category?.name || "category"
          }`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: subCategory.name,
          item: `https://yoursite.com/${
            categoryName || subCategory.category?.name || "category"
          }/${subCategory.name}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: activeTab.name,
          item: `https://yoursite.com${pageUrl}`,
        },
      ],
    },
  };
}

export function generateArchiveStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "المفضلة - دربال",
    description: "استعرض المقالات المفضلة والمحفوظة على موقع دربال",
    url: "https://yoursite.com/archive",
    inLanguage: "ar-SA",
    image: "/assets/sectionLogo-5.svg",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://yoursite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "المفضلة",
          item: "https://yoursite.com/archive",
        },
      ],
    },
  };
}

export function generateSearchStructuredData(query?: string) {
  if (query) {
    // Search results page
    return {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      name: `نتائج البحث عن "${query}"`,
      description: `نتائج البحث عن "${query}" على موقع دربال`,
      url: `https://yoursite.com/search?q=${encodeURIComponent(query)}`,
      inLanguage: "ar-SA",
      image: "/assets/search-icon.svg",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: "https://yoursite.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "البحث",
            item: "https://yoursite.com/search",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `نتائج "${query}"`,
            item: `https://yoursite.com/search?q=${encodeURIComponent(query)}`,
          },
        ],
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://yoursite.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  // Empty search page
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "البحث - دربال",
    description: "ابحث في المقالات والمحتوى على موقع دربال",
    url: "https://yoursite.com/search",
    inLanguage: "ar-SA",
    image: "/assets/search-icon.svg",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://yoursite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "البحث",
          item: "https://yoursite.com/search",
        },
      ],
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://yoursite.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateTagsStructuredData(tag?: string) {
  if (tag) {
    // Tag results page
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `مقالات الوسم "${tag}"`,
      description: `جميع المقالات المرتبطة بالوسم "${tag}" على موقع دربال`,
      url: `https://yoursite.com/tags?tag=${encodeURIComponent(tag)}`,
      inLanguage: "ar-SA",
      image: "/assets/tag-icon.svg",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "الرئيسية",
            item: "https://yoursite.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "الوسوم",
            item: "https://yoursite.com/tags",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `"${tag}"`,
            item: `https://yoursite.com/tags?tag=${encodeURIComponent(tag)}`,
          },
        ],
      },
      about: {
        "@type": "Thing",
        name: tag,
        description: `مقالات مرتبطة بالوسم "${tag}"`,
      },
    };
  }

  // Empty tags page
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "الوسوم - دربال",
    description: "تصفح المقالات حسب الوسوم والمواضيع على موقع دربال",
    url: "https://yoursite.com/tags",
    inLanguage: "ar-SA",
    image: "/assets/tag-icon.svg",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "الرئيسية",
          item: "https://yoursite.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "الوسوم",
          item: "https://yoursite.com/tags",
        },
      ],
    },
  };
}
