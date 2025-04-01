import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import slide1 from '/startingPage/slide1.jpg?url';
import slide2 from '/startingPage/slide2.jpg?url';
import slide3 from '/startingPage/slide3.jpg?url';

function StartingPage() {
  const [fadeOut, setFadeOut] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();

  const images = [slide1, slide2, slide3];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Start fade-out effect

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false); // Start fade-in effect
      }, 1000); // Fade duration
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleScreenClick = () => {
    setFadeOut(true); // Trigger the fade-out effect

    // Navigate to the next page after 1 second
    setTimeout(() => {
      navigate('./room');
    }, 1000);
  };

  return (
    <div
      onClick={handleScreenClick}
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer"
      style={{
        zIndex: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Slideshow with Stacked Fade Transition */}
      <div className="absolute top-0 left-0 w-full h-full">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              transition: 'opacity 1s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Black Overlay for Fade-to-Black Transition */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-2000 ${
          fadeOut ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      {/* Overlay Text */}
      <h1
        className={`absolute text-8xl font-Cormorant text-white drop-shadow transition-opacity duration-[2000ms] ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Press anywhere to start
      </h1>
    </div>
  );
}

export default StartingPage;