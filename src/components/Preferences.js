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
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    onSavePreferences(preferences);
    setIsOpen(false);
  };

  const handleClear = () => {
    setPreferences({
      sources: [],
      categories: [],
      authors: []
    });
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
        Preferences
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
            <h2 className="font-bold mb-4 text-lg">Preferences</h2>
            <div className="mb-4">
              <label className="block mb-1">Sources (comma-separated):</label>
              <input
                type="text"
                name="sources"
                value={preferences.sources.join(',')}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Categories (comma-separated):</label>
              <input
                type="text"
                name="categories"
                value={preferences.categories.join(',')}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Authors (comma-separated):</label>
              <input
                type="text"
                name="authors"
                value={preferences.authors.join(',')}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSave}
                className="midnightblue text-white p-2 rounded-lg"
              >
                Save Preferences
              </button>
              <button
                onClick={handleClear}
                className="border text-gray-700 p-2 rounded-lg"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preferences;
