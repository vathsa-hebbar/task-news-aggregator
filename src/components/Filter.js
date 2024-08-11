import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const Filter = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    publishedAt: '',
    category: '',
    source: ''
  });

  const handleFilterChange = (type, value) => {
    setFilterValues(prev => ({ ...prev, [type]: value }));
  };

  const applyFilters = () => {
    onFilter('publishedAt', filterValues.publishedAt);
    onFilter('category', filterValues.category);
    onFilter('source', filterValues.source);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilterValues({
      publishedAt: '',
      category: '',
      source: ''
    });
    onFilter('publishedAt', '');
    onFilter('category', '');
    onFilter('source', '');
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleOpen}
        className="midnightblue text-white p-2 rounded-lg"
      >
        Filter
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-10">
            <button
              onClick={toggleOpen}
              className="absolute top-3 right-3 text-gray-500"
            >
              &times;
            </button>
            <h2 className="font-bold mb-4 text-lg">Filters</h2>
            <div className="flex flex-col gap-4">
              <select
                className="border p-2 rounded-lg w-full"
                value={filterValues.publishedAt}
                onChange={(e) => handleFilterChange('publishedAt', e.target.value)}
              >
                <option value="">All date</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
              <select
                className="border p-2 rounded-lg w-full"
                value={filterValues.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All category</option>
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="sports">Sports</option>
              </select>
              <select
                className="border p-2 rounded-lg w-full"
                value={filterValues.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
              >
                <option value="">All source</option>
                <option value="BBC News">BBC</option>
                <option value="The Guardian">The Guardian</option>
                <option value="New York Times">New York Times</option>
              </select>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={applyFilters}
                  className="midnightblue text-white p-2 rounded-lg"
                >
                  Apply Filters
                </button>
                <button
                  onClick={clearFilters}
                  className="border text-gray-700 p-2 rounded-lg"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
