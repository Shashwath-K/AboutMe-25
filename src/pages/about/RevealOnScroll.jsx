import React, { useEffect, useRef } from 'react';

/**
 * A wrapper component that animates its child element in on scroll.
 * It uses IntersectionObserver to replicate the original HTML's script.
 */
const RevealOnScroll = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial styles
    element.style.opacity = '0';
    element.style.transform = 'translateY(18px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is in view, trigger the animation
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          // Stop observing once animated
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12, // Same threshold as your script
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup function to disconnect observer
    return () => observer.disconnect();
  }, []); // Empty dependency array ensures this runs once on mount

  // We clone the single child element and attach the ref to it.
  // This avoids adding an extra wrapper div that could break CSS.
  const child = React.Children.only(children);
  return React.cloneElement(child, { ref });
};

export default RevealOnScroll;