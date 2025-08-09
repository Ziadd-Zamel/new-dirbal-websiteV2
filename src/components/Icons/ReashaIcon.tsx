import React from 'react';

interface ComplexIconProps {
  dark?: boolean;
  width?: number;
  height?: number;
}

const ComplexIcon: React.FC<ComplexIconProps> = ({
  dark = true,
  width = 149,
  height = 148,
}) => {
  const iconColor = dark ? '#161D27' : '#FFFFFF';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 149 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_439_1543)">
        <path
          d="M78.8494 58.9632L6.73972 128.811C4.08676 131.382 4.08676 135.539 6.73972 138.082C9.39268 140.626 13.6826 140.653 16.3073 138.082L32.3944 122.494H51.586C65.6128 122.494 79.2163 118.555 90.8159 111.281C93.9487 109.312 92.3682 104.991 88.6145 104.991C87.1752 104.991 86.018 103.869 86.018 102.475C86.018 101.353 86.78 100.396 87.8525 100.068L110.713 93.4222C111.419 93.2034 112.068 92.8479 112.604 92.3283L118.926 86.2022C121.777 83.44 119.744 78.7361 115.737 78.7361H106.649C105.21 78.7361 104.052 77.6148 104.052 76.22C104.052 75.0988 104.815 74.1416 105.887 73.8134L137.497 64.6243C138.626 64.2961 139.585 63.5577 140.121 62.5185C143.17 56.7753 144.75 50.3484 144.75 43.7575C144.75 32.5446 140.15 21.7967 131.965 13.8656L130.413 12.3615C122.256 4.45779 111.165 0 99.5933 0C88.0219 0 76.9302 4.45779 68.7456 12.3888L39.4784 40.7491C25.9313 53.8764 18.3111 71.6802 18.3111 90.2498V105.373L71.8219 53.5482C73.5717 51.8526 76.4504 51.8526 78.2003 53.5482C79.7243 55.025 79.9219 57.2676 78.8212 58.9632H78.8494Z"
          fill={iconColor}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_439_1543"
          x="0.75"
          y="0"
          width="148"
          height="148"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.756863 0 0 0 0 0.560784 0 0 0 0 0.34902 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_439_1543"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_439_1543"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ComplexIcon;
