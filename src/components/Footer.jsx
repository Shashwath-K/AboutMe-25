import React from 'react';
// Import icons
import { SiVercel, SiReact } from 'react-icons/si';

const Footer = () => {
  return (
    <footer id="contact" className="footer glass rounded-t-[20%]">
      <div className="container flex flex-col items-center py-10 px-6 space-y-6 text-center">
        
        {/* Call to action */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">Let’s build something great</h3>
          <p className="text-sm text-gray-400">Open to freelance, collaborations & full-time roles</p>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-white/10"></div>

        {/* Copyright and Credits */}
        <p className="text-xs text-gray-500 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center sm:gap-x-4 gap-y-2">
 
          {/* Divider for larger screens */}
          <span className="hidden sm:inline">|</span>

          <span className="flex items-center gap-1.5">
            <span>Created with</span>
          </span>
          <span className="flex items-center gap-5.5">
            <SiReact className="text-[#61DAFB]" title="React" />
            <span>React</span>
            <span className="opacity-0 sm:inline">||||||||||||</span>
            <SiVercel className="text-white" title="Vercel" />
            <span>Vercel</span>
          </span>
        </p>

      </div>
    </footer>
  );
};

export default Footer;