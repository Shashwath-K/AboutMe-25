import React from 'react';
import { SiVercel, SiReact, SiVite } from 'react-icons/si';

// Import the CSS that defines the '.pill' class if not imported globally
// import '../components/styles/projects.css'; 

const Footer = () => {
  return (
    <footer id="contact" className="footer glass rounded-t-[20%]">
      <div className="container flex flex-col items-center py-10 px-6 space-y-6 text-center">
        
        {/* Call to action */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Let’s build something great</h3>
          <br/>
          <p className="text-sm text-gray-400">Open to freelance, collaborations & full-time roles</p>
        </div>
        <br/>
        {/* Divider */}
        <div className="w-full h-px bg-white/10"></div>

        {/* Copyright and Credits */}
        <div className="text-xs flex flex-col items-center justify-center gap-y-4">
          {/* Pills container */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3">
            
            {/* Created with React & Vite - Uses .pill class */}
            <span className="pill">
              <span>Created with</span>
              {/* Icons keep their brand color */}
              <SiReact className="text-[#61DAFB]" title="React" />
              <span>&</span>
              <SiVite className="text-[#646CFF]" title="Vite" />
            </span>
            <span className="opacity-0">|||||</span>
            <span className="pill">
              <span>Deployed with</span>
              <SiVercel className="text-white" title="Vercel" />
            </span>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;