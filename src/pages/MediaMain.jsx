import React, { useState, useRef, useEffect } from 'react';
import Footer from '../components/Footer';
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


// --- Sub-component: Lightbox ---

const Lightbox = ({ item, onClose }) => {
  useEffect(() => {
    // Close lightbox on 'Escape' key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    // The backdrop has the onClick to close
    <div className="lightbox-backdrop" onClick={onClose}>
      {/* The content stops the click from propagating, so clicking the image won't close it */}
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* The 'x' button has been removed as requested */}
        <img src={item.img} alt={item.title} className="lightbox-image" />
        <div className="lightbox-caption">
          <h3>{item.title}</h3>
          <p className="capitalize">{item.type}</p>
        </div>
      </div>
    </div>
  );
};


// --- Sub-component: MediaHero ---

const MediaHero = () => (
  <div className="page-hero-container">
    <div className="hero-section">
      <div className="matrix-container">
        <div className="matrix-pattern">
          {[...Array(28)].map((_, idx) => (
            <div key={idx} className="matrix-column"></div>
          ))}
        </div>
      </div>
      <div className="hero-bg-overlay" />
      
      {/* The content div is given a z-index to ensure it's above the overlay */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 20 }}>
        {/* Corrected class name to apply gradient */}
        <h1 className="hero-about-title text-4xl sm:text-5xl font-extrabold mb-4">
          Media & Gallery
        </h1>
        <p className="text-justify max-w-2xl lg:max-w-3xl space-y-4 mt-6">
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

const MediaCards = ({ items, activeFilter, filtering, onImageSelect }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery-grid">
      {items.map((item, index) => {
        const show = activeFilter === 'all' || item.type === activeFilter;
        // This logic ensures smooth filtering and reflow
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
            onClick={() => onImageSelect(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onImageSelect(item)}
          >
            <div className="thumb-frame">
              <img
                src={item.img}
                alt={item.title}
                className={`thumb ${loadedImages[item.id] ? 'thumb-loaded' : ''}`}
                onLoad={() => handleImageLoad(item.id)}
                loading="lazy"
              />
              {/* Overlay text is hidden as requested */}
              <div className="thumb-meta" style={{ display: 'none' }}>
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
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFilterChange = (newFilter) => {
    if (activeFilter === newFilter || isFiltering) return;
    setIsFiltering(true);
    setActiveFilter(newFilter);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // This timeout matches the CSS animation for a smooth reflow
    timeoutRef.current = setTimeout(() => {
      setIsFiltering(false);
    }, 500); 
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
            onImageSelect={setSelectedImage} 
          />
        </div>
        <Footer />
      </main>
      
      {/* The lightbox is rendered here when an image is selected */}
      {selectedImage && (
        <Lightbox 
          item={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </>
  );
};

export default MediaMain;