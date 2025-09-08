"use client";
import { CustomDialog } from "@/components/ui/custom-dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  return (
    <CustomDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      className="h-[500px] w-full max-w-4xl border-0 bg-background p-0"
    >
      <div className="relative h-[500px] w-full bg-background bg-opacity-95">
        <div className="absolute inset-0 mt-0 h-full">
          <Image
            src={"/assets/mainbg-5.png"}
            alt=""
            height={500}
            width={200}
            className="h-full w-full bg-cover"
          />
        </div>

        <div className="relative flex h-[500px] items-center justify-center px-6">
          <form
            onSubmit={handleSearch}
            className="relative flex w-full !max-w-4xl items-center"
          >
            <div className="relative w-full">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white light:text-black">
                <Search className="text-white light:text-black" />
              </div>
              <Input
                className="border-0 bg-transparent font-tajawal light:placeholder:text-black text-right !text-[30px] text-white light:text-black placeholder:text-[30px] placeholder:font-tajawal placeholder:text-[#FFFFFF4D] focus-visible:ring-0"
                dir="rtl"
                placeholder="كلمة/كلمات البحث..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ direction: "rtl" }}
              />
              <motion.div
                className="absolute -bottom-2 left-0 z-50 h-[1px] w-full origin-right bg-white light:bg-black"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
                layoutId="searchUnderline"
              />
            </div>
          </form>
        </div>
      </div>
    </CustomDialog>
  );
}
