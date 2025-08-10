"use client";
import Basmala from "@/components/Basmala";
import SearchIcon from "@/components/Icons/SearchIcon";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sidebar from "./_components/sidebar";
import SearchModal from "./_components/search-modal";
import ArchiveButton from "./_components/ArchiveButton";

interface NavbarProps {
  selectedIndex: number;
}

const Navbar = ({ selectedIndex }: NavbarProps) => {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="main-padding absolute -left-0 right-0 top-0 z-30 bg-transparent pt-2">
      <div className="absolute -right-1.5 left-0 top-[70px] z-30 w-full px-10 lg:px-20 xl:pl-[70px] xl:pr-[78px]">
        <div className={`h-[1px] w-[100.5%] bg-[#B5975C]`} />
      </div>
      <div>
        <div className="flex items-center flex-row-reverse justify-between">
          <button onClick={() => router.push("/")}>
            <Logo dark={true} />
          </button>
          <div className="flex flex-row-reverse items-center">
            <ArchiveButton />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden border-r-[1px] border-solid border-[#B5975C] pl-[15px] pr-[15px] md:block"
            >
              <SearchIcon dark={false} />
            </button>
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 transform">
        <Basmala dark={selectedIndex === 0} />
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
