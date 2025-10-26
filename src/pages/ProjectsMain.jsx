import React from 'react';
import Footer from '../components/Footer'; // Placeholder
import ProjectHero from './projects/ProjectHero';
import ProjectCard from './projects/ProjectCard';
import '../components/styles/styles.css';
import '../components/styles/projects.css'; 
import placholderImage from '../assets/Projects/project1.gif';

// 1. IMPORTED REACT ICONS
import {
  DiAndroid, DiJava, DiReact, 
  DiNodejsSmall, DiFirebase, DiPython
} from 'react-icons/di';
import {
  SiExpress, SiTailwindcss, SiOpencv, SiTypescript, SiDjango
} from 'react-icons/si';

// 2. UPDATED a (SkillSphere-CAT) to use your known data
const projectsData = [
  {
    title: "EventWhiz — Event Manager Android App",
    description: "EventWhiz is a powerful event management app built for Android, enabling seamless creation, tracking, and management of events. Designed with simplicity and usability in mind.",
    techStack: [
      { name: "Android", icon: <DiAndroid /> }, 
      { name: "Java", icon: <DiJava /> }        
    ],
    imageUrl: placholderImage,
    altText: "EventWhiz App GIF",
    githubUrl: "https://github.com/Shashwath-K/EventWhiz_EventApp"
  },
  {
    title: "SkillSphere-CAT — Online Learning Platform",
    description: "SkillSphere-CAT is a full-fledged online learning platform built with React, TypeScript, and Express. It integrates Gemini AI for automatic course and quiz generation, and uses Firebase for authentication and storage.",
    techStack: [
      { name: "React", icon: <DiReact /> },          
      { name: "TypeScript", icon: <SiTypescript /> },   
      { name: "Node.js", icon: <DiNodejsSmall /> },   
      { name: "Express", icon: <SiExpress /> },       
      { name: "Firebase", icon: <DiFirebase /> },     
      { name: "Tailwind", icon: <SiTailwindcss /> }   
    ],
    imageUrl: placholderImage,
    altText: "SkillSphere-CAT Platform GIF",
    githubUrl: "https://github.com/Shashwath-K/SkillSphere-CAT"
  },
  {
    title: "License Plate Detection & Toll Collection",
    description: "A computer vision-based project that detects license plates using Python and OpenCV. It extracts text with OCR, and evolved from a desktop program into a fully functional web application with toll collection simulation.",
    techStack: [
      { name: "Python", icon: <DiPython /> },    
      { name: "OpenCV", icon: <SiOpencv /> },    
      { name: "Django", icon: <SiDjango /> }      
    ],
    imageUrl: placholderImage,
    altText: "License Plate Detection GIF",
    githubUrl: "https://github.com/Shashwath-K/License_Plate_detection_and_toll_collection"
  }
];

const ProjectsMain = () => {
  return (
    // Note: Converted body to div, assuming App.js handles main body tags
    <div className="bg-black text-white font-inter">
      <main id="main-content" className="min-h-screen">
        {/* Hero Section */}
        <ProjectHero />
        {/* Projects Section */}
        <div id="projects-container" className="projects-section">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              imageUrl={project.imageUrl}
              altText={project.altText}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsMain;