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
import './components/FloatingIsland.css';

const LayoutWrapper = ({ children, darkMode, toggleDarkMode, mainRef }) => {
  return (
    <main
      ref={mainRef}
      className={`page-wrapper page-transition ${darkMode ? 'dark' : 'light'}`}
    >
      {children}
      <FloatingIsland darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </main>
  );
};


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const mainRef = useRef(null);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  return (
    <Router>
      <ScrollToTop scrollRef={mainRef} />

      <LayoutWrapper
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
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
  );
};

export default App;
