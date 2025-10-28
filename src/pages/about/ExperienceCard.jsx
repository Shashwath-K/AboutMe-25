import React from 'react';
import RevealOnScroll from './RevealOnScroll';
const ExperienceCard = ({ title, company, period, description }) => {
  return (
    <RevealOnScroll>
      <div className="timeline-item">
        <div className="timeline-card glass shadow-xl">
          <h3>{title}</h3>
          <p className="subtitle">{company}</p>
          <p className="description" dangerouslySetInnerHTML={{ __html: description }} />
          <p className="period">{period}</p>
          
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default ExperienceCard;