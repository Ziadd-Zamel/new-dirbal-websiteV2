import BookmarkButton from "@/components/common/add-to-fav";
import { Files, Share2 } from "lucide-react";
import { useState } from "react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

export default function RecentIcons({ article }: { article: Article }) {
  const [copiedDesc, setCopiedDesc] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  const handleCopyDescription = () => {
    if (article?.description) {
      navigator.clipboard.writeText(article.description).then(() => {
        setCopiedDesc(true);
        setTimeout(() => setCopiedDesc(false), 1000);
      });
    }
  };

  // Enhanced share functionality
  const handleShare = (
    platform: "facebook" | "messenger" | "twitter" | "whatsapp" | "copy"
  ) => {
    const url = window.location.href;
    const title = article?.title || "مقال من موقع ديربال";
    const description =
      article?.title ||
      article?.description?.replace(/<[^>]*>/g, "").substring(0, 200) + "..." ||
      "اقرأ هذا المقال المميز";

    // Clean the description from HTML tags if any
    const cleanDescription = description.replace(/<[^>]*>/g, "").trim();

    try {
      switch (platform) {
        case "facebook":
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
          const messengerUrl =
            `https://www.facebook.com/dialog/send?` +
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

  return (
    <div className="relative flex w-fit items-center gap-3 -mb-1">
      <div className="px-2 py-1.5">
        <BookmarkButton article={article} width={25} height={25} />
      </div>
      <div
        className="cursor-pointer border-x-[1px] border-solid border-gray-400 px-5 py-1.5"
        onClick={handleCopyDescription}
      >
        <Files strokeWidth={1} size={35} color="white" />
      </div>

      {/* Share Button with Dropdown */}
      <div
        className="relative cursor-pointer px-1.5 py-1.5"
        onMouseEnter={() => {
          console.log("Mouse enter - showing dropdown");
          setShowShareDropdown(true);
        }}
        onMouseLeave={() => {
          console.log("Mouse leave - hiding dropdown");
          setShowShareDropdown(false);
        }}
        title="مشاركة المقال"
      >
        <Share2 color="white" strokeWidth={1} size={35} />

        {/* Share Dropdown - Vertical Column Layout */}
        <AnimatePresence>
          {showShareDropdown && (
            <motion.div
              className="absolute top-full left-0 mt-2 flex flex-col bg-gray-800 shadow-2xl overflow-hidden border border-gray-600 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              onMouseEnter={() => setShowShareDropdown(true)}
              onMouseLeave={() => setShowShareDropdown(false)}
            >
              {/* Facebook */}
              <div
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-b border-gray-500 transition-colors hover:bg-gray-700 group"
                onClick={() => handleShare("facebook")}
                title="مشاركة على فيسبوك"
              >
                <FaFacebookF
                  size={16}
                  className="text-white group-hover:text-[#B5975C] transition-colors"
                />
              </div>

              {/* Messenger */}
              <div
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-b border-gray-500 transition-colors hover:bg-gray-700 group"
                onClick={() => handleShare("messenger")}
                title="مشاركة على ماسنجر"
              >
                <SiMessenger
                  size={16}
                  className="text-white group-hover:text-[#B5975C] transition-colors"
                />
              </div>

              {/* Twitter */}
              <div
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-b border-gray-500 transition-colors hover:bg-gray-700 group"
                onClick={() => handleShare("twitter")}
                title="مشاركة على تويتر"
              >
                <BsTwitterX
                  size={16}
                  className="text-white group-hover:text-[#B5975C] transition-colors"
                />
              </div>

              {/* WhatsApp */}
              <div
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center transition-colors hover:bg-gray-700 group"
                onClick={() => handleShare("whatsapp")}
                title="مشاركة على واتساب"
              >
                <FaWhatsapp
                  size={16}
                  className="text-white group-hover:text-[#B5975C] transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {copiedDesc && (
        <span className="absolute -bottom-6 right-0 rounded bg-black px-2 py-0.5 text-[12px] text-white">
          تم نسخ الوصف
        </span>
      )}
    </div>
  );
}
