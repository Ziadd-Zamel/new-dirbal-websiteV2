import HamburgerIcon from "@/components/Icons/HamburgerIcon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getAllCategories } from "@/lib/api/category.api";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getAllCategories();
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="relative" style={{ direction: "rtl" }}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="mt-5 cursor-pointer block border-solid md:mt-0 md:pl-[16px] ">
            <HamburgerIcon dark={false} />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="flex w-full flex-col justify-between bg-[#161D27] py-10 text-white sm:w-[350px]"
        >
          <div className="flex w-full justify-end pl-6">
            <Image
              src="/assets/LogoShortBlkV2.png"
              alt="dirbal"
              width={60}
              height={60}
            />
          </div>

          <div className="mt-4 space-y-3 px-6">
            {isLoading && <p className="text-center">جاري التحميل...</p>}
            {isError && (
              <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>
            )}
            <div>
              <div className="mr-1 flex cursor-pointer items-center justify-start gap-2 rounded-sm px-1 py-2 text-white transition-colors hover:bg-white/10">
                <Link href="/" passHref>
                  <div className="flex w-full items-center justify-end gap-2 rounded-sm">
                    <FiMinus className="text-xl text-white" />
                    <span className="text-right font-tajawal text-lg font-medium">
                      الرئيسة
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            {categories?.map((item) => (
              <div key={item.id}>
                <motion.div
                  onClick={() => handleExpand(item.id)}
                  className="flex cursor-pointer items-center justify-start gap-2 text-white"
                  initial={false}
                  animate={{
                    backgroundColor:
                      expandedId === item.id
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    transition: { duration: 0.2 },
                  }}
                  style={{ padding: "4px 12px 4px 20px", borderRadius: "6px" }}
                >
                  <motion.div
                    animate={{ rotate: expandedId === item.id ? 0 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {!item.SubCategory ? (
                      <IoIosArrowBack className="text-xl text-white" />
                    ) : expandedId === item.id ? (
                      <FiMinus className="text-xl text-white" />
                    ) : (
                      <FiPlus className="text-xl text-white" />
                    )}
                  </motion.div>
                  <span className="text-right font-tajawal text-lg font-medium">
                    {item.name}
                  </span>
                </motion.div>

                <AnimatePresence>
                  {expandedId === item.id && item.SubCategory && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-1 space-y-1">
                        {item.SubCategory.map((SubCategory, index) => {
                          return (
                            <motion.div
                              key={SubCategory.id}
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={`/${item.uuid}/${SubCategory.uuid}`}
                                passHref
                              >
                                <motion.div
                                  className="mr-6 flex cursor-pointer items-center justify-start gap-2"
                                  initial={false}
                                  whileHover={{
                                    backgroundColor:
                                      "rgba(255, 255, 255, 0.05)",
                                    transition: { duration: 0.2 },
                                  }}
                                  style={{
                                    padding: "4px 12px",
                                    borderRadius: "4px",
                                    color: "rgb(209, 213, 219)",
                                  }}
                                >
                                  <IoIosArrowBack className="text-sm text-white" />
                                  <span className="text-right font-tajawal text-base font-normal">
                                    {SubCategory.name}
                                  </span>
                                </motion.div>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Image
              src="/assets/Sidebarsurah.png"
              alt="dirbal"
              width={300}
              height={200}
              className="w-full"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
