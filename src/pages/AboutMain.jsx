import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import AboutHero from './about/AboutHero.jsx';
import EducationCard from './about/EducationCard.jsx';
import ExperienceCard from './about/ExperienceCard.jsx';
import RevealOnScroll from './about/RevealOnScroll.jsx';
import { experience, education, achievements, certifications, profile } from '../data/portfolioData';
import '../components/styles/About.css';

const formatExperienceDescription = (job) => {
  let html = `<p>${job.impact}</p>`;
  if (job.responsibilities && job.responsibilities.length > 0) {
    html += `<ul class="list-disc pl-5 mt-3 space-y-1 text-sm text-gray-400">`;
    job.responsibilities.forEach(resp => {
      html += `<li>${resp}</li>`;
    });
    html += `</ul>`;
  }
  if (job.technologies && job.technologies.length > 0) {
    html += `<div class="mt-4 flex flex-wrap gap-2">`;
    job.technologies.forEach(tech => {
      html += `<span class="px-2 py-0.5 text-xs rounded bg-green-500/10 text-green-400 border border-green-500/20">${tech}</span>`;
    });
    html += `</div>`;
  }
  return html;
};

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
      <div id="main-content" className="min-h-screen" role="main">
        <AboutHero />

        {/* SUMMARY */}
        <section className="section-about summary-section px-6 py-16 bg-[#0b0b10]">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <div className="p-10 shadow-xl glass">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Who I Am</h2>
                <p 
                  className="text-lg text-gray-300 leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: profile.summary }}
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
              {experience.map((job) => (
                <ExperienceCard
                  key={job.company + job.role}
                  title={job.role}
                  company={job.company}
                  period={job.duration}
                  description={formatExperienceDescription(job)}
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
              {education.map((edu, index) => (
                <EducationCard
                  key={edu.school + edu.degree}
                  index={index}
                  degree={edu.degree}
                  institution={edu.school}
                  university="KVG Institution / Board"
                  period={edu.duration}
                  details=""
                />
              ))}
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS & CERTIFICATIONS */}
        <section className="section-about px-6 py-20 bg-[#0e0e14]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Achievements Column */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-12">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((ach, idx) => (
                  <RevealOnScroll key={idx}>
                    <div className="p-6 glass shadow-xl">
                      <p className="text-gray-300 leading-relaxed">{ach}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* Certifications Column */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-12">Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <RevealOnScroll key={idx}>
                    <div className="p-6 glass shadow-xl">
                      <p className="text-gray-300 leading-relaxed">{cert}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
