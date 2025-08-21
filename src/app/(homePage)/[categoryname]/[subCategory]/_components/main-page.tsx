/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import HeadingSection from "@/components/common/heading-section";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Taps from "./taps";
import ArticleSectoin from "./article-sectoin";
import ArticleSearch from "./article-serach";
import NewActiveTaps from "./active-taps";

const MainPage = ({
  subCategory,
  articles,
  pagination,
  selectedSubSubCategory,
  currentPage,
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
  console.log(subCategory);
  // Tabs initialization
  const tabs =
    subCategory.subSubCategory?.map((sub) => ({
      name: sub.name,
      uuid: sub.uuid || sub.id.toString(),
    })) || [];
  const hasTabs = tabs.length > 0;

  // Function to get initial active tab
  const getInitialActiveTab = () => {
    if (selectedSubSubCategory && hasTabs) {
      const selectedTab = tabs.find(
        (tab) => tab.uuid === selectedSubSubCategory
      );
      return selectedTab ? selectedTab.uuid : tabs[0]?.uuid || "";
    }
    return tabs[0]?.uuid || "";
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState(getInitialActiveTab());

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles;
    }

    const query = searchQuery.toLowerCase().trim();
    return articles.filter((article) => {
      // Search in title
      const titleMatch = article.title?.toLowerCase().includes(query);

      // Search in content (remove HTML tags first)
      const contentMatch = article.description
        ?.replace(/<[^>]*>/g, "")
        .toLowerCase()
        .includes(query);

      // Search in description
      const descriptionMatch = article.description
        ?.toLowerCase()
        .includes(query);

      return titleMatch || contentMatch || descriptionMatch;
    });
  }, [articles, searchQuery]);

  // Handle tab change function
  const handleTabChange = (tabUuid: string) => {
    setActiveTab(tabUuid);
    const params = new URLSearchParams(searchParams.toString());
    params.set("subSubCategory", tabUuid);
    params.delete("page"); // Reset to first page when changing tabs
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Handle page change function
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page"); // Remove page param if it's page 1
    } else {
      params.set("page", page.toString());
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

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

  // Breadcrumbs data
  const breadcrumbs = [
    {
      name: subCategory.name || "",
      href: "/Judge",
    },
  ];

  // Active tab name
  const activeTabName = tabs.find((tab) => tab.uuid === activeTab)?.name || "";

  // Calculate pagination for filtered results when searching
  const searchPagination = useMemo(() => {
    if (!searchQuery.trim()) {
      return pagination;
    }

    // When searching, we show all filtered results on one page
    // You might want to implement proper pagination for search results
    return {
      ...pagination,
      total: filteredArticles.length,
      last_page: 1,
      current_page: 1,
      per_page: filteredArticles.length,
    };
  }, [pagination, filteredArticles.length, searchQuery]);

  return (
    <div className="relative">
      {/* Heading section */}
      <HeadingSection
        bgImageSrc={subCategory.image_url || "/assets/Soteyat.png"}
        text={
          subCategory.description
            ? subCategory.description.replace(/<[^>]*>/g, "")
            : "القانون الليبي هو المرجع في الأعمال..."
        }
        title={subCategory.name}
        breadcrumbs={breadcrumbs}
        showOverlay
      />

      <div className="relative">
        {/* Taps section */}
        {hasTabs && (
          <div className="absolute inset-0 top-0 z-50 block md:hidden">
            <Taps
              activeTab={activeTabName}
              setActiveTab={(tabName) => {
                const tab = tabs.find((t) => t.name === tabName);
                if (tab) {
                  handleTabChange(tab.uuid);
                }
              }}
              taps={tabs.map((tab) => tab.name)}
            />
          </div>
        )}
      </div>

      <section className="relative z-50 min-h-[100vh] items-start gap-10 justify-start pb-24 md:flex main-padding 2xl:box-container ">
        {/* Background image */}
        <div className="absolute inset-0 mt-0 h-full w-full">
          <Image
            src={"/assets/mainbg-10.png"}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        {/* Sidebar with SearchBar and NewActiveTaps */}
        {hasTabs && (
          <div className="mt-16 hidden md:block w-[340px]">
            <ArticleSearch />
            <NewActiveTaps
              Taps={tabs.map((tab) => tab.name)}
              activeTab={activeTabName}
              setActiveTab={(tabName) => {
                const tab = tabs.find((t) => t.name === tabName);
                if (tab) {
                  handleTabChange(tab.uuid);
                }
              }}
            />
          </div>
        )}
        {/* Main items */}
        <div
          className={`mt-10 w-full md:mt-0 ${
            hasTabs ? "md:w-[70%]" : "md:w-full max-w-[80%] lg:mr-24"
          }`}
        >
          <ArticleSectoin
            title={
              searchQuery ? `نتائج البحث عن: "${searchQuery}"` : activeTabName
            }
            articles={filteredArticles}
            pagination={searchPagination}
            currentPage={searchQuery ? 1 : currentPage}
            onPageChange={handlePageChange}
            searchQuery={searchQuery}
          />
        </div>
      </section>
    </div>
  );
};

export default MainPage;
