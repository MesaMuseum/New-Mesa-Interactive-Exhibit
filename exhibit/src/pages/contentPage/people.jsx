import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import backgroundImage from '../../assets/contentPage/Desk_Background.png'; 
import sideImageDefault from '../../assets/contentPage/Contents_Sidebar_Minimized.png';
import sideImageHover from '../../assets/contentPage/Contents_Sidebar_Expanded.png';
import header from '../../assets/contentPage/header.png';
import chapters from './chapters.json';
import bookBackground from '../../assets/contentPage/Book_Page.png';

const ContentPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]); // Default to first chapter
  const sidebarRef = useRef(null);

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

  // Toggle sidebar
  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsSidebarExpanded(!isSidebarExpanded);
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
                className={`font-lovers text-black no-underline font-extrabold text-5xl hover:scale-105 transition-transform relative
                  ${currentPath === '/people' ? `
                    after:content-[""] 
                    after:absolute 
                    after:w-[220%] 
                    after:h-[140%] 
                    after:border-4 
                    after:border-red-500/70
                    after:rounded-full 
                    after:-left-[50%] 
                    after:-top-[30%]
                    after:backdrop-filter
                    after:backdrop-contrast-125
                    after:mix-blend-multiply
                    after:animate-pulse
                    after:shadow-[0_0_10px_rgba(239,68,68,0.5)]
                    after:bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_1px,transparent_1px)] 
                    after:bg-[length:4px_4px]
                    after:[filter:url(#grainy)]` : ''}`}
              >
                People
              </a>
              <a 
                href="/places" 
                className={`font-lovers text-black no-underline font-extrabold text-5xl hover:scale-105 transition-transform relative
                  ${currentPath === '/places' ? `
                    after:content-[""] 
                    after:absolute 
                    after:w-[220%] 
                    after:h-[140%] 
                    after:border-4 
                    after:border-red-500/70
                    after:rounded-full 
                    after:-left-[50%] 
                    after:-top-[30%]
                    after:backdrop-filter
                    after:backdrop-contrast-125
                    after:mix-blend-multiply
                    after:animate-pulse
                    after:shadow-[0_0_10px_rgba(239,68,68,0.5)]
                    after:bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_1px,transparent_1px)] 
                    after:bg-[length:4px_4px]
                    after:[filter:url(#grainy)]` : ''}`}
              >
                Places
              </a>
            </div>
          </div>


          {/* Book & Interaction */}
          <div className="flex flex-1 items-center justify-center gap-8 px-6 pr-24">
            {/* Book Content */}
            <div className="relative w-[80%] h-[90%] flex flex-col bg-cover bg-center rounded-lg shadow-lg" 
              style={{ backgroundImage: `url(${bookBackground})` }}>
              
              {/* Book Pages Container */}
              <div className="flex flex-row justify-between px-8 h-full pb-8">
                {/* Left Page */}
                <div className="w-[48%] flex flex-col space-y-4 p-6 rounded-lg">
                  <h3 className="text-3xl font-lovers font-bold text-black mb-4">
                    {selectedChapter?.title_left_page}
                  </h3>
                  <div className="w-full h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mb-4">
                    {/* Placeholder for left page image */}
                  </div>
                  <p className="text-base font-imfell text-black font-medium leading-relaxed">
                    {selectedChapter?.left_page_content}
                  </p>
                </div>

                {/* Right Page */}
                <div className="w-[48%] flex flex-col space-y-4 p-6 rounded-lg">
                  <h3 className="text-3xl font-lovers font-bold text-black mb-4">
                    {selectedChapter?.title_right_page}
                  </h3>
                  <div className="w-full h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mb-4">
                    {/* Placeholder for right page image */}
                  </div>
                  <p className="text-base font-imfell text-black font-medium leading-relaxed">
                    {selectedChapter?.right_page_content}
                  </p>
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
                    onClick={() => setSelectedChapter(chapter)}
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
