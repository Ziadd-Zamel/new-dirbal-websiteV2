"use client";
import Basmala from "@/components/Basmala";
import SearchIcon from "@/components/Icons/SearchIcon";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";
import { useState, memo } from "react";
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
    <nav
      className="main-padding absolute left-0 right-0 top-0 z-30 bg-transparent pt-2"
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Top divider line */}
      <div className="absolute inset-x-0 top-[70px] z-30 w-full px-10 lg:px-20 xl:pl-[70px] xl:pr-[78px]">
        <div className="h-px w-full bg-[#B5975C]" aria-hidden="true" />
      </div>

      <div className="flex flex-row-reverse items-center justify-between">
        {/* Logo - better for SEO + accessibility */}
        <button
          onClick={() => router.push("/")}
          aria-label="Go to homepage"
          className="focus:outline-none"
        >
          <Logo dark />
        </button>

        {/* Right Section */}
        <div className="flex flex-row-reverse items-center">
          <ArchiveButton />
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
            className="hidden border-r border-[#B5975C] px-[15px] md:block"
          >
            <SearchIcon dark={false} />
          </button>
          <Sidebar />
        </div>
      </div>

      {/* Centered Basmala */}
      <div className="absolute left-1/2 top-0 z-50 -translate-x-1/2 transform">
        <Basmala dark={selectedIndex === 0} />
      </div>

      {/* Search modal - accessibility controlled */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
};

export default memo(Navbar);
