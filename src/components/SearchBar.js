import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="w-full flex items-center">
      <input
        type="text"
        className="border p-2 rounded-lg w-full md:w-auto"
        placeholder="Search for articles..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-lg ml-2"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
