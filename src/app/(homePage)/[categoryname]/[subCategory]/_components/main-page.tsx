"use client";

import HeadingSection from "@/components/common/heading-section";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Taps from "./taps";
import ArticleSectoin from "./article-sectoin";
import ArticleSearch from "./article-serach";
import NewActiveTaps from "./active-taps";

// Skeleton loader component that matches the article UI
const ArticleSkeleton = () => (
  <div className="w-full animate-pulse">
    {/* Article Title Skeleton */}
    <div className="mt-12 flex items-center justify-between gap-5">
      <div className="flex-1">
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
        <div className="h-8 bg-gray-300 rounded w-full"></div>
      </div>
    </div>

    {/* Metadata Skeleton */}
    <div className="flex items-center gap-10 text-white mt-4">
      <div className="flex items-center">
        <div className="w-[35px] h-[35px] bg-gray-300 rounded"></div>
        <div className="ml-2 w-24 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center">
        <div className="w-[30px] h-[30px] bg-gray-300 rounded"></div>
        <div className="ml-2 w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>

    {/* Divider */}
    <div className="mb-3 mt-3">
      <div className="w-full h-px bg-gray-300"></div>
    </div>
  </div>
);

// Multiple skeleton loaders
const ArticleSkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-0">
    {Array.from({ length: count }).map((_, index) => (
      <ArticleSkeleton key={index} />
    ))}
  </div>
);

const MainPage = ({
  subCategory,
  articles,
  pagination,
  selectedSubSubCategory,
}: {
  subCategory: SubCategory;
  articles: Article[];
  pagination: PaginationMeta;
  selectedSubSubCategory?: string;
  currentPage: number;
}) => {
  // Router and search parameters hook
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get search query from URL
  const searchQuery = searchParams.get("search") || "";

  // Loading state for articles - only true when actually waiting for data
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  // Memoize tabs to prevent recreation on every render
  const tabs = useMemo(
    () =>
      subCategory.subSubCategory?.map((sub) => ({
        name: sub.name,
        uuid: sub.uuid || sub.id.toString(),
      })) || [],
    [subCategory.subSubCategory]
  );

  const hasTabs = tabs.length > 0;

  // Memoize tabs map for O(1) lookup instead of O(n) array search
  const tabsMap = useMemo(() => {
    const map = new Map();
    tabs.forEach((tab) => map.set(tab.name, tab.uuid));
    return map;
  }, [tabs]);

  // Function to get initial active tab - memoized
  const getInitialActiveTab = useCallback(() => {
    if (selectedSubSubCategory && hasTabs) {
      const selectedTab = tabs.find(
        (tab) => tab.uuid === selectedSubSubCategory
      );
      return selectedTab ? selectedTab.uuid : tabs[0]?.uuid || "";
    }
    return tabs[0]?.uuid || "";
  }, [selectedSubSubCategory, hasTabs, tabs]);

  // State for active tab
  const [activeTab, setActiveTab] = useState(getInitialActiveTab());

  // Memoize search query processing to avoid repeated string operations
  const processedSearchQuery = useMemo(
    () => searchQuery.toLowerCase().trim(),
    [searchQuery]
  );

  // Optimize article filtering with early returns and reduced operations
  const filteredArticles = useMemo(() => {
    if (!processedSearchQuery) {
      return articles;
    }

    // Pre-compile regex for HTML tag removal
    const htmlTagRegex = /<[^>]*>/g;

    return articles.filter((article) => {
      // Search in title first (most likely match)
      if (article.title?.toLowerCase().includes(processedSearchQuery)) {
        return true;
      }

      // Search in description (avoid HTML parsing if not needed)
      if (article.description?.toLowerCase().includes(processedSearchQuery)) {
        return true;
      }

      // Only parse HTML content if we haven't found a match yet
      if (article.description) {
        const plainContent = article?.description?.replace(htmlTagRegex, "");
        return plainContent.toLowerCase().includes(processedSearchQuery);
      }

      return false;
    });
  }, [articles, processedSearchQuery]);

  // Memoize active tab name lookup
  const activeTabName = useMemo(
    () => tabs.find((tab) => tab.uuid === activeTab)?.name || "",
    [tabs, activeTab]
  );

  // Optimize tab change handler with memoized params creation
  const handleTabChange = useCallback(
    (tabUuid: string) => {
      setIsLoadingArticles(true);
      setActiveTab(tabUuid);
      const params = new URLSearchParams(searchParams.toString());
      params.set("subSubCategory", tabUuid);
      params.delete("page"); // Reset to first page when changing tabs
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  // Create wrapper functions that match the expected interface
  const handleTabChangeByNameForTaps = useCallback(
    (tabName: string | ((prev: string) => string)) => {
      if (typeof tabName === "string") {
        const tabUuid = tabsMap.get(tabName);
        if (tabUuid) {
          handleTabChange(tabUuid);
        }
      }
    },
    [tabsMap, handleTabChange]
  );

  const handleTabChangeByNameForActiveTaps = useCallback(
    (tabName: string | ((prev: string) => string)) => {
      if (typeof tabName === "string") {
        const tabUuid = tabsMap.get(tabName);
        if (tabUuid) {
          handleTabChange(tabUuid);
        }
      }
    },
    [tabsMap, handleTabChange]
  );

  // Handle page change function
  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete("page"); // Remove page param if it's page 1
      } else {
        params.set("page", page.toString());
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  // Effect to update active tab when selectedSubSubCategory changes
  useEffect(() => {
    if (selectedSubSubCategory && hasTabs) {
      const selectedTab = tabs.find(
        (tab) => tab.uuid === selectedSubSubCategory
      );
      if (selectedTab) {
        setActiveTab(selectedTab.uuid);
      }
    }
  }, [selectedSubSubCategory, hasTabs, tabs]);

  // Effect to stop loading after exactly 3 seconds
  useEffect(() => {
    if (isLoadingArticles) {
      const timer = setTimeout(() => {
        setIsLoadingArticles(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoadingArticles]);

  // Memoize breadcrumbs to prevent recreation
  const breadcrumbs = useMemo(
    () => [
      {
        name: subCategory.name || "",
        href: "/Judge",
      },
    ],
    [subCategory.name]
  );

  // Memoize processed description
  const processedDescription = useMemo(
    () =>
      subCategory.description
        ? subCategory?.description?.replace(/<[^>]*>/g, "")
        : "القانون الليبي هو المرجع في الأعمال...",
    [subCategory.description]
  );

  // Calculate pagination for filtered results when searching - memoized
  const searchPagination = useMemo(() => {
    if (!processedSearchQuery) {
      return pagination;
    }

    // When searching, we show all filtered results on one page
    return {
      ...pagination,
      total: filteredArticles.length,
      last_page: 1,
      current_page: 1,
      per_page: filteredArticles.length,
    };
  }, [pagination, filteredArticles.length, processedSearchQuery]);
  // Memoize the main content to prevent unnecessary re-renders
  const mainContent = useMemo(
    () => (
      <div className="relative">
        {/* Heading section */}
        <HeadingSection
          bgImageSrc={subCategory.image_url || "/assets/Soteyat.png"}
          text={processedDescription}
          title={subCategory.name}
          breadcrumbs={breadcrumbs}
          showOverlay={subCategory.light}
        />

        <div className="relative">
          {/* Taps section */}
          {hasTabs && (
            <div className="absolute inset-0 top-0 z-50 block md:hidden">
              <Taps
                activeTab={activeTabName}
                setActiveTab={handleTabChangeByNameForTaps}
                taps={tabs.map((tab) => tab.name)}
              />
            </div>
          )}
        </div>

        <section className="relative bg-background z-50 min-h-[100vh] items-start gap-10 justify-start pb-24 md:flex main-padding 2xl:box-container ">
          {/* Background image */}
          <div className="absolute inset-0 mt-0 h-full w-full">
            <Image
              src={"/assets/mainbg-10.png"}
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              className="object-cover"
              priority={false}
              loading="lazy"
            />
          </div>
          {/* Sidebar with SearchBar and NewActiveTaps */}
          {hasTabs && (
            <div className="mt-16 hidden md:block w-[340px] min-[1900px]:w-[400px]">
              <ArticleSearch />
              <NewActiveTaps
                Taps={tabs.map((tab) => tab.name)}
                activeTab={activeTabName}
                setActiveTab={handleTabChangeByNameForActiveTaps}
              />
            </div>
          )}
          {/* Main items */}
          <div
            className={`mt-10 w-full md:mt-0 ${
              hasTabs ? "md:w-[70%]" : "w-full md:max-w-[80%] lg:mr-24"
            }`}
          >
            {isLoadingArticles ? (
              <div className="relative z-30 pb-20 pt-10">
                {/* Loading Title */}
                <h4 className="mb-[65px] mt-7 text-right font-tajawal text-4xl font-bold text-[#B5975C]">
                  {activeTabName}
                </h4>
                {/* Skeleton Articles */}
                <ArticleSkeletonList count={5} />
              </div>
            ) : (
              <ArticleSectoin
                title={
                  processedSearchQuery
                    ? `نتائج البحث عن: "${processedSearchQuery}"`
                    : activeTabName
                }
                articles={filteredArticles}
                pagination={searchPagination}
                currentPage={processedSearchQuery ? 1 : pagination.current_page}
                onPageChange={handlePageChange}
                searchQuery={processedSearchQuery}
              />
            )}
          </div>
        </section>
      </div>
    ),
    [
      subCategory.image_url,
      processedDescription,
      subCategory.name,
      breadcrumbs,
      hasTabs,
      activeTabName,
      handleTabChangeByNameForTaps,
      handleTabChangeByNameForActiveTaps,
      tabs,
      processedSearchQuery,
      filteredArticles,
      searchPagination,
      pagination.current_page,
      handlePageChange,
      isLoadingArticles,
    ]
  );

  return mainContent;
};

export default MainPage;
