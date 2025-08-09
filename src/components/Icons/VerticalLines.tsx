import React from 'react';

interface VerticalLinesProps {
  color?: string;
  width?: number;
  height?: number;
}

const VerticalLines: React.FC<VerticalLinesProps> = ({
  color = '#D1B06B',
  width = 11,
  height = 570,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11 570"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="10.5059"
        y1="569.115"
        x2="10.5058"
        y2="0.890198"
        stroke={color}
      />
      <line x1="0.5" y1="569.115" x2="0.499971" y2="0.890198" stroke={color} />
    </svg>
  );
};

export default VerticalLines;
