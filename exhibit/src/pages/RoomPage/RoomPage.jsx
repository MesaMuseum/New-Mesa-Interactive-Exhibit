import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useNavigate } from 'react-router-dom';

function Room() {
  const texture = new TextureLoader().load('/room/textures/theroomviewfinal.jpg');

  return (
    <Sphere args={[600, 60, 40]} scale={[-1, 1, 1.2]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
}

function BookModel({ onClick, cameraRef }) {
  const { scene } = useGLTF('/compressed_book.glb');
  const bookRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  //Book initial and final positions
  const initialPosition = useRef(new THREE.Vector3(370, -200, 110));
  const finalPosition = new THREE.Vector3(60, -10, -5);

  //Book initial and final rotations
  const initialRotation = useRef([Math.PI / 2, -Math.PI / 2, Math.PI / 2]);
  const finalRotation = [Math.PI / 2, 0 + 0.1, Math.PI / 2 - 0.1];

  const finalCameraPosition = new THREE.Vector3(-60, 6, 5);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (isAnimating) {
      bookRef.current.position.lerp(finalPosition, delta * 2);
      bookRef.current.rotation.x = THREE.MathUtils.lerp(bookRef.current.rotation.x, finalRotation[0], delta * 2);
      bookRef.current.rotation.y = THREE.MathUtils.lerp(bookRef.current.rotation.y, finalRotation[1], delta * 2);
      bookRef.current.rotation.z = THREE.MathUtils.lerp(bookRef.current.rotation.z, finalRotation[2], delta * 2);

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

  //Book initial and final positions
  const initialPosition = useRef(new THREE.Vector3(335, -200, -300));
  const finalPosition = new THREE.Vector3(60, -10, -5);

  //Book initial and final rotations
  const initialRotation = useRef([Math.PI / 2, -Math.PI / 2.2, Math.PI / 2]);
  const finalRotation = [Math.PI / 2, 0 + 0.1, Math.PI / 2 - 0.1];

  const finalCameraPosition = new THREE.Vector3(-60, 6, 5);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (isAnimating) {
      bookRef.current.position.lerp(finalPosition, delta * 2);
      bookRef.current.rotation.x = THREE.MathUtils.lerp(bookRef.current.rotation.x, finalRotation[0], delta * 2);
      bookRef.current.rotation.y = THREE.MathUtils.lerp(bookRef.current.rotation.y, finalRotation[1], delta * 2);
      bookRef.current.rotation.z = THREE.MathUtils.lerp(bookRef.current.rotation.z, finalRotation[2], delta * 2);

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


function RoomPage() {
  const [fade, setFade] = useState(true); 
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const cameraRef = useRef();

  const handleBookClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate('/flipbook');
    }, 2700); 
  };

  useEffect(() => {
    const timeout = setTimeout(() => setFade(false), 900); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full h-screen z-50">
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-[1000ms] ease-out ${
          fade ? 'opacity-100' : 'opacity-0'
        } pointer-events-none z-50`}
      />

      <div
        className={`absolute inset-0 bg-black transition-opacity duration-[2500ms] ease-out ${
          fadeOut ? 'opacity-100' : 'opacity-0'
        } pointer-events-none z-50`}
      />

      <Canvas
        className="w-full h-full"
        camera={{ fov: 65, position: [-60, 20, 5] }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
        style={{ backgroundColor: 'black' }}
      >
        <OrbitControls enableZoom={false} 
          minPolarAngle={Math.PI / 3.5}
        />
        <ambientLight intensity={10} />
        <Room />
        <BookModel onClick={handleBookClick} cameraRef={cameraRef} />
        <BookModel2 onClick={handleBookClick} cameraRef={cameraRef} />
      </Canvas>
    </div>
  );
}

export default RoomPage;
