import AnimatedText from "../animated-text.jsx"
import "../../../styles/text-animation.css"

const TemplateTLBR = ({ title, topContent, bottomContent, imageUrl }) => {
  console.log("TemplateTLBR props:", { title, topContent, bottomContent, imageUrl })

  return (
    <div className="w-[48%] flex flex-col p-6 rounded-lg">
      <h3 className="text-3xl font-lovers font-bold text-black mb-4">
        <AnimatedText text={title} />
      </h3>
      <div className="flex flex-col space-y-4">
        <div className="max-w-2xl mx-auto p-4 relative">
          <img
            src={imageUrl || "/bookbg.jpeg"}
            alt="Template Image"
            className="w-25 h-32 mr-5 mb-4 float-left bg-black"
            style={{
              shapeOutside: "margin-box",
              margin: "0 16px 16px 0",
            }}
          />
          <p className="text-gray-700">
            <AnimatedText text={topContent}/>
          </p>
        </div>
        <div className="max-w-2xl mx-auto p-4 relative">
          <img
            src={imageUrl || "/bookbg.jpeg"}
            alt="Template Image"
            className="w-25 h-32 mr-5 mb-4 float-right bg-black"
            style={{
              shapeOutside: "margin-box",
              margin: "16px 16px 16px 16px",
            }}
          />
          <p className="text-gray-700">
            <AnimatedText text={bottomContent} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default TemplateTLBR
