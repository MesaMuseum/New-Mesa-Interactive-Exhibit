const TemplateTC = ({ headerRef, contentRef, imageUrl }) => {
  return (
    <div className="w-[48%] flex flex-col p-6 rounded-lg">
      <h3 ref={headerRef} className="text-3xl font-lovers font-bold text-black mb-4"></h3>
      <div className="w-full h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mx-auto mb-4">
        {/* Top center image */}
      </div>
      <div className="flex-1">
        <p ref={contentRef} className="text-base font-imfell text-black font-medium leading-relaxed"></p>
      </div>
    </div>
  );
};

export default TemplateTC; 