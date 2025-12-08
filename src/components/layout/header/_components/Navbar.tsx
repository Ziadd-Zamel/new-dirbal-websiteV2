"use client";
import Basmala from "@/components/Basmala";
import SearchIcon from "@/components/Icons/SearchIcon";
import Logo from "@/components/Logo";
import { usePathname, useRouter } from "next/navigation";
import { useState, memo } from "react";
import ArchiveButton from "./ArchiveButton";
import Sidebar from "./sidebar";
import SearchModal from "./search-modal";

interface NavbarProps {
  selectedIndex: number;
  categories: Category[];
}

const Navbar = ({ selectedIndex, categories }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const shouldHideLine =
    pathname.startsWith("/tags") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/archive") ||
    pathname.startsWith("/resume");

  return (
    <nav
      className={`main-padding absolute left-0 right-0 top-0 z-30 pt-2 ${
        shouldHideLine ? "bg-black/50  pb-3" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      {/* Top divider line */}
      {!shouldHideLine && (
        <div className="absolute inset-x-0 top-[70px] z-30 w-full px-5 lg:px-20 xl:pl-[70px] xl:pr-[70px]">
          <div className="h-px w-full bg-[#B5975C]" aria-hidden="true" />
        </div>
      )}

      <div className="flex flex-row-reverse items-center justify-between">
        {/* Logo - better for SEO + accessibility */}
        <button
          onClick={() => router.push("/")}
          aria-label="Go to homepage"
          className="focus:outline-none"
        >
          <Logo dark={true} />
        </button>

        {/* Right Section */}
        <div className="flex flex-row-reverse items-center">
          <ArchiveButton />
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open search"
            className="sm:border-x border-[#B5975C] sm:px-[12px] mt-5  md:mt-0 "
          >
            <SearchIcon dark={false} />
          </button>
          <Sidebar serverCategories={categories} />
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
