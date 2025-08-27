const SearchHighlightStyles = () => (
  <style>{`
    .search-highlight {
      background-color: #fef08a !important;
      color: #000 !important;
      font-weight: bold !important;
      padding: 2px !important;
      border-radius: 2px !important;
      box-shadow: 0 0 0 1px #eab308;
    }

    .search-highlight:first-of-type {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
  `}</style>
);

export default SearchHighlightStyles;
