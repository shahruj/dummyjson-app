// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DataPage from './pages/DataPage';
import Navbar from './components/Shared/NavBar';
import './App.css'; // Import global styles

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/:type" element={<DataPage />} />
          {/* Optionally, handle nested routes like /products/category/laptops if needed */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
