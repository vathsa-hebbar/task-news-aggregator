import React, { useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const Preferences = ({ onSavePreferences }) => {
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
    authors: []
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value.split(',') }));
  };

  const handleSave = () => {
    onSavePreferences(preferences);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 m-4 border rounded-lg">
      <h2 className="font-bold mb-2 flex items-center justify-between">
        Preferences
        <button
          onClick={toggleOpen}
          className="midnightblue text-white p-1 rounded-lg flex items-center"
        >
          {isOpen ? (
            <AiOutlineUp size={20} />
          ) : (
            <AiOutlineDown size={20} />
          )}
        </button>
      </h2>
      {isOpen && (
        <>
          <div className="mb-2">
            <label>Sources (comma-separated):</label>
            <input
              type="text"
              name="sources"
              value={preferences.sources.join(',')}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-2">
            <label>Categories (comma-separated):</label>
            <input
              type="text"
              name="categories"
              value={preferences.categories.join(',')}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-2">
            <label>Authors (comma-separated):</label>
            <input
              type="text"
              name="authors"
              value={preferences.authors.join(',')}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
            />
          </div>
          <button onClick={handleSave} className="midnightblue text-white p-2 rounded-lg">
            Save Preferences
          </button>
        </>
      )}
    </div>
  );
};

export default Preferences;
