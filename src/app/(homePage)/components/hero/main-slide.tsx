import QabasatBox from "./qabasat-box";

export default function MainSlide({ Qabasat }: { Qabasat: Qabasat[] }) {
  return (
    <div
      className={`absolute inset-0 z-10 h-full flex-[0_0_100%] opacity-100 transition-opacity duration-1000 ease-in-out`}
    >
      <div
        className={`absolute inset-0 h-full w-full animate-zoom`}
        style={{
          backgroundImage: `url('/assets/bg-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute inset-0 bg-[rgba(37,37,37,0.9)]"></div>

      <QabasatBox Qabasat={Qabasat} />
    </div>
  );
}
