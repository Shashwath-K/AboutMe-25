import React from 'react';
import Footer from '../components/Footer'; // Placeholder
import ContactHero from './contact/ContactHero.jsx';
import ContactForm from './contact/ContactForm.jsx';
import ContactDetails from './contact/ContactDetails.jsx';
import '../components/styles/Contact.css';

const Contacts = () => {
  return (
    <div className="bg-[#0e0e14] text-white font-inter">
      {/* Skip link for accessibility */}
      <a className="sr-only focus:not-sr-only p-2 m-2 rounded bg-green-600" href="#contact-form">
        Skip to contact form
      </a>

      <main id="main-content" className="min-h-screen">
        <ContactHero />

        {/* Contact Content */}
        <section className="section px-6 py-16 bg-[#0b0b10] contact-section">
          <div className="max-w-6xl mx-auto contact-grid" role="region" aria-label="Contact area">
            
            {/* Left: Contact form */}
            <ContactForm />

            {/* Right: Contact details & socials */}
            <ContactDetails />

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;