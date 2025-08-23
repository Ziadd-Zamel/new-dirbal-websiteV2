"use client";

import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { Dispatch, SetStateAction, useState } from "react";

interface TapsProps {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  Taps: string[];
}

const NewActiveTaps: React.FC<TapsProps> = ({
  activeTab,
  setActiveTab,
  Taps,
}) => {
  const [hoverTab, setHoverTab] = useState<string | null>(null);

  return (
    <div className="dir-rtl relative z-50 flex w-full flex-col gap-1.5 -mt-4">
      {Taps.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          onMouseEnter={() => setHoverTab(tab)}
          onMouseLeave={() => setHoverTab(null)}
          className={`flex w-full items-center justify-between border bg-white py-[13px] pl-4 pr-5 text-right transition-all ${
            activeTab === tab || hoverTab === tab
              ? "border-transparent bg-gradient-to-r from-[#B5975C]/50 to-[#B5975C] text-white"
              : "border-[#d7d7d7] bg-white text-[#191514]"
          } hover:shadow-md`}
        >
          <span className="-mt-[4px] font-tajawal text-base font-[500] xl:text-lg">
            {tab}
          </span>
          <span className="w-[30px]">
            <LeftArrowIcon
              dark={activeTab !== tab && hoverTab !== tab}
              height={15}
              width={25}
            />
          </span>
        </button>
      ))}
    </div>
  );
};

export default NewActiveTaps;
