import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const ExperienceCard = ({ title, company, period, description }) => {
  return (
    // RevealOnScroll wraps the card and handles the animation
    <RevealOnScroll>
      <div className="experience-card glass">
        <h3>{title}</h3>
        <p className="text-sm text-gray-400 mb-3">{company} — {period}</p>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </RevealOnScroll>
  );
};

export default ExperienceCard;