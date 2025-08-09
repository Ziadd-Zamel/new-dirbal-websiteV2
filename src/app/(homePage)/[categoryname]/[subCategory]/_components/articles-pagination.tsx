import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface MainItemsProps {
  pagination: PaginationMeta;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export default function ArticlePagintation({
  currentPage,
  onPageChange,
  pagination,
}: MainItemsProps) {
  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page >= 1 && page <= pagination.last_page) {
      onPageChange(page);
    }
  };

  // Generate page numbers to display with improved logic
  const getPageNumbers = () => {
    const totalPages = pagination.last_page;
    const current = currentPage;
    const pageNumbers = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Add ellipsis after first page if needed
      if (current > 4) {
        pageNumbers.push("...");
      }

      // Calculate the range around current page
      let start = Math.max(2, current - 1);
      let end = Math.min(totalPages - 1, current + 1);

      // Ensure we show at least 3 pages in the middle when possible
      if (current <= 4) {
        end = Math.min(totalPages - 1, 5);
      }
      if (current >= totalPages - 3) {
        start = Math.max(2, totalPages - 4);
      }

      // Add the middle pages
      for (let i = start; i <= end; i++) {
        if (!pageNumbers.includes(i)) {
          pageNumbers.push(i);
        }
      }

      // Add ellipsis before last page if needed
      if (current < totalPages - 3) {
        pageNumbers.push("...");
      }

      // Always show last page if it's not already included
      if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="mt-24">
      <div className="flex flex-col items-center gap-4">
        {/* Main Pagination Controls */}
        <div className="flex items-center gap-1">
          {/* First page button */}
          <button
            className={`flex h-9 w-9 items-center justify-center  transition-all duration-200 ${
              currentPage > 1
                ? "border border-gray-300 bg-white text-gray-700 hover:border-[#B5975C] hover:bg-gray-50"
                : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
            }`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            aria-label="الصفحة الأولى"
            title="الصفحة الأولى"
          >
            <ChevronsRight size={16} />
          </button>

          {/* Previous page button */}
          <button
            className={`flex h-9 w-9 items-center justify-center  transition-all duration-200 ${
              currentPage > 1
                ? "border border-gray-300 bg-white text-gray-700 hover:border-[#B5975C] hover:bg-gray-50"
                : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="الصفحة السابقة"
            title="الصفحة السابقة"
          >
            <ChevronRight size={16} />
          </button>

          {/* Page numbers */}
          {getPageNumbers().map((pageNumber, index) => {
            if (pageNumber === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center font-medium text-gray-500"
                >
                  ...
                </span>
              );
            }

            const page = pageNumber as number;
            return (
              <button
                key={page}
                style={{ direction: "rtl" }}
                className={`flex h-9 w-9 items-center justify-center font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "scale-105 bg-[#B5975C] text-white shadow-lg"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-[#B5975C] hover:bg-gray-50"
                }`}
                onClick={() => handlePageChange(page)}
                aria-label={`الصفحة ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                title={`الصفحة ${page}`}
              >
                {page}
              </button>
            );
          })}

          {/* Next page button */}
          <button
            className={`flex h-9 w-9 items-center justify-center transition-all duration-200 ${
              currentPage < pagination.last_page
                ? "border border-gray-300 bg-white text-gray-700 hover:border-[#B5975C] hover:bg-gray-50"
                : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.last_page}
            aria-label="الصفحة التالية"
            title="الصفحة التالية"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Last page button */}
          <button
            className={`flex h-9 w-9 items-center justify-center transition-all duration-200 ${
              currentPage < pagination.last_page
                ? "border border-gray-300 bg-white text-gray-700 hover:border-[#B5975C] hover:bg-gray-50"
                : "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400"
            }`}
            onClick={() => handlePageChange(pagination.last_page)}
            disabled={currentPage === pagination.last_page}
            aria-label="الصفحة الأخيرة"
            title="الصفحة الأخيرة"
          >
            <ChevronsLeft size={16} />
          </button>
        </div>

        {/* Mobile-friendly page input for large page counts */}
        {pagination.last_page > 10 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">الانتقال إلى الصفحة:</span>
            <input
              type="number"
              min="1"
              max={pagination.last_page}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page && page >= 1 && page <= pagination.last_page) {
                  handlePageChange(page);
                }
              }}
              className="w-16 rounded border border-gray-300 px-2 py-1 text-center focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#B5975C]"
              aria-label="رقم الصفحة"
            />
            <span className="text-gray-600">من {pagination.last_page}</span>
          </div>
        )}

        {/* Quick jump buttons for large datasets */}
        {pagination.last_page > 20 && (
          <div className="flex items-center gap-2">
            <button
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200"
              onClick={() => handlePageChange(Math.max(1, currentPage - 10))}
              disabled={currentPage <= 10}
            >
              -10 صفحات
            </button>
            <button
              className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200"
              onClick={() =>
                handlePageChange(
                  Math.min(pagination.last_page, currentPage + 10)
                )
              }
              disabled={currentPage > pagination.last_page - 10}
            >
              +10 صفحات
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
