// src/components/Shared/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#c0e3e5', padding: '10px' }}>
      <Link to="/users" style={{ marginRight: '20px', color: '#322625', fontWeight: 'bold' }}>
        Users
      </Link>
      <Link to="/products" style={{ color: '#322625', fontWeight: 'bold' }}>
        Products
      </Link>
    </nav>
  );
};

export default Navbar;
