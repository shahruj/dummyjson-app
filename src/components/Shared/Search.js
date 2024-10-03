// src/components/Shared/Search.js
import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, setSearchQuery]);

  return (
    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginRight: '10px',
          flex: '1',
        }}
      />
      <button
        onClick={() => setSearchQuery(inputValue)}
        style={{
          backgroundColor: '#c0e3e5', // Blue
          border: 'none',
          padding: '10px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        🔍 Search
      </button>
    </div>
  );
};

export default Search;
