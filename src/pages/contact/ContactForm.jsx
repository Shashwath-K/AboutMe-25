import React, { useState } from 'react';

/**
 * A reusable, styled form input component.
 * It can render an <input> or <textarea> based on the 'type' prop.
 */
const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  // Use the 'input' class for both <input> and <textarea>
  // Your CSS file styles them based on the tag.
  const inputProps = {
    id: name,
    name: name,
    placeholder: placeholder,
    className: 'input',
    value: value,
    onChange: onChange,
    required: required,
  };

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      {type === 'textarea' ? (
        <textarea {...inputProps} rows="6"></textarea>
      ) : (
        <input {...inputProps} type={type} />
      )}
    </div>
  );
};

/**
 * The main Contact Form component.
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] =useState('');
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
      setStatus('Your email client should open. If not, please email me directly.');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    }, 600);
  };

  return (
    <div className="contact-left" role="form" aria-labelledby="contact-form-heading">
      {/* This div now uses the .card class from your complex CSS file.
        All utility classes like .glass, .p-6, .rounded-xl are removed.
      */}
      <div className="card contact-form-card">
        <h2 id="contact-form-heading">Send a message</h2>
        <p className="text-muted" style={{ transform: 'translateZ(20px)' }}>
          Fill out this form and your email client will open with the message pre-filled.
        </p>

        {/* The form no longer needs .space-y-4, as the .card gap handles it.
          All inputs are replaced with the new FormInput component.
        */}
        <form id="contact-form" noValidate onSubmit={handleSubmit} style={{ display: 'contents' }}>
          
          <FormInput
            label="Name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="name@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Subject"
            name="subject"
            placeholder="Quick note about the topic"
            value={formData.subject}
            onChange={handleChange}
          />

          <FormInput
            label="Message"
            name="message"
            type="textarea"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          {/* This markup matches the .form-actions in your complex CSS */}
          <div className="form-actions">
            <button id="submit-btn" type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? 'Preparing...' : 'Send message'}
            </button>
            <div id="form-status" role="status" aria-live="polite">
              {status}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;