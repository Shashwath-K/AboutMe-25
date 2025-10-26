import React, { useState, useRef } from 'react';
import '../components/styles/media.css'; // Ensure this path is correct

// --- Data ---

const allGalleryItems = [
  // Clicks
  { id: 1, type: 'click', title: 'Monsoon Sky', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/20250803_183657.heic' },
  { id: 2, type: 'click', title: 'Candid Portrait', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/VideoCapture_20241124-125257.jpg' },
  { id: 3, type: 'click', title: 'Monochrome Study', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/1000275690_edited.jpeg' },
  { id: 4, type: 'click', title: 'Cloudscape', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/20250808_164120.heic' },
  { id: 5, type: 'click', title: 'Architectural Detail', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/20250911_101924.jpg' },
  { id: 6, type: 'click', title: 'Festive Lights', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/20250201_145221.jpg' },
  { id: 7, type: 'click', title: 'Silhouette', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/1000254277_edited.jpeg' },
  { id: 8, type: 'click', title: 'Golden Hour', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Clicks/1000272617_edited.jpeg' },
  // Designs
  { id: 9, type: 'design', title: 'Event Poster Design', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Designs/VN20250926_213113.jpg' },
  { id: 10, type: 'design', title: 'Hackathon Poster', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Designs/VN20250914_194308.jpg' },
  { id: 11, type: 'design', title: 'Tech Symposium Design', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Designs/VN20250921_184343.jpg' },
  { id: 12, type: 'design', title: 'Workshop Announcement', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Designs/VN20250923_193120.jpg' },
  { id: 13, type: 'design', title: 'Club Announcement', img: 'https://ik.imagekit.io/cadncfpqe/Portfolio/Designs/VN20250928_223328(1).jpg' },
];

const filterCategories = [
  { id: 'all', name: 'All' },
  { id: 'click', name: 'Clicks' },
  { id: 'design', name: 'Designs' },
];


// --- Sub-component: MediaHero ---

const MediaHero = () => (
  <div className="page-hero-container">
    <div className="hero-section">
      {/* Matrix Background */}
      <div className="matrix-container absolute inset-0 z-0 pointer-events-none">
        <div className="matrix-pattern">
          {[...Array(28)].map((_, idx) => (
            <div key={idx} className="matrix-column"></div>
          ))}
        </div>
      </div>
      {/* Overlay for contrast */}
      <div className="hero-bg-overlay" />
      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
          Media & Gallery
        </h1>
        <p className="text-lg lg:text-xl text-gray-300">
          A collection of my creative work.
        </p>
      </div>
    </div>
  </div>
);


// --- Sub-component: MediaCategories ---

const MediaCategories = ({ categories, activeFilter, onFilterChange, filtering }) => (
  <div className="controls-bar">
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => onFilterChange(category.id)}
        aria-pressed={activeFilter === category.id}
        className={`btn-filter ${activeFilter === category.id ? 'active' : ''}`}
        disabled={filtering}
      >
        {category.name}
      </button>
    ))}
  </div>
);


// --- Sub-component: MediaCards ---

const MediaCards = ({ items, activeFilter, filtering }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery-grid">
      {items.map((item, index) => {
        const show = activeFilter === 'all' || item.type === activeFilter;
        
        // This logic fixes the reflow issue:
        // 1. If an item should be shown, it's 'flex'.
        // 2. If an item is hidden, but we are *animating*, it's 'flex' (so the fade-out plays).
        // 3. If an item is hidden, and we are *not* animating, it's 'none' (so the grid reflows).
        const displayStyle = show || filtering ? 'flex' : 'none';

        const style = {
          '--delay': `${index * 0.055}s`,
          display: displayStyle,
        };

        return (
          <div
            key={item.id}
            data-type={item.type}
            aria-hidden={!show ? "true" : "false"}
            style={style}
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


// --- Main Component: MediaMain ---

const MediaMain = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const timeoutRef = useRef(null);

  const handleFilterChange = (newFilter) => {
    // Prevent re-filtering if the button is spammed or the same filter is chosen
    if (activeFilter === newFilter || isFiltering) return;

    // 1. Start the filtering animation state and set the new filter
    setIsFiltering(true);
    setActiveFilter(newFilter);
    // This re-renders MediaCards, applying [aria-hidden="true"] to items that will
    // be hidden. They start their 500ms fade-out animation but remain in the grid.

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // 2. After the CSS animation (500ms) finishes, stop the filtering state
    timeoutRef.current = setTimeout(() => {
      setIsFiltering(false);
      // This triggers a final re-render. MediaCards now sees isFiltering=false,
      // and the hidden items get 'display: none', allowing the grid to reflow.
    }, 500); // This MUST match the transition time in your .gallery-item[aria-hidden="true"] CSS
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
            filtering={isFiltering}
          />
          <MediaCards
            items={allGalleryItems}
            activeFilter={activeFilter}
            filtering={isFiltering}
          />
        </div>
      </main>
    </>
  );
};

export default MediaMain;