"use client";
import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import Link from "next/link";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
const CommentForm = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div
      style={{ direction: "rtl" }}
      className="mb-10 mt-24 w-full rounded-lg text-right text-white"
    >
      <h2 className="flex items-center gap-2 text-md font-semibold font-tajawal">
        <FaRegComment className="text-[#D9A760]" /> أضف تعليقاً
      </h2>
      <textarea
        className="mt-4 h-44 w-full bg-[#F2F2F2] p-3 text-black placeholder:font-tajawal focus:outline-none"
        placeholder="نص التعليق"
      ></textarea>
      <div className="mt-4 flex gap-4">
        <input
          type="email"
          className="w-1/2 bg-[#F2F2F2] p-2 text-black placeholder:font-tajawal focus:outline-none"
          placeholder="البريد الإلكتروني"
        />
        <input
          type="text"
          className="w-1/2 bg-[#F2F2F2] p-2 text-black placeholder:font-tajawal focus:outline-none"
          placeholder="الاسم (اختياري)"
        />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <input
          type="checkbox"
          id="saveData"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="h-4 w-4"
        />
        <label htmlFor="saveData" className="font-tajawal text-sm">
          احفظ بياناتي على هذا المتصفح لتعليقات قادمة
        </label>
      </div>

      <Link
        href={"#"}
        style={{ direction: "rtl" }}
        className="mt-5 flex w-fit items-center gap-2 self-end justify-self-start rounded-[2px] bg-[#B5975C] px-2 py-1 font-tajawal text-sm text-white hover:bg-[#C18F59]"
      >
        تعليق
        <span className="">
          <LeftArrowIcon height={10} width={10} dark={false} />
        </span>
      </Link>
    </div>
  );
};

export default CommentForm;
