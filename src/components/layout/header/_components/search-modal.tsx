import SearchIcon from "@/components/Icons/SearchIcon";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[500px] max-w-4xl border-0 bg-[#161D27] p-0">
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
            <div className="relative flex w-full max-w-2xl items-center">
              <div className="relative w-full">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-white">
                  <SearchIcon dark={false} width={30} height={30} />
                </div>
                <Input
                  className="border-0 bg-transparent pb-5 pl-10 text-right !text-[50px] text-white placeholder:text-[50px] placeholder:text-[#FFFFFF4D] focus-visible:ring-0"
                  dir="rtl"
                  placeholder="كلمة/كلمات البحث..."
                  autoFocus
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
