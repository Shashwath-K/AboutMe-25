import React from 'react';
import './styles/WhatIDo.css';

// 1. CHANGED: Import alternative icons (e.g., from Font Awesome)
import { 
  FaCode,         // Replaces SiVisualstudiocode
  FaCamera,       // Replaces SiAdobephotoshop
  FaFilm,         // Replaces SiAdobepremierepro
  FaPencilRuler   // Replaces SiFigma
} from 'react-icons/fa';

// 2. CHANGED: Updated the 'services' array with the new icon components
const services = [
  {
    icon: <FaCode />,
    wrapperClass: 'card__icon-wrapper--dev',
    title: 'Web & Mobile Dev',
    text: 'Responsive apps using React, Next.js, and Flutter.'
  },
  {
    icon: <FaCamera />,
    wrapperClass: 'card__icon-wrapper--photo',
    title: 'Photographer',
    text: 'Capturing editorial and product moments with impact.'
  },
  {
    icon: <FaFilm />,
    wrapperClass: 'card__icon-wrapper--editor',
    title: 'Editor',
    text: 'Video/audio polishing, color grading, and motion graphics.'
  },
  {
    icon: <FaPencilRuler />,
    wrapperClass: 'card__icon-wrapper--design',
    title: 'Designer',
    text: 'Crafting intuitive UI/UX, branding, and design systems.'
  }
];

const WhatIDo = () => {
  return (
    <section id="what-i-do" className="what-i-do-section section site-container">
      <h2 className="section-title">What I Do</h2>
      <div className="what-i-do-grid">
        
        {services.map((service, index) => (
          <div className="what-i-do-card" key={index}>
            <div className="card-content">
              <div className={`card__icon-wrapper ${service.wrapperClass}`}>
                
                {/* This part remains the same, rendering the icon component */}
                {service.icon} 
                
              </div>
              <h4 className="card__title">{service.title}</h4>
              <p className="card__text">{service.text}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default WhatIDo;