"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const SectionLogo = ({ LogoUrl }: { LogoUrl: string }) => {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="h-[1px] w-[100px] bg-[#775C1C]"
      />
      <Image src={LogoUrl} alt="sectionLogo" width={50} height={50} />
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="h-[1px] w-[100px] bg-[#775C1C]"
      />
    </div>
  );
};

export default SectionLogo;
