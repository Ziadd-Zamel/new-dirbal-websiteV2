import Image from "next/image";
import Seconde from "./_components/seconde";
import First from "./_components/first";
import Third from "./_components/third";

export default function Footer() {
  return (
    <footer className="border-t-[2px] border-solid border-[#AB8219] bg-[#050A12] px-10 pt-20 text-white lg:px-20 xl:px-[70px]">
      <div className="flex flex-col items-end lg:flex-row lg:items-start">
        <First />
        <div className="h-[3px] w-full bg-[#21262C] lg:h-[450px] lg:w-[3px]" />
        <Seconde />
        <div className="h-[3px] w-full bg-[#21262C] lg:h-[450px] lg:w-[3px]" />
        <Third />
      </div>

      <div
        className="mt-8 bg-[#070D17] py-6 text-center text-[18px] text-white xl:-mr-24"
        dir="rtl"
      >
        <p className="font-tajawal text-sm">
          {" "}
          © دربال، جميع الحقوق محفوظة ضد الاستعمال التجاري، 2025
        </p>{" "}
      </div>
      <div className="absolute bottom-[12%] left-[0%] xl:bottom-[120px] xl:left-16">
        <Image
          src="/assets/none.png"
          alt="logo"
          width={370}
          height={300}
          className="w-[70%] lg:h-[200px] lg:w-[200px] xl:h-[300px] xl:w-[370px] lg:block hidden"
        />{" "}
      </div>
    </footer>
  );
}
