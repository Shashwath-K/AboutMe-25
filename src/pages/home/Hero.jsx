import React, { useState, useEffect } from 'react';
import './styles/Hero.css';
import profile from '../../assets/avatar.JPG';

const roles = [
  "Full-stack & mobile developer",
  "UI/UX enthusiast",
  "React & Flutter specialist",
  "Photographer & designer",
];

// Blinking cursor and accessibility styles
const BlinkingCursorStyles = () => (
  <style>{`
    .cursor-blink {
      animation: blink 1s step-end infinite;
    }
    @keyframes blink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
    a:focus-visible {
      outline: 2px solid var(--matrix-green-base);
      outline-offset: 2px;
    }
    /* Visually-hidden utility class for accessibility */
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `}</style>
);

// Component to generate the 40 matrix columns
const MatrixColumns = () => (
  <>
    {/* Creates an array of 40 elements to map over */}
    {Array.from({ length: 40 }).map((_, index) => (
      <div className="matrix-column" key={index}></div>
    ))}
  </>
);

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] =  useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const type = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          setTypedText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      } else {
        if (charIndex < currentRole.length) {
          setTypedText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    let typingSpeed = isDeleting ? 50 : 150;
    if (!isDeleting && charIndex === currentRole.length) typingSpeed = 2000;

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, roleIndex, isDeleting]);

  return (
    <section id="home" className="hero-section relative overflow-hidden" aria-label="Introduction and roles of Shashwath KS">
      <BlinkingCursorStyles />

      {/* Matrix Background */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="matrix-pattern">
          <MatrixColumns />
        </div>
      </div>

      {/* Glass overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm" aria-hidden="true"></div>

      {/* ----- MODIFIED MAIN CONTENT CONTAINER ----- */}
      {/* Replaced responsive px with px-[10%] for 10% padding on left/right */}
      <div className="mt-8 hero-inner px-[10%] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          
          {/* Avatar */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div id="hero-avatar" className="avatar-container group relative select-none">
              <div className="avatar-blur absolute inset-0 z-0"></div>
              <div className="ambient-glow" style={{ backgroundImage: `url(${profile})` }}></div>
              <img
                src={profile}
                alt="Portrait of Shashwath KS"
                className="avatar-image pointer-events-none"
                draggable="false"
                onContextMenu={e => e.preventDefault()}
                width={288}
                height={288}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="md:col-span-8 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight hero-title">
              Shashwath KS
            </h1>

            <div className="hero-content">
              {/* Typewriter text */}
              <p className="text-lg text-gray-300 font-medium min-h-[1.5rem]" aria-live="polite">
                <span id="typewriter-text">{typedText}</span>
                <span aria-hidden="true" className="cursor-blink">|</span>
                <span className="visually-hidden">Typing cursor</span>
              </p>

              {/* ----- MODIFIED BIO TEXT ----- */}
              {/* Ensured 'text-justify' class is present */}
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

             {/* Combined Buttons Section */}
              {/* - On mobile (default): `flex-col` stacks the two groups (Resume button, Contact links) vertically.
                - On desktop (`md:`): `md:flex-row` places the two groups side-by-side.
                - `justify-center` centers the groups within the main container.
                - `items-center` aligns the groups (e.g., centers the Resume button horizontally when stacked).
              */}
              <div className="mt-16 p-8 flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center">

                {/* 1. View Resume Button (Group 1) */}
                <a 
                  href="https://drive.google.com/file/d/1OoVsrUtNbxVQJ6QUVP_R4pFc9UGzev7V/view?usp=drive_link" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button"
                  aria-label="View Shashwath KS's resume"
                >
                  <span>View Resume</span>
                </a>
                <br/>
                <span className="text-gray-300">Reach out via</span>
                <br/>
                {/* 2. Contact Links (Group 2) */}
                {/* This inner container keeps the contact links together as a single group. */}
                <div className="">
                  {/* `md:ml-4` adds the margin only on desktop (when in row mode) */}
                  <a href="mailto:shashwathkukkunoor@outlook.com" className="contact-button">Email</a>
                  
                  <span className="text-gray-300">or</span>
                  
                  <a href="https://twitter.com/@Shashwath_k15" target="_blank" rel="noopener noreferrer" className="contact-button">Twitter</a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;