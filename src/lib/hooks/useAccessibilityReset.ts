"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useAccessibilityReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset accessibility settings when pathname changes (page navigation)
    const resetAccessibility = () => {
      try {
        // Remove screen reader attributes
        if (document.body) {
          document.body.removeAttribute("aria-live");
          document.body.removeAttribute("role");
        }

        // Remove custom styles
        const style = document.getElementById("screen-reader-styles");
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }

        // Reset font scales
        const root = document.documentElement;
        if (root) {
          root.style.removeProperty("--accessibility-font-scale");
        }

        if (document.body) {
          document.body.style.removeProperty("fontSize");
        }

        // Reset all elements to their original font sizes by removing inline styles
        const elementsWithInlineFontSize = document.querySelectorAll(
          '[style*="font-size"]'
        );
        elementsWithInlineFontSize.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.removeProperty("fontSize");
          }
        });

        // Force a reflow to ensure Tailwind classes take effect
        if (document.body) {
          document.body.offsetHeight;
        }

        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessibility-font-scale");
        }

        console.log("Accessibility settings reset on page navigation");
      } catch (error) {
        console.warn("Error resetting accessibility settings:", error);
      }
    };

    // Reset on every page navigation
    resetAccessibility();
  }, [pathname]);

  return null;
}
