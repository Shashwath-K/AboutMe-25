// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ scrollRef }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll until React has committed the new route DOM
    const scrollHandler = () => {
      try {
        // CASE 1: Scrollable <main> with ref
        if (scrollRef?.current) {
          scrollRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto', // 'smooth' optional
          });
        }

        // CASE 2: Also scroll the window, just in case
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto',
        });

        // CASE 3: Scroll any other scrollable elements on the page
        document.querySelectorAll('[data-scrollable]').forEach((el) => {
          el.scrollTo({ top: 0, behavior: 'auto' });
        });
      } catch (e) {
        console.error('Scroll reset error:', e);
      }
    };

    // Execute after next paint cycle (ensures DOM fully swapped)
    requestAnimationFrame(() => {
      setTimeout(scrollHandler, 0);
    });

  }, [pathname]);

  return null;
};

export default ScrollToTop;
