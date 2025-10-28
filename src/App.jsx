// src/App.jsx
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HomeMain from "./pages/HomeMain";
import ProjectsMain from "./pages/ProjectsMain";
import About from "./pages/AboutMain";
import ContactsMain from "./pages/ContactsMain";
import MediaMain from "./pages/MediaMain";
import FloatingIsland from "./components/FloatingIsland";
import WelcomeLoader from "./components/WelcomeLoader";
import "./components/FloatingIsland.css";

/**
 * Inline ScrollToTop that prefers an explicit ref (mainRef).
 * It waits for mainRef.current to exist before trying to scroll.
 */
function ScrollToTop({ scrollRef }) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Ensure browser doesn't perform automatic restoration which may fight us
    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch (e) { /* ignore */ }
    }

    // Wait until the layout is stable and the ref exists
    requestAnimationFrame(() => {
      const container = (scrollRef && scrollRef.current) || document.scrollingElement || document.documentElement || document.body;

      try {
        // If container is an element with scrollTo
        if (container && typeof container.scrollTo === "function") {
          container.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } else if (container) {
          container.scrollTop = 0;
        } else {
          window.scrollTo(0, 0);
        }
      } catch (err) {
        // fallback
        window.scrollTo(0, 0);
      }
    });
    // Re-run on pathname change
  }, [pathname, scrollRef]);

  return null;
}

const AppContent = ({ mainRef }) => {
  return (
    <>
      {/* ScrollToTop must be inside Router so useLocation() works */}
      <ScrollToTop scrollRef={mainRef} />

      {/* Force main to be the scroll container — inline style ensures it's applied even if Tailwind overrides exist */}
      <main
        ref={mainRef}
        className="page-wrapper page-transition"
        style={{
          height: "100vh",       // ensure it fills viewport so it becomes the scrollable container
          overflowY: "auto",     // make it scrollable
          WebkitOverflowScrolling: "touch" // smooth scrolling on iOS
        }}
      >
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
  const mainRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("dark");
    document.body.classList.remove("light");

    if ("scrollRestoration" in window.history) {
      try {
        window.history.scrollRestoration = "manual";
      } catch (e) { /* ignore */ }
    }
  }, []);

  const handleLoadingComplete = () => setIsLoading(false);

  return (
    <>
      {isLoading ? (
        <WelcomeLoader onAnimationComplete={handleLoadingComplete} />
      ) : (
        <Router>
          <AppContent mainRef={mainRef} />
        </Router>
      )}
    </>
  );
};

export default App;
