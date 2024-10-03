// src/components/Pagination/Pagination.js
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
const Pagination = ({ total}) => {
  const { pageSize, currentPage, setCurrentPage } = useContext(AppContext);
  const totalPages = Math.ceil(total / pageSize);
  const [currentRange, setCurrentRange] = useState(1); // Keeps track of the current page range

  const maxPagesToShow = 10; // Only show 10 pages at a time
  const startPage = (currentRange - 1) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  useEffect(() => {
    // Adjust the current range when the current page changes
    const newRange = Math.ceil(currentPage / maxPagesToShow);
    setCurrentRange(newRange);
  }, [currentPage]);

  const handleClick = (page) => {
    setCurrentPage(page); // Call the external function to set the current page
  };

  const handlePrevRange = () => {
    if (currentRange > 1) {
      setCurrentRange(currentRange - 1);
    }
  };

  const handleNextRange = () => {
    if (endPage < totalPages) {
      setCurrentRange(currentRange + 1);
    }
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Left arrow to show previous pages */}
      <button
        onClick={handlePrevRange}
        disabled={currentRange === 1}
        style={{
          padding: '8px 12px',
          margin: '0 5px',
          backgroundColor: '#c0e3e5',
          border: 'none',
          cursor: currentRange === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        &lt;
      </button>

      {/* Display page numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button
          key={startPage + i}
          onClick={() => handleClick(startPage + i)}
          style={{
            padding: '8px 12px',
            margin: '0 5px',
            backgroundColor: currentPage === startPage + i ? '#fdc936' : '#c0e3e5', // Yellow for active, Blue otherwise
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {startPage + i}
        </button>
      ))}

      {/* Right arrow to show next pages */}
      <button
        onClick={handleNextRange}
        disabled={endPage >= totalPages}
        style={{
          padding: '8px 12px',
          margin: '0 5px',
          backgroundColor: '#c0e3e5',
          border: 'none',
          cursor: endPage >= totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
