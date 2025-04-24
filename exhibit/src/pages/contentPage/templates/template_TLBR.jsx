import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateTLBR = ({ title, topContent, bottomContent, topImage, bottomImage }) => {
  console.log("TemplateTLBR props:", { title, topContent, bottomContent, topImage, bottomImage })

  return (
    <div className="w-[48%] flex align-center flex-col p-4 rounded-lg">
        <hr className="w-[80%] ml-auto mr-auto border-black mt-5"></hr>

      <h3 className="text-8xl m-auto font-lovers font-bold text-black mb-1 mt-3">
        <AnimatedText text={title} />
      </h3>
      <hr className="w-[80%] ml-auto mr-auto border-black mb-5"></hr>
      <div className="border flex flex-col">
        <div className="border max-w-2xl mx-auto p-4 pb-1 relative">
          <img
            src={topImage}
            alt="Template Image"
            className="w-25 h-32 mr-5 mb-1 float-left bg-black"
            style={{
              shapeOutside: "margin-box",
              margin: "0 16px 10px 0",
            }}
          />
          <p className="text-gray-700 text-lg">
            <AnimatedText text={topContent}/>
          </p>
        </div>
        <div className="border max-w-2xl mx-auto p-4 relative">
          <img
            src={bottomImage}
            alt="Template Image"
            className="w-25 h-32 mr-5 mb-4 float-right bg-black"
            style={{
              shapeOutside: "margin-box",
              margin: "16px 16px 16px 16px",
            }}
          />
          <p className="text-gray-700 text-lg">
            <AnimatedText text={bottomContent} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default TemplateTLBR
