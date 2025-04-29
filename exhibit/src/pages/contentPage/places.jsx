import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import backgroundImage from '/contentPage/Desk_Background.png?url'; 
import sideImageDefault from '/contentPage/Contents_Sidebar_Minimized.png?url';
import sideImageHover from '/contentPage/Contents_Sidebar_Expanded.png?url';
import header from '/contentPage/header.png?url';
import chapters from './places.json';
import bookBackground from '/contentPage/Book_Page.png?url';
import CircleAnimation from "./header_circle";
import TemplateTRBL from './templates/template_TRBL';
import TemplateBC from './templates/template_BC';
import TemplateTC from './templates/template_TC';
import TemplateCC from './templates/template_CC';
import TemplateTLBR from './templates/template_TLBR';
import "../../styles/text-animation.css"
import PlacesMedia from "./places_media";

const PlacesPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]); 
  const sidebarRef = useRef(null);
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleClick = (selectedIndex, selectedChapter) => {
    setIndex(selectedIndex);
    setSelectedChapter(selectedChapter);
  };

  const renderTemplate = (templateNumber, title, topContent, bottomContent, topImage, bottomImage) => {
    const props = {
      title,
      topContent,
      bottomContent,
      topImage,
      bottomImage,
    }

    switch (templateNumber) {
      case "TRBL":
        return <TemplateTRBL {...props} />
      case "BC":
        return <TemplateBC {...props} />
      case "TC":
        return <TemplateTC {...props} />
      case "CC":
        return <TemplateCC {...props} />
      case "TLBR":
        return <TemplateTLBR
        key={title + topContent + bottomContent + topImage + bottomImage}
        title={title}
        topContent={topContent}
        bottomContent={bottomContent}
        topImage={topImage}
        bottomImage={bottomImage}
      />
      default:
        return <TemplateTC {...props} />
    }
  }

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
            className="w-[50%] h-[10%] flex items-center justify-center relative"
            style={{ 
              backgroundImage: `url(${header})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="w-full flex justify-between pb-4 px-24 pr-48">
              <Link 
                to="/people" 
                className={`font-lovers text-black no-underline font-extrabold text-5xl scale-105 transition-transform relative`}
              >
                <div className="relative inline-block">
                  People
                </div>
              </Link>
              
              <Link 
                to="/places" 
                className={`font-lovers text-black no-underline font-extrabold text-5xl scale-105 transition-transform relative`}
              >
                <div className="relative inline-block">
                  Places
                  <CircleAnimation />
                </div>
              </Link>

              <Link 
                to="/timeline"
                className="font-lovers text-black no-underline font-extrabold text-5xl scale-105 transition-transform relative"
              >
                <div className="relative inline-block">
                  Timeline
                </div>
              </Link>
            </div>
          </div>

          {/* Book & Interaction Section */}
          <div className="flex flex-1 items-center justify-center gap-8 px-6 pr-24">
            {/* Book Content */}
            <div className="relative w-[100%] h-[90%] flex flex-col bg-cover bg-center rounded-lg shadow-lg" 
              style={{ backgroundImage: `url(${bookBackground})` }}>
              
              {/* Book Pages Container */}
              <div className="flex flex-row justify-between px-8 h-full pb-8">
                
                {/* Left Page */}
                {renderTemplate(
                  selectedChapter?.left_page_template_number || "TC",
                  selectedChapter?.title_left_page || "",
                  selectedChapter?.left_page_top_content || "",
                  selectedChapter?.left_page_bottom_content || "",
                  selectedChapter?.left_page_top_image,
                  selectedChapter?.left_page_bottom_image,
                )}

                {/* Right Page */}
                {renderTemplate(
                  selectedChapter?.right_page_template_number || "TC",
                  selectedChapter?.title_right_page || "",
                  selectedChapter?.right_page_top_content || "",
                  selectedChapter?.right_page_bottom_content || "",
                  selectedChapter?.right_page_top_image,
                  selectedChapter?.right_page_bottom_image,
                )}

                {/* Previous and Next Buttons*/}
                <div className="absolute bottom-10 left-6 text-xs">
                  <img src="/prev_icon.png" onClick={goToPreviousChapter} className={`w-[30px] h-[30px] ${index === 0 ? 'opacity-50' : ''}`} ></img>
                </div>
                <div className="absolute bottom-10 right-6 text-xs">
                  <img src="/next_icon.png" onClick={goToNextChapter} className={`w-[30px] h-[30px] ${index === chapters.length - 1 ? 'opacity-50' : ''}`} ></img>
                </div>
              </div>
            </div>
            <PlacesMedia selectedChapter={selectedChapter} />
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
            className="h-full flex flex-col text-black pt-16 pl-15 overflow-y-auto"
            onClick={e => e.stopPropagation()}
            >
            <h3 className="text-7xl font-lovers font-extrabold mb-4 pl-7">Table of Contents</h3>
            <ul className="space-y-3 text-base font-imfell">
              {chapters.map((chapter, index) => (
                <li 
                  key={index} 
                  className="text-2xl cursor-pointer hover:text-blue-600 leading-12"
                  onClick={() => handleClick(index, chapter)}
                >
                  {chapter.title_left_page}
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <div className="h-full flex items-center justify-center pl-4"> 
              <div className="text-5xl font-lovers font-extrabold transform rotate-90 text-black whitespace-nowrap pt-3">Table of Contents</div>
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

export default PlacesPage;
