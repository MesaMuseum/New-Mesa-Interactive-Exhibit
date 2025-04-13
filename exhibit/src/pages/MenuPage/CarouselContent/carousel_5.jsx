import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useNavigate } from 'react-router-dom';

function Room() {
  const texture = new TextureLoader().load('/menuPage/carousel_5.jpg');

  return (
    <Sphere args={[600, 60, 40]} scale={[-1, 1, 1.2]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
}

function Carousel_5() {
  const [fade, setFade] = useState(true); 
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const cameraRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => setFade(false), 900); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative w-full h-screen z-50">
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

      <Canvas
        className="w-full h-full"
        camera={{ fov: 65, position: [200, 0, 5] }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
        style={{ backgroundColor: 'black' }}
      >
        <OrbitControls enableZoom={false} 
          minPolarAngle={Math.PI / 3.5}
        />
        <ambientLight intensity={10} />
        <Room />
      </Canvas>
      <a href="/menu">
      
      <div className="flex items-center justify-center absolute top-[20px] left-[20px] bg-gray-600/50 h-[50px] w-[70px] rounded-md">
        <h3 className="text-black">Back</h3>
      </div>
      </a>
    </div>
  );
}

export default Carousel_5;
