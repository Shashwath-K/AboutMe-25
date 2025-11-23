import React from 'react';

const ContactHero = () => {
  return (
    <section className="hero-section" style={{ minHeight: '60vh', padding: 'calc(var(--header-height) + 2rem) 5% 3rem' }}>
      {/* Inner content */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none">
        <div class="matrix-pattern"> 
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
           <div class="matrix-column"></div><div class="matrix-column"></div>
          </div> 
        </div> 
        {/* Overlay for contrast */}
      <div className="hero-bg-overlay" />
      <div className="hero-inner text-center flex flex-col items-center justify-center relative z-10">
        <h1 className="hero-about-title text-4xl sm:text-5xl font-extrabold mb-4">Get in touch</h1>
        <p className="hero-content text-justify max-w-2xl lg:max-w-3xl space-y-4 mt-6 text-gray-200">
          Whether you have a question about a project, want to collaborate, or just say Hi! drop a message below. I typically respond within 48 hrs.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;  