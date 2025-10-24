import React from 'react';

// TODO: Create a CSS file at this path and move your 'what-i-do.css'
// styles into it. Then, uncomment the line below.
import './styles/WhatIDo.css';

// We define the card data as an array of objects
const services = [
  {
    icon: 'si-visualstudiocode',
    wrapperClass: 'card__icon-wrapper--dev',
    title: 'Web & Mobile Dev',
    text: 'Responsive apps using React, Next.js, and Flutter.'
  },
  {
    icon: 'si-adobephotoshop',
    wrapperClass: 'card__icon-wrapper--photo',
    title: 'Photographer',
    text: 'Capturing editorial and product moments with impact.'
  },
  {
    icon: 'si-adobepremierepro',
    wrapperClass: 'card__icon-wrapper--editor',
    title: 'Editor',
    text: 'Video/audio polishing, color grading, and motion graphics.'
  },
  {
    icon: 'si-figma',
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
        
        {/* We map over the services array to render each card */}
        {services.map((service, index) => (
          <div className="what-i-do-card" key={index}>
            <div className="card-content">
              <div className={`card__icon-wrapper ${service.wrapperClass}`}>
                <i className={`si ${service.icon}`}></i>
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
