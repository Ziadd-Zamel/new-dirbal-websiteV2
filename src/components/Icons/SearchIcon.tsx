import React from 'react';

interface SearchIconProps {
  dark?: boolean;
  width?: number;
  height?: number;
}

const SearchIcon: React.FC<SearchIconProps> = ({
  dark = true,
  width = 30,
  height = 30,
}) => {
  const iconColor = dark ? '#161D27' : '#FFFFFF';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3344 2.50391C9.83125 2.50391 3.73438 8.60078 3.73438 16.1039C3.73438 23.607 9.83125 29.7039 17.3344 29.7039C20.3031 29.7039 23.0469 28.7477 25.2844 27.1289L35.8094 37.6289L38.0594 35.3789L27.6594 24.9539C29.7031 22.5727 30.9344 19.482 30.9344 16.1039C30.9344 8.60078 24.8375 2.50391 17.3344 2.50391ZM17.3344 4.10391C23.9719 4.10391 29.3344 9.46641 29.3344 16.1039C29.3344 22.7414 23.9719 28.1039 17.3344 28.1039C10.6969 28.1039 5.33438 22.7414 5.33438 16.1039C5.33438 9.46641 10.6969 4.10391 17.3344 4.10391Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default SearchIcon;
