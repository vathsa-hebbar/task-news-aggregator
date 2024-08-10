import React from 'react';

const Header = ({ onSearch, onFilter }) => {
  return (
    <header className="sticky top-0 bg-white bg-opacity-50 backdrop-blur-md shadow-md p-4 z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center">News Aggregator</h1>
      </div>
    </header>
  );
};

export default Header;
