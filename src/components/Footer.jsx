import React from 'react';
import './components.css';
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

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          &copy; 2025 Shashwath — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
