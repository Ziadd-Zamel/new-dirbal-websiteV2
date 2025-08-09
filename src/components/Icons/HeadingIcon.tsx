import React from 'react';

interface HeadingIconProps {
  color?: string;
  width?: number;
  height?: number;
}

const HeadingIcon: React.FC<HeadingIconProps> = ({
  color = '#D1B06B',
  width = 60,
  height = 32,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="47.7441"
        y="13.0908"
        width="5.09091"
        height="5.09091"
        fill={color}
      />
      <line
        x1="0.470703"
        y1="19.1362"
        x2="69.5616"
        y2="19.1362"
        stroke={color}
      />
      <line
        x1="0.470703"
        y1="11.8638"
        x2="69.5616"
        y2="11.8638"
        stroke={color}
      />
      <line x1="53.791" y1="32" x2="53.791" y2="0" stroke={color} />
      <line x1="46.5156" y1="32" x2="46.5156" y2="0" stroke={color} />
    </svg>
  );
};

export default HeadingIcon;
