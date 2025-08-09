'use client';
import Image from 'next/image';

const Basmala = ({
  dark = false,
}: {
  width?: number;
  height?: number;
  dark?: boolean;
}) => {
  return (
    <>
      {dark && (
        <Image
          src={'/assets/basmala.png'}
          alt="Basmala Logo"
          width={150}
          height={0}
          className="mt-1 hidden md:block"
        />
      )}
    </>
  );
};

export default Basmala;
