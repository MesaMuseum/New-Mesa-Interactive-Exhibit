import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import backgroundImage from '/contentPage/Desk_Background.png?url'; 
import sideImageDefault from '/contentPage/Contents_Sidebar_Minimized.png?url';
import sideImageHover from '/contentPage/Contents_Sidebar_Expanded.png?url';
import header from '/contentPage/header.png?url';
import chapters from './chapters.json';
import bookBackground from '/contentPage/Book_Page.png?url'
import Typed from "typed.js";
import CircleAnimation from "./header_circle";

const ContentPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]); 
  const sidebarRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Refs for the typing animation
  const leftHeaderRef = useRef(null);
  const rightHeaderRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
    
  // Handle clicks outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Typing animation for title and content
  useEffect(() => {
    if (leftHeaderRef.current && rightHeaderRef.current && leftContentRef.current && rightContentRef.current) {
      // Destroy previous Typed instances if they exist
      leftHeaderRef.current.innerHTML = "";
      rightHeaderRef.current.innerHTML = "";
      leftContentRef.current.innerHTML = "";
      rightContentRef.current.innerHTML = "";

      const typedLeftHeader = new Typed(leftHeaderRef.current, {
        strings: [selectedChapter?.title_left_page || ""],
        typeSpeed: 50,
        showCursor: false,
      });

      const typedRightHeader = new Typed(rightHeaderRef.current, {
        strings: [selectedChapter?.title_right_page || ""],
        typeSpeed: 50,
        showCursor: false,
      });

      const typedLeftContent = new Typed(leftContentRef.current, {
        strings: [selectedChapter?.left_page_content || ""],
        typeSpeed: 20,
        showCursor: false,
      });

      const typedRightContent = new Typed(rightContentRef.current, {
        strings: [selectedChapter?.right_page_content || ""],
        typeSpeed: 20,
        showCursor: false,
      });

      return () => {
        typedLeftHeader.destroy();
        typedRightHeader.destroy();
        typedLeftContent.destroy();
        typedRightContent.destroy();
      };
    }
  }, [selectedChapter]);

  // Toggle sidebar
  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const goToPreviousChapter = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedChapter(chapters[index - 1]);
    }
  };

  const goToNextChapter = () => {
    if (index < chapters.length - 1) {
      setIndex(index + 1);
      setSelectedChapter(chapters[index + 1]);
    }
  };

  const handleClick = (selectedIndex, selectedChapter) => {
    setIndex(selectedIndex);
    setSelectedChapter(selectedChapter);
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div 
        className="w-screen h-screen flex bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="h-full flex flex-col flex-grow overflow-hidden"> 
          {/* Header */}
          <div 
            className="w-[50%] h-[15%] flex items-center justify-center relative"
            style={{ 
              backgroundImage: `url(${header})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="w-full flex justify-between pb-4 px-24 pr-48">
              <a 
                href="/people" 
                className={`font-lovers text-black no-underline font-extrabold text-5xl scale-105 transition-transform relative`}
              >
                <div className="relative inline-block">
                  People
                  <CircleAnimation />
                </div>
              </a>
              
              <a 
                href="/places" 
                className={`font-lovers text-black no-underline font-extrabold text-5xl scale-105 transition-transform relative`}
              >
                <div className="relative inline-block">
                  Places
                </div>
              </a>
            </div>
          </div>

          {/* Rest of the existing code remains the same */}
          {/* Book & Interaction Section */}
          <div className="flex flex-1 items-center justify-center gap-8 px-6 pr-24">
            {/* Book Content */}
            <div className="relative w-[100%] h-[90%] flex flex-col bg-cover bg-center rounded-lg shadow-lg" 
              style={{ backgroundImage: `url(${bookBackground})` }}>
              
              {/* Book Pages Container */}
              <div className="flex flex-row justify-between px-8 h-full pb-8">
                {/* Left Page */}
                 <div className="w-[48%] flex flex-col space-y-4 p-6 rounded-lg">
                  <h3 ref={leftHeaderRef} className="text-3xl font-lovers font-bold text-black mb-4"></h3>
                  <div className="w-full h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mb-4">
                    {/* Placeholder for left page image */}
                  </div>
                  <p ref={leftContentRef} className="text-base font-imfell text-black font-medium leading-relaxed"></p>
                </div>

                {/* Right Page */}
                <div className="w-[48%] flex flex-col space-y-4 p-6 rounded-lg">
                  <h3 ref={rightHeaderRef} className="text-3xl font-lovers font-bold text-black mb-4"></h3>
                  <div className="w-full h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mb-4">
                    {/* Placeholder for left page image */}
                  </div>
                  <p ref={rightContentRef} className="text-base font-imfell text-black font-medium leading-relaxed"></p>
                </div>
                
                {/* Previous and Next Buttons*/}
                <div className="absolute bottom-5 left-6 text-xs">
                  <img src="/prev_icon.png" onClick={goToPreviousChapter} className={`w-[30px] h-[30px] ${index === 0 ? 'opacity-50' : ''}`} ></img>
                </div>
                <div className="absolute bottom-6 right-6 text-xs">
                  <img src="/next_icon.png" onClick={goToNextChapter} className={`w-[30px] h-[30px] ${index === chapters.length - 1 ? 'opacity-50' : ''}`} ></img>
                </div>
              </div>
            </div>
            
            {/* Video Section */}
            <div className="w-[45%] h-[90%] flex flex-col items-center shadow-lg rounded-lg p-4">
            <h2 className="text-4xl font-lovers font-extrabold text-white-800 mb-3">Interactive Content</h2>
            <video className="w-full h-auto rounded-lg shadow-md" controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                <p className="font-imfell">Your browser does not support the video tag.</p>
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-screen transition-all duration-500 z-50
          ${isSidebarExpanded ? 'w-[300px]' : 'w-[60px]'}`}
      >
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover cursor-pointer"
          style={{ 
            backgroundImage: `url(${isSidebarExpanded ? sideImageHover : sideImageDefault})`,
            backgroundSize: '100% 100%'
          }}
          onClick={toggleSidebar}
        >
          {isSidebarExpanded ? (
            <div 
              className="h-full flex flex-col text-black pt-16 pl-12 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-4xl font-lovers font-extrabold mb-4">Navigate</h3>
              <ul className="space-y-3 text-base font-imfell">
                {chapters.map((chapter, index) => (
                  <li 
                    key={index} 
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => handleClick(index, chapter)}
                  >
                    {chapter.title_left_page}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center pt-16 pl-4"> 
              <div className="text-3xl font-lovers font-extrabold transform rotate-90 text-black">Contents</div>
            </div>
          )}
        </div>
      </div>

      {/* Add SVG filter for grainy effect */}
      <svg className="hidden">
        <filter id="grainy">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" />
          <feDisplacementMap in="SourceGraphic" scale="10" />
        </filter>
      </svg>
    </div>
  );
};

export default ContentPage;