import React from 'react';
import { SiGithub, SiLinkedin, SiX, SiInstagram } from 'react-icons/si';

// --- Data for Contact Info ---
// Making this data-driven for easier updates
const contactInfo = [
  {
    title: 'Email',
    content: 'shashwathkukkunoor@outlook.com',
  },
  {
    title: 'Location',
    content: 'Bengaluru, India',
  },
  {
    title: 'Availability',
    content: 'Open for internships, freelance & collaboration. Response within ~48 hours.',
  },
];

// --- Data for Social Badges ---
// Updated with React Icons and hrefs
const socialLinks = [
  {
    name: 'GitHub',
    label: 'GitHub',
    icon: <SiGithub />,
    href: 'https://github.com/Shashwath-K', // Added link
  },
  {
    name: 'LinkedIn',
    label: 'LinkedIn',
    icon: <SiLinkedin />,
    href: 'https://www.linkedin.com/in/shashwath-kukkunoor-2b4277225/', // Add your link
  },
  {
    name: 'X',
    label: 'X / Twitter',
    icon: <SiX />, // Changed from Twitter
    href: 'https://x.com/shashwath_k15', // Add your link
  },
  {
    name: 'Instagram',
    label: 'Instagram',
    icon: <SiInstagram />,
    href: 'https://www.instagram.com/shashwath_kukku?igsh=cXprb2JnMGRqMmZu', // Add your link
  },
];

/**
 * A small component for a single contact detail item.
 */
const ContactInfoItem = ({ title, content }) => (
  <div>
    <dt className="kicker">{title}</dt>
    <dd className="mt-1"><span className="text-muted">{content}</span></dd>
  </div>
);

/**
 * A small component for a single social media badge/link.
 * This is now a functional <a> tag.
 */
const SocialBadge = ({ name, label, icon, href }) => (
  <a
    href={href}
    className="badge" // This class is styled by your complex contact.css
    aria-label={name}
    target="_blank"
    rel="noopener noreferrer"
    role="listitem"
  >
    {icon}
    <span className="small">{label}</span>
  </a>
);

/**
 * The main ContactDetails component.
 */
const ContactDetails = () => {
  return (
    <aside className="contact-right" aria-labelledby="contact-details-title">
      
      {/* Contact Info Card */}
      {/* Removed .glass, .p-6, etc. to use the .card style from your complex CSS */}
      <div className="card contact-info-card">
        <h3 id="contact-details-title">Contact details</h3>
        <dl className="text-sm text-gray-300 space-y-3">
          {contactInfo.map((item) => (
            <ContactInfoItem
              key={item.title}
              title={item.title}
              content={item.content}
            />
          ))}
        </dl>
      </div>

      {/* Socials Card */}
      <div className="card social-card">
        <h3>Find me on</h3>
        <div className="social-badges" role="list">
          {socialLinks.map((social) => (
            <SocialBadge
              key={social.name}
              name={social.name}
              label={social.label}
              icon={social.icon}
              href={social.href}
            />
          ))}
        </div>
        <p className="text-sm text-muted mt-2">
          Prefer not to use the form? You can also email me directly at{' '}
          <strong>shashwathkukkunoor@outlook.com</strong>.
        </p>
      </div>
    </aside>
  );
};

export default ContactDetails;