import { useState, useEffect, useRef } from "react";
import backgroundImage from '../../assets/contentPage/Desk_Background.png'; 
import sideImageDefault from '../../assets/contentPage/Contents_Sidebar_Minimized.png';
import sideImageHover from '../../assets/contentPage/Contents_Sidebar_Expanded.png';
import header from '../../assets/contentPage/header.png';
import chapters from './chapters.json';
import bookBackground from '../../assets/contentPage/Book_Page.png';

const ContentPage = () => {
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
          <div className="w-[50%] h-[15%] flex items-center justify-center relative">
            <img src={header} alt="Page Header" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute flex space-x-30 text-black font-bold tracking-wide text-2xl left-15 top-1/7">
            <a href="/people" className="!text-black">People</a>
            <a href="/places" className="!text-black">Places</a>
          </div>
          </div>



          {/* Book & Interaction */}
          <div className="flex flex-1 items-center justify-center gap-8 px-6">
            {/* Book Content */}
            <div className="relative w-[45%] h-[90%] flex flex-col bg-cover bg-center rounded-lg shadow-lg p-6" style={{ backgroundImage: `url(${bookBackground})` }}>
              <h2 className="text-lg font-serif font-bold mb-3 text-center">{selectedChapter?.title_left_page || "Select a Chapter"}</h2>
              <p className="text-sm leading-relaxed">{selectedChapter?.left_page_content || "No content available."}</p>
            </div>
            
            {/* Video Section */}
            <div className="w-[45%] h-[90%] flex flex-col items-center bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">Interactive Content</h2>
              <video className="w-full h-auto rounded-lg shadow-md" controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
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
              className="h-full flex flex-col text-black pt-16 pl-12 overflow-y-auto" // Changed px-8 to pl-8
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4">Navigate</h3>
              <ul className="space-y-3 text-base">
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
            <div className="h-full flex items-center justify-center pt-16"> 
              <div className="text-lg font-bold transform rotate-90 text-black">Contents</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
