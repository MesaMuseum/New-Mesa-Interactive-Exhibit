import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateTRBL = ({ title, topContent, bottomContent, topImage, bottomImage }) => {
  console.log("TemplateTRBL props:", { title, topContent, bottomContent, topImage, bottomImage })

  return (
    <div className="w-[48%] flex align-center flex-col p-4 rounded-lg pt-6">
        <hr className="w-[80%] ml-auto mr-auto border-black mt-5"></hr>

      <h3 className="text-8xl m-auto font-lovers font-bold text-black mb-1 mt-3">
        <AnimatedText text={title} />
      </h3>
      <hr className="w-[80%] ml-auto mr-auto border-black mb-5"></hr>
      <div className="border flex flex-col space-y-4">
        {/* Top section with right image */}
        <div className="border flex gap-4 p-4">
          <div className="flex-1">
            <p className="text-base font-imfell text-black font-medium leading-relaxed text-lg">
              <AnimatedText text={topContent} />
            </p>
          </div>
          <div className="w-1/3 h-32 bg-gray-200/50 backdrop-blur-sm rounded-lg flex-shrink-0">
              <img
                src={topImage}
                alt="Template illustration"
                className="w-full h-full object-contain"
              />
          </div>
        </div>

        {/* Bottom section with left image */}
        <div className="border flex gap-4">
          <div className="w-1/3 h-32 bg-gray-200/50 backdrop-blur-sm rounded-lg flex-shrink-0">

              <img
                src={bottomImage}
                alt="Template illustration"
                className="w-full h-full object-contain"
              />

          </div>
          <div className="flex-1">
            <p className="text-base font-imfell text-black font-medium leading-relaxed text-lg p-4">
              <AnimatedText text={bottomContent} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateTRBL
