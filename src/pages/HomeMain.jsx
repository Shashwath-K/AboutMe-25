import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../components/Footer';
import Hero from './home/Hero';
import WhatIDo from './home/WhatIDo';
// Lazy load heavy components for performance
const Stacks = lazy(() => import('./home/Stacks'));
const DevStats = lazy(() => import('./home/DevStats'));
import '../components/styles/styles.css'; 

const HomeMain = () => {
  // Dark mode toggle state initialization
  const [darkMode, setDarkMode] = useState(false);

  // Scroll to top button display state
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Smooth scroll on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode toggle handler
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
    document.body.classList.toggle('light', darkMode);
  };

  return (
    <>
      <Helmet>
        {/* ... (all your helmet content remains the same) ... */}
      </Helmet>
      <main
        id="main-content"
        className={darkMode ? 'dark' : 'light'}
        role="main"
        aria-label="Home page main content"
      >
        {/* ADD 'id' ATTRIBUTES TO YOUR SECTIONS */}
        <section id="home" aria-labelledby="hero-title">
          <Hero />
        </section>
        <section id="what-i-do" aria-labelledby="whatido-title">
          <WhatIDo />
        </section>
        <Suspense fallback={<div>Loading skills and toolkit...</div>}>
          <section id="skills" aria-labelledby="skills-title">
            <Stacks />
          </section>
          <section id="stats" aria-labelledby="devstats-title">
            <DevStats />
          </section>
        </Suspense>
      </main>
      <Footer darkMode={darkMode} />
    </>
  );
};

export default HomeMain;