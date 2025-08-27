"use client";
import Image from "next/image";

const Logo = ({
  width = 200,
  height = 100,
  dark = false,
}: {
  width?: number;
  height?: number;
  dark?: boolean;
}) => {
  return (
    <>
      {dark ? (
        <Image
          src={"/assets/LogoShortWht.png"}
          alt="Mr Dirbal Logo"
          width={width}
          height={height}
          className="mt-3 w-[100px] sm:mt-0 sm:w-[170px]"
        />
      ) : (
        <Image
          src={"/assets/LogoShortWht.png"}
          alt="Mr Dirbal Logo"
          width={width}
          height={height}
          className="mt-3 w-[100px] sm:mt-0 sm:w-[170px]"
        />
      )}
    </>
  );
};

export default Logo;
