import Image from "next/image";
import Seconde from "./_components/seconde";
import First from "./_components/first";
import Third from "./_components/third";
import { getFooterSettings } from "@/lib/api/settings.api";

export default async function Footer() {
  const footerSettings = await getFooterSettings();
  console.log(footerSettings);
  return (
    <footer
      className="border-t-[2px] border-solid border-[#AB8219] bg-[#050A12]  text-white  relative overflow-hidden"
      style={{
        backgroundImage: `url(${footerSettings.footerMainImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" px-10 pt-20 lg:px-20 xl:px-[70px]">
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content with relative positioning to appear above overlay */}
        <div className="relative z-10">
          <div className="flex flex-col items-end lg:flex-row lg:items-start 2xl:box-container relative z-30 ">
            <First />
            <Seconde />
            <Third />
          </div>

          <div className="absolute bottom-[12%] -left-[0%] xl:-bottom-[30px] xl:left-0 z-0">
            <Image
              src={footerSettings.footerImage}
              alt="logo"
              width={370}
              height={300}
              className="w-[70%] lg:h-[200px] lg:w-[200px] xl:h-[400px] xl:w-[340px] lg:block hidden"
            />{" "}
          </div>
        </div>
      </div>
      <div
        className="mt-28 bg-[#070D17] py-5 text-center text-[18px] text-white"
        dir="rtl"
      >
        <p className="font-tajawal text-xs">
          {" "}
          © دربال، جميع الحقوق محفوظة ضد الاستعمال التجاري، 2025
        </p>{" "}
      </div>
    </footer>
  );
}
