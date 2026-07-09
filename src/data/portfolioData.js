import eventwhiz from '../assets/Projects/eventwhiz.png';
import skillsphere from '../assets/Projects/skillsphere.png';
import licensePlate from '../assets/Projects/license_plate.png';
import cybersecurityDashboard from '../assets/Projects/cybersecurity_dashboard.png';

export const profile = {
  name: 'Shashwath K S',
  role: 'Software Engineer | Full Stack Developer | AI/ML Builder',
  location: 'India',
  summary:
    'I build practical, polished software across web, mobile, and AI workflows. My focus is end-to-end delivery: thoughtful UI, reliable backend services, strong problem solving, and a product mindset that keeps the experience recruiter-friendly and user-first.',
  highlights: [
    'Full-stack development with React, TypeScript, Node.js, Express, Firebase, and Spring Boot',
    'Applied AI/ML projects including learning platforms and computer vision workflows',
    'Experience spanning software development, DevOps exposure, and campus leadership',
  ],
  links: {
    github: 'https://github.com/Shashwath-K',
    linkedin: 'https://www.linkedin.com/in/shashwath-kukkunoor-2b4277225',
    twitter: 'https://x.com/shashwath_k15',
    resume: '#contact',
    email: 'shashwathkukkunoor@outlook.com',
  },
};

export const skills = {
  'Programming Languages': ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'Dart'],
  Frontend: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'HTML', 'CSS'],
  Backend: ['Node.js', 'Express', 'Spring Boot', 'REST APIs'],
  'AI / ML': ['Gemini AI', 'OpenCV', 'OCR', 'Computer Vision'],
  Cloud: ['Firebase', 'Vercel'],
  Databases: ['MySQL', 'Firestore'],
  DevOps: ['CI/CD', 'GitHub', 'Git', 'Linux'],
  Tools: ['Figma', 'VS Code', 'Postman'],
  Frameworks: ['Django', 'Flutter'],
  'Other Technologies': ['Android', 'Responsive Design', 'Accessibility'],
};

export const experience = [
  {
    company: 'SNYCE Automations',
    role: 'Java Developer Intern',
    duration: '2025',
    impact:
      'Worked on a Spring Boot application to build RESTful APIs for CRUD operations, integrating with MySQL. Focused on designing clean services, DTOs, and unit-tested controllers.',
    responsibilities: [
      'Designed service and controller layers for clean API delivery',
      'Worked with DTO-driven request and response flow',
      'Improved maintainability through structured backend patterns',
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'REST APIs'],
  },
  {
    company: 'Rooman Technologies',
    role: 'Student Ambassador & DevOps Intern',
    duration: '2024 - 2025',
    impact:
      'Represented Rooman on campus and supported community initiatives. As a DevOps intern contributed to CI/CD pipelines and automation tasks that improved deployment reliability.',
    responsibilities: [
      'Represented the organization in student-facing initiatives',
      'Contributed to CI/CD and automation tasks',
      'Helped improve deployment consistency and developer workflow',
    ],
    technologies: ['CI/CD', 'DevOps', 'Git', 'Linux'],
  },
  {
    company: 'TechByHeart',
    role: 'Cybersecurity & Cloud Developer Intern',
    duration: '2023',
    impact:
      'Focused on cloud-native secure deployments and security audits. Helped implement hardening guidelines and automated security scans for microservices.',
    responsibilities: [
      'Supported cloud-native deployment workflows',
      'Assisted with security checks and hardening guidance',
      'Helped automate scan and validation steps',
    ],
    technologies: ['Cloud', 'Security', 'Automation', 'Microservices'],
  },
];

export const education = [
  {
    school: 'REVA University',
    degree: 'Master of Technology, Artificial Intelligence',
    duration: '2025 - Present',
  },
  {
    school: 'KVG College of Engineering',
    degree: 'Bachelor of Engineering, Computer Science & Engineering',
    duration: '2022 - 2025',
  },
  {
    school: 'KVG Polytechnic College',
    degree: 'Diploma in Computer Science',
    duration: '2019 - 2022',
  },
  {
    school: 'Vidyanikethan PU College',
    degree: 'Pre University Course, PCMB',
    duration: '2017 - 2019',
  },
];

export const achievements = [
  'Recognized as "Best Outgoing Student" at KVG College of Engineering (2025)',
  'Served as President of the COGNEX Association at KVGCE, leading and conducting technical PC assembly workshops and load-testing internships',
  'Built and shipped multiple full-stack and mobile applications published on GitHub',
  'Hands-on experience in DevOps pipelines, cloud secure deployments, and database management',
];

export const certifications = [
  'NPTEL Online Certification (July - September 2024)',
  'IBM Certified: Python 101 for Data Science',
];

export const projects = [
  {
    name: 'SkillSphere-Demo',
    description: 'An AI-assisted learning platform for creating and managing courses and quizzes.',
    problem: 'Helps automate course generation and learning workflows for faster content delivery.',
    technologies: ['React', 'TypeScript', 'Express', 'Firebase', 'Gemini AI', 'Tailwind CSS', 'Framer Motion'],
    features: ['AI-powered course and quiz generation', 'Authentication and storage', 'Responsive interface', 'Smooth animations with Framer Motion'],
    github: 'https://github.com/Shashwath-K/SkillSphere-Demo',
    image: skillsphere,
  },
  {
    name: 'EventWhiz_EventApp',
    description: 'An Android event management app built for simple event creation and tracking.',
    problem: 'Makes event planning and tracking easier on mobile.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Android Studio'],
    features: ['Mobile-first event management', 'Simple workflow', 'Clean user experience', 'Built using Flutter and Dart 3'],
    github: 'https://github.com/Shashwath-K/EventWhiz_EventApp',
    image: eventwhiz,
  },
  {
    name: 'License Plate Detection & Toll Collection',
    description: 'A computer vision project for license plate detection and toll-flow simulation.',
    problem: 'Demonstrates automated vehicle identification for toll scenarios.',
    technologies: ['Python', 'OpenCV', 'Django'],
    features: ['Image-based detection', 'OCR pipeline', 'Web-app evolution', 'Toll collection simulation'],
    github: 'https://github.com/Shashwath-K/License_Plate_detection_and_toll_collection',
    image: licensePlate,
  },
  {
    name: 'Cybersecurity Demo Dashboard',
    description: 'A Power BI dashboard project for tracking cybersecurity incidents and risk compliance.',
    problem: 'Provides security teams with real-time risk insights, compliance status, and asset exposure.',
    technologies: ['Power BI', 'CSV', 'Data Modeling'],
    features: ['Real-time cyber-risk insights', 'Asset exposure analytics', 'Compliance framework mappings', 'Incident severity distribution charts'],
    github: 'https://github.com/Shashwath-K/Cybersecurity-Demo-Dashboard',
    image: cybersecurityDashboard,
  },
];
