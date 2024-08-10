import React from 'react';

const Filter = ({ onFilter }) => {
  return (
    <div className="flex gap-2  md:flex-row md:space-y-0 md:space-x-2">
      <select className="border p-2 rounded-lg w-full md:w-auto" onChange={(e) => onFilter('publishedAt', e.target.value)}>
        <option value="">All date</option>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>
      <select className="border p-2 rounded-lg w-full md:w-auto" onChange={(e) => onFilter('category', e.target.value)}>
        <option value="">All category</option>
        <option value="general">General</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
      </select>
      <select className="border p-2 rounded-lg w-full md:w-auto" onChange={(e) => onFilter('source', e.target.value)}>
        <option value="">All source</option>
        <option value="BBC News">BBC</option>
        <option value="The Guardian">The Guardian</option>
        <option value="New York Times">New York Times</option>
      </select>
    </div>
  );
};

export default Filter;
