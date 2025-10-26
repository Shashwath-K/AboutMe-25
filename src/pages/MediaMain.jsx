import React, { useState, useRef } from 'react';
import '../components/styles/media.css';

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
  const [filtering, setFiltering] = useState(false);
  const timeoutRef = useRef(null);

  // Enhanced filter switching animation
  const handleFilterChange = (filter) => {
    if (activeFilter === filter) return;
    setFiltering(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // time must match the out-duration in .gallery-item[aria-hidden="true"]
    timeoutRef.current = setTimeout(() => {
      setActiveFilter(filter);
      setFiltering(false);
    }, 420); 
  };

  return (
    <>
      <main id="main-content">
        <MediaHero />
        <div className="gallery-container container text-center">
          <MediaCategories
            categories={filterCategories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            filtering={filtering}
          />
          <MediaCards
            items={allGalleryItems}
            activeFilter={activeFilter}
            filtering={filtering}
          />
        </div>
      </main>
    </>
  );
};

// --- Hero Section with Centered Content and Matrix Overlay ---
const MediaHero = () => (
  <div className="page-hero-container">
    <div
      className="hero-section relative flex flex-col items-center justify-center"
      style={{ minHeight: '360px', textAlign: 'center' }}
    >
      {/* Matrix Background */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none">
        <div className="matrix-pattern">
          {[...Array(28)].map((_, idx) => (
            <div key={idx} className="matrix-column"></div>
          ))}
        </div>
      </div>
      {/* Overlay for contrast */}
      <div className="hero-bg-overlay absolute inset-0 z-10" />
      {/* Hero Content */}
      <div className="hero-content relative z-20 flex flex-col items-center justify-center" style={{ width: '100%' }}>
        <h1
          className="text-4xl lg:text-5xl font-bold text-white mb-3"
          style={{
            textAlign: 'center',
            textShadow: '0 2px 14px rgba(0,0,0,0.9), 0 1px 0 #333',
            margin: 0,
            letterSpacing: '0.06em',
          }}
        >
          Media & Gallery
        </h1>
        <p
          className="text-lg lg:text-xl text-gray-300"
          style={{
            textAlign: 'center',
            textShadow: '0 1px 8px rgba(0,0,0,0.7)',
            margin: 0,
            maxWidth: 550,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          A collection of my creative work.
        </p>
      </div>
    </div>
  </div>
);

const MediaCategories = ({ categories, activeFilter, onFilterChange, filtering }) => (
  <div className="controls-bar justify-center">
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => onFilterChange(category.id)}
        aria-pressed={activeFilter === category.id}
        className={`btn-filter ${activeFilter === category.id ? 'active' : ''} ${filtering ? 'filtering' : ''}`}
        style={{
          textAlign: 'center',
        }}
        disabled={filtering}
      >
        {category.name}
      </button>
    ))}
  </div>
);

const MediaCards = ({ items, activeFilter, filtering }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Animate in/out with filtering
  return (
    <div className="gallery-grid justify-center items-center">
      {items.map((item, index) => {
        const show = activeFilter === 'all' || item.type === activeFilter;

        return (
          <div
            key={item.id}
            data-type={item.type}
            aria-hidden={!show ? "true" : "false"}
            style={{ '--delay': `${index * 0.055}s`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            className={`gallery-item${show ? '' : ' filtered-out'}`}
          >
            {/* Animate fade/blur in and out by controlling aria-hidden via CSS */}
            <div className="thumb-frame">
              <img
                src={item.img}
                alt={item.title}
                className={`thumb ${loadedImages[item.id] ? 'thumb-loaded' : ''}`}
                onLoad={() => handleImageLoad(item.id)}
                loading="lazy"
                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
              />
              <div className="thumb-meta" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <h3 className="thumb-title" style={{ margin: 0 }}>{item.title}</h3>
                <p className="capitalize" style={{ margin: 0 }}>{item.type}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MediaMain;
