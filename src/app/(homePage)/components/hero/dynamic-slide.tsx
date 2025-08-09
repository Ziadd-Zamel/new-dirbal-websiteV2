import SubCategorySection from "./subCategories-section";

// Server-safe HTML stripping function
const stripHtmlTags = (html: string): string => {
  if (!html) return "";

  return (
    html
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Decode common HTML entities
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      // Remove extra whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
};
export default function DynamicSlide({ category }: { category: Category }) {
  const isDark = category.light;
  const cleanDescription = stripHtmlTags(category.description || "");
  console.log("DynamicSlide category:", category);
  return (
    <div
      className={`absolute inset-0 z-10 h-full flex-[0_0_100%] opacity-100 transition-opacity duration-1000 ease-in-out`}
    >
      <div
        className={`absolute inset-0 h-full w-full animate-zoom`}
        style={{
          backgroundImage: `url('${category.image_url || "/assets/bg-2.jpg"}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      {isDark && (
        <div className="absolute inset-0 bg-[rgba(37,37,37,0.9)]"></div>
      )}

      <div
        style={{ direction: "rtl" }}
        className="relative flex h-full flex-col justify-between pb-5 text-right "
      >
        <div className="text-justify">
          <div className="px-10 pt-5 lg:px-20 xl:px-[71px]">
            <h2 className="mt-20 text-justify font-tajawal text-[50px] font-[800] text-white sm:mt-20 sm:text-[70px] lg:mt-20">
              {category.name || ""}
            </h2>

            <div
              style={{ direction: "rtl" }}
              className="scrollbar-hide mt-6 max-h-[400px] overflow-y-auto text-justify font-tajawal text-[18px] font-[400] text-gray-300 md:text-[21px] lg:h-full lg:max-h-none xl:w-[77%] xl:leading-[30px]"
            >
              {cleanDescription}
            </div>
          </div>
        </div>
        <SubCategorySection
          categoryId={category.uuid}
          SubCategory={category.SubCategory}
        />
      </div>
    </div>
  );
}
