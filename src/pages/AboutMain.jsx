// src/pages/AboutMain.jsx
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import AboutHero from './about/AboutHero.jsx';
import RevealOnScroll from './about/RevealOnScroll.jsx';
import { experience, education, achievements, certifications, profile } from '../data/portfolioData';
import {
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaCertificate,
  FaCalendarAlt,
  FaShieldAlt,
  FaCode,
  FaTerminal,
  FaJava,
  FaDatabase,
  FaServer,
  FaNetworkWired,
  FaSyncAlt,
  FaTools,
  FaGitAlt,
  FaLinux,
  FaCloud,
  FaLock,
  FaRobot,
  FaCubes
} from 'react-icons/fa';
import '../components/styles/About.css';

// Helper function for mapping technologies to specific icons
const getTechIcon = (tech) => {
  const iconProps = { className: "text-[#00ff99]", size: 14 };
  const lowerTech = tech.toLowerCase();

  if (lowerTech.includes('java')) return <FaJava {...iconProps} />;
  if (lowerTech.includes('spring')) return <FaServer {...iconProps} />;
  if (lowerTech.includes('mysql') || lowerTech.includes('database')) return <FaDatabase {...iconProps} />;
  if (lowerTech.includes('api') || lowerTech.includes('rest')) return <FaNetworkWired {...iconProps} />;
  if (lowerTech.includes('ci/cd')) return <FaSyncAlt {...iconProps} />;
  if (lowerTech.includes('devops')) return <FaTools {...iconProps} />;
  if (lowerTech.includes('git')) return <FaGitAlt {...iconProps} />;
  if (lowerTech.includes('linux')) return <FaLinux {...iconProps} />;
  if (lowerTech.includes('cloud')) return <FaCloud {...iconProps} />;
  if (lowerTech.includes('security')) return <FaLock {...iconProps} />;
  if (lowerTech.includes('automation')) return <FaRobot {...iconProps} />;
  if (lowerTech.includes('microservices')) return <FaCubes {...iconProps} />;

  return <FaCode {...iconProps} />;
};

// Technologies data mapping
const techSkills = {
  languages: ["JavaScript", "TypeScript", "Python", "Java", "Dart", "HTML & CSS"],
  frameworks: ["React.js", "Next.js", "Node.js", "Express", "React Native", "Flutter"],
  ai: ["PyTorch", "TensorFlow", "OpenCV", "LangChain", "Hugging Face"],
  databases: ["MongoDB", "PostgreSQL", "SQLite", "Firebase", "Docker", "Git"]
};

// Matrix Cipher Text Decryption Component
const DecryptText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const triggerDecryption = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);

    const chars = '01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ@#$%&?*';
    const originalText = text;
    let iterations = 0;

    const interval = setInterval(() => {
      setDisplayText(() =>
        originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return originalText[index];
            }
            return chars.charAt(Math.floor(Math.random() * chars.length));
          })
          .join("")
      );

      iterations += 1 / 2; // speed controls how fast characters decode
      if (iterations >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsDecrypting(false);
      }
    }, 25);
  };

  useEffect(() => {
    triggerDecryption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className="decrypting-text cursor-default"
      onMouseEnter={triggerDecryption}
    >
      {displayText}
    </span>
  );
};

// Upgraded Interactive Terminal Console Component
const TerminalConsole = () => {
  const [history, setHistory] = useState([]);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const commandTextMap = {
    help: `Available commands:
  - profile: View structural profile JSON metadata.
  - experience: Summarize professional history.
  - education: Summarize education and academic track.
  - clear: Reset terminal and command logs.`,

    profile: `{
  "name": "Shashwath K S",
  "role": "AI Engineer & Full-Stack Developer",
  "track": "M.Tech in Artificial Intelligence",
  "university": "REVA University, Bangalore",
  "languages": ["JavaScript", "TypeScript", "Python", "Java", "Dart"],
  "experience_years": 3,
  "active_status": "Systems: Online / Operational"
}`,

    experience: `- Lead AI & Mobile Developer at SNYCE Automations (2024 - Present)
  * Integrated NLP models and offline-first mobile apps.
- Web Developer Intern at Rooman Technologies (2023 - 2024)
  * Refactored responsive corporate dashboards.
- Project Intern at TechByHeart (2022 - 2023)
  * Developed flutter packages and BLE communication code.`,

    education: `- M.Tech in Artificial Intelligence
  * REVA University, Bangalore (2023 - 2025)
- B.E. in Computer Science & Engineering
  * K.V.G College of Engineering, Sullia (2018 - 2022)`,
  };

  const runCommand = (cmd) => {
    if (isTyping) return;
    setIsTyping(true);
    setTypedText("");

    let currentText = "";
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < cmd.length) {
        currentText += cmd.charAt(idx);
        setTypedText(currentText);
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (cmd === 'clear') {
            setHistory([]);
          } else {
            const outText = commandTextMap[cmd] || `bash: command not found: ${cmd}. Type 'help' for options.`;
            setHistory((prev) => [
              ...prev,
              { type: 'input', text: cmd },
              { type: 'output', text: outText }
            ]);
          }
          setTypedText("");
          setIsTyping(false);
        }, 300);
      }
    }, 45);
  };

  useEffect(() => {
    setHistory([]);
    runCommand('profile');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="terminal-console text-left">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot terminal-dot-red"></div>
          <div className="terminal-dot terminal-dot-yellow"></div>
          <div className="terminal-dot terminal-dot-green"></div>
        </div>
        <div className="terminal-title font-mono text-[10px] sm:text-xs">bash - guest@shashwath</div>
        <button className="terminal-action-btn font-mono" onClick={() => runCommand('help')}>
          Help
        </button>
      </div>

      <div className="terminal-body font-mono text-xs sm:text-sm">
        <div className="terminal-history-scroll space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.type === 'input' ? (
                <p className="m-0 flex items-center">
                  <span className="terminal-input-prompt font-mono">guest@shashwath:~$</span>
                  <span className="terminal-input-cmd font-mono text-white ml-2">{item.text}</span>
                </p>
              ) : (
                <pre className="terminal-output m-0 text-[#00ff99] leading-relaxed whitespace-pre-wrap pl-4 border-l border-green-500/10">
                  {item.text}
                </pre>
              )}
            </div>
          ))}

          {isTyping && (
            <p className="m-0 flex items-center">
              <span className="terminal-input-prompt font-mono">guest@shashwath:~$</span>
              <span className="terminal-input-cmd font-mono text-white ml-2">{typedText}</span>
              <span className="terminal-cursor"></span>
            </p>
          )}
        </div>

        {/* Console command shortcut trigger panel */}
        <div className="terminal-shortcuts-container">
          <span className="text-[10px] text-gray-500 font-mono self-center mr-2 uppercase tracking-wide">Execute:</span>
          {['profile', 'experience', 'education', 'clear'].map((cmd) => (
            <button
              key={cmd}
              disabled={isTyping}
              className="terminal-shortcut-btn"
              onClick={() => runCommand(cmd)}
            >
              {cmd}
            </button>
          ))}
        </div>
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
        <div className="about-dashboard-grid animate-fade-in">

          {/* RIGHT: Dossier Content Column */}
          <section className="about-dossier-content space-y-12">

            {/* Interactive Command Terminal Section */}
            <RevealOnScroll>
              <div>
                <h3 className="text-xs font-mono text-green-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <FaTerminal className="text-[10px]" /> Interactive Console
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
                      <div className="cyber-timeline-node"></div>

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
                            <div
                              className="flex flex-wrap pt-4"
                              style={{ gap: '0.75rem' }}
                            >
                              {job.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="flex items-center gap-2 text-[0.8rem] font-mono text-[#00ff99] bg-[#00ff99]/[0.06] border border-[#00ff99]/20 px-5 py-2 rounded-full"
                                  style={{ marginRight: '0.5rem', marginBottom: '0.5rem' }}
                                >
                                  {getTechIcon(tech)}
                                  <span>{tech}</span>
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
                      <div className="cyber-timeline-node"></div>

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
            <div className="about-credentials-container">

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
                        <p className="badge-text text-left">
                          <DecryptText text={ach} />
                        </p>
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
                        <p className="badge-text text-left">
                          <DecryptText text={cert} />
                        </p>
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
