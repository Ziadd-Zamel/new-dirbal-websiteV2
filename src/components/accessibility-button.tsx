"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Plus, Minus, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { IoAccessibilitySharp } from "react-icons/io5";
import { useTheme } from "next-themes";

interface AccessibilityButtonProps {
  className?: string;
}

export default function AccessibilityButton({
  className,
}: AccessibilityButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [isReadingMaskActive, setIsReadingMaskActive] = useState(false);
  const readingMaskHeight = 80; // Fixed height in px
  const [baseFontSizes, setBaseFontSizes] = useState<Map<Element, number>>(
    new Map()
  );
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set light theme as default
    if (!theme || theme === "system") {
      setTheme("light");
    }
  }, [theme, setTheme]);

  // Reset internal state when page changes
  useEffect(() => {
    setFontScale(1);
    setIsReadingMaskActive(false);
    setBaseFontSizes(new Map());
    removeReadingMask();
  }, [pathname]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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

  const createReadingMask = () => {
    // Remove existing mask if any
    removeReadingMask();

    // Create the reading mask element
    const mask = document.createElement("div");
    mask.id = "reading-mask";
    mask.style.cssText = `
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: ${readingMaskHeight}px;
       background: rgba(0, 0, 0, 0);
       border-top: 4px solid #D4AF37;
       border-bottom: 4px solid #D4AF37;
       pointer-events: none;
       z-index: 9998;
       transition: top 0.1s ease;
       box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
     `;

    // Create the dimming overlay with a hole for the reading mask
    const overlay = document.createElement("div");
    overlay.id = "reading-mask-overlay";
    overlay.style.cssText = `
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(0, 0, 0, 0.3);
       pointer-events: none;
       z-index: 9997;
       clip-path: polygon(
         0 0,
         100% 0,
         100% 100%,
         0 100%,
         0 0,
         0 calc(var(--mask-top, 0px) + 80px),
         100% calc(var(--mask-top, 0px) + 80px),
         100% var(--mask-top, 0px),
         0 var(--mask-top, 0px)
       );
     `;

    // Add elements to DOM
    document.body.appendChild(overlay);
    document.body.appendChild(mask);

    // Add scroll event listener to move mask with scroll
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const maskTop =
        scrollTop + window.innerHeight / 2 - readingMaskHeight / 2;
      const finalTop = Math.max(0, maskTop);
      mask.style.top = `${finalTop}px`;

      // Update overlay clip-path to create hole for reading mask
      const overlay = document.getElementById("reading-mask-overlay");
      if (overlay) {
        overlay.style.setProperty("--mask-top", `${finalTop}px`);
      }
    };

    // Add mouse move event listener for manual control
    const handleMouseMove = (e: MouseEvent) => {
      const maskTop = e.clientY - readingMaskHeight / 2;
      const finalTop = Math.max(0, maskTop);
      mask.style.top = `${finalTop}px`;

      // Update overlay clip-path to create hole for reading mask
      const overlay = document.getElementById("reading-mask-overlay");
      if (overlay) {
        overlay.style.setProperty("--mask-top", `${finalTop}px`);
      }
    };

    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentTop = parseInt(mask.style.top) || 0;
      let newTop = currentTop;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newTop = Math.max(0, currentTop - readingMaskHeight);
          break;
        case "ArrowDown":
          e.preventDefault();
          newTop = currentTop + readingMaskHeight;
          break;
        case "Home":
          e.preventDefault();
          newTop = 0;
          break;
        case "End":
          e.preventDefault();
          const maxTop =
            document.documentElement.scrollHeight - readingMaskHeight;
          newTop = Math.max(0, maxTop);
          break;
      }

      mask.style.top = `${newTop}px`;

      // Update overlay clip-path to create hole for reading mask
      const overlay = document.getElementById("reading-mask-overlay");
      if (overlay) {
        overlay.style.setProperty("--mask-top", `${newTop}px`);
      }
    };

    // Store event listeners for cleanup
    mask.dataset.scrollHandler = handleScroll.toString();
    mask.dataset.mouseHandler = handleMouseMove.toString();
    mask.dataset.keyHandler = handleKeyDown.toString();

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keydown", handleKeyDown);

    // Initial position
    handleScroll();
  };

  const removeReadingMask = () => {
    const mask = document.getElementById("reading-mask");
    const overlay = document.getElementById("reading-mask-overlay");

    if (mask) {
      // Remove event listeners
      const scrollHandler = mask.dataset.scrollHandler;
      const mouseHandler = mask.dataset.mouseHandler;
      const keyHandler = mask.dataset.keyHandler;

      if (scrollHandler)
        window.removeEventListener("scroll", eval(scrollHandler));
      if (mouseHandler)
        document.removeEventListener("mousemove", eval(mouseHandler));
      if (keyHandler) document.removeEventListener("keydown", eval(keyHandler));

      mask.remove();
    }

    if (overlay) {
      overlay.remove();
    }
  };

  const toggleReadingMask = () => {
    if (!isReadingMaskActive) {
      setIsReadingMaskActive(true);
      createReadingMask();
    } else {
      setIsReadingMaskActive(false);
      removeReadingMask();
    }
  };

  const resetAccessibility = () => {
    setFontScale(1);
    setIsReadingMaskActive(false);
    removeReadingMask();

    // Reset theme to light
    setTheme("light");

    const root = document.documentElement;
    root.style.removeProperty("--accessibility-font-scale");
    document.body.style.removeProperty("fontSize");

    baseFontSizes.forEach((baseFontSize, element) => {
      if (element instanceof HTMLElement) {
        element.style.fontSize = `${baseFontSize}px`;
      }
    });

    setBaseFontSizes(new Map());
    // Force reflow to ensure styles are applied
    void document.body.offsetHeight;
  };

  const scalePercentage = Math.round(fontScale * 100);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Direct DOM manipulation as fallback
    const html = document.documentElement;
    const body = document.body;

    if (newTheme === "dark") {
      html.setAttribute("data-theme", "dark");
      body.style.backgroundColor = "#0f172a";
      body.style.color = "#f8fafc";
    } else {
      html.setAttribute("data-theme", "light");
      body.style.backgroundColor = "#f3f3f3";
      body.style.color = "#0f172a";
    }
  };

  const isDarkTheme = theme === "dark";

  return (
    <div
      className={cn("fixed bottom-3 left-3 z-50", className)}
      data-accessibility-button
    >
      {/* Main accessibility button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:scale-105 hover:shadow-blue-600/50 focus:outline-none focus:ring-4 focus:ring-blue-400/30"
        aria-label="إعدادات إمكانية الوصول"
        aria-expanded={isOpen}
        data-accessibility-button
      >
        {/* Icon */}
        <div className="relative z-10">
          <IoAccessibilitySharp className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
        </div>
      </button>

      {/* Accessibility options panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute bottom-16 left-0 mb-3 w-64 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Font scale control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3">
                <button
                  onClick={() =>
                    handleFontScaleChange(Math.max(0.5, fontScale - 0.1))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 shadow-sm border border-slate-200 hover:border-blue-300 hover:scale-105"
                  aria-label="تصغير الخط"
                >
                  <span className="text-sm font-bold">
                    <Minus className="h-4 w-4" />
                  </span>
                </button>

                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">
                    {scalePercentage}%
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleFontScaleChange(Math.min(2.0, fontScale + 0.1))
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 shadow-sm border border-slate-200 hover:border-blue-300 hover:scale-105"
                  aria-label="تكبير الخط"
                >
                  <span className="text-sm font-bold">
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>

            {/* Theme switcher - icon only */}
            <div className="space-y-3">
              <div className="flex items-center justify-center bg-slate-50 rounded-xl p-3">
                <button
                  onClick={toggleTheme}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 shadow-sm border hover:scale-105",
                    isDarkTheme
                      ? "bg-slate-800 text-yellow-400 border-slate-700 hover:bg-slate-700 hover:border-yellow-300"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  )}
                  aria-label={
                    isDarkTheme
                      ? "تبديل إلى الوضع الفاتح"
                      : "تبديل إلى الوضع الداكن"
                  }
                >
                  {isDarkTheme ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Reading mask toggle */}
            <button
              onClick={toggleReadingMask}
              className={cn(
                "w-full py-2 px-2 rounded-xl text-sm font-semibold transition-all duration-200 border-2 shadow-sm",
                isReadingMaskActive
                  ? "bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:border-green-400"
                  : "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 hover:border-slate-400"
              )}
            >
              القناع
            </button>

            {/* Reset button */}
            <button
              onClick={resetAccessibility}
              className="w-full py-2 px-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-xl text-sm font-semibold border border-slate-300 hover:from-slate-200 hover:to-slate-300 hover:border-slate-400 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              افتراضي
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
