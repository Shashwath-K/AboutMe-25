// src/components/FloatingIsland.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // ✅ Navigate + Smooth scroll after DOM is ready
  const handleIconClick = (path) => {
    if (currentPath === path) {
      // Already on the same page → just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate first
      navigate(path);
      // Smooth scroll after small delay (ensures DOM update)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav
      className="floating-island"
      aria-label="Main page navigation"
      role="navigation"
    >
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <button
              onClick={() => handleIconClick(route.path)}
              className={`nav-btn ${currentPath === route.path ? 'active' : ''}`}
              aria-label={`Navigate to ${route.label} page`}
            >
              <span className="nav-icon">{route.icon}</span>
              <span className="nav-tooltip">{route.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FloatingIsland;
