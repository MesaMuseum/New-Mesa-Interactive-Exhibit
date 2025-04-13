import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateBC = ({ title, topContent, bottomContent, imageUrl }) => {
  return (
    <div className="w-[48%] flex flex-col p-6 rounded-lg">
      <h3 className="text-3xl font-lovers font-bold text-black mb-4">
        <AnimatedText text={title} />
      </h3>
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
            src={imageUrl || "/placeholder.svg"}
            alt="Template illustration"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  )
}

export default TemplateBC
