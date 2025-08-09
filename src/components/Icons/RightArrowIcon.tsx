import React from 'react';

interface ArrowIconProps {
  dark?: boolean;
  width?: number;
  height?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  dark = true,
  width = 22,
  height = 39,
}) => {
  const iconColor = dark ? '#161D27' : '#FFFFFF';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.476 17.5746C21.5136 18.6122 21.5136 20.2973 20.476 21.3349L4.53845 37.2724C3.50086 38.31 1.8158 38.31 0.778199 37.2724C-0.2594 36.2348 -0.2594 34.5498 0.778199 33.5122L14.8397 19.4506L0.786499 5.38905C-0.251099 4.35145 -0.251099 2.66639 0.786499 1.62879C1.8241 0.591186 3.50916 0.591186 4.54676 1.62879L20.4843 17.5663L20.476 17.5746Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default ArrowIcon;