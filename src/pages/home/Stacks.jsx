import React from 'react';

// TODO: Create a CSS file at this path and move your 'stacks.css'
// styles into it. Then, uncomment the line below.
import './styles/Stacks.css';

// --- Data for the two icon columns ---

const techStack = [
  { title: "React", color: "#61DAFB", devicon: "devicon-react-original", simpleicon: "si-react" },
  { title: "Next.js", color: "#000000", devicon: "devicon-nextjs-original", simpleicon: "si-nextdotjs" },
  { title: "TypeScript", color: "#3178C6", devicon: "devicon-typescript-plain", simpleicon: "si-typescript" },
  { title: "JavaScript", color: "#F7DF1E", devicon: "devicon-javascript-plain", simpleicon: "si-javascript" },
  { title: "Flutter", color: "#02569B", devicon: "devicon-flutter-plain", simpleicon: "si-flutter" },
  { title: "Tailwind CSS", color: "#38B2AC", devicon: "devicon-tailwindcss-plain", simpleicon: "si-tailwindcss" },
  { title: "Firebase", color: "#FFCA28", devicon: "devicon-firebase-plain", simpleicon: "si-firebase" },
  { title: "MySQL", color: "#4479A1", devicon: "devicon-mysql-plain", simpleicon: "si-mysql" },
  { title: "Git", color: "#F05032", devicon: "devicon-git-plain", simpleicon: "si-git" },
  { title: "Node.js", color: "#339933", devicon: "devicon-nodejs-plain", simpleicon: "si-nodedotjs" },
];

const miscStack = [
  { title: "Photoshop", color: "#31A8FF", devicon: "devicon-photoshop-plain", simpleicon: "si-adobephotoshop" },
  { title: "Figma", color: "#F24E1E", devicon: "devicon-figma-plain", simpleicon: "si-figma" },
  { title: "Canva", color: "#00C4CC", devicon: "devicon-canva-plain", simpleicon: "si-canva" },
  { title: "Lightroom", color: "#31A8FF", devicon: "devicon-lightroom-plain", simpleicon: "si-adobelightroom" },
  { title: "DaVinci Resolve", color: "#FFFFFF", devicon: "devicon-nonexistent-icon", simpleicon: "si-davinciresolve" },
  { title: "After Effects", color: "#9999FF", devicon: "devicon-aftereffects-plain", simpleicon: "si-adobeaftereffects" },
  { title: "Premiere Pro", color: "#9999FF", devicon: "devicon-premierepro-plain", simpleicon: "si-adobepremierepro" },
  { title: "OBS Studio", color: "#FFFFFF", devicon: "devicon-nonexistent-icon", simpleicon: "si-obsstudio" },
];

/**
 * A reusable component to render a single column in the grid.
 * @param {string} title - The title of the column (e.g., "Tech Stack")
 * @param {Array} icons - The array of icon objects to render
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
          // React's syntax for CSS custom properties
          style={{ '--original-color': icon.color }} 
        >
          <i className={`${icon.devicon} icon`}></i>
          <i className={`si ${icon.simpleicon} fallback-icon`}></i>
        </span>
      ))}
    </div>
  </div>
);

const Stacks = () => {
  return (
    <section id="skills" className="stack-section site-container">
      <h2 className="stack-title">Skills & Toolkit</h2>
      <div className="glass-container">
        {/* This new grid creates the 50:50 split */}
        <div className="stacks-grid">
          
          {/* Column 1: Tech Stack */}
          <StackColumn title="Tech Stack" icons={techStack} />
          
          {/* Column 2: Misc Stack */}
          <StackColumn title="Misc Stack" icons={miscStack} />

        </div>
      </div>
    </section>
  );
};

export default Stacks;
