import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../assets/header/light_mode_nav_sign.png'; 
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Gets the current route

  // Effect closes the mobile menu upon navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]); // Use location.pathname for cleaner dependency

  // Define the nav items
  const navItems = [
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Media', path: '/media' },
    { name: 'Contact', path: '/contact' },
  ];

  // --- Tailwind Class Helpers for Readability ---
  // Apply our custom green color for the active state
  const activeLinkClasses = 'text-brand-green-500 border-b-2 border-brand-green-500';
  // Default link styling (white/gray text on dark background)
  const baseLinkClasses = 'text-white/70 hover:text-brand-green-300 transition-colors duration-200 border-b-2 border-transparent pb-1';
  // ---

  return (
    // Header: Fixed, uses the black surface, is translucent (backdrop-blur), and has a green highlight border
    <header 
      className="fixed top-0 left-0 w-full z-50 bg-surface-dark-900/80 backdrop-blur-md border-b border-brand-green-500/10 shadow-lg" 
      role="banner" 
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex justify-between items-center h-[72px] px-4 md:px-8">
        
        {/* Logo/Home Link */}
        <Link to="/" className="flex items-center space-x-2 p-1 group">
          {/* Logo: Small green square that slightly rotates on hover */}
          <img 
            src={logo} 
            alt="Logo" 
            className="h-6 w-6 rounded-sm bg-brand-green-500 p-1 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6" 
          />
          <span className="sr-only">Home</span>
        </Link>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-10 font-medium tracking-wide">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              // NavLink applies activeLinkClasses if active, otherwise baseLinkClasses
              className={({ isActive }) =>
                `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Toggle Button (Hamburger/X) */}
        <button 
          id="menu-toggle" 
          className="lg:hidden p-2 rounded-lg border border-brand-green-500/30 hover:bg-brand-green-500/10 transition focus:outline-none focus:ring-2 focus:ring-brand-green-500" 
          aria-label="Toggle menu" 
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-brand-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Sliding from top) */}
      {/* We use conditional rendering + Tailwind's transition/transform utilities for animation */}
      <nav 
        id="mobile-nav" 
        className={`lg:hidden absolute top-[72px] left-0 w-full flex-col items-center space-y-8 py-8 bg-surface-dark-900 transition-transform duration-300 ease-in-out shadow-2xl ${
          isMenuOpen ? 'translate-y-0 opacity-100 flex' : '-translate-y-full opacity-0 hidden' // Animate slide-out
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `text-xl font-body tracking-wider p-2 ${baseLinkClasses} ${isActive ? activeLinkClasses : 'text-white'}`
            }
          >
            {item.name}
          </NavLink>
        ))}
        {/* Optional: Add a call-to-action button for a contact/resume link */}
        <Link 
            to="/contact" 
            className="mt-4 px-6 py-2 rounded-full bg-brand-green-500 text-surface-dark-900 font-bold hover:bg-brand-green-400 transition-colors shadow-glow-green"
            onClick={() => setIsMenuOpen(false)}
        >
            Get In Touch
        </Link>
      </nav>
    </header>
  );
};

export default Header;