// src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Get the current page's pathname
  const { pathname } = useLocation();

  // This effect runs every time the 'pathname' changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // This component doesn't render any HTML
  return null; 
};

export default ScrollToTop;