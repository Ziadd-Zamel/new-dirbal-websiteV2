import { cn } from "@/lib/utils";
import React from "react";

interface HeadingTextProps {
  text: string;
  title: string;
  className?: string;
  goldenText?: string;
  containerClassName?: string;
  align?: "left" | "center";
  black?: boolean;
}

const HeadingText: React.FC<HeadingTextProps> = ({
  text,
  className,
  containerClassName,
  title,
  goldenText,
  black,
}) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-1 px-4 md:px-6",
        containerClassName
      )}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex items-end gap-4 md:gap-16 lg:gap-28">
          <h2
            className={cn(
              "text-center font-tajawal text-base font-bold text-white md:text-2xl xl:text-[38px]",
              className
            )}
          >
            {goldenText && <span className="text-[#B5975C]">{goldenText}</span>}
            {title}
          </h2>
        </div>

        <p
          className={`mt-3 text-center font-tajawal text-[14px] md:text-md xl:text-[18px] ${
            black ? "text-black" : "text-white"
          }`}
        >
          {" "}
          {text}
        </p>
      </div>
    </div>
  );
};

export default HeadingText;
