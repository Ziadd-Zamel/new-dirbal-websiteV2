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

  /** ✅ Copy description only */
  /** ✅ Copy description only - cleaned from HTML */
  const handleCopyDescription = async () => {
    if (!article?.description) return;
    try {
      // Remove HTML tags and decode HTML entities
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = article.description;
      const cleanText = tempDiv.textContent || tempDiv.innerText || "";

      await navigator.clipboard.writeText(cleanText.trim());
      setCopiedDesc(true);
      setTimeout(() => setCopiedDesc(false), 1200);
    } catch {
      alert("تعذر نسخ الوصف، جرب نسخة أحدث من المتصفح.");
    }
  };

  /** ✅ Centralized share handler */
  const handleShare = (
    platform: "facebook" | "messenger" | "twitter" | "whatsapp" | "copy"
  ) => {
    const url = window.location.href;
    const title = article?.title || "مقال من موقع دربال";
    const description =
      article?.description?.replace(/<[^>]*>/g, "").slice(0, 180) ||
      "اقرأ هذا المقال المميز";

    const cleanDesc = description.trim();

    try {
      switch (platform) {
        case "facebook":
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              url
            )}&quote=${encodeURIComponent(`${title}\n\n${cleanDesc}`)}`,
            "_blank",
            "width=626,height=436,resizable=yes,scrollbars=yes"
          );
          break;

        case "messenger":
          window.open(
            `https://www.facebook.com/dialog/send?link=${encodeURIComponent(
              url
            )}&redirect_uri=${encodeURIComponent(window.location.origin)}`,
            "_blank",
            "width=626,height=436"
          );
          break;

        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `${title}\n\n${cleanDesc}`
            )}&url=${encodeURIComponent(url)}`,
            "_blank",
            "width=550,height=420"
          );
          break;

        case "whatsapp":
          window.open(
            `https://wa.me/?text=${encodeURIComponent(
              `*${title}*\n\n${cleanDesc}\n\n${url}`
            )}`,
            "_blank"
          );
          break;

        case "copy":
          navigator.clipboard
            .writeText(`${title}\n\n${cleanDesc}\n\n${url}`)
            .then(() => showNotification("تم نسخ محتوى المقال والرابط!"))
            .catch(() => {
              // Fallback for older browsers
              const textarea = document.createElement("textarea");
              textarea.value = `${title}\n\n${cleanDesc}\n\n${url}`;
              document.body.appendChild(textarea);
              textarea.select();
              document.execCommand("copy");
              document.body.removeChild(textarea);
              showNotification("تم نسخ محتوى المقال والرابط!");
            });
          break;
      }
    } catch (err) {
      console.error("Share error:", err);
      showNotification("حدث خطأ في المشاركة، تم نسخ الرابط بدلاً من ذلك.");
      navigator.clipboard?.writeText(`${title}\n\n${cleanDesc}\n\n${url}`);
    }

    setShowShareDropdown(false);
  };

  /** ✅ Reusable notification */
  const showNotification = (message: string) => {
    const div = document.createElement("div");
    div.textContent = message;
    div.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 10px 16px;
      border-radius: 6px;
      z-index: 9999;
      box-shadow: 0 4px 10px rgba(0,0,0,.2);
      font-size: 14px;
      direction: rtl;
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2500);
  };

  return (
    <div className="relative flex w-fit items-center gap-3 -mb-1">
      {/* Bookmark */}
      <div className="px-2 py-1.5">
        <BookmarkButton white article={article} width={25} height={25} />
      </div>

      {/* Copy */}
      <button
        className="cursor-pointer border-x border-gray-400 px-5 py-1.5"
        onClick={handleCopyDescription}
      >
        <Files strokeWidth={1} size={32} color="white" />
      </button>

      {/* Share dropdown */}
      <div
        className="relative cursor-pointer px-1.5 py-1.5"
        onMouseEnter={() => setShowShareDropdown(true)}
        onMouseLeave={() => setShowShareDropdown(false)}
      >
        <Share2 color="white" strokeWidth={1} size={32} />

        <AnimatePresence>
          {showShareDropdown && (
            <motion.div
              className="absolute top-full left-1.5 flex flex-col overflow-hidden border border-gray-600 bg-gray-800 shadow-2xl z-50"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.12 }}
            >
              {[
                { id: "facebook", Icon: FaFacebookF, label: "فيسبوك" },
                { id: "messenger", Icon: SiMessenger, label: "ماسنجر" },
                { id: "twitter", Icon: BsTwitterX, label: "تويتر" },
                { id: "whatsapp", Icon: FaWhatsapp, label: "واتساب" },
              ].map(({ id, Icon, label }, i, arr) => (
                <div
                  key={id}
                  className={`flex h-[35px] w-[35px] items-center justify-center cursor-pointer transition-colors hover:bg-gray-700 group ${
                    i !== arr.length - 1 ? "border-b border-gray-500" : ""
                  }`}
                  onClick={() =>
                    handleShare(
                      id as "facebook" | "messenger" | "twitter" | "whatsapp"
                    )
                  }
                  title={`مشاركة على ${label}`}
                >
                  <Icon
                    size={16}
                    className="text-white group-hover:text-[#B5975C] transition-colors"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tooltip for copy */}
      {copiedDesc && (
        <span className="absolute -bottom-6 right-0 rounded bg-black px-2 py-0.5 text-[12px] text-white">
          تم نسخ الوصف
        </span>
      )}
    </div>
  );
}
