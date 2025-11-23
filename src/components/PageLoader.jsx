// src/components/PageLoader.jsx
import React from 'react';

const PageLoader = () => {
  // Inline styles for simplicity, but you can move to CSS
  const styles = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark overlay
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998, // Below lightbox, above everything else
    color: '#22c55e', // Matrix green
    fontSize: '1.5rem',
    fontFamily: "'Courier New', Courier, monospace",
    opacity: 0,
    animation: 'fadeInLoader 0.2s ease forwards',
  };

  const keyframes = `
    @keyframes fadeInLoader {
      to { opacity: 1; }
    }
    @keyframes simpleSpin {
      to { transform: rotate(360deg); }
    }
  `;

  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(34, 197, 94, 0.3)',
    borderTopColor: '#22c55e',
    borderRadius: '50%',
    animation: 'simpleSpin 0.8s linear infinite',
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles} aria-label="Loading page..." role="status">
        <div style={spinnerStyle}></div>
      </div>
    </>
  );
};

export default PageLoader;