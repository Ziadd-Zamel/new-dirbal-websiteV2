import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import Image from "next/image";
import Link from "next/link";

export default function First() {
  return (
    <div
      className="-mt-2 w-full py-10 pl-6 text-right lg:w-[40%] lg:py-0"
      dir="rtl"
    >
      <Image
        src="/assets/logoWht.png"
        alt="logo"
        width={300}
        height={0}
        className="mb-6"
      />
      <p
        style={{ direction: "rtl" }}
        className="flex flex-col text-justify font-tajawal leading-relaxed text-gray-300 lg:text-sm"
      >
        بسم الله والحمد لله والصلاة والسلام على رسول الله. وبعد، فمنذ الصبا
        واهتمامات شتّى تتجاذبني. هي متمايزة حتى لا رابط يجمعها إلا الشغف بالعمل.
        ورغم ما أعادت عليّ من خير أشكر الله تعالى عليه، أدركت أن العرفان الحقيقي
        بفضله سبحانه يكون بالإفاضة على الغير مصداقاً لأمره جلّ وعلا:
        &#34;وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ&ldquo;. فطنت إذ ذاك إلى
        أن كثيراً من أنفاس زماني كانت في الحقيقة قد غادرت فارغة. فالتّشتت استنفد
        وسعي ووقتي، ولم يحظ جانب بالوافر اللازم لبذله، فلم يتعدّ جلُّ ما نتج
        فتاتاً في هذا المجال وفي ذاك.
        <br />
        <span className="mt-2">
          الحمد لله الذي بنعمته تتمّ الصالحات. انصرفت عن كثير لأستفرغ الوقت
          والجهد للأهم، فكان منه ما أينع وحان قطافه، فرأيت أن من الخير أن أبدأ
          بنشره على هذه الشبكة. وإني بهذا لا أبتغي غير وجه الله تبارك وتعالى،
          ولا أطمع ممّن يجد فائدة إلا في دعاء بالأجر والثواب وبالتوفيق والسداد.
          وإن هذا عندي لجدُّ عظيم. وما توفيقي إلا بالله، والسلام عليكم ورحمة
          الله وبركاته.
        </span>
      </p>
      <Link
        href={"#"}
        style={{ direction: "rtl" }}
        className="flex w-fit items-center  gap-2 self-end justify-self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 font-tajawal text-lg text-white hover:bg-[#C18F59]"
      >
        المزيد
        <span className="mt-1">
          <LeftArrowIcon height={10} width={10} dark={false} />
        </span>
      </Link>
    </div>
  );
}
