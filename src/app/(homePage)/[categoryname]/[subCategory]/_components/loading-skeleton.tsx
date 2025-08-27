"use client";

import { memo } from "react";

const LoadingSkeleton = memo(() => {
  return (
    <div className="animate-pulse">
      {/* Article title skeleton */}
      <div className="mt-12 flex items-center justify-between gap-5">
        <div className="flex-1">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="w-[85px] h-[120px] bg-gray-300 rounded"></div>
      </div>

      {/* Metadata skeleton */}
      <div className="flex items-center gap-10 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-[35px] h-[35px] bg-gray-300 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-3">
        <div className="w-full h-px bg-gray-300"></div>
      </div>
    </div>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;
