/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface MawdooaProps {
  articleById: Article;
  searchTerm?: string;
}

const Mawdooa = ({ articleById, searchTerm }: MawdooaProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Function to strip HTML tags - server-safe version
  const stripHtml = (html: string) => {
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  };

  // Function to highlight search terms
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.replace(
      regex,
      '<mark class="search-highlight bg-yellow-300 text-black px-1 rounded">$1</mark>'
    );
  };
  function removeParagraphStylesOnly(html: string): string {
    return html.replace(/style="([^"]*)"/gi, (_, styleContent) => {
      // Remove font-size and font-family from the style string
      const cleanedStyle = styleContent
        .split(";")
        .map((rule: any) => rule.trim())
        .filter(
          (rule: any) =>
            rule &&
            !rule.toLowerCase().startsWith("font-size") &&
            !rule.toLowerCase().startsWith("font-family")
        )
        .join("; ");

      return cleanedStyle ? `style="${cleanedStyle}"` : "";
    });
  }
  // Function to highlight text in HTML content
  const highlightHtmlContent = (html: string, searchTerm: string) => {
    if (!searchTerm || !html) return html;

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Function to recursively highlight text nodes
    const highlightTextNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
          const highlightedText = highlightText(text, searchTerm);
          const span = document.createElement("span");
          span.innerHTML = highlightedText;
          node.parentNode?.replaceChild(span, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip script and style elements
        const element = node as Element;
        if (element.tagName !== "SCRIPT" && element.tagName !== "STYLE") {
          const children = Array.from(node.childNodes);
          children.forEach(highlightTextNodes);
        }
      }
    };

    highlightTextNodes(tempDiv);
    return tempDiv.innerHTML;
  };

  // Sort subjects by order
  const sortedSubjects =
    articleById.subjects?.sort((a: Subject, b: Subject) => a.order - b.order) ||
    [];

  // Clear previous highlights and add new ones when search term changes
  useEffect(() => {
    if (!contentRef.current) return;

    // Remove existing highlights
    const existingHighlights =
      contentRef.current.querySelectorAll(".search-highlight");
    existingHighlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(highlight.textContent || ""),
          highlight
        );
        parent.normalize(); // Merge adjacent text nodes
      }
    });

    // Add new highlights if search term exists
    if (searchTerm) {
      const walker = document.createTreeWalker(
        contentRef.current,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            // Skip script and style elements
            const parent = node.parentElement;
            if (
              parent &&
              (parent.tagName === "SCRIPT" ||
                parent.tagName === "STYLE" ||
                parent.classList.contains("search-highlight"))
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      const textNodes: Text[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      textNodes.forEach((textNode) => {
        const text = textNode.textContent || "";
        if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
          const regex = new RegExp(
            `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
            "gi"
          );
          const highlightedHTML = text.replace(
            regex,
            '<mark class="search-highlight bg-yellow-300 text-black px-1 rounded font-bold">$1</mark>'
          );

          const span = document.createElement("span");
          span.innerHTML = highlightedHTML;
          textNode.parentNode?.replaceChild(span, textNode);
        }
      });
    }
  }, [searchTerm]);
  return (
    <div className="w-full border-b pb-20 border-[#B5975C]" ref={contentRef}>
      <div
        style={{ direction: "rtl" }}
        className="flex w-full items-center gap-5"
      >
        <div className="w-full">
          <span className="font-tajawal text-[12px] font-bold text-[#B5975C] sm:text-[16px] md:text-[16px] xl:text-2xl">
            {articleById.title_number} {articleById.title_short}:{" "}
          </span>
          <span className="font-tajawal text-[12px] font-bold text-white sm:text-[16px] md:text-[16px] xl:text-2xl">
            {articleById.title}
          </span>
        </div>
      </div>

      <div
        style={{ direction: "rtl" }}
        className="-mr-2 flex items-center gap-10 text-white"
      >
        <div className="mt-1 flex items-center">
          <Image
            src={"/assets/date.png"}
            alt="Home Icon"
            width={35}
            height={0}
          />{" "}
          <span className="font-tajawal text-[12px] text-[#B5975C] sm:text-[14px] xl:text-[16px]">
            {new Date(articleById.published_at)
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-")}
          </span>
        </div>
        <div className="ml-6 mt-1 flex items-center">
          <Image
            src={"/assets/Author.svg"}
            alt="Home Icon"
            width={30}
            height={0}
          />{" "}
          <span className="font-tajawal text-[12px] text-[#B5975C] sm:text-[14px] xl:text-[16px]">
            {articleById.written_by}
          </span>
        </div>
      </div>

      <p
        style={{ direction: "rtl" }}
        className="-mr-[11px] mt-12 text-center text-gray-300 font-tajawal text-[12px] font-medium text-gray sm:text-[16px] md:text-[16px]"
      >
        {articleById.sub_title}
      </p>

      <div className="mb-3 mt-3">
        <hr className="w-full border-t border-[#B5975C] opacity-70" />
        <h6 className="mt-5 text-center font-tajawal text-xl font-bold text-[#B5975C]">
          {articleById.title_description}
        </h6>

        <div
          className="mt-5 text-justify font-tajawal text-sm text-gray-300"
          dangerouslySetInnerHTML={{
            __html: searchTerm
              ? highlightHtmlContent(
                  removeParagraphStylesOnly(articleById.description),
                  searchTerm
                )
              : removeParagraphStylesOnly(articleById.description),
          }}
        />
        {sortedSubjects.length > 0 && (
          <>
            <hr className="my-6 w-full border-t border-[#B5975C] opacity-70" />
            <h6 className="mt-5 text-center font-tajawal text-xl font-bold text-[#B5975C]">
              المواضيع
            </h6>
            {sortedSubjects.map((subject: Subject) => (
              <div key={subject.id} className="mt-5">
                <h6 className="mb-3 text-center font-tajawal text-lg font-bold text-[#B5975C]">
                  {subject.title}
                </h6>
                <p
                  style={{ direction: "rtl" }}
                  className="text-justify font-tajawal text-sm text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: searchTerm
                      ? highlightText(
                          stripHtml(subject.description),
                          searchTerm
                        )
                      : stripHtml(subject.description),
                  }}
                />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Search navigation controls */}
      {searchTerm && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black bg-opacity-80 p-3 text-white shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#B5975C]">البحث:</span>
            <span>{searchTerm}</span>
            <button
              onClick={() => {
                const highlights =
                  document.querySelectorAll(".search-highlight");
                if (highlights.length > 0) {
                  highlights[0].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
              className="rounded bg-[#B5975C] px-2 py-1 text-xs transition-colors hover:bg-[#9d7f45]"
            >
              أول نتيجة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mawdooa;
