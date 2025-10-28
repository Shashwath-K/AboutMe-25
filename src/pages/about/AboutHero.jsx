import React from 'react';

// Component to generate the 40 matrix columns
const MatrixColumns = () => (
  <>
    {Array.from({ length: 40 }).map((_, index) => (
      <div className="matrix-column" key={index}></div>
    ))}
  </>
);

const AboutHero = () => {
  return (
    <section className="hero-section-about" style={{ minHeight: '60vh', padding: 'calc(var(--header-height) + 2rem) 5% 3rem' }}>
      {/* Matrix background */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="matrix-pattern">
          <MatrixColumns />
        </div>
      </div>
      
      {/* Overlay for contrast */}
      <div className="hero-bg-overlay" />
      
      {/* Inner content */}
      <div className="hero-about-inner text-center flex flex-col items-center justify-center relative z-10">
        <h1 className="hero-about-title text-4xl sm:text-5xl font-extrabold mb-4">About</h1>
        <p className="hero-about-content text-justify max-w-2xl lg:max-w-3xl space-y-4 mt-6">
          I’m <strong>Shashwath KS</strong>, a passionate full-stack and mobile developer. I love crafting seamless digital experiences, solving complex problems, and building tools that create impact.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;