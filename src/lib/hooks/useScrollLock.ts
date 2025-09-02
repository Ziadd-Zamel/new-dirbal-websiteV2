import { useEffect } from "react";

// Function to get scrollbar width
function getScrollbarWidth(): number {
  // Create a temporary div to measure scrollbar width
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  // @ts-expect-error - msOverflowStyle is a valid CSS property for IE/Edge
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Clean up
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
}

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Get scrollbar width once
      const scrollbarWidth = getScrollbarWidth();

      // Lock body scroll to hide scrollbar
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      // Compensate for scrollbar width to prevent content jumping
      if (scrollbarWidth > 0) {
        const currentPaddingRight =
          parseInt(getComputedStyle(document.body).paddingRight) || 0;
        const newPaddingRight = currentPaddingRight + scrollbarWidth;

        document.body.style.paddingRight = `${newPaddingRight}px`;
        document.documentElement.style.paddingRight = `${newPaddingRight}px`;
      }

      // Add smooth transition
      document.body.style.transition = "padding-right 0.3s ease-out";
      document.documentElement.style.transition = "padding-right 0.3s ease-out";
    }

    return () => {
      // Restore original styles
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.paddingRight = "";
      document.documentElement.style.paddingRight = "";
      document.body.style.transition = "";
      document.documentElement.style.transition = "";
    };
  }, [isLocked]);
}
