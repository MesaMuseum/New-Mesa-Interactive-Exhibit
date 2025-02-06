import { useState } from "react";
import backgroundImage from '../../assets/contentPage/Desk_Background.png'; 
import sideImageDefault from '../../assets/contentPage/Contents_Sidebar_Minimized.png';
import sideImageHover from '../../assets/contentPage/Contents_Sidebar_Expanded.png';
import header from '../../assets/contentPage/header.png';
import chapters from './places.json';
import bookBackground from '../../assets/contentPage/Book_Page.png';

const ContentPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]); // Default to first chapter

  return (
    <div 
      className="w-screen h-screen flex bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Main Content */}
      <div className={`h-full flex flex-col flex-grow transition-all duration-500 overflow-hidden ${isSidebarExpanded ? 'pr-[15%]' : 'pr-[5%]'}`}> 
        
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
              <source src="/temp.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Sidebar (Right) */}
      <div 
        className={`h-full transition-all duration-500 bg-no-repeat bg-cover cursor-pointer flex items-center justify-center ${isSidebarExpanded ? 'w-[20%]' : 'w-[10%]'}`}
        style={{ backgroundImage: `url(${isSidebarExpanded ? sideImageHover : sideImageDefault})` }}
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
      >
        {isSidebarExpanded ? (
          <div className="h-full flex flex-col text-black pt-6 px-4 overflow-y-auto">
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
          <div className="text-lg font-bold transform rotate-90 text-black">Contents</div>
        )}
      </div>
    </div>
  );
};

export default ContentPage;
