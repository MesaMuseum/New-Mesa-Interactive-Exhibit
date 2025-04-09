const TemplateBC = ({ headerRef, topRef, bottomRef, imageUrl }) => {
  return (
    <div className="w-[48%] flex flex-col p-6 rounded-lg">
      <h3 ref={headerRef} className="text-3xl font-lovers font-bold text-black mb-4"></h3>
      <div className="flex-1">
        <p ref={topRef} className="text-base font-imfell text-black font-medium leading-relaxed mb-4"></p>
        <p ref={bottomRef} className="text-base font-imfell text-black font-medium leading-relaxed mb-4"></p>
      </div>
      <div className="w-full h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mx-auto">
        {/* Bottom center image */}
      </div>
    </div>
  );
};

export default TemplateBC; 