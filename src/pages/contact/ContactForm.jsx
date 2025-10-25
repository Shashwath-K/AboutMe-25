import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('');

    const { name, email, subject, message } = formData;

    // Validation
    if (!name.trim()) {
      setStatus('Please enter your name.');
      return;
    }
    if (!email.trim() || !validateEmail(email)) {
      setStatus('Please enter a valid email.');
      return;
    }
    if (!message.trim()) {
      setStatus('Please add a brief message.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Preparing...');

    // Build mailto fallback
    const finalSubject = subject.trim() || 'Hello from website';
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:shashwathkukkunoor@outlook.com?subject=${encodeURIComponent(finalSubject)}&body=${body}`;

    // Try to open mail client
    setTimeout(() => {
      window.location.href = mailto;
      
      // Restore form state
      setIsSubmitting(false);
      setStatus('Your email client should open. If not, please email shashwathkukkunoor@outlook.com directly.');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    }, 600);
  };

  return (
    <div className="contact-left" role="form" aria-labelledby="contact-form-heading">
      <div className="glass p-6 rounded-xl shadow-xl contact-form-card">
        <h2 id="contact-form-heading" className="text-2xl font-bold mb-4">Send a message</h2>
        <p className="text-sm text-gray-400 mb-4">Fill out this form and your email client will open with the message pre-filled. Validation runs locally first.</p>

        <form id="contact-form" className="space-y-4" aria-label="Contact form" noValidate onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="col-span-1">
              <span className="small text-muted">Name</span>
              <input
                id="name" name="name" type="text" required
                placeholder="Your name" className="input mt-1"
                value={formData.name} onChange={handleChange}
              />
            </label>
            <label className="col-span-1">
              <span className="small text-muted">Email</span>
              <input
                id="email" name="email" type="email" required
                placeholder="name@email.com" className="input mt-1"
                value={formData.email} onChange={handleChange}
              />
            </label>
          </div>

          <label>
            <span className="small text-muted">Subject</span>
            <input
              id="subject" name="subject" type="text"
              placeholder="Quick note about the topic" className="input mt-1"
              value={formData.subject} onChange={handleChange}
            />
          </label>

          <label>
            <span className="small text-muted">Message</span>
            <textarea
              id="message" name="message" rows="6" required
              placeholder="Write your message..." className="input mt-1"
              value={formData.message} onChange={handleChange}
            ></textarea>
          </label>

          <div className="form-actions">
            <button id="submit-btn" type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? 'Preparing...' : 'Send message'}
            </button>
            <div id="form-status" role="status" aria-live="polite" className="text-sm text-muted">
              {status}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;