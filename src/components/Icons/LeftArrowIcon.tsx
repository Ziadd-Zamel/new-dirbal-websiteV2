import React from 'react';

interface ArrowIconProps {
  dark?: boolean;
  width?: number;
  height?: number;
}

const LeftArrowIcon: React.FC<ArrowIconProps> = ({
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
        d="M0.777941 21.3267C-0.259657 20.2891 -0.259657 18.6041 0.777941 17.5665L16.7155 1.62894C17.753 0.591339 19.4381 0.591339 20.4757 1.62894C21.5133 2.66654 21.5133 4.3516 20.4757 5.3892L6.41418 19.4508L20.4674 33.5123C21.505 34.5499 21.505 36.235 20.4674 37.2726C19.4298 38.3102 17.7447 38.3102 16.7072 37.2726L0.76964 21.335L0.777941 21.3267Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default LeftArrowIcon;
