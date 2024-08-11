import React, { useState } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    // input validation
    if (value.length < 3 || value.length > 100) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSearch = () => {
    if (isValid) {
      onSearch(keyword);
    }
  };

  return (
    <div className='w-full flex flex-col items-center space-y-4 py-8 border-b'>
      <div className="w-full flex items-center justify-center">
        <input
          type="text"
          className={`border p-2 rounded-lg w-full md:w-1/2 ${!isValid ? 'border-red-500' : ''}`}
          placeholder="Search for articles..."
          value={keyword}
          onChange={handleInputChange}
        />
        <button
          className={`text-white p-2 rounded-lg ml-2 ${!isValid ? 'bg-gray-400' : 'midnightblue'}`}
          onClick={handleSearch}
          disabled={!isValid}
        >
          Search
        </button>
      </div>
      {!isValid && (
        <div className="flex items-center text-red-500 text-sm ml-2 mt-2">
          <AiOutlineWarning className="mr-1" />
          <p>Enter a minimum of 3 characters.</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
