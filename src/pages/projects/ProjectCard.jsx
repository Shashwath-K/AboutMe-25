import React from 'react';
import { SiGithub } from 'react-icons/si'; // 1. Import the react-icon

const ProjectCard = ({ title, description, techStack, imageUrl, altText, githubUrl }) => {
  return (
    // 1. CLEANED: The <section> now only uses the 'project-card' class.
    // All utility classes and JS event handlers are gone.
    <section className="project-card">
      <div className="project-image-wrapper">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="paused-gif" // This class is fine if you still use it
        />
      </div>

      {/* 2. STRUCTURED to match projects.css */}
      <div className="project-content">
        <h2>{title}</h2>
        
        <p className="description">{description}</p>
        
        <div className="tech-stack">
          {techStack.map((tech) => (
            <span key={tech.name} className="pill">
              {tech.icon} {tech.name}
            </span>
          ))}
        </div>
        
        <div className="project-links">
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="icon-link"
          >
            <SiGithub /> GitHub
          </a>
        </div>
      </div>

    </section>
  );
};

export default ProjectCard;