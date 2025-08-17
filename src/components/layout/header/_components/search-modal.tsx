"use client";
import SearchIcon from "@/components/Icons/SearchIcon";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { X } from "lucide-react";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[500px] !max-w-4xl border-0 bg-[#161D27] p-0">
        <div className="relative h-[500px] w-full bg-[#161D27] bg-opacity-95">
          <div className="absolute inset-0 mt-0 h-full">
            <Image
              src={"/assets/mainbg-5.png"}
              alt=""
              height={500}
              width={200}
              className="h-full w-full bg-cover"
            />
          </div>

          <DialogClose
            onClick={onClose}
            className="absolute right-8 top-7 z-50 text-white hover:opacity-75"
          >
            <X className="h-6 w-6" />
          </DialogClose>

          <div className="relative flex h-[500px] items-center justify-center px-6">
            <form
              onSubmit={handleSearch}
              className="relative flex w-full !max-w-4xl items-center"
            >
              <div className="relative w-full">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white">
                  <SearchIcon dark={false} width={30} height={30} />
                </div>
                <Input
                  className="border-0 bg-transparent  text-right !text-[30px] text-white placeholder:text-[30px] placeholder:font-tajawal placeholder:text-[#FFFFFF4D] focus-visible:ring-0"
                  dir="rtl"
                  placeholder="كلمة/كلمات البحث..."
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ direction: "rtl" }}
                />
                <motion.div
                  className="absolute -bottom-2 left-0 z-50 h-[1px] w-full origin-right bg-white"
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
      </DialogContent>
    </Dialog>
  );
}
