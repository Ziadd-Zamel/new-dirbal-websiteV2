import Link from "next/link";

// Utility to strip HTML
const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

// Utility to apply gradient fade to long text
const applyGradientFade = ({
  text = "",
  color = "from-white",
}: {
  text: string;
  color?: string;
}) => {
  const words = text.split(" ");
  const wordsPerLine = 10;
  const maxWords = wordsPerLine * 40;
  const limitedWords = words.slice(0, maxWords);
  const cleanText = limitedWords.join(" ");

  if (cleanText.length <= 600) {
    return cleanText;
  }

  const truncatedText = cleanText.substring(0, 600);
  const fadedText = cleanText.substring(600, 700);

  return (
    <>
      {truncatedText}
      <span
        className={`${color} bg-gradient-to-l to-transparent bg-clip-text text-transparent`}
      >
        {fadedText}
      </span>
    </>
  );
};

// Highlight Card Component
export default function HighLightCard({
  article,
  gradientColor,
}: {
  article: Article;
  gradientColor: string;
}) {
  const cleanDescription = stripHtml(article.description);

  return (
    <div className="flex w-full flex-col pb-10 pt-5 md:w-[350px] lg:w-[500px] xl:w-[630px]">
      <h3 className="mt-5 text-center font-tajawal text-xl font-[700] text-[#B5975C]">
        {article.sub_category.name}
      </h3>

      <h4 className="my-7 min-h-[80px] text-right font-tajawal text-xl font-[500] text-black">
        <span className="font-[600] text-[#B5975C]">
          {article.title_number}
          {article.title_short} -
        </span>{" "}
        {article.sub_title}
      </h4>

      <p className="-mt-8 min-h-[100px] text-justify font-tajawal text-[16px] text-gray-500">
        {applyGradientFade({
          text: cleanDescription,
          color: gradientColor,
        })}
      </p>

      <Link
        href={`/${article.sub_category.category.name}/${article.sub_category.uuid}/${article.uuid}`}
        className="mt-5 text-left font-tajawal text-sm font-[500] text-[#B5975C]"
      >
        المزيد
      </Link>
    </div>
  );
}
