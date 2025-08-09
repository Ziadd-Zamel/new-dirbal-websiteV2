import LeftArrowIcon from "@/components/Icons/LeftArrowIcon";
import Link from "next/link";
import RecentIcons from "./recent-icons";
import Image from "next/image";
import Divider from "@/components/common/Divider";

export default function RecentLeftSection({
  selectedArticle,
}: {
  selectedArticle: Article;
}) {
  const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <div className="w-full lg:w-[47%]">
      <div className="mb-3 mt-10 flex items-center justify-start gap-4 text-[16px] font-[600] text-white sm:text-[25px] lg:mb-3 lg:mt-2 lg:text-lg">
        {selectedArticle.sub_category.icon_url && (
          <Image
            src={selectedArticle.sub_category.icon_url}
            alt="Icon"
            height={50}
            width={50}
            className="h-[50px] w-[50px]"
          />
        )}
        <h4 className="font-tajawal">
          <span className="text-lg text-[#B5975C]">
            {selectedArticle.title_number} {selectedArticle.title_short}:{" "}
          </span>
          {selectedArticle.title}
        </h4>
      </div>
      <Divider
        orientation="horizontal"
        color="bg-[#B4947180]"
        thickness="h-[2px]"
      />
      <p className="pl-2 pt-6 text-justify font-tajawal text-[16px] font-medium leading-[25px] text-gray-300 sm:text-[16px] md:text-[20px] lg:text-[13px] xl:text-[15.5px]">
        {(() => {
          const cleanText = stripHtmlTags(selectedArticle.description);
          if (cleanText.length <= 400) {
            return cleanText;
          }

          const truncatedText = cleanText.substring(0, 400);
          const lastWords = cleanText.substring(400, 500);

          return (
            <>
              {truncatedText}
              <span className="bg-gradient-to-l from-gray-200 to-transparent bg-clip-text text-transparent">
                {lastWords}
              </span>
            </>
          );
        })()}
      </p>
      <div className="mt-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center">
        <Link
          href={`/${selectedArticle.sub_category.category.uuid}/${selectedArticle.sub_category.uuid}/${selectedArticle.uuid}`}
          className="flex w-fit  items-center gap-2 self-end rounded-[2px] bg-[#B5975C] px-2 pb-1 font-tajawal text-lg text-white hover:bg-[#C18F59]"
        >
          المزيد
          <span className="mr-2">
            <LeftArrowIcon height={10} width={10} dark={false} />
          </span>
        </Link>
        <RecentIcons article={selectedArticle} />
      </div>
    </div>
  );
}
