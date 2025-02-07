import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import slide1 from '../../assets/StartingPage/slide1.JPG';
import slide2 from '../../assets/StartingPage/slide2.JPG';

function StartingPage() {
  const [fadeOut, setFadeOut] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const images = [slide1, slide2];

  // Cycle through images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  const handleScreenClick = () => {
    setFadeOut(true); // Trigger the fade-out effect

    // Navigate to the next page after 3 seconds
    setTimeout(() => {
      navigate('./room');
    }, 1000);
  };

  return (
    <div
      onClick={handleScreenClick}
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-colors duration-[3000ms] ${
        fadeOut ? 'bg-white' : ''
      }`}
      style={{
        zIndex: 10,
        cursor: 'pointer',
        backgroundImage: fadeOut ? '' : `url(${images[currentImageIndex]})`, // Remove the slideshow on fade-out
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out', // Smooth transition for slideshow
      }}
    >
      <h1
        className={`text-8xl font-Cormorant text-white drop-shadow transition-opacity duration-[2000ms] ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Press anywhere to start
      </h1>
    </div>
  );
}

export default StartingPage;
