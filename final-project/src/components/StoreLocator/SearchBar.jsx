import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSearch?.();
  };

  return (
    <div className="relative flex items-center">
      <input
        id="store-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Find a store"
        aria-label="Search for a Starbucks store by city, address, or zip code"
        className="w-full pl-4 pr-10 py-2.5 text-[14px] text-[#212121] bg-white border border-gray-300 rounded-full focus:outline-none focus:border-[#006241] focus:ring-1 focus:ring-[#006241] transition-all duration-200 placeholder:text-gray-400"
      />
      <button
        onClick={onSearch}
        aria-label="Search"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#006241] transition-colors duration-150 cursor-pointer"
      >
        <FiSearch className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchBar;
