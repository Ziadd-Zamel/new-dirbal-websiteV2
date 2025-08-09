import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import { MdEmail } from "react-icons/md";

export default function Third() {
  return (
    <div className="w-full space-y-5 py-10 lg:w-[30%] lg:pb-0 lg:pr-4 lg:pt-4">
      <div
        style={{ direction: "rtl" }}
        className="flex flex-col gap-2"
        dir="rtl"
      >
        <div className="flex items-center gap-3">
          <MdEmail className="mt-2 text-xl text-[#C18F59]" />
          <h3 className="font-tajawal text-lg">تواصل</h3>
        </div>
        <div className="flex w-full items-center rounded border border-[#474747] bg-[#C4C4C426] px-2 py-1">
          <input
            type="email"
            style={{ direction: "rtl" }}
            placeholder=" بريدك الإلكتروني"
            className="-mt-[2px] w-full bg-transparent text-right placeholder:font-tajawal placeholder:text-sm placeholder:text-gray-500 focus:border-amber-600 focus:outline-none"
          />
        </div>
        <textarea
          className="w-full mt-[18px] resize-none rounded-[2px] border border-gray-700 bg-[#474747] px-2 placeholder:font-tajawal placeholder:text-sm placeholder:text-gray-500"
          placeholder="اكتب رسالتك إلى إدارة الموقع"
          rows={12}
        />
        <button className="mt-7 font-tajawal flex w-fit items-center gap-5 justify-self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 text-lg text-white">
          إرسال
          <span className="mt-1">
            <LeftArrowIcon height={12} width={12} dark={false} />
          </span>
        </button>
      </div>
    </div>
  );
}
