const TemplateTLBR = ({ headerRef, contentRef, imageUrl }) => {
  return (
    <div className="w-[48%] flex flex-col p-6 rounded-lg">
      <h3 ref={headerRef} className="text-3xl font-lovers font-bold text-black mb-4"></h3>
      <div className="flex flex-col space-y-4">
        {/* Top section with left image */}
        <div className="flex gap-4">
          <div className="w-1/3 h-32 bg-gray-200/50 backdrop-blur-sm rounded-lg flex-shrink-0">
            {/* Top left image */}
          </div>
          <div className="flex-1">
            <p ref={contentRef} className="text-base font-imfell text-black font-medium leading-relaxed"></p>
          </div>
        </div>
        
        {/* Bottom section with right image */}
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-base font-imfell text-black font-medium leading-relaxed"></p>
          </div>
          <div className="w-1/3 h-32 bg-gray-200/50 backdrop-blur-sm rounded-lg flex-shrink-0">
            {/* Bottom right image */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTLBR; 