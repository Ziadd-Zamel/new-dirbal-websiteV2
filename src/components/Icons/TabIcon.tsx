import React from 'react';

interface TabIconProps {
  dark?: boolean;
  width?: number;
  height?: number;
}

const TabIcon: React.FC<TabIconProps> = ({
  dark = true,
  width = 20,
  height = 30,
}) => {
  const iconColor = dark ? '#161D27' : '#FFFFFF';

  return (
    <svg
      className="w-[]"
      width={width}
      height={height}
      viewBox="0 0 26 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6759 0.799805C1.21767 0.877914 0.887145 1.24469 0.894657 1.66919V39.9223C0.890901 40.2348 1.07494 40.5234 1.37167 40.6797C1.66839 40.8393 2.03648 40.8393 2.33695 40.6831L13.3946 34.8419L24.4522 40.6831C24.7527 40.8393 25.1207 40.8393 25.4175 40.6797C25.7142 40.5234 25.8982 40.2348 25.8945 39.9223V1.66919C25.8945 1.19035 25.4625 0.799805 24.9329 0.799805H1.85619C1.82614 0.799805 1.79609 0.799805 1.76604 0.799805C1.736 0.799805 1.70595 0.799805 1.6759 0.799805ZM2.81772 2.53858H23.9714V38.4009L13.8753 33.0759C13.5786 32.9197 13.2105 32.9197 12.9138 33.0759L2.81772 38.4009V2.53858Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default TabIcon;
