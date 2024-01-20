// Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './home';

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
