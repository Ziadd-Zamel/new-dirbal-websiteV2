"use client";

import SearchIcon from "@/components/Icons/SearchIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const ArticleSearch = ({
  onSearch,
  placeholder = "ابحث في هذه الصفحة",
}: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize search query from URL params
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  // Update search query when URL changes
  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setSearchQuery(searchParam);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = searchQuery.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmedQuery) {
      params.set("search", trimmedQuery);
      params.delete("page"); // Reset to first page when searching
    } else {
      params.delete("search");
    }

    // Update URL with search parameters
    router.replace(`?${params.toString()}`, { scroll: false });

    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(trimmedQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="relative z-50 mb-10 w-full pb-12">
      <form
        style={{ direction: "rtl" }}
        onSubmit={handleSearch}
        className="flex w-full items-end"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="ml-3 w-[170px] border-b border-white bg-transparent pb-1 pt-2 text-right font-tajawal text-gray-600 outline-none placeholder:text-xs focus:border-[#B5975C] xl:w-[260px] xl:placeholder:text-base"
            dir="rtl"
          />

          {/* Clear button */}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
              aria-label="مسح البحث"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <button
          type="submit"
          className="flex size-[30px] items-center justify-center rounded-[50px] border border-gray-400 bg-transparent transition-colors hover:border-[#B5975C] xl:h-[45px] xl:w-[50px]"
          aria-label="بحث"
        >
          <SearchIcon dark={false} height={20} />
        </button>
      </form>
    </div>
  );
};

export default ArticleSearch;
