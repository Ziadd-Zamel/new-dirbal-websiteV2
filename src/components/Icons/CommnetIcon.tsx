
import React from 'react';

interface CommnetIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const CommnetIcon: React.FC<CommnetIconProps> = ({
  color = 'white',
  width = 52,
  height = 50,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 52 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3603_331)">
        <path
          d="M6.70776 36.8186L6.84353 36.2711L6.44526 35.8717C3.02805 32.4449 1.01172 28.1294 1.01172 23.4495C1.01172 12.6445 11.8711 3.55664 25.726 3.55664C39.5809 3.55664 50.4403 12.6445 50.4403 23.4495C50.4403 34.2545 39.5809 43.3424 25.726 43.3424C21.9924 43.3424 18.4653 42.6521 15.2901 41.4577L14.7589 41.2579L14.3149 41.6116C11.9846 43.4683 7.37718 46.4136 1.26133 46.5516C1.68877 46.0625 2.48792 45.1012 3.35732 43.8348C4.60066 42.0239 6.03863 39.5165 6.70776 36.8186ZM0.955247 46.8917C0.957169 46.8897 0.959232 46.8875 0.961435 46.8852C0.959466 46.8874 0.957437 46.8896 0.955347 46.8918L0.955247 46.8917Z"
          stroke={color}
          strokeWidth="2"
        />
      </g>
      <defs>
        <clipPath id="clip0_3603_331">
          <rect
            width="51.4286"
            height="49"
            fill="white"
            transform="translate(0.0117188 0.556641)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CommnetIcon;
