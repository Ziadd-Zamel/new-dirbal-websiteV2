import Image from "next/image";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SiMessenger } from "react-icons/si";
import { SiViber } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

export default function Seconde() {
  return (
    <div className="flex w-full flex-col space-y-4 py-10 text-right lg:w-[30%] lg:pb-0 lg:pl-5 lg:pr-5 lg:pt-4">
      <div className="items-cente mb-2 flex justify-start">
        <h3 className="font-tajawal text-lg font-[500] uppercase">
          شارك الصفحة بواسطة :
        </h3>
      </div>
      <div className="flex w-full items-center justify-start gap-1 space-x-3">
        <FaFacebookF size={"25px"} />
        <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
        <SiMessenger size={"25px"} />
        <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
        <BsTwitterX size={"25px"} />
        <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
        <SiViber size={"25px"} />
        <div className="h-[35px] w-[1px] bg-[#FFFFFF1A]" />
        <FaWhatsapp size={"30px"} />
      </div>
      <div className="flex w-full justify-start">
        <div className="mb-1 mt-3 flex h-[2px] w-[80%] items-start justify-start bg-[#21262C] md:w-[40%] lg:w-full" />
      </div>
      <form className=" w-full mt-3">
        <p className="text-right font-tajawal text-lg">
          اشترك في نشرة أخبار الموقع
        </p>
        <p className="mt-2 text-right font-tajawal text-[14px]">
          لاستقبال إشعارات المواضيع الجديدة، يرجى الاشتراك
        </p>
        <div className="mt-4 flex w-full items-center rounded border border-[#474747] bg-[#C4C4C426] px-2 py-1">
          <input
            type="email"
            placeholder=" *بريدك الإلكتروني"
            className="-mt-[2px] w-full bg-transparent text-right placeholder:font-tajawal placeholder:text-sm focus:border-amber-600 focus:outline-none"
          />
          <Image src="/assets/send.svg" alt="logo" width={20} height={0} />{" "}
        </div>
      </form>
      <div className="flex w-full justify-start mt-[30px]">
        <Image
          src="/assets/QRCode.png"
          alt="logo"
          width={200}
          height={0}
          className="justify-self-end"
        />{" "}
      </div>
    </div>
  );
}
