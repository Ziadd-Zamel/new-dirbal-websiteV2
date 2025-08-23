"use client";

import { Dispatch, SetStateAction } from "react";

interface TapsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  taps?: string[];
}

const Taps: React.FC<TapsProps> = ({ activeTab, setActiveTab, taps }) => {
  if (!taps) return null;

  return (
    <div className="relative w-full bg-transparent">
      {/* Top and bottom borders */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-[#B4935C]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#B4935C]" />

      <div className="mx-auto max-w-7xl px-2">
        <div
          className="scrollbar-hide flex flex-row-reverse justify-start overflow-x-auto whitespace-nowrap"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {taps.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative w-fit shrink-0 px-3 py-2 text-center text-sm transition-colors duration-200 sm:w-[160px] sm:text-base md:w-[200px] md:text-lg lg:text-xl ${
                activeTab === tab
                  ? "text-white before:absolute before:left-0 before:right-0 before:top-0 before:h-[3px] before:bg-[#E9E9E9] before:opacity-90 before:shadow-[-1px_-2px_11px_0px_#E9E9E9] before:blur-sm after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E9E9E9] after:opacity-90 after:shadow-[-2px_-1px_11px_1px_#E9E9E9] after:blur-sm"
                  : "text-[#DBBC80] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taps;
