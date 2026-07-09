// src/pages/AboutMain.jsx
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import AboutHero from './about/AboutHero.jsx';
import RevealOnScroll from './about/RevealOnScroll.jsx';
import { experience, education, achievements, certifications, profile } from '../data/portfolioData';
import avatar from '../assets/avatar.JPG';
import { 
  FaBriefcase, 
  FaGraduationCap, 
  FaAward, 
  FaCertificate, 
  FaCalendarAlt,
  FaShieldAlt,
  FaCode,
  FaTerminal
} from 'react-icons/fa';
import '../components/styles/About.css';

// SVG Circle competency indicator
const CompetencyCircle = ({ label, percentage }) => {
  const radius = 26;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 glass border border-green-500/10 rounded-xl relative overflow-hidden group">
      <svg className="w-16 h-16 transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          className="stroke-neutral-800"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Foreground circle with neon glow */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="url(#neon-green-grad-about)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{ filter: "drop-shadow(0px 0px 4px #00ff99)" }}
        />
        <defs>
          <linearGradient id="neon-green-grad-about" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff99" />
            <stop offset="100%" stopColor="#00ff33" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute top-[24px] text-[0.75rem] font-mono text-white font-bold">{percentage}%</span>
      <span className="mt-2 text-[0.7rem] font-mono text-gray-400 text-center tracking-wide uppercase">{label}</span>
    </div>
  );
};

// Mock Terminal Console Component
const TerminalConsole = () => {
  const [typedText, setTypedText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const commandText = "cat profile.json";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + commandText[index]);
      index++;
      if (index === commandText.length) {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 600);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const handleReRun = () => {
    setTypedText("");
    setShowOutput(false);
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + commandText[index]);
      index++;
      if (index === commandText.length) {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 600);
      }
    }, 70);
  };

  return (
    <div className="terminal-console">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot terminal-dot-red"></div>
          <div className="terminal-dot terminal-dot-yellow"></div>
          <div className="terminal-dot terminal-dot-green"></div>
        </div>
        <div className="terminal-title">bash - guest@shashwath</div>
        <button className="terminal-action-btn" onClick={handleReRun}>
          Re-run
        </button>
      </div>
      <div className="terminal-body text-left">
        <p className="m-0 flex items-center">
          <span className="terminal-input-prompt font-mono">guest@shashwath:~$</span>
          <span className="terminal-input-cmd font-mono text-white ml-2">{typedText}</span>
          {!showOutput && <span className="terminal-cursor"></span>}
        </p>
        {showOutput && (
          <pre className="terminal-output mt-4 animate-fade-in font-mono text-[#00ff99] leading-relaxed text-xs sm:text-sm">
{`{`}
{"\n"}  <span className="terminal-json-key">"name"</span>: <span className="terminal-json-string">"Shashwath K S"</span>,
{"\n"}  <span className="terminal-json-key">"role"</span>: <span className="terminal-json-string">"AI Engineer & Full-Stack Developer"</span>,
{"\n"}  <span className="terminal-json-key">"track"</span>: <span className="terminal-json-string">"M.Tech in Artificial Intelligence"</span>,
{"\n"}  <span className="terminal-json-key">"university"</span>: <span className="terminal-json-string">"REVA University, Bangalore"</span>,
{"\n"}  <span className="terminal-json-key">"languages"</span>: [
{"\n"}    <span className="terminal-json-string">"JavaScript"</span>, <span className="terminal-json-string">"TypeScript"</span>, <span className="terminal-json-string">"Python"</span>, <span className="terminal-json-string">"Java"</span>, <span className="terminal-json-string">"Dart"</span>
{"\n"}  ],
{"\n"}  <span className="terminal-json-key">"experience_years"</span>: <span className="terminal-json-number">3</span>,
{"\n"}  <span className="terminal-json-key">"active_status"</span>: <span className="terminal-json-string">"Systems: Online / Operational"</span>
{"\n"}{`}`}
          </pre>
        )}
      </div>
    </div>
  );
};

const About = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      window.scrollTo({ top: 0 });
    };
  }, []);

  return (
    <div className="about-dossier-wrapper bg-[#0e0e14] text-white font-inter">
      <a className="sr-only focus:not-sr-only p-2 m-2 rounded bg-green-600" href="#main-content">Skip to content</a>
      <div id="main-content" className="min-h-screen" role="main">
        <AboutHero />

        {/* Dossier Dashboard Layout */}
        <div className="about-dashboard-grid">
          
          {/* LEFT: Cyber Profile HUD Sidebar */}
          <aside className="about-hud-sidebar space-y-6">
            <RevealOnScroll>
              <div className="hud-profile-card text-center">
                
                {/* Scanner Avatar */}
                <div className="avatar-hud-wrapper">
                  <img src={avatar} alt="Shashwath KS avatar" className="avatar-hud-image" />
                  <div className="avatar-scanner-line"></div>
                </div>

                <h2 className="text-2xl font-bold tracking-tight mb-1 text-white">Shashwath K S</h2>
                <p className="text-green-400 font-mono text-sm tracking-widest uppercase mb-4">AI Eng & Full Stack Dev</p>
                
                {/* Pulse Status */}
                <div className="hud-status-badge">
                  <span className="hud-pulse-dot"></span>
                  <span>SYSTEMS: ONLINE</span>
                </div>

                {/* Focus Radial Metrics */}
                <div className="mt-8">
                  <h3 className="text-left font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">Focus Allocation</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <CompetencyCircle label="AI & ML" percentage={85} />
                    <CompetencyCircle label="Full-Stack" percentage={90} />
                    <CompetencyCircle label="Mobile App" percentage={85} />
                    <CompetencyCircle label="DevSecOps" percentage={80} />
                  </div>
                </div>

              </div>
            </RevealOnScroll>
          </aside>

          {/* RIGHT: Dossier Content Column */}
          <section className="about-dossier-content space-y-12">
            
            {/* Command Terminal Section */}
            <RevealOnScroll>
              <div>
                <h3 className="text-xs font-mono text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FaTerminal className="text-[10px]" /> Profile Diagnostics
                </h3>
                <TerminalConsole />
              </div>
            </RevealOnScroll>

            {/* Who I Am Narrative */}
            <RevealOnScroll>
              <div className="hud-profile-card">
                <h3 className="text-xs font-mono text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FaCode className="text-[10px]" /> Mission Log: Who I Am
                </h3>
                <p 
                  className="text-base text-gray-300 leading-relaxed text-justify space-y-4"
                  dangerouslySetInnerHTML={{ __html: profile.summary }}
                />
              </div>
            </RevealOnScroll>

            {/* Service Record (Experience) */}
            <RevealOnScroll>
              <div className="hud-profile-card">
                <h3 className="text-xs font-mono text-green-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <FaBriefcase className="text-[10px]" /> Professional Service Record
                </h3>
                
                <div className="cyber-timeline">
                  {experience.map((job) => (
                    <div key={job.company + job.role} className="cyber-timeline-item">
                      {/* Timeline Node */}
                      <div className="cyber-timeline-node"></div>
                      
                      {/* Card Content */}
                      <div className="cyber-timeline-card">
                        <FaBriefcase className="cyber-timeline-icon" />
                        <h3>{job.role}</h3>
                        <span className="subtitle">{job.company}</span>
                        <div className="period flex items-center gap-2">
                          <FaCalendarAlt className="text-xs" /> {job.duration}
                        </div>
                        <div className="description text-justify space-y-2 text-gray-400">
                          <p>{job.impact}</p>
                          {job.responsibilities && job.responsibilities.length > 0 && (
                            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-400">
                              {job.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                              ))}
                            </ul>
                          )}
                          {job.technologies && job.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {job.technologies.map((tech) => (
                                <span key={tech} className="px-2 py-0.5 text-xs font-mono rounded bg-green-500/10 text-green-400 border border-green-500/20">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Academic Track (Education) */}
            <RevealOnScroll>
              <div className="hud-profile-card">
                <h3 className="text-xs font-mono text-green-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <FaGraduationCap className="text-[10px]" /> Academic Record Timeline
                </h3>

                <div className="cyber-timeline">
                  {education.map((edu) => (
                    <div key={edu.school + edu.degree} className="cyber-timeline-item">
                      {/* Timeline Node */}
                      <div className="cyber-timeline-node"></div>

                      {/* Card Content */}
                      <div className="cyber-timeline-card">
                        <FaGraduationCap className="cyber-timeline-icon" />
                        <h3>{edu.degree}</h3>
                        <span className="subtitle">{edu.school}</span>
                        <div className="period flex items-center gap-2">
                          <FaCalendarAlt className="text-xs" /> {edu.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Merits & Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Achievements Column */}
              <RevealOnScroll>
                <div className="hud-profile-card h-full">
                  <h3 className="text-xs font-mono text-green-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FaAward className="text-[10px]" /> Accolades & Merits
                  </h3>
                  <div className="credentials-grid">
                    {achievements.map((ach, idx) => (
                      <div key={idx} className="badge-card col-span-1">
                        <div className="badge-icon-wrapper">
                          <FaAward />
                        </div>
                        <p className="badge-text text-left">{ach}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Certifications Column */}
              <RevealOnScroll>
                <div className="hud-profile-card h-full">
                  <h3 className="text-xs font-mono text-green-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FaCertificate className="text-[10px]" /> Certified Credentials
                  </h3>
                  <div className="credentials-grid">
                    {certifications.map((cert, idx) => (
                      <div key={idx} className="badge-card col-span-1">
                        <div className="badge-icon-wrapper">
                          <FaShieldAlt />
                        </div>
                        <p className="badge-text text-left">{cert}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

            </div>

          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
