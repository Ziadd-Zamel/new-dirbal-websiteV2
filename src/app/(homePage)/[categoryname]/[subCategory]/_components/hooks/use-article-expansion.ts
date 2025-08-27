import { useState, useEffect } from "react";

// Global state to track which article is currently expanded
let currentlyExpandedArticle: string | null = null;

export const useArticleExpansion = (articleUuid: string) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  useEffect(() => {
    const handleCloseOthers = (event: CustomEvent) => {
      if (event.detail.exceptId !== articleUuid && isExpanded) {
        setIsCollapsing(true);
        setIsExpanded(false);
        setTimeout(() => {
          setIsCollapsing(false);
        }, 1600);
      }
    };

    window.addEventListener(
      "closeOtherArticles",
      handleCloseOthers as EventListener
    );

    return () => {
      window.removeEventListener(
        "closeOtherArticles",
        handleCloseOthers as EventListener
      );
    };
  }, [articleUuid, isExpanded]);

  const toggleExpand = () => {
    if (currentlyExpandedArticle && currentlyExpandedArticle !== articleUuid) {
      window.dispatchEvent(
        new CustomEvent("closeOtherArticles", {
          detail: { exceptId: articleUuid },
        })
      );
    }

    if (isExpanded) {
      setIsCollapsing(true);
      setIsExpanded(false);
      currentlyExpandedArticle = null;

      setTimeout(() => {
        setIsCollapsing(false);
      }, 400);
    } else {
      setIsAnimating(true);
      currentlyExpandedArticle = articleUuid;

      setTimeout(() => {
        setIsExpanded(true);
      }, 250);
    }
  };

  return {
    isExpanded,
    isAnimating,
    isCollapsing,
    toggleExpand,
  };
};
