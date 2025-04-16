import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateBC = ({ title, topContent, bottomContent, topImage, bottomImage }) => {
  return (
    <div className="w-[48%] flex align-center flex-col p-4 rounded-lg">
    <hr className="w-[80%] ml-auto mr-auto border-black mt-5"></hr>

  <h3 className="text-7xl m-auto font-lovers font-bold text-black mb-1 mt-3">
    <AnimatedText text={title} />
  </h3>
  <hr className="w-[80%] ml-auto mr-auto border-black mb-5"></hr>
      <div className="flex-1">
        <p className="text-base font-imfell text-black font-medium leading-relaxed mb-4">
          <AnimatedText text={topContent} />
        </p>
        <p className="text-base font-imfell text-black font-medium leading-relaxed mb-4">
          <AnimatedText text={bottomContent} />
        </p>
      </div>
      <div className="w-full h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mx-auto">
        {imageUrl && (
          <img
            src={topImage}
            alt="Template illustration"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  )
}

export default TemplateBC
