// src/context/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Common state
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Current type: 'users' or 'products'
  const [currentType, setCurrentType] = useState('users');

  // Dynamic filters based on type
  const [filters, setFilters] = useState({
    users: {
      email: '',
      // Add other user-specific filters as needed
    },
    products: {
      category: '',
      // Add other product-specific filters as needed
    },
  });

  return (
    <AppContext.Provider
      value={{
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        searchVisible,
        setSearchVisible,
        searchQuery,
        setSearchQuery,
        currentType,
        setCurrentType,
        filters,
        setFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
