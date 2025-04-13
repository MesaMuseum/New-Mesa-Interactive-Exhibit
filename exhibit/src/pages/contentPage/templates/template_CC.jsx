import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateCC = ({ title, topContent, bottomContent, imageUrl }) => {
  console.log("TemplateCC props:", { title, topContent, bottomContent, imageUrl })

  return (
    <div className="w-[48%] flex flex-col p-6 rounded-lg">
      <h3 className="text-3xl font-lovers font-bold text-black mb-4">
        <AnimatedText text={title} />
      </h3>
      <div className="flex-1">
        <p className="text-base font-imfell text-black font-medium leading-relaxed mb-4">
          <AnimatedText text={topContent} />
        </p>
      </div>
      <div className="w-2/3 h-48 bg-gray-200/50 backdrop-blur-sm rounded-lg mx-auto mb-4">
        {imageUrl && (
          <img
            src={imageUrl || "/placeholder.svg"}
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
