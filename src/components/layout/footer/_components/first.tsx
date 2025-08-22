import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import Image from "next/image";
import Link from "next/link";

export default function First() {
  return (
    <div
      className="-mt-2 w-full py-10 pl-6 text-right lg:w-[40%] lg:py-0 flex flex-col h-full"
      dir="rtl"
    >
      <Image
        src="/assets/logoWht.png"
        alt="logo"
        width={300}
        height={0}
        className="mb-6"
      />
      <div
        style={{ direction: "rtl" }}
        className="flex flex-col text-justify font-tajawal leading-relaxed text-gray-300 lg:text-sm"
      >
        <p>
          بسم الله، والحمد لله، والصلاة والسلام على رسول الله.
          <span className="text-[#B5975C] inline">وبعد</span>، فمنذ الصبا
          واهتماماتٌ شتّى تتجاذبني. هي متمايزة حتى لا يبدو من رابط بينها إلا حب
          العمل. ومع ما عاد عليّ من خير، أدركت أن العرفان بفضل الله تعالى موجب
          للإفاضة من نعمه على الغير مصداقاً لأمره جلّ وعلا: &rdquo;وَأَحْسِن
          كَمَا أَحْسَنَ اللَّهُ إِلَيْك&rdquo;. فطنت إذ ذاك إلى أن التّشتت
          استنفد وقتي، ولم يصر باليد ما يصلح بذله.
        </p>
        <br />
        <span className="-mt-3">
          انصرفت عن كثير لأستفرغ الوُسع للأهم، فكان منه ما أينع، فرأيت أن أبدأ
          بنشره. عسى الله تعالى أن ينفع به. وإني بهذا لا أبتغي غير وجهه الكريم،
          <span className="text-[#B5975C]">
            ولا أطمع ممّن يجد فائدة إلا في دعاء بالأجر والثواب وبالتوفيق
            والسداد.
          </span>
          وإن هذا عندي لجدُّ عظيم. وما توفيقي إلا بالله.
        </span>
      </div>
      <div className="self-end justify-self-end lg:mt-[99px]">
        <Link
          href={"/resume"}
          style={{ direction: "rtl" }}
          className="flex w-fit items-center mt-auto gap-5  rounded-[2px] bg-[#B5975C] px-2 pb-1 font-tajawal text-lg text-white hover:bg-[#C18F59]"
        >
          المزيد
          <span className="mt-1">
            <LeftArrowIcon height={12} width={12} dark={false} />
          </span>
        </Link>
      </div>
    </div>
  );
}
