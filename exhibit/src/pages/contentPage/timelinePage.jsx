import { Timeline } from '../../components/ui/timeline';
import backgroundImage from '/contentPage/Desk_Background.png?url'; 
import header from '/contentPage/header.png?url';
import CircleAnimation from "./header_circle";
import timelineData from './timeline.json';

const TimelinePage = () => {
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
                </div>
              </a>
              
              <a 
                href="/places"
                className="font-lovers text-black no-underline font-extrabold text-5xl scale-105 transition-transform relative"
              >
                <div className="relative inline-block">
                  Places
                </div>
              </a>

              <a 
                href="/timeline"
                className="font-lovers text-black no-underline font-extrabold text-5xl scale-105 transition-transform relative"
              >
                <div className="relative inline-block">
                  Timeline
                  <CircleAnimation />
                </div>
              </a>
            </div>
          </div>

          {/* Timeline Container */}
          <div className="flex-1 flex justify-center items-start px-8 pt-8 pb-16">
            <div className="w-full max-w-8xl h-[85vh] rounded-2xl overflow-hidden backdrop-blur-sm bg-black/40">
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <div className="px-8 py-12">
                  <Timeline data={timelineData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;