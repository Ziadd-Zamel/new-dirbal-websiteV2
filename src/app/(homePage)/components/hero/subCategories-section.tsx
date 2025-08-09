import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Props {
  SubCategory?: SubCategory[];
  categoryId?: string;
}
export default function SubCategorySection({ SubCategory, categoryId }: Props) {
  if (!SubCategory) {
    return null;
  }

  return (
    <div className="w-full">
      <div style={{ direction: "rtl" }} className="px-4 pb-5 sm:px-6 md:px-10">
        {/* Mobile and Small Tablet Layout */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SubCategory.map((sub, index) => (
              <motion.div
                key={sub.uuid}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group"
              >
                <Link
                  href={`/${categoryId}/${sub.uuid}`}
                  className="flex w-full items-center justify-end rounded-lg bg-black/20 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/30"
                >
                  <div className="mr-3 flex flex-col text-right">
                    <h3 className="font-zain text-base font-[700] text-[#B5975C] sm:text-lg">
                      {sub.name}
                    </h3>
                    <p className="text-xl text-white">نص تعريفي</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src={sub.icon_url}
                      alt="SectionIcon"
                      height={20}
                      width={20}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="flex flex-row items-center justify-end gap-6">
            {SubCategory.map((sub, index) => (
              <motion.div
                key={sub.uuid}
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="group flex flex-row-reverse items-center border-l-[1px] border-[#B5975C] pl-6 last:border-l-0"
              >
                <Link
                  href={`/${categoryId}/${sub.uuid}`}
                  className="mr-3 text-right transition-transform duration-300 hover:scale-105"
                >
                  <h3 className="font-tajawal text-xl font-[800] text-gray-300">
                    {sub.name}
                  </h3>
                  <p className="text-[#B5975C] ">
                    {sub.sub_title || "هذا نص تعريفي"}
                  </p>
                </Link>

                <div className="flex-shrink-0">
                  <Image
                    src={sub.icon_url}
                    alt="SectionIcon"
                    height={45}
                    width={45}
                    className=" transition-transform duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
