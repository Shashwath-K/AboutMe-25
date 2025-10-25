// src/components/FloatingIsland.jsx

import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCode, FaChartBar, FaSun, FaMoon } from 'react-icons/fa';
import './FloatingIsland.css'; // We will create this CSS file next

// Define the sections to navigate to.
// The 'id' must match the 'id' attribute of your <section> tags in HomeMain.jsx
const sections = [
  { id: 'home', label: 'Home', icon: <FaHome /> },
  { id: 'what-i-do', label: 'About', icon: <FaUser /> },
  { id: 'skills', label: 'Skills', icon: <FaCode /> },
  { id: 'stats', label: 'Stats', icon: <FaChartBar /> },
];

const FloatingIsland = ({ darkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = 'home';
      // Iterate from bottom to top
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is at or above the middle of the viewport
          if (rect.top <= window.innerHeight / 2) {
            currentActive = section.id;
            break; // Found the topmost active section
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on mount to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  return (
    <nav
      className={`floating-island ${darkMode ? 'dark' : 'light'}`}
      aria-label="Main page navigation"
      role="navigation"
    >
      {/* Navigation Links */}
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeSection === section.id ? 'active' : ''}
              aria-label={`Scroll to ${section.label} section`}
              // Smooth scroll behavior
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-tooltip">{section.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle */}
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