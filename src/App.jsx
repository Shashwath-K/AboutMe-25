// src/App.jsx
import React, { useState, useEffect } from 'react';
// 1. Correctly import from react-router-dom
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HomeMain from './pages/HomeMain';
import ProjectsMain from './pages/ProjectsMain';
import About from './pages/AboutMain';
import ContactsMain from './pages/ContactsMain';
import MediaMain from './pages/MediaMain';
import ScrollToTop from './components/ScrollToTop'; // Import ScrollToTop
import FloatingIsland from './components/FloatingIsland';
import WelcomeLoader from './components/WelcomeLoader';
import './components/FloatingIsland.css';

// AppContent remains simple
const AppContent = () => {
    return (
        <>
            {/* ScrollToTop MUST be inside Router but ideally outside the main scrolling container */}
            <ScrollToTop />
            <main className={`page-wrapper page-transition`}>
                <Routes>
                    <Route path="/" element={<HomeMain />} />
                    <Route path="/projects" element={<ProjectsMain />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<ContactsMain />} />
                    <Route path="/media" element={<MediaMain />} />
                </Routes>
            </main>
            <FloatingIsland />
        </>
    );
}

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
    }, []);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <WelcomeLoader onAnimationComplete={handleLoadingComplete} />
            ) : (
                <Router>
                    {/* AppContent now includes ScrollToTop */}
                    <AppContent />
                </Router>
            )}
        </>
    );
};

export default App;