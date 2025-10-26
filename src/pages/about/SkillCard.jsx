import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const SkillCard = ({ name, icon }) => {
  return (
    // RevealOnScroll wraps the card and handles the animation
    <RevealOnScroll>
      <div className="skill-card">
        {/* CHANGED: Render the icon component directly */}
        {icon}
        <span>{name}</span>
      </div>
    </RevealOnScroll>
  );
};

export default SkillCard;