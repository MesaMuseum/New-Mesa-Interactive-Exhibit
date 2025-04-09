import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from './Carousel';

import slide1 from '/startingPage/slide1.jpg?url';


// --- 3D Book Model Components ---
function BookModel({ onClick, cameraRef }) {
  const { scene } = useGLTF('/compressed_book.glb');
  const bookRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  // Book initial and final positions
  const initialPosition = useRef(new THREE.Vector3(370, -200, 110));
  const finalPosition = new THREE.Vector3(60, -10, -5);

  // Book initial and final rotations
  const initialRotation = useRef([Math.PI / 2, -Math.PI / 2, Math.PI / 2]);
  const finalRotation = [Math.PI / 2, 0.1, Math.PI / 2 - 0.1];

  // Final camera position for transition
  const finalCameraPosition = new THREE.Vector3(-60, 6, 5);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (isAnimating) {
      // Animate the book to its final position/rotation
      bookRef.current.position.lerp(finalPosition, delta * 2);
      bookRef.current.rotation.x = THREE.MathUtils.lerp(
        bookRef.current.rotation.x,
        finalRotation[0],
        delta * 2
      );
      bookRef.current.rotation.y = THREE.MathUtils.lerp(
        bookRef.current.rotation.y,
        finalRotation[1],
        delta * 2
      );
      bookRef.current.rotation.z = THREE.MathUtils.lerp(
        bookRef.current.rotation.z,
        finalRotation[2],
        delta * 2
      );

      // Animate the camera to move
      cameraRef.current.position.lerp(finalCameraPosition, delta * 1.5);

      if (bookRef.current.position.distanceTo(finalPosition) < 0.1) {
        onClick();
      }
    } else {
      // Add a little up-and-down floating effect
      bookRef.current.position.y += Math.sin(time * 3) * 1;
    }
  });

  const handleClick = () => {
    setIsAnimating(true);
  };

  return (
    <primitive
      ref={bookRef}
      object={scene}
      scale={[1, 0.6, 1]}
      position={initialPosition.current}
      rotation={initialRotation.current}
      onClick={handleClick}
      className="cursor-pointer"
    />
  );
}

function BookModel2({ onClick, cameraRef }) {
  const { scene } = useGLTF('/compressed_book2.glb');
  const bookRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  const initialPosition = useRef(new THREE.Vector3(335, -200, -300));
  const finalPosition = new THREE.Vector3(60, -10, -5);

  const initialRotation = useRef([Math.PI / 2, -Math.PI / 2.2, Math.PI / 2]);
  const finalRotation = [Math.PI / 2, 0.1, Math.PI / 2 - 0.1];

  const finalCameraPosition = new THREE.Vector3(-60, 6, 5);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (isAnimating) {
      bookRef.current.position.lerp(finalPosition, delta * 2);
      bookRef.current.rotation.x = THREE.MathUtils.lerp(
        bookRef.current.rotation.x,
        finalRotation[0],
        delta * 2
      );
      bookRef.current.rotation.y = THREE.MathUtils.lerp(
        bookRef.current.rotation.y,
        finalRotation[1],
        delta * 2
      );
      bookRef.current.rotation.z = THREE.MathUtils.lerp(
        bookRef.current.rotation.z,
        finalRotation[2],
        delta * 2
      );
      cameraRef.current.position.lerp(finalCameraPosition, delta * 1.5);

      if (bookRef.current.position.distanceTo(finalPosition) < 0.1) {
        onClick();
      }
    } else {
      bookRef.current.position.y += Math.sin(time * 3) * 1;
    }
  });

  const handleClick = () => {
    setIsAnimating(true);
  };

  return (
    <primitive
      ref={bookRef}
      object={scene}
      scale={[1, 0.6, 0.8]}
      position={initialPosition.current}
      rotation={initialRotation.current}
      onClick={handleClick}
      className="cursor-pointer"
    />
  );
}

// // New third book component
// function BookModel3({ onClick, cameraRef }) {
//     const { scene } = useGLTF('/compressed_book2.glb'); // Ensure you have this model in your project
//     const bookRef = useRef();
//     const [isAnimating, setIsAnimating] = useState(false);
  
//     // Adjust initial and final positions/rotations as needed
//     const initialPosition = useRef(new THREE.Vector3(300, -200, 200));
//     const finalPosition = new THREE.Vector3(60, -10, -5);
  
//     const initialRotation = useRef([Math.PI / 2, -Math.PI / 2.3, Math.PI / 2]);
//     const finalRotation = [Math.PI / 2, 0.1, Math.PI / 2 - 0.1];
  
//     const finalCameraPosition = new THREE.Vector3(-60, 6, 5);
  
//     useFrame((state, delta) => {
//       const time = state.clock.getElapsedTime();
//       if (isAnimating) {
//         bookRef.current.position.lerp(finalPosition, delta * 2);
//         bookRef.current.rotation.x = THREE.MathUtils.lerp(
//           bookRef.current.rotation.x,
//           finalRotation[0],
//           delta * 2
//         );
//         bookRef.current.rotation.y = THREE.MathUtils.lerp(
//           bookRef.current.rotation.y,
//           finalRotation[1],
//           delta * 2
//         );
//         bookRef.current.rotation.z = THREE.MathUtils.lerp(
//           bookRef.current.rotation.z,
//           finalRotation[2],
//           delta * 2
//         );
//         cameraRef.current.position.lerp(finalCameraPosition, delta * 1.5);
  
//         if (bookRef.current.position.distanceTo(finalPosition) < 0.1) {
//           onClick();
//         }
//       } else {
//         bookRef.current.position.y += Math.sin(time * 3) * 1;
//       }
//     });
  
//     const handleClick = () => {
//       setIsAnimating(true);
//     };
  
//     return (
//       <primitive
//         ref={bookRef}
//         object={scene}
//         scale={[1, 0.6, 1]}
//         position={initialPosition.current}
//         rotation={initialRotation.current}
//         onClick={handleClick}
//         className="cursor-pointer"
//       />
//     );
//   }

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
    }, 2700); // Delay to allow animation to finish
  };

  // Fade-in effect on load
  useEffect(() => {
    const timeout = setTimeout(() => setFade(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 text-white flex flex-col items-center">
      
      <Carousel />

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
      <div className="flex-1 w-4/5 mx-auto mb-8">
        <Canvas
          className="w-full h-full"
          camera={{ fov: 45, position: [-60, 40, 7] }}
          onCreated={({ camera }) => (cameraRef.current = camera)}
          style={{ backgroundColor: 'black' }}
        >
          <ambientLight intensity={10} />
          <BookModel onClick={() => handleBookClick('/timeline')} cameraRef={cameraRef} />
          <BookModel2 onClick={() => handleBookClick('/places')} cameraRef={cameraRef} />
          {/* <BookModel3 onClick={() => handleBookClick('/people')} cameraRef={cameraRef} /> */}
        </Canvas>
      </div>

      {/* Fade overlays for transitions */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-[1000ms] ease-out ${
          fade ? 'opacity-100' : 'opacity-0'
        } pointer-events-none z-50`}
      />
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-[2500ms] ease-out ${
          fadeOut ? 'opacity-100' : 'opacity-0'
        } pointer-events-none z-50`}
      />
    </div>
  );
}

export default MenuPage;























// // --- 3D Book Model Components ---
// function BookModel({ onClick, cameraRef }) {
//   const { scene } = useGLTF('/compressed_book.glb');
//   const bookRef = useRef();
//   const [isAnimating, setIsAnimating] = useState(false);

//   // Book initial and final positions
//   const initialPosition = useRef(new THREE.Vector3(370, -200, 110));
//   const finalPosition = new THREE.Vector3(60, -10, -5);

//   // Book initial and final rotations
//   const initialRotation = useRef([Math.PI / 2, -Math.PI / 2, Math.PI / 2]);
//   const finalRotation = [Math.PI / 2, 0.1, Math.PI / 2 - 0.1];

//   // Final camera position for transition
//   const finalCameraPosition = new THREE.Vector3(-60, 6, 5);

//   useFrame((state, delta) => {
//     const time = state.clock.getElapsedTime();
//     if (isAnimating) {
//       // Animate the book to its final position/rotation
//       bookRef.current.position.lerp(finalPosition, delta * 2);
//       bookRef.current.rotation.x = THREE.MathUtils.lerp(
//         bookRef.current.rotation.x,
//         finalRotation[0],
//         delta * 2
//       );
//       bookRef.current.rotation.y = THREE.MathUtils.lerp(
//         bookRef.current.rotation.y,
//         finalRotation[1],
//         delta * 2
//       );
//       bookRef.current.rotation.z = THREE.MathUtils.lerp(
//         bookRef.current.rotation.z,
//         finalRotation[2],
//         delta * 2
//       );

//       // Animate the camera to move
//       cameraRef.current.position.lerp(finalCameraPosition, delta * 1.5);

//       if (bookRef.current.position.distanceTo(finalPosition) < 0.1) {
//         onClick();
//       }
//     } else {
//       // Add a little up-and-down floating effect
//       bookRef.current.position.y += Math.sin(time * 3) * 1;
//     }
//   });

//   const handleClick = () => {
//     setIsAnimating(true);
//   };

//   return (
//     <primitive
//       ref={bookRef}
//       object={scene}
//       scale={[1, 0.6, 1]}
//       position={initialPosition.current}
//       rotation={initialRotation.current}
//       onClick={handleClick}
//       className="cursor-pointer"
//     />
//   );
// }

// function BookModel2({ onClick, cameraRef }) {
//   const { scene } = useGLTF('/compressed_book2.glb');
//   const bookRef = useRef();
//   const [isAnimating, setIsAnimating] = useState(false);

//   const initialPosition = useRef(new THREE.Vector3(335, -200, -300));
//   const finalPosition = new THREE.Vector3(60, -10, -5);

//   const initialRotation = useRef([Math.PI / 2, -Math.PI / 2.2, Math.PI / 2]);
//   const finalRotation = [Math.PI / 2, 0.1, Math.PI / 2 - 0.1];

//   const finalCameraPosition = new THREE.Vector3(-60, 6, 5);

//   useFrame((state, delta) => {
//     const time = state.clock.getElapsedTime();
//     if (isAnimating) {
//       bookRef.current.position.lerp(finalPosition, delta * 2);
//       bookRef.current.rotation.x = THREE.MathUtils.lerp(
//         bookRef.current.rotation.x,
//         finalRotation[0],
//         delta * 2
//       );
//       bookRef.current.rotation.y = THREE.MathUtils.lerp(
//         bookRef.current.rotation.y,
//         finalRotation[1],
//         delta * 2
//       );
//       bookRef.current.rotation.z = THREE.MathUtils.lerp(
//         bookRef.current.rotation.z,
//         finalRotation[2],
//         delta * 2
//       );
//       cameraRef.current.position.lerp(finalCameraPosition, delta * 1.5);

//       if (bookRef.current.position.distanceTo(finalPosition) < 0.1) {
//         onClick();
//       }
//     } else {
//       bookRef.current.position.y += Math.sin(time * 3) * 1;
//     }
//   });

//   const handleClick = () => {
//     setIsAnimating(true);
//   };

//   return (
//     <primitive
//       ref={bookRef}
//       object={scene}
//       scale={[1, 0.6, 0.8]}
//       position={initialPosition.current}
//       rotation={initialRotation.current}
//       onClick={handleClick}
//       className="cursor-pointer"
//     />
//   );
// }

// // --- MenuPage Component ---
// function MenuPage() {
//   const [fade, setFade] = useState(true);
//   const [fadeOut, setFadeOut] = useState(false);
//   const navigate = useNavigate();
//   const cameraRef = useRef();

//   // Use this function to handle a book click and then navigate.
//   const handleBookClick = (target) => {
//     setFadeOut(true);
//     setTimeout(() => {
//       navigate(target);
//     }, 2700); // Delay for transition animation
//   };

//   // Fade-in effect on load
//   useEffect(() => {
//     const timeout = setTimeout(() => setFade(false), 900);
//     return () => clearTimeout(timeout);
//   }, []);

//   return (
//     <div className="h-screen w-screen overflow-hidden bg-gray-900 text-white flex flex-col items-center">
//       {/* Carousel/Slider Section */}
//       <div className="h-3/6 w-4/5 flex items-center justify-center py-8 px-8">
//         <img
//           src={slide1}
//           alt="Historic site"
//           className="w-full h-full object-cover rounded-md shadow-lg"
//         />
//       </div>

//       {/* Title / Subheading */}
//       <div className="text-center mb-4">
//         <p className="text-xl">
//           Select a 360° experience above to explore a Mesa historical site
//           <br />
//           or 
//           <br />
//           select a book below to learn more about Mesa’s history
//         </p>
//       </div>

//       {/* 3D Canvas with Book Models */}
//       <div className="flex-1">
//         <Canvas
//           className="w-full h-full"
//           camera={{ fov: 65, position: [-60, 20, 5] }}
//           onCreated={({ camera }) => (cameraRef.current = camera)}
//           style={{ backgroundColor: 'black' }}
//         >
//           <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3.5} />
//           <ambientLight intensity={10} />
//           {/* BookModel navigates to '/timeline' and BookModel2 to '/places'; adjust as needed */}
//           <BookModel onClick={() => handleBookClick('/timeline')} cameraRef={cameraRef} />
//           <BookModel2 onClick={() => handleBookClick('/places')} cameraRef={cameraRef} />
//         </Canvas>
//       </div>

//       {/* Fade overlays for transitions */}
//       <div
//         className={`absolute inset-0 bg-black transition-opacity duration-[1000ms] ease-out ${
//           fade ? 'opacity-100' : 'opacity-0'
//         } pointer-events-none z-50`}
//       />
//       <div
//         className={`absolute inset-0 bg-black transition-opacity duration-[2500ms] ease-out ${
//           fadeOut ? 'opacity-100' : 'opacity-0'
//         } pointer-events-none z-50`}
//       />
//     </div>
//   );
// }

// export default MenuPage;




















// function MenuPage() {
//   return (
//     <div className = "h-screen w-screen overflow-hidden bg-gray-900 text-white flex flex-col items-center">
//         {/* Carousel/Slider Section */}
//         <div className="h-3/6 w-4/5 flex items-center justify-center py-8 px-8">
//             {/* Replace this static image with your carousel component if needed */}
//             <img
//             src={slide1}
//             alt="Historic site"
//             className="w-full h-full object-cover rounded-md shadow-lg"
//             />
//         </div>

//         {/* Title / Subheading */}
//         <div className="text-center mb-8">
//             <p className="text-xl">
//             Select a 360° experience above to explore a Mesa historical site
//             <br />
//             OR 
//             <br />
//             select a book below to learn more about Mesa’s history
//             </p>
//         </div>

//         {/* Book Options */}
//         <div className="flex flex-wrap justify-center gap-8">
//             <Link
//             to="/timeline"
//             className="flex flex-col items-center transform transition-transform hover:scale-105"
//             >
//             <img
//                 src="/path/to/timeline-image.jpg"
//                 alt="Timeline"
//                 className="w-40 h-auto border-2 border-white mb-2 rounded"
//             />
//             <h3 className="text-xl">Timeline</h3>
//             </Link>

//             <Link
//             to="/people"
//             className="flex flex-col items-center transform transition-transform hover:scale-105"
//             >
//             <img
//                 src="/path/to/people-image.jpg"
//                 alt="People"
//                 className="w-40 h-auto border-2 border-white mb-2 rounded"
//             />
//             <h3 className="text-xl">People</h3>
//             </Link>

//             <Link
//             to="/places"
//             className="flex flex-col items-center transform transition-transform hover:scale-105"
//             >
//             <img
//                 src="/path/to/places-image.jpg"
//                 alt="Places"
//                 className="w-40 h-auto border-2 border-white mb-2 rounded"
//             />
//             <h3 className="text-xl">Places</h3>
//             </Link>
//         </div>
//     </div>
//   );
// }

// export default MenuPage;

