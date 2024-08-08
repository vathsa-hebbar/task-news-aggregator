import React from 'react';
import SearchBar from './SearchBar';
import Filter from './Filter';

const SearchBarWithFilter = ({ onSearch, onFilter }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
      <SearchBar onSearch={onSearch} />
      <Filter onFilter={onFilter} />
    </div>
  );
};

export default SearchBarWithFilter;
