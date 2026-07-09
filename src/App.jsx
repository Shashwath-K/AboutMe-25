// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeMain from "./pages/HomeMain";
import ProjectsMain from "./pages/ProjectsMain";
import About from "./pages/AboutMain";
import ContactsMain from "./pages/ContactsMain";
import MediaMain from "./pages/MediaMain";
import FloatingIsland from "./components/FloatingIsland";
import WelcomeLoader from "./components/WelcomeLoader";
import ScrollToTop from "./components/ScrollToTop";
import "./components/FloatingIsland.css";

const AppContent = () => {
  return (
    <>
      <ScrollToTop />

      <main className="page-wrapper page-transition">
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
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("dark");
    document.body.classList.remove("light");

    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch { /* ignore */ }
    }
  }, []);

  const handleLoadingComplete = () => setIsLoading(false);

  return (
    <>
      {isLoading ? (
        <WelcomeLoader onAnimationComplete={handleLoadingComplete} />
      ) : (
        <Router>
          <AppContent />
        </Router>
      )}
    </>
  );
};

export default App;
