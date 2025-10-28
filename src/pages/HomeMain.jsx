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
  const [darkMode, setDarkMode] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    // Prefer the .page-wrapper scroll container (App sets this) otherwise fallback to window
    const scrollContainer = document.querySelector('.page-wrapper') || window;

    // Scroll to top of the actual container on mount (instant)
    try {
      if (scrollContainer === window) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (typeof scrollContainer.scrollTo === 'function') {
        scrollContainer.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } else {
        scrollContainer.scrollTop = 0;
      }
    } catch (e) {
      // fallback
      window.scrollTo(0, 0);
    }

    // Handler that checks the correct scroll position for whichever container is being used
    const handleScroll = () => {
      try {
        const y = scrollContainer === window ? window.scrollY : scrollContainer.scrollTop;
        setShowTopBtn(y > 300);
      } catch (err) {
        setShowTopBtn(false);
      }
    };

    // Use capture true to hear scrolls from nested elements if needed
    if (scrollContainer === window) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    } else {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    // cleanup
    return () => {
      if (scrollContainer === window) {
        window.removeEventListener('scroll', handleScroll);
      } else {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark', !darkMode);
    document.body.classList.toggle('light', darkMode);
  };

  return (
    <>
      <Helmet>
        {/* ...keep your helmet contents... */}
      </Helmet>

      {/* 
        Use a div here (not <main>) because App already renders the main.page-wrapper.
        Make this a flex-grow container so the footer sits inside the same flow.
      */}
      <div
        id="main-content"
        className={`flex-1 ${darkMode ? 'dark' : 'light'}`}
        role="main"
        aria-label="Home page main content"
        /* optional inline: ensure no nested independent scroll unless desired */
      >
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
      </div>

      <Footer darkMode={darkMode} />
    </>
  );
};

export default HomeMain;
