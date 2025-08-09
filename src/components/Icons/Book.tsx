import React from 'react';

interface BookIconProps {
  dark?: boolean; // Determines the background color
  width?: number; // Width of the SVG
  height?: number; // Height of the SVG
}

const BookIcon: React.FC<BookIconProps> = ({
  dark = false,
  width = 149,
  height = 148,
}) => {
  const backgroundColor = dark ? '#161D27' : '#FFFFFF';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 149 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g filter="url(#filter0_d_1194_2807)">
        <mask
          id="mask0_1194_2807"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="4"
          y="0"
          width="141"
          height="140"
        >
          <rect
            x="4.75"
            width="140"
            height="140"
            fill="url(#pattern0_1194_2807)"
          />
        </mask>
        <g mask="url(#mask0_1194_2807)">
          <rect x="4.75" width="140" height="140" fill={backgroundColor} />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_1194_2807"
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
            result="effect1_dropShadow_1194_2807"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1194_2807"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_1194_2807"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_1194_2807"
            transform="translate(-0.812727 -0.382369) scale(0.00450755)"
          />
        </pattern>
      </defs>
    </svg>
  );
};

export default BookIcon;
