import React, { useState, useEffect } from 'react';
// Import NavLink, which is built for navigation bars
import { NavLink, Link, useLocation } from 'react-router-dom';
import './components.css';

// import logo from '../assets/header/light_mode_nav_sign.png'; // TODO: Add your logo to this path

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Gets the current route

  // This effect closes the mobile menu if the user navigates to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // We no longer need the getNavLinkClass or getMobileNavLinkClass functions,
  // as NavLink's 'className' prop will handle this logic.

  // Define the nav items in an array to keep it DRY (Don't Repeat Yourself)
  const navItems = [
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Media', path: '/media' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="header fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 shadow-lg" role="banner" aria-label="Main header">
      <div className="container mx-auto flex justify-between items-center h-[72px] px-6 lg:px-12">
        
        <Link to="/" className="flex items-center space-x-2 group">
          {/* Replaced imported logo with a placeholder. Uncomment the real 'img' tag when your logo is ready. */}
          <div className="h-16 w-16 bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-400">Logo</div>
          {/* <img src={logo} alt="Logo" className="h-16 w-16 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2" /> */}
          <span className="sr-only">Home</span>
        </Link>

        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8 font-medium">
          {/* Map over the nav items.
            We use NavLink's 'className' render prop.
            It passes an 'isActive' boolean, which we use to
            conditionally add our 'active-nav-link' class.
          */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active-nav-link' : ''}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button 
          id="menu-toggle" 
          className="lg:hidden p-2 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-green-500" 
          aria-label="Toggle menu" 
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Use state to toggle
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* Simple ternary for X vs Hamburger icon */}
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Use state to control visibility and animation */}
      <nav 
        id="mobile-nav" 
        className={`lg:hidden flex-col items-center space-y-6 py-8 bg-black/95 backdrop-blur-xl border-t border-white/10 ${isMenuOpen ? 'flex animate-slide-down' : 'hidden'}`}
      >
        {/* We do the same for the mobile links */}
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link-mobile ${isActive ? 'active-nav-link-mobile' : ''} animate-slide-down-item`
            }
            // This applies the staggered animation from components.css
            style={{ animationDelay: `${index * 0.05 + 0.05}s` }}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;

