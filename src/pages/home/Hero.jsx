import React, { useState, useEffect } from 'react';

// TODO: Create a CSS file at this path and move your 'hero.css'
// styles into it. Then, uncomment the line below.
import './styles/Hero.css';

// List of roles for the typewriter effect
const roles = [
  "Full-stack & mobile developer",
  "UI/UX enthusiast",
  "React & Flutter specialist",
  "Photographer & designer",
];

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        // Deleting logic
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      } else {
        // Typing logic
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === currentRole.length) {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000); 
        }
      }
    };

    const typingSpeed = isDeleting ? 50 : 150;
    const timer = setTimeout(type, typingSpeed);

    // Cleanup function
    return () => clearTimeout(timer);
  }, [charIndex, roleIndex, isDeleting]);

  return (
    <section id="home" className="hero-section relative overflow-hidden">
      {/* Matrix Background */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none">
        <div className="matrix-pattern">
          {/* We generate the 40 columns programmatically */}
          {Array.from({ length: 40 }).map((_, index) => (
            <div key={index} className="matrix-column"></div>
          ))}
        </div>
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="mt-8 hero-inner px-4 sm:px-6 lg:px-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          
          {/* Avatar */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div id="hero-avatar" className="avatar-container group relative select-none">
              <div className="avatar-blur-edge absolute inset-0 z-0"></div>
              {/* Assumes avatar.JPG is in public/assets/ */}
              <div 
                className="ambient-glow" 
                style={{ backgroundImage: "url('/assets/avatar.JPG')" }}
              ></div>
              <img 
                src="/assets/avatar.JPG" 
                alt="Shashwath avatar" 
                className="avatar-image pointer-events-none" 
                draggable={false} 
                onContextMenu={(e) => e.preventDefault()} 
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="md:col-span-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight hero-title">
              Shashwath KS
            </h1>

            <div className="hero-content">
              <p className="text-lg text-gray-300 font-medium min-h-[1.5rem]" aria-live="polite">
                {/* This span will now be updated by our React state */}
                <span id="typewriter-text">{typedText}</span>
                <span className="cursor-blink">|</span> {/* Blinking cursor */}
              </p>

              <div className="text-gray-300 text-justify max-w-2xl lg:max-w-3xl space-y-4 mt-6">
                <p>
                  Hi, I'm <strong className="highlight-green">Shashwath K S</strong>. I build fast, accessible websites and mobile apps that look and feel great.
                  I work on everything from the user interface to the backend, using tools like 
                  <strong className="highlight-green"> React</strong>, Next.js, and <strong className="highlight-green">Flutter</strong>.
                  I care about good design and smooth user experiences, and I also enjoy photography and visual design.
                </p>
                <p>
                  I often work on things like responsive layouts, reusable design systems, 
                  <strong className="highlight-green"> APIs</strong>, database design with both SQL and NoSQL,
                  cross-platform mobile apps, subtle animations, and photography that fits a brand’s voice.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a href="https://drive.google.com/file/d/1OoVsrUtNbxVQJ6QUVP_R4pFc9UGzev7V/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="button">
                  <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>View Resume</span>
                </a>
              </div>
              <div className="mt-8 flex items-center">
                <p className="ml-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span>Reach out via</span>
                  <a href="mailto:shashwathkukkunoor@outlook.com" className="contact-button">Email</a>
                  <span>and</span>
                  <a href="https://twitter.com/@Shashwath_k15" target="_blank" rel="noopener noreferrer" className="contact-button">Twitter</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
