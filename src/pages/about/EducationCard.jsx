// src/pages/about/EducationCard.jsx
import React from 'react';
import RevealOnScroll from './RevealOnScroll';

const EducationCard = ({ index, degree, institution, university, period, details }) => {
  const sideClass = index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right';
  return (
    <RevealOnScroll>
      {/* Main container for a single timeline entry */}
      <div className={`timeline-item ${sideClass}`}>
        {/* The connecting dot on the timeline */}
        <div className="timeline-dot"></div>
        {/* The actual content card */}
        <div className="education-card glass shadow-xl"> {/* Keep existing card styles */}
          <h3 className="degree-title">{degree}</h3>
          <p className="institution-name">{institution}</p>
          <p className="university-name">{university}</p>
          {details && <p className="details-text">{details}</p>}
          <p className="period-text">{period}</p>
        </div>
      </div>
    </RevealOnScroll>
  );
};

export default EducationCard;