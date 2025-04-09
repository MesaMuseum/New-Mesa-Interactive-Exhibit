const TemplateTLBR = ({ headerRef, topRef, bottomRef, imageUrl }) => {

  return (
    <div className="w-[48%] flex flex-col p-6 rounded-lg">
      <h3 ref={headerRef} className="text-3xl font-lovers font-bold text-black mb-4">
      </h3>
      <div className="flex flex-col space-y-4">
        <div className="max-w-2xl mx-auto p-4 relative">
          <img
            src={imageUrl || "/bookbg.jpeg"} 
            alt="Template Image"
            className="w-25 h-32 mr-5 mb-4 float-left bg-black"
            style={{
              shapeOutside: 'margin-box',
              margin: '0 16px 16px 0'
            }}
          />
          <p className="text-gray-700" ref={topRef}></p>
        </div>
        <div className="max-w-2xl mx-auto p-4 relative">
          <img
            src={imageUrl || "/bookbg.jpeg"}
            alt="Template Image"
            className="w-25 h-32 mr-5 mb-4 float-right bg-black"
            style={{
              shapeOutside: 'margin-box',
              margin: '16px 16px 16px 16px'
            }}
          />
          <p className="text-gray-700" ref={bottomRef}></p>
        </div>
      </div>
    </div>
  );
};

export default TemplateTLBR;