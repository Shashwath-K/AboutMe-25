import React, { useState, useEffect } from 'react';
// 1. We already import useLocation, so we just need to use it
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomeMain from './pages/HomeMain';
import ProjectsMain from './pages/ProjectsMain';
import About from './pages/AboutMain';
import ContactsMain from './pages/ContactsMain';
import MediaMain from './pages/MediaMain';

// IMPORT the FloatingIsland component and its CSS
import FloatingIsland from './components/FloatingIsland';
import './components/FloatingIsland.css'; // Assuming this path

// MODIFY LayoutWrapper to include the theme and FloatingIsland
const LayoutWrapper = ({ children, darkMode, toggleDarkMode }) => {
  
  // 2. ADD THIS: Get the current page location
  const location = useLocation();

  // 3. ADD THIS: Use an effect to scroll to top on every page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // This effect runs every time the path changes

  return (
    // APPLY the dark/light class here to theme all pages
    <main className={darkMode ? 'dark' : 'light'}>
      
      {children} {/* This is where your <Routes> component will render */}
      
      {/* RENDER FloatingIsland here, outside the Routes */}
      <FloatingIsland darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

    </main>
  );
};

const App = () => {
  // LIFTED STATE from HomeMain to App
  const [darkMode, setDarkMode] = useState(false);

  // LIFTED HANDLER from HomeMain to App
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  // LIFTED EFFECT to update the <body> tag for global styles
  useEffect(() => {
    // This ensures your global CSS (like in index.css)
    // can react to the theme.
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  return (
    <>
      <Router>
        {/* PASS the state and handler to the LayoutWrapper */}
        <LayoutWrapper darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
          <Routes>
            {/* Your page components now live inside the themed <main> tag
              and no longer need the darkMode prop passed to them directly.
            */}
            <Route path="/" element={<HomeMain />} />
            <Route path="/projects" element={<ProjectsMain />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactsMain />} />
            <Route path="/media" element={<MediaMain />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </>
  );
};

export default App;