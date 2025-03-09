import React, { useState } from 'react';
import '../../src/App.css'
const Carousel = () => {
  // Sample images for the carousel
  const images = [
    'https://via.placeholder.com/600x300/FF6347/FFFFFF?text=Image+1',
    'https://via.placeholder.com/600x300/4682B4/FFFFFF?text=Image+2',
    'https://via.placeholder.com/600x300/32CD32/FFFFFF?text=Image+3',
    'https://via.placeholder.com/600x300/FFD700/FFFFFF?text=Image+4'
  ];

  // State to manage the index of the currently visible image
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to the previous image
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="carousel-container">
      {/* Carousel Image */}
      <div className="carousel-image">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>

      {/* Carousel Navigation */}
      <div className="carousel-navigation">
        <button className="carousel-prev" onClick={prevImage}>
          &#10094;
        </button>
        <button className="carousel-next" onClick={nextImage}>
          &#10095;
        </button>
      </div>

      {/* Optional: Add dots for navigation */}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
