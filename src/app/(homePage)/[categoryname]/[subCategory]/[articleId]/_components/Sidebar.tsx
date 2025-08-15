"use client";
import BookmarkButton from "@/components/common/add-to-fav";
import CommnetIcon from "@/components/Icons/CommnetIcon";
import ShareIcon from "@/components/Icons/ShareIcon";
import Image from "next/image";
import { useState } from "react";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaWhatsapp,
  FaTwitter,
  FaCopy,
  FaTelegram,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  articleById?: Article;
}

const Sidebar = ({ articleById }: SidebarProps) => {
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  // Enhanced share functionality
  const handleShare = (
    platform:
      | "facebook"
      | "messenger"
      | "twitter"
      | "whatsapp"
      | "telegram"
      | "copy"
  ) => {
    const url = window.location.href;
    const title = articleById?.title || "مقال من موقع ديربال";
    const description =
      articleById?.title ||
      articleById?.description?.replace(/<[^>]*>/g, "").substring(0, 200) +
        "..." ||
      "اقرأ هذا المقال المميز";

    // Clean the description from HTML tags if any
    const cleanDescription = description.replace(/<[^>]*>/g, "").trim();

    try {
      switch (platform) {
        case "facebook":
          // Facebook Share Dialog with content
          const facebookShareUrl =
            `https://www.facebook.com/sharer/sharer.php?` +
            `u=${encodeURIComponent(url)}&` +
            `quote=${encodeURIComponent(`${title}\n\n${cleanDescription}`)}`;

          const facebookWindow = window.open(
            facebookShareUrl,
            "facebook-share-dialog",
            "width=626,height=436,resizable=yes,scrollbars=yes"
          );

          if (!facebookWindow) {
            handleFallbackShare(url, title, cleanDescription);
          }
          break;

        case "messenger":
          // For Messenger, you need a Facebook App ID
          const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
          if (!appId) {
            console.warn("Facebook App ID not configured");
            handleFallbackShare(url, title, cleanDescription);
            return;
          }

          const messengerUrl =
            `https://www.facebook.com/dialog/send?` +
            `app_id=${appId}&` +
            `link=${encodeURIComponent(url)}&` +
            `redirect_uri=${encodeURIComponent(window.location.origin)}`;

          const messengerWindow = window.open(
            messengerUrl,
            "messenger-share-dialog",
            "width=626,height=436"
          );

          if (!messengerWindow) {
            handleFallbackShare(url, title, cleanDescription);
          }
          break;

        case "twitter":
          const twitterText = `${title}\n\n${cleanDescription}`;
          const twitterUrl =
            `https://twitter.com/intent/tweet?` +
            `text=${encodeURIComponent(twitterText)}&` +
            `url=${encodeURIComponent(url)}`;

          window.open(twitterUrl, "_blank", "width=550,height=420");
          break;

        case "whatsapp":
          const whatsappText = `*${title}*\n\n${cleanDescription}\n\n${url}`;
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
            whatsappText
          )}`;

          window.open(whatsappUrl, "_blank");
          break;

        case "telegram":
          const telegramText = `${title}\n\n${cleanDescription}`;
          const telegramUrl =
            `https://t.me/share/url?` +
            `url=${encodeURIComponent(url)}&` +
            `text=${encodeURIComponent(telegramText)}`;

          window.open(telegramUrl, "_blank");
          break;

        case "copy":
          const textToCopy = `${title}\n\n${cleanDescription}\n\n${url}`;
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              showNotification("تم نسخ محتوى المقال والرابط إلى الحافظة!");
            })
            .catch(() => {
              // Fallback for older browsers
              const textArea = document.createElement("textarea");
              textArea.value = textToCopy;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand("copy");
              document.body.removeChild(textArea);
              showNotification("تم نسخ محتوى المقال والرابط إلى الحافظة!");
            });
          break;
      }
    } catch (error) {
      console.error("Share error:", error);
      handleFallbackShare(url, title, cleanDescription);
    }

    // Close dropdown after sharing
    setShowShareDropdown(false);
  };

  const handleFallbackShare = (
    url: string,
    title: string,
    description: string
  ) => {
    const fallbackText = `${title}\n\n${description}\n\n${url}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(fallbackText).then(() => {
        showNotification(
          "حدث خطأ في المشاركة. تم نسخ محتوى المقال إلى الحافظة بدلاً من ذلك."
        );
      });
    } else {
      alert(`حدث خطأ في المشاركة. يمكنك نسخ الرابط يدوياً: ${url}`);
    }
  };

  const showNotification = (message: string) => {
    // You can replace this with a proper toast notification system
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      font-family: inherit;
      direction: rtl;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  // Download PDF functionality
  const handleDownloadPDF = () => {
    // This would typically generate a PDF of the article
    // For now, we'll simulate the download process
    const link = document.createElement("a");
    link.href = "#"; // In a real app, this would be the PDF generation endpoint
    link.download = `${articleById?.title || "article"}.pdf`;

    // Show loading state or generate PDF here
    showNotification("سيتم تحضير ملف PDF وتحميله قريباً...");

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
      // If no comments section found, scroll to bottom
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex w-16 flex-col items-center justify-center border border-gray-500 text-white bg-gray-900">
        {/* Add to Favorites */}
        <div
          className="flex h-16 w-full cursor-pointer items-center justify-center border-b border-gray-500 text-center text-sm transition-colors hover:bg-gray-800"
          title="إضافة إلى المفضلة"
        >
          {articleById && <BookmarkButton article={articleById} />}
        </div>

        {/* Share Icon with Dropdown */}
        <div
          className="relative flex h-16 w-full cursor-pointer items-center justify-center border-b border-gray-500 transition-colors hover:bg-gray-800"
          onMouseEnter={() => setShowShareDropdown(true)}
          onMouseLeave={() => setShowShareDropdown(false)}
          title="مشاركة المقال"
        >
          <ShareIcon height={30} width={30} />

          {/* Enhanced Share Dropdown */}
          <AnimatePresence>
            {showShareDropdown && (
              <motion.div
                className="absolute right-full top-0 mr-2 flex flex-col bg-gray-800 shadow-2xl rounded-lg overflow-hidden border border-gray-600 min-w-48"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {/* Facebook */}
                <div
                  className="flex h-12 cursor-pointer items-center justify-start px-4 border-b border-gray-600 transition-colors hover:bg-gray-700 group"
                  onClick={() => handleShare("facebook")}
                  title="مشاركة على فيسبوك"
                >
                  <FaFacebook size={18} className="text-blue-500 ml-3" />
                  <span className="text-white text-sm group-hover:text-blue-400">
                    فيسبوك
                  </span>
                </div>

                {/* Messenger */}
                <div
                  className="flex h-12 cursor-pointer items-center justify-start px-4 border-b border-gray-600 transition-colors hover:bg-gray-700 group"
                  onClick={() => handleShare("messenger")}
                  title="مشاركة على ماسنجر"
                >
                  <FaFacebookMessenger
                    size={18}
                    className="text-blue-400 ml-3"
                  />
                  <span className="text-white text-sm group-hover:text-blue-400">
                    ماسنجر
                  </span>
                </div>

                {/* WhatsApp */}
                <div
                  className="flex h-12 cursor-pointer items-center justify-start px-4 border-b border-gray-600 transition-colors hover:bg-gray-700 group"
                  onClick={() => handleShare("whatsapp")}
                  title="مشاركة على واتساب"
                >
                  <FaWhatsapp size={18} className="text-green-500 ml-3" />
                  <span className="text-white text-sm group-hover:text-green-400">
                    واتساب
                  </span>
                </div>

                {/* Twitter */}
                <div
                  className="flex h-12 cursor-pointer items-center justify-start px-4 border-b border-gray-600 transition-colors hover:bg-gray-700 group"
                  onClick={() => handleShare("twitter")}
                  title="مشاركة على تويتر"
                >
                  <FaTwitter size={18} className="text-blue-400 ml-3" />
                  <span className="text-white text-sm group-hover:text-blue-400">
                    تويتر
                  </span>
                </div>

                {/* Telegram */}
                <div
                  className="flex h-12 cursor-pointer items-center justify-start px-4 border-b border-gray-600 transition-colors hover:bg-gray-700 group"
                  onClick={() => handleShare("telegram")}
                  title="مشاركة على تيليجرام"
                >
                  <FaTelegram size={18} className="text-blue-500 ml-3" />
                  <span className="text-white text-sm group-hover:text-blue-400">
                    تيليجرام
                  </span>
                </div>

                {/* Copy Link */}
                <div
                  className="flex h-12 cursor-pointer items-center justify-start px-4 transition-colors hover:bg-gray-700 group"
                  onClick={() => handleShare("copy")}
                  title="نسخ الرابط"
                >
                  <FaCopy size={18} className="text-yellow-400 ml-3" />
                  <span className="text-white text-sm group-hover:text-yellow-400">
                    نسخ الرابط
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
            className="transition-transform hover:scale-110"
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
