// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css'; // Header styles

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Sales Dashboard</h1>
      <nav className="nav">
        <Link to="/dashboard1" className="nav-link">Today's Sales</Link>
        <Link to="/dashboard2" className="nav-link">Sales Comparison Between Two Dates </Link>
      </nav>
    </header>
  );
};

export default Header;
