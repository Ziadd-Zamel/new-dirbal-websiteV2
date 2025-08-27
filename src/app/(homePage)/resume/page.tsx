import { getAboutMe } from "@/lib/api/settings.api";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Resmu() {
  const aboutMe = await getAboutMe();

  return (
    <section id="Resmu" className="relative min-h-[100vh] pb-24 bg-background">
      <div className="absolute inset-0 -mt-5 h-full bg-background">
        <Image
          src={"/assets/mainbg-9.png"}
          alt=""
          height={1000}
          width={100}
          className="h-full w-full"
        />
      </div>
      <div className="main-padding relative z-50 py-6 mt-20">
        <div className="flex items-center justify-center w-full mt-4">
          <div className="flex flex-col items-center gap-4 w-full max-w-[70%]">
            <hr className="w-full border-[#B5975C] h-px" />
            <h1 className="text-2xl font-tajawal whitespace-nowrap text-[#B5975C]">
              السيرة الذاتية
            </h1>
            <hr className="w-full border-[#B5975C] h-px" />
          </div>
        </div>

        <div className="mt-6 max-w-[70%] mx-auto">
          <div
            className=" p-8 text-gray-300 light:text-gray-600 font-tajawal leading-relaxed"
            dangerouslySetInnerHTML={{ __html: aboutMe }}
          />
        </div>
      </div>
    </section>
  );
}
