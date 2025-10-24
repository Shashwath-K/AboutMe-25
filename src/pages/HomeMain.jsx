import React from 'react';
import { Helmet } from 'react-helmet'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from './home/Hero';
import DevStats from './home/DevStats';
import Notes from './home/Notes';
import Stacks from './home/Stacks';
import WhatIDo from './home/WhatIDo';
import '../components/styles/styles.css';

const HomeMain = () => {
  return (
    <>
      <Helmet>
        <title>Shashwath KS — Full-Stack / Mobile Developer</title>
        <meta 
          name="description" 
          content="Shashwath KS — Full-stack & mobile developer. UI/UX, Flutter, React, Next.js, photography and design." 
        />
      </Helmet>

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

