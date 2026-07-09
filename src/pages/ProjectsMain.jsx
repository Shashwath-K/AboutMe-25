import React, { useEffect } from 'react';
import Footer from '../components/Footer'; 
import ProjectHero from './projects/ProjectHero';
import ProjectCard from './projects/ProjectCard';
import { projects } from '../data/portfolioData';
import '../components/styles/styles.css';
import '../components/styles/projects.css'; 

import {
  DiAndroid, DiJava, DiReact, 
  DiNodejsSmall, DiFirebase, DiPython
} from 'react-icons/di';
import {
  SiExpress, SiTailwindcss, SiOpencv, SiTypescript, SiDjango,
  SiFlutter, SiDart, SiAndroidstudio, SiFramer, SiGoogle
} from 'react-icons/si';
import { FaFileCsv, FaDatabase, FaChartBar } from 'react-icons/fa';

const iconMap = {
  'React': <DiReact />,
  'TypeScript': <SiTypescript />,
  'Express': <SiExpress />,
  'Firebase': <DiFirebase />,
  'Gemini AI': <SiGoogle />,
  'Tailwind CSS': <SiTailwindcss />,
  'Framer Motion': <SiFramer />,
  'Android': <DiAndroid />,
  'Java': <DiJava />,
  'Flutter': <SiFlutter />,
  'Dart': <SiDart />,
  'Android Studio': <SiAndroidstudio />,
  'Python': <DiPython />,
  'OpenCV': <SiOpencv />,
  'Django': <SiDjango />,
  'Power BI': <FaChartBar />,
  'CSV': <FaFileCsv />,
  'Data Modeling': <FaDatabase />,
  'Node.js': <DiNodejsSmall />,
  'Database': <FaDatabase />
};

const ProjectsMain = () => {
  // Ensure scroll-to-top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-black text-white font-inter">
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <ProjectHero />
        {/* Projects Section */}
        <div id="projects-container" className="projects-section">
          {projects.map((project, index) => {
            // Map tech strings to the structured components expected by ProjectCard
            const techStack = project.technologies.map(tech => ({
              name: tech,
              icon: iconMap[tech] || <DiReact />
            }));

            return (
              <ProjectCard
                key={index}
                title={project.name}
                description={project.description}
                techStack={techStack}
                imageUrl={project.image}
                altText={project.name}
                githubUrl={project.github}
              />
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsMain;