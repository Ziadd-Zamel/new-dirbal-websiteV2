import Image from "next/image";
import QabasatBox from "./qabasat-box";

export default function MainSlide({
  Qabasat,
  backgroundHomeImage,
}: {
  Qabasat: Qabasat[];
  backgroundHomeImage: string;
}) {
  return (
    <>
      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      <div
        className={`absolute inset-0 z-10 h-full flex-[0_0_100%] opacity-100 transition-opacity duration-1000 ease-in-out`}
      >
        <Image
          className="absolute left-1/2 -translate-x-1/2 top-20 md:top-1 z-40 sm:w-[150px] w-[120px]"
          src={"/assets/Basmala.png"}
          alt="basmala"
          width={150}
          height={0}
        />
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `url(${backgroundHomeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "zoomIn 20s ease-in-out infinite",
          }}
        ></div>
        <div className="absolute inset-0 bg-[rgba(37,37,37,0.9)]"></div>

        <QabasatBox Qabasat={Qabasat} />
      </div>
    </>
  );
}
