"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TabIcon from "@/components/Icons/TabIcon";
import { getBookmarkedArticles, BOOKMARK_KEY } from "@/lib/utils/articles";

export default function ArchiveButton() {
  const router = useRouter();
  const bookmarkCount =
    typeof window !== "undefined" ? getBookmarkedArticles().length : 0;

  useEffect(() => {
    const rerender = () => router.refresh();

    // 🔹 Update when bookmarks change in the same tab
    window.addEventListener("bookmarks-changed", rerender);
    // 🔹 Update when bookmarks change in other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === BOOKMARK_KEY) rerender();
    });

    return () => {
      window.removeEventListener("bookmarks-changed", rerender);
      window.removeEventListener("storage", rerender);
    };
  }, [router]);

  return (
    <button
      onClick={() => router.push("/archive")}
      className="relative hidden border-r-[1px] border-solid border-[#B5975C] px-[16px] md:block"
    >
      <TabIcon dark={false} />
      {bookmarkCount > 0 && (
        <span className="absolute -top-1 left-2 rounded-full bg-red-600 w-3 h-3 flex items-center justify-center text-[8px] font-bold text-white leading-none">
          <p className="mt-[-1px]"> {bookmarkCount}</p>
        </span>
      )}
    </button>
  );
}
