import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { useNavigate, Link } from 'react-router-dom';

import slide1 from '/startingPage/slide1.jpg?url';

function MenuPage() {
  return (
    <div className = "h-screen w-screen overflow-hidden bg-gray-900 text-white flex flex-col items-center">
        {/* Carousel/Slider Section */}
        <div className="h-3/6 w-4/5 flex items-center justify-center py-8 px-8">
            {/* Replace this static image with your carousel component if needed */}
            <img
            src={slide1}
            alt="Historic site"
            className="w-full h-full object-cover rounded-md shadow-lg"
            />
        </div>

        {/* Title / Subheading */}
        <div className="text-center mb-8">
            <p className="text-xl">
            Select a 360° experience above to explore a Mesa historical site
            <br />
            OR 
            <br />
            select a book below to learn more about Mesa’s history
            </p>
        </div>

        {/* Book Options */}
        <div className="flex flex-wrap justify-center gap-8">
            <Link
            to="/timeline"
            className="flex flex-col items-center transform transition-transform hover:scale-105"
            >
            <img
                src="/path/to/timeline-image.jpg"
                alt="Timeline"
                className="w-40 h-auto border-2 border-white mb-2 rounded"
            />
            <h3 className="text-xl">Timeline</h3>
            </Link>

            <Link
            to="/people"
            className="flex flex-col items-center transform transition-transform hover:scale-105"
            >
            <img
                src="/path/to/people-image.jpg"
                alt="People"
                className="w-40 h-auto border-2 border-white mb-2 rounded"
            />
            <h3 className="text-xl">People</h3>
            </Link>

            <Link
            to="/places"
            className="flex flex-col items-center transform transition-transform hover:scale-105"
            >
            <img
                src="/path/to/places-image.jpg"
                alt="Places"
                className="w-40 h-auto border-2 border-white mb-2 rounded"
            />
            <h3 className="text-xl">Places</h3>
            </Link>
        </div>
    </div>
  );
}

export default MenuPage;

