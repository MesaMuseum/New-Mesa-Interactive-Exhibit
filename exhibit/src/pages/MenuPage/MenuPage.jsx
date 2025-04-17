import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from './Carousel';
import backgroundImg from '../../assets/MenuPage/menu_background.png';
import deskImg from '../../assets/MenuPage/desk_menu.png';

import slide1 from '/startingPage/slide1.jpg?url';



function BookModel({
  gltfPath,
  onClick,
  cameraRef,
  initialPosition,
  initialRotation,
  scaleVal,
}) {
  const { scene } = useGLTF(gltfPath);
  const bookRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  // Final target values: move toward center and scale up.
  const finalPosition = new THREE.Vector3(0, 0, 10);
  const finalScale = new THREE.Vector3(
    scaleVal[0] * 2,
    scaleVal[1] * 2,
    scaleVal[2] * 2
  );
  // Define a final camera position for the zoom effect.
  const finalCameraPosition = new THREE.Vector3(0, 0, 2);


  useFrame((state, delta) => {
    if (isAnimating && bookRef.current) {
      // Animate book position toward the center.
      bookRef.current.position.lerp(finalPosition, delta * 2);
      // Animate book rotation (if needed, but in your case rotation stays the same)
      // bookRef.current.rotation.x = THREE.MathUtils.lerp(bookRef.current.rotation.x, finalRotation[0], delta * 2);
      // bookRef.current.rotation.y = THREE.MathUtils.lerp(bookRef.current.rotation.y, finalRotation[1], delta * 2);
      // bookRef.current.rotation.z = THREE.MathUtils.lerp(bookRef.current.rotation.z, finalRotation[2], delta * 2);
      
      // Animate book scale
      bookRef.current.scale.lerp(finalScale, delta * 2);
      
      // Animate the camera to zoom in.
      if (cameraRef && cameraRef.current) {
        cameraRef.current.position.lerp(finalCameraPosition, delta * 2);
        cameraRef.current.fov = THREE.MathUtils.lerp(cameraRef.current.fov, 15, delta * 2);
        cameraRef.current.updateProjectionMatrix();
        cameraRef.current.lookAt(bookRef.current.position);
      }
      
      // Check if the book is close enough to the final position.
      if (bookRef.current.position.distanceTo(finalPosition) < 0.1) {
        // Clamp the values exactly.
        bookRef.current.position.copy(finalPosition);
        bookRef.current.scale.copy(finalScale);
        if (cameraRef && cameraRef.current) {
          cameraRef.current.position.copy(finalCameraPosition);
          cameraRef.current.fov = 15;
          cameraRef.current.updateProjectionMatrix();
        }
        
        // Stop the animation so it doesn't overshoot.
        setIsAnimating(false);
        // Trigger navigation.
        onClick();
      }
    }
  });
  

  const handleClick = () => {
    setIsAnimating(true);
  };

  return (
    <primitive
      ref={bookRef}
      object={scene}
      // Keep the initial scale; it will be scaled during animation.
      scale={new THREE.Vector3(...scaleVal)}
      position={initialPosition}
      rotation={initialRotation} // this remains unchanged
      onClick={handleClick}
      className="cursor-pointer"
    />
  );
}


// --- MenuPage Component ---
function MenuPage() {
  const [fade, setFade] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const cameraRef = useRef();

  // Handle navigation after book animation
  const handleBookClick = (target) => {
    setFadeOut(true);
    setTimeout(() => {
      navigate(target);
    }, 2000); // Delay to allow animation to finish
  };

  // Fade-in effect on load
  useEffect(() => {
    const timeout = setTimeout(() => setFade(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
      <div
      className="h-screen w-screen overflow-hidden bg-gray-900 text-white flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      >
      <Carousel/>

      {/* Title / Subheading */}
      <div className="text-center mb-4">
        <p className="text-xl">
          Select a 360° experience above to explore a Mesa historical site
          <br />
          or 
          <br />
          select a book below to learn more about Mesa’s history
        </p>
      </div>

      {/* 3D Canvas with Book Models */}
      <div style={{
          position: 'fixed',
          top: '30vh', // 30% down from the top
          left: 0,
          width: '100vw',
          height: '70vh', // the remaining 70%
          zIndex: 1 // adjust z-index if necessary to layer behind or in front of other content
        }}>
        <Canvas
          className="w-full h-full"
          camera={{ fov: 45, position: [0, 0, 470] }}
          onCreated={({ camera }) => (cameraRef.current = camera)}
          style={{ backgroundColor: 'transparent' }}
        >
          <ambientLight intensity={10} />
          
        {/*
            Three books aligned horizontally near the bottom.
            Adjust the position values as needed.
          */}
          <BookModel
            gltfPath="/compressed_book1.glb"
            onClick={() => handleBookClick('/people')}
            initialPosition={[-200, -30, 0]}
            initialRotation={[-17, 0, 0]}
            scaleVal={[1, 0.1, 1]}
          />
          <BookModel
            gltfPath="/compressed_book2.glb"
            onClick={() => handleBookClick('/places')}
            initialPosition={[0, -30, 0]}
            initialRotation={[-17, 0, 0]}
            scaleVal={[1, 0.1, 1]}
          />
          <BookModel
            gltfPath="/compressed_book3.glb"
            onClick={() => handleBookClick('/timeline')}
            initialPosition={[200, -30, 0]}
            initialRotation={[-17, 0, 0]}
            scaleVal={[1, 0.1, 1]}
          />

        </Canvas>
      </div>

      {/* Desk Image as a Background Element at the Bottom */}
      <div
        className="absolute inset-x-0 bottom-4 h-[80%] bg-no-repeat bg-bottom z-0"
        style={{
          backgroundImage: `url(${deskImg})`,
          backgroundSize: 'contain',
          //zIndex: -1, // Ensures the desk image is behind the rest of the content
        }}
      />

      {/* Labels for the books */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',      // Raised up from 20px to 80px
          width: '100%',
          display: 'flex',
          justifyContent: 'center', // center them
          gap: '210px',              // 20px gap between labels; adjust as needed
          zIndex: 100,              // ensure they're on top
          color: 'white',
          fontSize: '1.5rem',
          textShadow: '1px 1px 3px black'
        }}
      >
        <span>People</span>
        <span>Places</span>
        <span>Timeline</span>
      </div>

      {/* Fade overlays for transitions */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-[1000ms] ease-out ${
          fade ? 'opacity-100' : 'opacity-0'
        } pointer-events-none z-50`}
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-[1000ms] ease-out ${
          fadeOut ? 'opacity-100' : 'opacity-0'
        } pointer-events-none z-50`}
      />
    </div>
  );
}

export default MenuPage;

