import Image from "next/image";
import Seconde from "./_components/seconde";
import First from "./_components/first";
import Third from "./_components/third";
import { getFooterSettings } from "@/lib/api/settings.api";

export default async function Footer() {
  const footerSettings = await getFooterSettings();

  return (
    <footer
      className="relative overflow-hidden border-t-2 border-solid border-[#AB8219] bg-[#050A12] text-white"
      role="contentinfo"
      id="site-footer"
    >
      {/* Background image optimized with Next.js Image */}
      <Image
        src={footerSettings.footerMainImage}
        alt="Footer background"
        fill
        priority={false}
        className="object-cover -z-10"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <div className="relative pt-20 box-container z-10">
        <div className="2xl:box-container relative z-20 flex flex-col items-end lg:flex-row lg:items-start">
          <First />
          <Seconde />
          <Third />
        </div>

        {/* Decorative footer image */}
        {footerSettings.footerImage && (
          <div className="absolute bottom-[12%] left-0 z-0 hidden lg:block xl:-bottom-[30px]">
            <Image
              src={footerSettings.footerImage}
              alt="Decorative footer logo"
              width={370}
              height={300}
              loading="lazy"
              className="w-[70%] lg:h-[200px] lg:w-[200px] xl:h-[400px] xl:w-[340px]"
            />
          </div>
        )}
      </div>

      {/* Bottom copyright */}
      <div
        className="mt-28 bg-[#070D17] py-5 text-center text-[18px] text-white"
        dir="rtl"
      >
        <p className="font-tajawal text-xs">
          © دربال، جميع الحقوق محفوظة ضد الاستعمال التجاري، 2025
        </p>
      </div>
    </footer>
  );
}
