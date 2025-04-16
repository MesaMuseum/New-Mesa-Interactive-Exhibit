import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateCC = ({ title, topContent, bottomContent, topImage, bottomImage }) => {
  console.log("TemplateCC props:", { title, topContent, bottomContent, topImage, bottomImage })

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
      </div>
      <div className="w-2/3 h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mx-auto mb-4">
        {imageUrl && (
          <img
            src={topImage}
            alt="Template illustration"
            className="w-full h-full object-contain"
          />
        )}
      </div>
      <div className="flex-1">
        <p className="text-base font-imfell text-black font-medium leading-relaxed">
          <AnimatedText text={bottomContent} />
        </p>
      </div>
    </div>
  )
}

export default TemplateCC
