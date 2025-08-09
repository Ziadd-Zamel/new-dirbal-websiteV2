"use client";
import BookmarkButton from "@/components/common/add-to-fav";
import CommnetIcon from "@/components/Icons/CommnetIcon";
import ShareIcon from "@/components/Icons/ShareIcon";
import Image from "next/image";

interface SidebarProps {
  articleById?: Article;
}

const Sidebar = ({ articleById }: SidebarProps) => {
  // Download PDF functionality
  const handleDownloadPDF = () => {
    // This would typically generate a PDF of the article
    // For now, we'll simulate the download process
    const link = document.createElement("a");
    link.href = "#"; // In a real app, this would be the PDF generation endpoint
    link.download = `${articleById?.title || "article"}.pdf`;

    // Show loading state or generate PDF here
    alert("سيتم تحضير ملف PDF وتحميله قريباً...");

    // In a real implementation, you might:
    // 1. Call an API to generate PDF
    // 2. Use a library like jsPDF or Puppeteer
    // 3. Download from a pre-generated PDF URL
  };

  // Scroll to comments section
  const handleScrollToComments = () => {
    const commentsSection =
      document.querySelector("#comments-section") ||
      document.querySelector("[data-comments]") ||
      document.querySelector("form"); // Fallback to comment form

    if (commentsSection) {
      commentsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex w-16 flex-col items-center justify-center border border-gray-500 text-white">
        {/* Date (Header) */}

        {/* Add to Favorites */}
        <div
          className="flex h-16 w-full cursor-pointer items-center justify-center border-b border-gray-500 text-center text-sm transition-colors hover:bg-gray-800"
          title="إضافة إلى المفضلة"
        >
          {articleById && <BookmarkButton article={articleById} />}
        </div>

        {/* Share Icon */}
        <div
          className="flex h-16 w-full cursor-pointer items-center justify-center border-b border-gray-500 transition-colors hover:bg-gray-800"
          title="مشاركة المقال"
        >
          <ShareIcon height={30} width={30} />
        </div>

        {/* PDF Download */}
        <div
          className="flex h-16 w-full cursor-pointer items-center justify-center border-b border-gray-500 transition-colors hover:bg-gray-800"
          onClick={handleDownloadPDF}
          title="تحميل PDF"
        >
          <Image
            src={"/assets/Download.svg"}
            alt="تحميل PDF"
            width={35}
            height={35}
          />
        </div>

        {/* Comment Icon - Scroll to Comments */}
        <div
          className="flex h-16 w-full cursor-pointer items-center justify-center transition-colors hover:bg-gray-800"
          onClick={handleScrollToComments}
          title="الانتقال إلى التعليقات"
        >
          <CommnetIcon height={30} width={30} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
