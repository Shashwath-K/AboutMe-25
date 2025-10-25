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
        <div class="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm">
        </div> 
      <div className="hero-inner text-center flex flex-col items-center justify-center relative z-10">
        <h1 className="hero-title text-4xl sm:text-5xl font-extrabold mb-4">Get in touch</h1>
        <p className="hero-content text-base sm:text-lg max-w-2xl leading-relaxed text-gray-200">
          Whether you have a question about a project, want to collaborate, or just say Hi! drop a message below. I typically respond within 48 hrs.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;  