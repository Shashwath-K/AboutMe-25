import React from 'react';
import './styles/Stacks.css';

// 1. CHANGED: Corrected the import lists
import {
  DiReact,
  DiJavascript1,
  DiFirebase,
  DiMysql,
  DiGit,
  DiNodejsSmall,
  DiPhotoshop 
} from 'react-icons/di';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiFigma,
  SiCanva,
  SiFlutter,
  SiAdobelightroom,
  SiDavinciresolve,
  SiObsstudio,
  SiAdobeaftereffects, 
  SiAdobepremierepro   
} from 'react-icons/si';

// --- Data for the two icon columns ---

const techStack = [
  { title: "React", color: "#61DAFB", icon: <DiReact /> },
  { title: "Next.js", color: "#000000", icon: <SiNextdotjs /> },
  { title: "TypeScript", color: "#3178C6", icon: <SiTypescript /> },
  { title: "JavaScript", color: "#F7DF1E", icon: <DiJavascript1 /> },
  { title: "Flutter", color: "#02569B", icon: <SiFlutter /> },
  { title: "Tailwind CSS", color: "#38B2AC", icon: <SiTailwindcss /> },
  { title: "Firebase", color: "#FFCA28", icon: <DiFirebase /> },
  { title: "MySQL", color: "#4479A1", icon: <DiMysql /> },
  { title: "Git", color: "#F05032", icon: <DiGit /> },
  { title: "Node.js", color: "#339933", icon: <DiNodejsSmall /> },
];

// 2. CHANGED: Pointed to the correct 'Si' components
const miscStack = [
  { title: "Photoshop", color: "#31A8FF", icon: <DiPhotoshop /> },
  { title: "Figma", color: "#F24E1E", icon: <SiFigma /> },
  { title: "Canva", color: "#00C4CC", icon: <SiCanva /> },
  { title: "Lightroom", color: "#31A8FF", icon: <SiAdobelightroom /> },
  { title: "DaVinci Resolve", color: "#FFFFFF", icon: <SiDavinciresolve /> },
  { title: "After Effects", color: "#9999FF", icon: <SiAdobeaftereffects /> }, // FIXED
  { title: "Premiere Pro", color: "#9999FF", icon: <SiAdobepremierepro /> }, // FIXED
  { title: "OBS Studio", color: "#FFFFFF", icon: <SiObsstudio /> },
];

/**
 * A reusable component to render a single column in the grid.
 */
const StackColumn = ({ title, icons }) => (
  <div className="stack-column">
    <h3 className="stack-column-title">{title}</h3>
    <div className="icons-grid">
      {icons.map((icon) => (
        <span
          key={icon.title}
          className="icon-wrapper"
          title={icon.title}
          style={{ '--original-color': icon.color }}
        >
          {icon.icon}
        </span>
      ))}
    </div>
  </div>
);

const Stacks = () => {
  return (
    <section id="skills" className="stack-section section site-container">
      <h2 className="stack-title">Skills & Toolkit</h2>
      <div className="glass-container">
        <div className="stacks-grid">
          <StackColumn title="Tech Stack" icons={techStack} />
          <StackColumn title="Misc Stack" icons={miscStack} />
        </div>
      </div>
    </section>
  );
};

export default Stacks;