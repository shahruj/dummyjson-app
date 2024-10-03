import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Filters from '../components/Filters/Filters';
import Search from '../components/Shared/Search';
import DataTable from '../components/Table/DataTable';
import Pagination from '../components/Pagination/Pagination';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const DataPage = () => {
  const {
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    currentType,
    setCurrentType,
    filters,
    setFilters,
  } = useContext(AppContext);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [tab, setTab] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]); // State to store dynamic columns

  const { type } = useParams();

  useEffect(() => {
    if (type === 'users' || type === 'products') {
      setCurrentType(type);
    }
    setCurrentPage(1);
    setPageSize(5);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: Object.keys(prevFilters[type] || {}).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {}),
    }));
    setSearchQuery('');
    setTab('ALL');
    setError(null);
  }, [type, setCurrentType, setCurrentPage, setPageSize, setFilters, setSearchQuery]);

  useEffect(() => {
    fetchData();
  }, [pageSize, currentPage, filters, tab, currentType]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
        filters: filters[currentType],
      };
  
      let endpoint = `https://dummyjson.com/${currentType}`;
  
      const filterEntries = Object.entries(params.filters).filter(
        ([, value]) => value !== ''
      );
  
      if (filterEntries.length > 0) {
        const [key, value] = filterEntries[0];
        endpoint = `https://dummyjson.com/${currentType}/filter?key=${key}&value=${value}`;
      }
  
      if (currentType === 'products' && tab === 'Laptops') {
        endpoint = 'https://dummyjson.com/products/category/laptops';
      }
  
      const response = await axios.get(endpoint, { params });
      const fetchedData =
        currentType === 'users' ? response.data.users : response.data.products;
      
      // Dynamically set the columns based on the keys of the first item
      if (fetchedData.length > 0) {
        const dynamicColumns = Object.keys(fetchedData[0]);
        setColumns(dynamicColumns);  // Update the columns state
      }

      setData(fetchedData);
      setTotal(response.data.total);
    } catch (error) {
      setError(`Failed to fetch ${currentType}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      const filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setData(filteredData);
    } else {
      fetchData();
    }
  }, [searchQuery]);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to page 1 when page size changes
  };

  return (
    <div className="container">
      <h1>{currentType.charAt(0).toUpperCase() + currentType.slice(1)}</h1>

      {currentType === 'products' && (
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setTab('ALL')}
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: tab === 'ALL' ? '#fdc936' : '#c0e3e5',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            ALL
          </button>
          <button
            onClick={() => setTab('Laptops')}
            style={{
              padding: '10px 20px',
              backgroundColor: tab === 'Laptops' ? '#fdc936' : '#c0e3e5',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            Laptops
          </button>
        </div>
      )}

      {/* Filters:  parameter based filtering is not available for products */}
      {currentType === 'users' && <Filters type={currentType} columns={columns} />}
      
      {/* Search */}
      <Search />

      {/* Page Size Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="pageSize">Page Size: </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Error Message */}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
      ) : (
        <>
          <DataTable columns={columns} data={data} type={currentType} />
          <Pagination total={searchQuery ? data.length : total}/>
        </>
      )}
    </div>
  );
};

export default DataPage;
