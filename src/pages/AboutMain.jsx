import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import AboutHero from './about/AboutHero.jsx';
import EducationCard from './about/EducationCard.jsx';
import ExperienceCard from './about/ExperienceCard.jsx';
import RevealOnScroll from './about/RevealOnScroll.jsx';
import '../components/styles/About.css';

const educationData = [
  {
    degree: 'Bachelor of Engineering',
    institution: 'KVG College of Engineering',
    university: 'Visvesvaraya Technological University',
    period: '2022 - 2025', 
    details: 'Computer Science & Engineering',
  },
  {
    degree: 'Diploma in Computer Science',
    institution: 'KVG Polytechnic College',
    university: 'Board of Technical Examinations, Karnataka',
    period: '2019 - 2022',
    details: 'Specialized in Software Development',
  },
  {
    degree: 'Pre University Course',
    institution: 'Vidyanikethan PU College',
    university: 'Karnataka PU Board',
    period: '2017 - 2019',
    details: 'PCMB Stream',
  },
];

// Experience Data
const experienceData = [
  {
    title: 'Java Developer Intern',
    company: 'SNYCE Automations',
    period: '2025',
    description: 'Worked on a Spring Boot application to build RESTful APIs for CRUD operations, integrating with <strong class="text-green-400">MySQL</strong>. Focused on designing clean services, DTOs, and unit-tested controllers.'
  },
  {
    title: 'Student Ambassador & DevOps Intern',
    company: 'Rooman Technologies',
    period: '2024-2025',
    description: 'Represented Rooman on campus and supported community initiatives. As a DevOps intern contributed to CI/CD pipelines and automation tasks that improved deployment reliability.'
  },
  {
    title: 'Cybersecurity & Cloud Developer Intern',
    company: 'TechByHeart',
    period: '2023',
    description: 'Focused on cloud-native secure deployments and security audits. Helped implement hardening guidelines and automated security scans for microservices.'
  }
];

const summaryText = 'With a strong foundation in <strong>Java, Python, React, Spring Boot, MySQL, Firebase, and Flutter</strong>, I build scalable and user-friendly applications across mobile and web. I enjoy designing APIs and backend systems as much as crafting polished UIs — this blend lets me ship end-to-end solutions from prototype to production. Collaboration, curiosity and continuous learning guide my approach to engineering and product design.';

const About = () => {

  // 🔹 Ensure scroll-to-top on load and exit
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Optional cleanup: also scroll to top when unmounting (on exit)
    return () => {
      window.scrollTo({ top: 0 });
    };
  }, []);

  return (
    <div className="bg-[#0e0e14] text-white font-inter">
      <a className="sr-only focus:not-sr-only p-2 m-2 rounded bg-green-600" href="#main-content">Skip to content</a>
      <main id="main-content" className="min-h-screen" role="main">
        <AboutHero />

        {/* SUMMARY */}
        <section className="section-about summary-section px-6 py-16 bg-[#0b0b10]">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <div className="p-10 shadow-xl glass">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Who I Am</h2>
                <p 
                  className="text-lg text-gray-300 leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: summaryText }}
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section-about px-6 py-20 bg-[#0e0e14]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
            {/* Use the generic timeline wrapper class */}
            <div className="timeline-wrapper">
              {experienceData.map((job) => (
                <ExperienceCard
                  key={job.title}
                  title={job.title}
                  company={job.company}
                  period={job.period}
                  description={job.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section-about px-6 py-20 bg-[#0b0b10]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Education Timeline</h2>
            {/* Use the generic timeline wrapper class */}
            <div className="timeline-wrapper">
              {educationData.map((edu) => (
                <EducationCard
                  key={edu.institution}
                  degree={edu.degree}
                  institution={edu.institution}
                  university={edu.university}
                  period={edu.period}
                  details={edu.details}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
