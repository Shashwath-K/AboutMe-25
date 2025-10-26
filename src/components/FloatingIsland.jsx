// src/components/FloatingIsland.jsx

import React from 'react';
// 1. IMPORT Link and useLocation
import { Link, useLocation } from 'react-router-dom';

// 2. IMPORT new icons for your routes
import { 
  FaHome, 
  FaUser, 
  FaProjectDiagram,  // Changed from FaCode
  FaImage,             // New icon
  FaEnvelope,          // New icon
  FaSun, 
  FaMoon 
} from 'react-icons/fa';
import './FloatingIsland.css';

// 3. DEFINE the new routes based on your list
const routes = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/about', label: 'About', icon: <FaUser /> },
  { path: '/projects', label: 'Projects', icon: <FaProjectDiagram /> },
  { path: '/media', label: 'Media', icon: <FaImage /> },
  { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
];

const FloatingIsland = ({ darkMode, toggleDarkMode }) => {
  // 4. GET the current location
  const location = useLocation();
  const currentPath = location.pathname;

  // 5. REMOVED all useState and useEffect for scroll-spying.
  // This component is now much simpler.

  return (
    <nav
      className={`floating-island ${darkMode ? 'dark' : 'light'}`}
      aria-label="Main page navigation"
      role="navigation"
    >
      {/* Navigation Links */}
      <ul>
        {/* 6. MAP over routes instead of sections */}
        {routes.map((route) => (
          <li key={route.path}>
            
            {/* 7. USE <Link> instead of <a> */}
            <Link
              to={route.path}
              // 8. CHECK active state against the current path
              className={currentPath === route.path ? 'active' : ''}
              aria-label={`Maps to ${route.label} page`}
              // 9. REMOVED onClick for smooth scroll
            >
              <span className="nav-icon">{route.icon}</span>
              <span className="nav-tooltip">{route.label}</span>
            </Link>

          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle (This part is unchanged) */}
      <button
        onClick={toggleDarkMode}
        className="dark-mode-toggle"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span className="nav-icon">
          {darkMode ? <FaSun /> : <FaMoon />}
        </span>
        <span className="nav-tooltip">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </span>
      </button>
    </nav>
  );
};

export default FloatingIsland;