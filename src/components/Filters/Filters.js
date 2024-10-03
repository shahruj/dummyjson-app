import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Filters = ({ type, columns }) => {
  const {
    setCurrentPage,
    filters,
    setFilters,
  } = useContext(AppContext);

  const [selectedKey, setSelectedKey] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const handleFilterChange = () => {
    if (selectedKey && selectedValue) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [type]: {
          ...prevFilters[type],
          [selectedKey]: selectedValue,
        },
      }));
      setCurrentPage(1);
    }
  };

  const handleFilterRemove = () => {
    if (selectedKey) {
      setFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        delete newFilters[type][selectedKey];
        return newFilters;
      });
      setSelectedKey('');
      setSelectedValue('');
      setCurrentPage(1);
    }
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
      {/* Dropdown for selecting filter key */}
      <select
        value={selectedKey}
        onChange={(e) => setSelectedKey(e.target.value)}
        style={{ marginRight: '10px', padding: '8px' }}
      >
        <option value="">Select Filter Key</option>
        {columns.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>

      {/* Input for entering filter value */}
      <input
        type="text"
        placeholder="Enter Filter Value"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
        style={{ marginRight: '10px', padding: '8px' }}
      />

      {/* Button to apply the filter */}
      <button
        onClick={handleFilterChange}
        style={{
          padding: '10px 20px',
          backgroundColor: '#fdc936',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
          marginRight: '10px',
        }}
      >
        Apply Filter
      </button>

      {/* Button to remove the filter */}
      <button
        onClick={handleFilterRemove}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff6b6b',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
        disabled={!selectedKey}
      >
        Remove Filter
      </button>
    </div>
  );
};

export default Filters;
