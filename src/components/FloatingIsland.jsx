// src/components/FloatingIsland.jsx (Updated)

import React, { useEffect } from 'react'; 
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

const FloatingIsland = () => { 
  const location = useLocation();
  const currentPath = location.pathname;

  // 1. ADD THIS HANDLER
  // This function will be called every time a link is clicked.
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // This (optional) effect handles browser back/forward buttons,
  // but the onClick handler above is the main fix.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentPath]);

  return (
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
              // 2. ADD THE onClick PROP HERE
              onClick={handleLinkClick}
            >
              <span className="nav-icon">{route.icon}</span>
              <span className="nav-tooltip">{route.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FloatingIsland;