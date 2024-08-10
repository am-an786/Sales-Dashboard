// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard1 from './components/Dashboard1.js';
import Dashboard2 from './components/Dashboard2.js';
import Header from './components/Header.js';
import './styles/App.css'; // Global styles

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/dashboard2" element={<Dashboard2 />} />
        <Route path="/" element={<Dashboard1 />} />
      </Routes>
    </Router>
  );
};

export default App;
