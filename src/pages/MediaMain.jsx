import React, { useState } from 'react';
import '../components/styles/media.css'

const allGalleryItems = [
  { id: 1, type: 'photo', title: 'Urban Exploration', img: 'https://placehold.co/600x800/222/fff?text=Photo+1' },
  { id: 2, type: 'video', title: 'Product Reel', img: 'https://placehold.co/600x400/222/fff?text=Video+1' },
  { id: 3, type: 'design', title: 'Branding Concept', img: 'https://placehold.co/600x400/222/fff?text=Design+1' },
  { id: 4, type: 'photo', title: 'Coastal Landscapes', img: 'https://placehold.co/600x400/222/fff?text=Photo+2' },
  { id: 5, type: 'photo', title: 'Portrait Study', img: 'https://placehold.co/600x400/222/fff?text=Photo+3' },
  { id: 6, type: 'video', title: 'Short Film', img: 'https://placehold.co/600x800/222/fff?text=Video+2' },
  { id: 7, type: 'design', title: 'UI/UX Wireframes', img: 'https://placehold.co/600x400/222/fff?text=Design+2' },
];

const filterCategories = [
  { id: 'all', name: 'All' },
  { id: 'photo', name: 'Photography' },
  { id: 'video', name: 'Videography' },
  { id: 'design', name: 'Design' },
];

const MediaMain = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <>
      <main id="main-content">
        <MediaHero />
        <div className="gallery-container container">
          <MediaCategories 
            categories={filterCategories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
          <MediaCards 
            items={allGalleryItems}
            activeFilter={activeFilter}
          />
        </div>
      </main>
    </>
  );
};

// --- Hero Section With Overlay ---
const MediaHero = () => (
  <div className="page-hero-container">
    <div className="hero-section relative" style={{ minHeight: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Matrix Background */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none">
        <div className="matrix-pattern">
          {[...Array(28)].map((_, idx) => (
            <div key={idx} className="matrix-column"></div>
          ))}
        </div>
      </div>
      {/* Overlay for contrast */}
      <div className="hero-bg-overlay absolute inset-0 z-10" 
           style={{ background: 'rgba(13,17,23,0.78)', pointerEvents: 'none' }} />
      {/* Hero Content */}
      <div className="hero-content relative z-20 text-center" style={{ width: '100%' }}>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3"
          style={{ textShadow: '0 2px 14px rgba(0,0,0,0.9), 0 1px 0 #333' }}>
          Media & Gallery
        </h1>
        <p className="text-lg lg:text-xl text-gray-300"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
          A collection of my creative work.
        </p>
      </div>
    </div>
  </div>
);

const MediaCategories = ({ categories, activeFilter, onFilterChange }) => (
  <div className="controls-bar">
    {categories.map(category => (
      <button
        key={category.id}
        onClick={() => onFilterChange(category.id)}
        aria-pressed={activeFilter === category.id}
        className={`btn-filter ${activeFilter === category.id ? 'active' : ''}`}
      >
        {category.name}
      </button>
    ))}
  </div>
);

const MediaCards = ({ items, activeFilter }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery-grid">
      {items.map((item, index) => {
        const isVisible = activeFilter === 'all' || item.type === activeFilter;

        return (
          <div
            key={item.id}
            data-type={item.type}
            aria-hidden={!isVisible}
            style={{ '--delay': `${index * 0.05}s` }}
            className="gallery-item"
          >
            <div className="thumb-frame">
              <img
                src={item.img}
                alt={item.title}
                className={`thumb ${loadedImages[item.id] ? 'thumb-loaded' : ''}`}
                onLoad={() => handleImageLoad(item.id)}
                loading="lazy"
              />
              <div className="thumb-meta">
                <h3 className="thumb-title">{item.title}</h3>
                <p className="capitalize">{item.type}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MediaMain;
