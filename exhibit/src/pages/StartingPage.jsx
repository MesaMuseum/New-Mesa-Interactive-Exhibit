import React, { Suspense, useRef, useState } from 'react'; 
import { Canvas, useFrame } from '@react-three/fiber'; 
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'; 
import { useNavigate } from 'react-router-dom';

function StartingPage() {
  const [isRotating, setIsRotating] = useState(true); 
  const handleToggleRotation = () => {
    setIsRotating(!isRotating);
  };

  return (
    <>
      <div style={{ position: 'relative', height: '100vh' }}>
        <Canvas style={{ position: 'absolute', top: 0, left: 0 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.3} />
          <Suspense fallback={null}>
            <AutumnForest />
          </Suspense>
          <RotatingCamera isRotating={isRotating} />
        </Canvas>
        <ToggleButton
          isRotating={isRotating}
          handleToggleRotation={handleToggleRotation}
        />
      </div>
    </>
  );
}

function RotatingCamera({ isRotating }) {
  const groupRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();

  useFrame(() => {
    if (groupRef.current && controlsRef.current && isRotating) {
      groupRef.current.rotation.y += 0.001;
      controlsRef.current.update();
    }
  });

  return (
    <group ref={groupRef}>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 2, 10]} />
      <OrbitControls ref={controlsRef} enableDamping={true} dampingFactor={0.05} />
    </group>
  );
}

function ToggleButton({ isRotating, handleToggleRotation }) {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    handleToggleRotation();
    setFadeOut(true);

    setTimeout(() => {
      navigate('./room');
    }, 3000);
  };

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-colors duration-[2500ms] ${
        fadeOut ? 'bg-white' : 'bg-transparent'
      }`}
      style={{ zIndex: 10 }}
    >
      <button
        onClick={handleClick}
        className="absolute top-1/2 left-1/2 w-screen h-screen bg-transparent border-none cursor-pointer flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      >
        <h1
          className={`text-8xl font-Cormorant text-white drop-shadow transition-opacity duration-[2000ms] ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {isRotating ? 'Press anywhere to start' : 'Entering now'}
        </h1>
      </button>
    </div>
  );
}

function AutumnForest() {
  const { scene } = useGLTF('/free_-_skybox_autumn_forest/scene.gltf');
  
  return <primitive object={scene} scale={1} />;
}

export default StartingPage;
