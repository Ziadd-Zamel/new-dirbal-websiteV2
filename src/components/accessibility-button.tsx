"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  TextIcon,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AccessibilityButtonProps {
  className?: string;
}

export default function AccessibilityButton({
  className,
}: AccessibilityButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false);
  const [baseFontSizes, setBaseFontSizes] = useState<Map<Element, number>>(
    new Map()
  );
  const pathname = usePathname();

  useEffect(() => {
    // Don't load saved settings since we reset on every page navigation
  }, []);

  // Reset internal state when page changes
  useEffect(() => {
    setFontScale(1);
    setIsScreenReaderActive(false);
    setBaseFontSizes(new Map());
  }, [pathname]);

  const storeBaseFontSizes = () => {
    const newBaseFontSizes = new Map<Element, number>();

    const textSelectors = [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
      "a",
      "li",
      "td",
      "th",
      "label",
    ];

    textSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          // Skip if this element is part of the accessibility button
          if (element.closest("[data-accessibility-button]")) {
            return;
          }
          const computedStyle = window.getComputedStyle(element);
          const currentFontSize = parseFloat(computedStyle.fontSize);
          newBaseFontSizes.set(element, currentFontSize);
        }
      });
    });

    const tailwindFontSizes = [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
    ];

    tailwindFontSizes.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          // Skip if this element is part of the accessibility button
          if (element.closest("[data-accessibility-button]")) {
            return;
          }
          const computedStyle = window.getComputedStyle(element);
          const currentFontSize = parseFloat(computedStyle.fontSize);
          newBaseFontSizes.set(element, currentFontSize);
        }
      });
    });

    setBaseFontSizes(newBaseFontSizes);
  };

  const updateBaseFontSizes = () => {
    const currentBaseFontSizes = new Map(baseFontSizes);

    const textSelectors = [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
      "a",
      "li",
      "td",
      "th",
      "label",
    ];

    textSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!currentBaseFontSizes.has(element)) {
          // Skip if this element is part of the accessibility button
          if (element.closest("[data-accessibility-button]")) {
            return;
          }
          const computedStyle = window.getComputedStyle(element);
          const currentFontSize = parseFloat(computedStyle.fontSize);
          currentBaseFontSizes.set(element, currentFontSize);
        }
      });
    });

    setBaseFontSizes(currentBaseFontSizes);
  };

  const applyFontScale = (scale: number) => {
    const root = document.documentElement;
    root.style.setProperty("--accessibility-font-scale", scale.toString());

    document.body.style.fontSize = `${16 * scale}px`;

    const textSelectors = [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "span",
      "div",
      "a",
      "li",
      "td",
      "th",
      "label",
    ];

    textSelectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          // Skip if this element is part of the accessibility button
          if (element.closest("[data-accessibility-button]")) {
            return;
          }
          const baseFontSize = baseFontSizes.get(element) || 16;
          const newFontSize = baseFontSize * scale;
          element.style.fontSize = `${newFontSize}px`;
        }
      });
    });

    const tailwindFontSizes = [
      "text-xs",
      "text-sm",
      "text-base",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-3xl",
      "text-4xl",
      "text-5xl",
      "text-6xl",
    ];

    tailwindFontSizes.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        if (element instanceof HTMLElement) {
          // Skip if this element is part of the accessibility button
          if (element.closest("[data-accessibility-button]")) {
            return;
          }
          const baseFontSize = baseFontSizes.get(element) || 16;
          const newFontSize = baseFontSize * scale;
          element.style.fontSize = `${newFontSize}px`;
        }
      });
    });
  };

  const handleFontScaleChange = (newScale: number) => {
    if (baseFontSizes.size === 0) {
      storeBaseFontSizes();
    } else {
      updateBaseFontSizes();
    }

    setFontScale(newScale);
    applyFontScale(newScale);
  };

  const toggleScreenReader = () => {
    setIsScreenReaderActive(!isScreenReaderActive);

    if (!isScreenReaderActive) {
      document.body.setAttribute("aria-live", "polite");
      document.body.setAttribute("role", "main");

      const style = document.createElement("style");
      style.id = "screen-reader-styles";
      style.textContent = `
        *:focus {
          outline: 3px solid #007acc !important;
          outline-offset: 2px !important;
        }
        [role="button"], [role="link"], [role="menuitem"] {
          cursor: pointer;
        }
        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }
        [aria-hidden="true"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);

      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = "تم تفعيل وضع قارئ الشاشة";
      document.body.appendChild(announcement);

      setTimeout(() => {
        if (announcement.parentNode) {
          announcement.parentNode.removeChild(announcement);
        }
      }, 3000);
    } else {
      document.body.removeAttribute("aria-live");
      document.body.removeAttribute("role");

      const style = document.getElementById("screen-reader-styles");
      if (style) {
        style.remove();
      }

      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = "تم إيقاف وضع قارئ الشاشة";
      document.body.appendChild(announcement);

      setTimeout(() => {
        if (announcement.parentNode) {
          announcement.parentNode.removeChild(announcement);
        }
      }, 3000);
    }
  };

  const resetAccessibility = () => {
    setFontScale(1);
    setIsScreenReaderActive(false);

    document.body.removeAttribute("aria-live");
    document.body.removeAttribute("role");

    const style = document.getElementById("screen-reader-styles");
    if (style) style.remove();

    const root = document.documentElement;
    root.style.removeProperty("--accessibility-font-scale");
    document.body.style.removeProperty("fontSize");

    baseFontSizes.forEach((baseFontSize, element) => {
      if (element instanceof HTMLElement) {
        element.style.fontSize = `${baseFontSize}px`;
      }
    });

    setBaseFontSizes(new Map());
    document.body.offsetHeight;
  };

  const scalePercentage = Math.round(fontScale * 100);

  return (
    <div
      className={cn("fixed bottom-6 left-6 z-50", className)}
      data-accessibility-button
    >
      {/* Main accessibility button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:scale-105 hover:shadow-blue-600/50 focus:outline-none focus:ring-4 focus:ring-blue-400/30"
        aria-label="إعدادات إمكانية الوصول"
        aria-expanded={isOpen}
        data-accessibility-button
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-300/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Icon */}
        <div className="relative z-10">
          <Settings className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90" />
        </div>

        {/* Status dot */}
        {isOpen && (
          <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-white/40 animate-ping"></div>
          </div>
        )}
      </button>

      {/* Accessibility options panel */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 mb-3 w-72 rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-6 py-4">
            <div className="flex items-center justify-center gap-3 space-x-3 space-x-reverse">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-md">
                  إعدادات إمكانية الوصول
                </h3>
                <p className="text-slate-300 text-xs">تخصيص تجربة التصفح</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Font scale control */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 mr-3">
                  <TextIcon className="h-4 w-4 text-blue-600" />
                </div>
                حجم الخط
              </label>

              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                <button
                  onClick={() =>
                    handleFontScaleChange(Math.max(0.5, fontScale - 0.1))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 shadow-sm border border-slate-200 hover:border-blue-300 hover:scale-105"
                  aria-label="تصغير الخط"
                >
                  <span className="text-lg font-bold">A-</span>
                </button>

                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">
                    {scalePercentage}%
                  </div>
                  <div className="text-xs text-slate-500">من الحجم الأصلي</div>
                </div>

                <button
                  onClick={() =>
                    handleFontScaleChange(Math.min(2.0, fontScale + 0.1))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 shadow-sm border border-slate-200 hover:border-blue-300 hover:scale-105"
                  aria-label="تكبير الخط"
                >
                  <span className="text-lg font-bold">A+</span>
                </button>
              </div>
            </div>

            {/* Screen reader toggle */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 mr-3">
                  <EyeIcon className="h-4 w-4 text-green-600" />
                </div>
                وضع قارئ الشاشة
              </label>

              <button
                onClick={toggleScreenReader}
                className={cn(
                  "w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 border-2 shadow-sm",
                  isScreenReaderActive
                    ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:border-green-400"
                    : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:border-slate-400"
                )}
              >
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded-full transition-all duration-200",
                      isScreenReaderActive
                        ? "bg-green-500 animate-pulse"
                        : "bg-slate-400"
                    )}
                  >
                    {isScreenReaderActive && (
                      <div className="absolute inset-0 rounded-full bg-green-300/50 animate-ping"></div>
                    )}
                  </div>
                  <span>{isScreenReaderActive ? "مفعل" : "غير مفعل"}</span>
                </div>
              </button>
            </div>

            {/* Reset button */}
            <button
              onClick={resetAccessibility}
              className="w-full py-3 px-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-xl text-sm font-semibold border border-slate-300 hover:from-slate-200 hover:to-slate-300 hover:border-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              إعادة تعيين الإعدادات
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
