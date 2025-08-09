import React from 'react';

interface HamburgerIconProps {
  dark?: boolean;
  width?: number;
  height?: number;
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  dark = true,
  width = 30,
  height = 26,
}) => {
  const iconColor = dark ? '#161D27' : '#FFFFFF';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 41 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3498_21)">
        <path
          d="M0.535156 6.90381V8.30381H40.5352V6.90381H0.535156ZM0.535156 17.4038V18.8038H40.5352V17.4038H0.535156ZM0.535156 27.9038V29.3038H40.5352V27.9038H0.535156Z"
          fill={iconColor}
          stroke={iconColor}
          strokeWidth="1.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_3498_21">
          <rect
            width="40"
            height="35"
            fill="white"
            transform="translate(0.535156 0.604004)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default HamburgerIcon;
