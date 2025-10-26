import React from 'react';
import { SiGithub } from 'react-icons/si'; // 1. Import the react-icon

/**
 * Re-imagined ProjectCard.
 * - Uses react-icons.
 * - Removes all JS-based hover logic and utility classes.
 * - Relies entirely on the external 'projects.css' for styling and animation.
 * - Uses the HTML structure expected by 'projects.css'.
 */
const ProjectCard = ({ title, description, techStack, imageUrl, altText, githubUrl }) => {
  
  // 2. REMOVED: All useRef, handleMouseMove, and handleMouseLeave logic.
  // Your complex 'projects.css' file handles all hover and 3D effects.

  return (
    // 3. CLEANED: The <section> now only uses the 'project-card' class.
    // All utility classes and JS event handlers are gone.
    <section className="project-card">
      
      {/* 4. STRUCTURED to match projects.css */}
      <div className="project-image-wrapper">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="paused-gif" // This class is fine if you still use it
        />
      </div>

      {/* 5. STRUCTURED to match projects.css */}
      <div className="project-content">
        <h2>{title}</h2>
        
        <p className="description">{description}</p>
        
        <div className="tech-stack">
          {techStack.map((tech) => (
            // 6. FIXED: Renders the icon component directly
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
            {/* 7. REPLACED: <i> tag with <SiGithub> component */}
            <SiGithub /> GitHub
          </a>
        </div>
      </div>

    </section>
  );
};

export default ProjectCard;