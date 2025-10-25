"use client";
import BookmarkButton from "@/components/common/add-to-fav";
import { useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  articleById?: Article;
}

const Sidebar = ({ articleById }: SidebarProps) => {
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  // Smooth scroll function to comments section
  const scrollToComments = () => {
    const commentsSection = document.getElementById("comments-section");
    if (commentsSection) {
      // Get the current scroll position
      const currentScrollY = window.scrollY;

      // Get the target position (comments section position minus some offset for better visibility)
      const targetPosition = commentsSection.offsetTop + 100;

      // Custom smooth scroll function
      const smoothScroll = (start: number, end: number, duration: number) => {
        const startTime = performance.now();

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Easing function for smooth animation
          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

          const currentPosition =
            start + (end - start) * easeInOutCubic(progress);

          window.scrollTo(0, currentPosition);

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      };

      // Start the smooth scroll animation
      smoothScroll(currentScrollY, targetPosition, 0);
    }
  };

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
    const title = articleById?.title || "مقال من موقع دربال";
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
          // Use Messenger web sharing (no app ID required)
          const messengerText = `${title}\n\n${cleanDescription}\n\n${url}`;
          const messengerUrl = `https://m.me/?text=${encodeURIComponent(
            messengerText
          )}`;

          const messengerWindow = window.open(
            messengerUrl,
            "_blank",
            "width=500,height=600"
          );

          if (!messengerWindow) {
            // Fallback: try to open Messenger app or copy to clipboard
            if (navigator.userAgent.includes("Mobile")) {
              // For mobile, try to open the Messenger app
              window.location.href = `fb-messenger://share?link=${encodeURIComponent(
                url
              )}`;
            } else {
              handleFallbackShare(url, title, cleanDescription);
            }
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
    if (articleById?.document_url) {
      // Download the document from the URL
      const link = document.createElement("a");
      link.href = articleById.document_url;
      link.download = `${articleById?.title || "document"}.pdf`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showNotification("جاري تحميل المستند...");
    } else {
      // Fallback for when no document URL is available
      showNotification("لا يوجد مستند متاح للتحميل");
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="flex w-[70px] flex-col items-center justify-center border border-gray-500 light:border-gray-300 light:bg-transparent light:text-black">
        <div
          className="flex h-[70px] w-full  cursor-pointer items-center justify-center border-b light:border-b-gray-300  border-gray-500 light:border-gray-300 text-center text-sm transition-colors hover:bg-gray-800 light:hover:bg-gray-300 "
          title="إضافة إلى المفضلة"
        >
          <div className="-mr-3">
            {articleById && <BookmarkButton article={articleById} />}
          </div>
        </div>

        <div
          className="relative flex h-[70px]  w-full cursor-pointer items-center justify-center border-b light:border-b-gray-300 border-gray-500 light:border-gray-300 transition-colors hover:bg-gray-800 light:hover:bg-gray-300"
          onMouseEnter={() => setShowShareDropdown(true)}
          onMouseLeave={() => setShowShareDropdown(false)}
          title="مشاركة المقال"
        >
          <Share2 strokeWidth={1} size={35} />
          {/* Enhanced Share Dropdown */}
          <AnimatePresence>
            {showShareDropdown && (
              <motion.div
                className="absolute right-full h-[73px] -top-[2px] flex flex-row bg-gray-800 light:border-gray-300 light:bg-white shadow-2xl overflow-hidden border border-gray-600 z-[-1]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                {/* Facebook */}
                <div
                  className="flex w-[70px] cursor-pointer items-center justify-center border border-gray-500 light:border-gray-300 transition-colors light:hover:bg-gray-300 hover:bg-gray-700  group"
                  onClick={() => handleShare("facebook")}
                  title="مشاركة على فيسبوك"
                >
                  <FaFacebookF
                    size={20}
                    className="light:text-black  group-hover:text-[#B5975C] transition-colors"
                  />
                </div>

                {/* Messenger */}
                <div
                  className="flex w-[78px] cursor-pointer items-center justify-center border border-gray-500 light:border-gray-300 transition-colors light:hover:bg-gray-300 hover:bg-gray-700 group"
                  onClick={() => handleShare("messenger")}
                  title="مشاركة على ماسنجر"
                >
                  <SiMessenger
                    size={20}
                    className="light:text-black group-hover:text-[#B5975C] transition-colors"
                  />
                </div>

                {/* Twitter */}
                <div
                  className="flex w-[78px] cursor-pointer items-center justify-center border border-gray-500 light:border-gray-300 transition-colors light:hover:bg-gray-300 hover:bg-gray-700 group"
                  onClick={() => handleShare("twitter")}
                  title="مشاركة على تويتر"
                >
                  <BsTwitterX
                    size={20}
                    className="light:text-black group-hover:text-[#B5975C] transition-colors"
                  />
                </div>

                {/* WhatsApp */}
                <div
                  className="flex w-[78px] cursor-pointer items-center justify-center border border-gray-500 light:border-gray-300 transition-colors light:hover:bg-gray-300 hover:bg-gray-700 group"
                  onClick={() => handleShare("whatsapp")}
                  title="مشاركة على واتساب"
                >
                  <FaWhatsapp
                    size={20}
                    className="light:text-black group-hover:text-[#B5975C] transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PDF Download */}
        <div
          className="flex h-[70px] w-full cursor-pointer items-center justify-center border-b light:border-b-gray-300 border-gray-500 light:border-gray-300 transition-colors hover:bg-gray-800 light:hover:bg-gray-300"
          onClick={handleDownloadPDF}
          title="تحميل PDF"
        >
          <FileDown strokeWidth={1} size={35} className="light:text-black" />
        </div>

        {/* Comment Icon - Scroll to Comments */}
        <Link
          className="flex h-[70px] w-full cursor-pointer items-center justify-center transition-colors hover:bg-gray-800 light:hover:bg-gray-300"
          title="أضف تعليقاً"
          href={"#comments-section"}
        >
          <MessageCircle
            strokeWidth={1}
            size={35}
            className="light:text-black"
          />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
