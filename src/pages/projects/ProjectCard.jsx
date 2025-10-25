import React, { useRef } from 'react';

const ProjectCard = ({ title, description, techStack, imageUrl, altText, githubUrl }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * -30; // Max rotation 30deg
    const rotateY = (x / rect.width) * 30;  // Max rotation 30deg

    card.style.setProperty('--transform-3d', `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty('--transform-3d', 'rotateX(0deg) rotateY(0deg)');
    }
  };

  return (
    <section
      ref={cardRef}
      className="project-card glass fade-in p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{'--transform-3d': 'rotateX(0deg) rotateY(0deg)'}} // Initial CSS variable
    >
      <div className="project-left mb-4 sm:mb-0">
        <img src={imageUrl} alt={altText} className="paused-gif rounded-md" />
      </div>
      <div className="project-right flex flex-col justify-between h-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{title}</h2>
        <div className="tech-stack flex gap-2 flex-wrap mb-4">
          {techStack.map((tech, index) => (
            <span key={index} className="pill">
              <i className={tech.icon}></i> {tech.name}
            </span>
          ))}
        </div>
        <p className="description text-gray-300 mb-4 text-base sm:text-lg">{description}</p>
        <div className="project-links">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="icon-link">
            <i className="devicon-github-original"></i> GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;