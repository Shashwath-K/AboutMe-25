import React, { useEffect, useRef, useState } from 'react';

/**
 * A wrapper component that animates its child element in on scroll.
 * RE-IMAGINED: Uses React state to toggle CSS classes instead of direct style manipulation.
 */
const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // REMOVED: All direct style manipulation (e.g., element.style.opacity)

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is in view, update the state
        if (entry.isIntersecting) {
          setIsVisible(true); // 1. Set state to true
          // Stop observing once animated
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12, // Same threshold
      }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup function
    return () => observer.disconnect();
  }, []); // Empty dependency array ensures this runs once on mount

  // Clone the child element
  const child = React.Children.only(children);
  
  // 2. Add new CSS classes based on visibility state
  const newClassName = [
    child.props.className, // Keep existing classes
    'reveal-on-scroll',    // Add the base animation class
    isVisible ? 'is-visible' : '' // Add the 'is-visible' class on reveal
  ].filter(Boolean).join(' ');

  // 3. Return the cloned element with the new ref and classNames
  return React.cloneElement(child, {
    ref,
    className: newClassName
  });
};

export default RevealOnScroll;