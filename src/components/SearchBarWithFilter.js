import React from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';

const SearchBarWithFilter = ({ onSearch, onFilter }) => {
  return (
    <div className="w-full flex flex-col items-center space-y-4 py-8 border-b">
      <SearchBar onSearch={onSearch} />
      <Filter onFilter={onFilter} />
    </div>
  );
};

export default SearchBarWithFilter;
