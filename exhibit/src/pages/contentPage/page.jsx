import { useState } from "react";
import backgroundImage from '../../assets/contentPage/Desk_Background.png'; 
import sideImageDefault from '../../assets/contentPage/Contents_Sidebar_Minimized.png';
import sideImageHover from '../../assets/contentPage/Contents_Sidebar_Expanded.png';
import header from '../../assets/contentPage/header.png';
import chapters from './chapters.json';

const ContentPage = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]); // Default to first chapter

  return (
    <div 
      className="w-screen h-screen flex bg-cover bg-center overflow-hidden" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Sidebar */}
      <div 
        className={`h-full transition-all duration-500 bg-no-repeat bg-cover cursor-pointer overflow-hidden ${
          isSidebarExpanded ? 'w-[18%]' : 'w-[10%]'
        }`}
        style={{ backgroundImage: `url(${isSidebarExpanded ? sideImageHover : sideImageDefault})` }}
        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
      >
        {isSidebarExpanded ? (
          <div className="h-full flex flex-col items-start text-black pt-4 pl-6 overflow-y-auto">
            <h3 className="font-extrabold mb-4 text-2xl">Navigate</h3>
            <ul className="text-lg list-none space-y-4">
              {chapters.map((chapter, index) => (
                <li 
                  key={index} 
                  className="hover:underline cursor-pointer"
                  onClick={() => setSelectedChapter(chapter)}
                >
                  {chapter.title_left_page}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-center text-black transform -rotate-90 ml-6">
            <span className="text-xl font-extrabold tracking-widest">Contents</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`h-full flex flex-col transition-all duration-500 overflow-hidden ${
        isSidebarExpanded ? 'w-[82%]' : 'w-[90%]'
      }`}>
        
        {/* Top Bar */}
        <div className="w-full h-[8%] flex items-center justify-center relative overflow-hidden">
          <img 
            src={header} 
            alt="Page Header" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <h1 
            className="absolute text-black text-2xl font-bold"
            style={{ top: '50%', left: '40%', transform: 'translate(-50%, -50%)' }}
          >
            People&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Places
          </h1>
        </div>

        {/* Content Area (Book & Interaction - Side by Side) */}
        <div className="flex flex-1 h-[92%] overflow-hidden">
          
          {/* Book Div (Left - 50%) */}
          <div className="w-[50%] h-full flex flex-row overflow-hidden">

            {/* Left Page */}
            <div className="w-1/2 h-full bg-yellow-200 flex flex-col p-4 border-r-2 border-yellow-600 overflow-y-auto">
              <h2 className="text-2xl font-serif mb-2">{selectedChapter?.title_left_page || "Select a Chapter"}</h2>
              {selectedChapter?.left_page_image && (
                <img src={selectedChapter.left_page_image} alt="Left Page" className="w-full h-40 object-cover my-2"/>
              )}
              <p className="text-sm">{selectedChapter?.left_page_content || "No content available."}</p>
            </div>

            {/* Right Page */}
            <div className="w-1/2 h-full bg-yellow-100 flex flex-col p-4 overflow-y-auto">
              <h2 className="text-2xl font-serif mb-2">{selectedChapter?.title_right_page || "Select a Chapter"}</h2>
              {selectedChapter?.right_page_image && (
                <img src={selectedChapter.right_page_image} alt="Right Page" className="w-full h-40 object-cover my-2"/>
              )}
              <p className="text-sm">{selectedChapter?.right_page_content || "No content available."}</p>
            </div>

          </div>

          {/* Interaction Div (Right - 50%) */}
          <div className="w-[50%] h-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <p className="text-xl text-gray-600">[Interactive Content Placeholder]</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContentPage;
