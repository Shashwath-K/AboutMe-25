import React from 'react';

// Re-using the MatrixColumns component from our Hero.jsx
const MatrixColumns = () => (
  <>
    {Array.from({ length: 40 }).map((_, index) => (
      <div className="matrix-column" key={index}></div>
    ))}
  </>
);

const ProjectHero = () => {
  return (
    <section className="hero-section" style={{ minHeight: '60vh', padding: 'calc(var(--header-height) + 2rem) 5% 3rem' }}>
      {/* Matrix background */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="matrix-pattern">
          <MatrixColumns />
        </div>
      </div>
      
     {/* Overlay for contrast */}
      <div className="hero-bg-overlay" />
      
      {/* Inner content */}
      <div className="hero-inner text-center flex flex-col items-center justify-center relative z-10">
        <h1 className="hero-title text-4xl sm:text-5xl font-extrabold mb-4">Projects</h1>
        <p className="hero-content max-w-2xl mx-auto mb-6">
          Explore the wide range of dynamic projects I've built — from Android apps to full-stack platforms — leveraging
          <strong> React</strong>, <strong>TypeScript</strong>, <strong>Express</strong>, <strong>Python</strong>,
          <strong> AI</strong>, <strong>Firebase</strong>, and more. Each project reflects my passion for solving real-world problems and crafting seamless user experiences.
        </p>
        <br />
        <a href="https://github.com/Shashwath-K" target="_blank" rel="noopener noreferrer" className="button">
          <i className="devicon-github-original"></i> View All Repositories
        </a>
      </div>
    </section>
  );
};

export default ProjectHero;