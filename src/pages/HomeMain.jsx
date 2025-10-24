import React from 'react';
import { Helmet } from 'react-helmet'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Placeholder Components ---
// We'll define simple placeholders here so the app can run.
// You can delete these as you build the real components in their respective files.

const Placeholder = ({ name, path }) => (
  <div className="p-10 my-8 border border-dashed border-gray-600 rounded-lg bg-gray-900/50">
    <h2 className="text-2xl font-bold text-gray-400">{name} Component</h2>
    <p className="text-gray-500 mt-2">
      Create this component in: <code>{path}</code>
    </p>
  </div>
);

const Hero = () => <Placeholder name="Hero" path="src/pages/home/Hero.jsx" />;
const WhatIDo = () => <Placeholder name="WhatIDo" path="src/pages/home/WhatIDo.jsx" />;
const Stacks = () => <Placeholder name="Stacks" path="src/pages/home/Stacks.jsx" />;
const DevStats = () => <Placeholder name_long="DevStats" path="src/pages/home/DevStats.jsx" />;
const Notes = () => <Placeholder name_long="Notes" path="src/pages/home/Notes.jsx" />;

// --- End Placeholder Components ---


/**
 * Note: Your original index.html loads various CSS files like:
 * - styles/home/hero.css
 * - styles/home/stacks.css
 * * The "React" way to handle this is to import the specific CSS
 * file *inside* its matching component.
 * * For example, your 'src/pages/home/Hero.jsx' file should start with:
 * import React from 'react';
 * import './Hero.css'; // Import the component-specific styles
 * * function Hero() { ... }
 */

const HomeMain = () => {
  return (
    // <Helmet> will work perfectly without a provider
    <>
      {/*
        // TODO: Uncomment this block after running "npm install react-helmet"
        <Helmet>
          <title>Shashwath KS — Full-Stack / Mobile Developer</title>
          <meta 
            name="description" 
            content="Shashwath KS — Full-stack & mobile developer. UI/UX, Flutter, React, Next.js, photography and design." 
          />
        </Helmet>
      */}

      {/* This structure directly matches your old index.html.
        Header and Footer are included here. You could also move them
        to your 'LayoutWrapper' in App.jsx if you want them on *every* page.
      */}
      <Header />

      <main id="main-content">
        <Hero />
        <WhatIDo />
        <Stacks />
        <DevStats />
        <Notes />
      </main>

      <Footer />
    </>
  );
};

// Main export
export default HomeMain;

