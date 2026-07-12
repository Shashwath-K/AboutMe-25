import React from 'react';
import { SiVercel, SiReact, SiVite } from 'react-icons/si';

import '../components/styles/projects.css'; // Ensure .pill class is loaded

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer glass rounded-t-[20%] mt-20">
      <div className="container flex flex-col items-center py-10 px-6 space-y-8 text-center">
        
        {/* Call to action */}
        <div className="mb-2">
          <h3 className="text-white text-xl font-semibold mb-3">Let’s build something great</h3>
          <p className="text-sm text-gray-400">Open to freelance, collaborations & full-time roles</p>
        </div>
        
        {/* Divider */}
        <div className="w-full max-w-md h-px bg-white/10 my-6"></div>

        {/* Copyright and Credits */}
        <div className="flex flex-col items-center justify-center gap-y-10 w-full mt-6">
          
          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {currentYear} Shashwath K S. All rights reserved.
          </p>

          {/* Pills container */}
          <div 
            className="flex flex-row flex-wrap items-center justify-center w-full"
            style={{ gap: '1.5rem', marginTop: '1rem' }}
          >
            
            {/* Created with React & Vite */}
            <span className="pill" style={{ margin: '0.5rem' }}>
              <span>Created with</span>
              <SiReact className="text-[#61DAFB]" size={14} title="React" />
              <span>&</span>
              <SiVite className="text-[#646CFF]" size={14} title="Vite" />
            </span>
            
            {/* Deployed with Vercel */}
            <span className="pill" style={{ margin: '0.5rem' }}>
              <span>Deployed with</span>
              <SiVercel className="text-white" size={14} title="Vercel" />
            </span>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;