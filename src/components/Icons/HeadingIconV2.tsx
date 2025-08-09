import React from 'react';

interface DecorativeLinesProps {
  color?: string;
  width?: number;
  height?: number;
}

const HeadingIconV2: React.FC<DecorativeLinesProps> = ({
  color = '#D1B06B',
  width = 80,
  height = 33,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 90 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0.527344"
        y1="19.9578"
        x2="89.5464"
        y2="19.9578"
        stroke={color}
      />
      <line
        x1="0.527344"
        y1="12.6848"
        x2="89.5464"
        y2="12.6848"
        stroke={color}
      />
      <line
        x1="49.6895"
        y1="32.8213"
        x2="49.6895"
        y2="0.821289"
        stroke={color}
      />
      <line
        x1="40.3203"
        y1="32.8213"
        x2="40.3203"
        y2="0.821289"
        stroke={color}
      />
      <rect
        x="41.7559"
        y="13.9121"
        width="6.5593"
        height="5.09091"
        fill={color}
      />
    </svg>
  );
};

export default HeadingIconV2;
