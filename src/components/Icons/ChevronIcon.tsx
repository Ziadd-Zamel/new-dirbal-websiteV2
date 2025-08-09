import React from 'react';

interface ChevronIconProps {
  dark?: boolean;
  width?: number;
  height?: number;
  fillOpacity?: number;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({
  dark = true,
  width = 38,
  height = 22,
  fillOpacity = 0.8,
}) => {
  const iconColor = dark ? '#161D27' : '#FFFFFF';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 38 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8678 21.2162C19.8302 22.2538 18.1451 22.2538 17.1075 21.2162L1.16995 5.27869C0.132357 4.24109 0.132357 2.55603 1.16995 1.51843C2.20756 0.480835 3.89262 0.480835 4.93022 1.51843L18.9918 15.58L33.0533 1.52673C34.0909 0.489135 35.776 0.489135 36.8136 1.52673C37.8512 2.56433 37.8512 4.24939 36.8136 5.28699L20.8761 21.2245L20.8678 21.2162Z"
        fill={iconColor}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default ChevronIcon;