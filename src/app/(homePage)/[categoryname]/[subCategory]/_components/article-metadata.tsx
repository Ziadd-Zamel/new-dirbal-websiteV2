import Image from "next/image";
import { motion } from "framer-motion";
import { metadataVariants } from "./utils/animation-variants";

interface ArticleMetadataProps {
  article: Article;
  isCollapsing: boolean;
}

const ArticleMetadata = ({ article, isCollapsing }: ArticleMetadataProps) => {
  return (
    <motion.div
      initial={
        isCollapsing ? metadataVariants.hidden : { opacity: 1, height: "auto" }
      }
      animate={metadataVariants.visible}
      exit={metadataVariants.hidden}
      style={{ direction: "rtl" }}
      className="flex items-center gap-10 text-white"
    >
      <div className="mt-1 flex items-center">
        <Image src={"/assets/date.png"} alt="Date Icon" width={35} height={0} />
        <span className="font-tajawal text-[12px] text-[#B5975C] sm:text-[14px] xl:text-[16px]">
          {new Date(article.created_at)
            .toLocaleDateString("en-GB")
            .split("/")
            .reverse()
            .join("-")}
        </span>
      </div>

      <div className="ml-6 mt-1 flex items-center">
        <Image
          src={"/assets/Author.svg"}
          alt="Author Icon"
          width={30}
          height={0}
        />
        <span className="font-tajawal text-[12px] text-[#B5975C] sm:text-[14px] xl:text-[16px]">
          {article.written_by}
        </span>
      </div>
    </motion.div>
  );
};

export default ArticleMetadata;
