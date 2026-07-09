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
  const [darkMode] = useState(false);

  useEffect(() => {
    // Scroll to top of the window on mount (instant)
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

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
        className={`flex-grow ${darkMode ? 'dark' : 'light'}`}
        role="main"
        aria-label="Home page main content"
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
