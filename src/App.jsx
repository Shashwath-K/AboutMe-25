// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMain from './pages/HomeMain';
import ProjectsMain from './pages/ProjectsMain';
import About from './pages/AboutMain';
import ContactsMain from './pages/ContactsMain';
import MediaMain from './pages/MediaMain';
import FloatingIsland from './components/FloatingIsland';
import ScrollToTop from './components/ScrollToTop';
import WelcomeLoader from './components/WelcomeLoader'; // 1. Import the loader
import './components/FloatingIsland.css';

const LayoutWrapper = ({ children, mainRef }) => {
  return (
    // Removed dark/light class logic as it's handled by body now
    <main
      ref={mainRef}
      className={`page-wrapper page-transition`} // Assuming you have styles for these
    >
      {children}
      <FloatingIsland />
    </main>
  );
};

const App = () => {
  // 2. Add loading state
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Keep dark mode state
  const mainRef = useRef(null);

  // Removed toggleDarkMode as the loader implies dark mode only initially
  // You can add it back if needed elsewhere

  useEffect(() => {
    // Force dark mode initially, adjust if needed
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  }, []); // Run only once on mount

  // 3. Handler to turn off the loader
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* 4. Conditionally render loader or main app */}
      {isLoading ? (
        <WelcomeLoader onAnimationComplete={handleLoadingComplete} />
      ) : (
        <Router>
          <ScrollToTop scrollRef={mainRef} />

          <LayoutWrapper
            // Removed darkMode and toggleDarkMode props, handled by body class
            mainRef={mainRef}
          >
            <Routes>
              <Route path="/" element={<HomeMain />} />
              <Route path="/projects" element={<ProjectsMain />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactsMain />} />
              <Route path="/media" element={<MediaMain />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      )}
    </>
  );
};

export default App;