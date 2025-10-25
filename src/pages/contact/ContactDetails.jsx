import React from 'react';

// Data for social badges
const socialLinks = [
  { name: 'GitHub', icon: 'devicon-github-original', label: 'GitHub' },
  { name: 'LinkedIn', icon: 'devicon-linkedin-plain', label: 'LinkedIn' },
  { name: 'Twitter', icon: 'devicon-twitter-original', label: 'X / Twitter' },
  { name: 'Instagram', icon: 'devicon-instagram-plain', label: 'Instagram' },
];

const ContactDetails = () => {
  return (
    <aside className="contact-right" aria-labelledby="contact-details-title">
      <div className="glass p-6 rounded-xl shadow-xl contact-info-card">
        <h3 id="contact-details-title" className="text-xl font-semibold mb-3">Contact details</h3>
        <dl className="text-sm text-gray-300 space-y-3">
          <div>
            <dt className="kicker">Email</dt>
            <dd className="mt-1"><span className="text-muted">shashwathkukkunoor@outlook.com</span></dd>
          </div>
          <div>
            <dt className="kicker">Location</dt>
            <dd className="mt-1"><span className="text-muted">Bengaluru, India</span></dd>
          </div>
          <div>
            <dt className="kicker">Availability</dt>
            <dd className="mt-1"><span className="text-muted">Open for internships, freelance & collaboration, response within ~48 hours.</span></dd>
          </div>
        </dl>
      </div>

      <div className="glass p-6 rounded-xl shadow-xl social-card">
        <h3 className="text-xl font-semibold mb-3">Find me on</h3>
        <div className="social-badges flex flex-wrap gap-3 mb-4" role="list">
          {socialLinks.map((social) => (
            <div key={social.name} className="badge" role="listitem" aria-label={social.name}>
              <i className={social.icon}></i>
              <span className="ml-2 small">{social.label}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted mt-2">
          Prefer not to use the form? You can also email me directly at <strong>shashwathkukkunoor@outlook.com</strong>.
        </p>
      </div>
    </aside>
  );
};

export default ContactDetails;