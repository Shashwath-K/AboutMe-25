import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from './home/Hero';
import Notes from './home/Notes';
import WhatIDo from './home/WhatIDo';
// Lazy load heavy components for performance
const Stacks = lazy(() => import('./home/Stacks'));
const DevStats = lazy(() => import('./home/DevStats'));
import '../components/styles/styles.css'; // Import your global CSS normally

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
        <title>Shashwath KS — Full-Stack / Mobile Developer</title>
        <meta
          name="description"
          content="Shashwath KS — Full-stack & mobile developer. UI/UX, Flutter, React, Next.js, photography and design."
        />
        <noscript>Your browser does not support JavaScript! Some features might not work.</noscript>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Shashwath KS",
            "jobTitle": "Full-Stack Developer",
            "url": "https://yourdomain.com",
            "sameAs": [
              "https://linkedin.com/in/shashwathks",
              "https://github.com/shashwathks"
            ]
          })}
        </script>
      </Helmet>

      <main
        id="main-content"
        className={darkMode ? 'dark' : 'light'}
        role="main"
        aria-label="Home page main content"
      >
        <section aria-labelledby="hero-title">
          <Hero />
        </section>
        <section aria-labelledby="whatido-title">
          <WhatIDo />
        </section>
        <Suspense fallback={<div>Loading skills and toolkit...</div>}>
          <section aria-labelledby="skills-title">
            <Stacks />
          </section>
          <section aria-labelledby="devstats-title">
            <DevStats />
          </section>
        </Suspense>
        <section aria-labelledby="notes-title">
          <Notes />
        </section>
      </main>
      <Footer darkMode={darkMode} />
      {showTopBtn && (
        <button
          aria-label="Scroll back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="backToTopBtn" // Use direct classname
        >
          ↑ Top
        </button>
      )}
    </>
  );
};

export default HomeMain;
