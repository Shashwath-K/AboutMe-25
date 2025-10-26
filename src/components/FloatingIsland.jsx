// src/components/FloatingIsland.jsx (Updated)

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUser, 
  FaProjectDiagram,
  FaImage,
  FaEnvelope
} from 'react-icons/fa';
import './FloatingIsland.css';

const routes = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/about', label: 'About', icon: <FaUser /> },
  { path: '/projects', label: 'Projects', icon: <FaProjectDiagram /> },
  { path: '/media', label: 'Media', icon: <FaImage /> },
  { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
];

// MODIFIED: This component no longer needs dark mode props
const FloatingIsland = () => { 
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    // REMOVED: className no longer needs dark/light logic
    <nav
      className="floating-island" 
      aria-label="Main page navigation"
      role="navigation"
    >
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link
              to={route.path}
              className={currentPath === route.path ? 'active' : ''}
              aria-label={`Maps to ${route.label} page`}
            >
              <span className="nav-icon">{route.icon}</span>
              <span className="nav-tooltip">{route.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* REMOVED: The entire <button> for dark mode toggle is gone */}
      
    </nav>
  );
};

export default FloatingIsland;