import React, { useState, useEffect } from "react";

const PeopleMedia = ({ selectedChapter }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    // Reset answer when chapter changes
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [selectedChapter]);

  // Check if the selected chapter has a trivia question
  const hasQuestion = selectedChapter?.question && selectedChapter?.options?.length > 0;

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === selectedChapter.answer);
  };

  return (
    <div className="w-[45%] h-[90%] flex flex-col items-center shadow-lg rounded-lg p-4">
      {/* Video Section */}
      <video className="w-full h-auto rounded-lg shadow-md" controls>
        <source src="/temp.mp4" type="video/mp4" />
        <p className="font-imfell">Your browser does not support the video tag.</p>
      </video>

      {/* Trivia Question Section (Only Shows If the Chapter Has a Question) */}
      {hasQuestion ? (
        <div className="w-full bg-black/55 text-white text-lg font-imfell font-medium text-center mt-2 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">{selectedChapter.question}</h2>
          
          {/* Answer Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {selectedChapter.options.map((option, index) => (
              <button
                key={index}
                className={`p-2 border rounded-lg text-black ${
                  selectedAnswer === option
                    ? isCorrect
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-black"
                    : "bg-black"
                }`}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Display Result */}
          {selectedAnswer && (
            <p className="w-full bg-black/55 text-white text-lg font-imfell font-medium text-center mt-2 p-2 rounded-lg">
              {isCorrect ? "✅ Correct!" : "❌ Wrong answer"}
            </p>
          )}
        </div>
      ) : (
        <p className="text-white text-center mt-2">No trivia available for this chapter.</p>
      )}
    </div>
  );
};

export default PeopleMedia;











// import React, { useState, useEffect } from "react";
// import chapters from "./chapters.json"; // Importing JSON file

// const PeopleMedia = () => {
//   const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(null);

//   const chapter = chapters[currentChapterIndex]; // Get current chapter
//   const hasQuestion = chapter.question && chapter.options.length > 0; // Check if the chapter has a question

//   // Reset answer selection when chapter changes
//   useEffect(() => {
//     setSelectedAnswer(null);
//     setIsCorrect(null);
//   }, [currentChapterIndex]);

//   const handleAnswerClick = (answer) => {
//     setSelectedAnswer(answer);
//     setIsCorrect(answer === chapter.answer);
//   };

//   // Go to the next chapter
//   const handleNextChapter = () => {
//     if (currentChapterIndex < chapters.length - 1) {
//       setCurrentChapterIndex(currentChapterIndex + 1);
//     }
//   };

//   // Go to the previous chapter
//   const handlePrevChapter = () => {
//     if (currentChapterIndex > 0) {
//       setCurrentChapterIndex(currentChapterIndex - 1);
//     }
//   };

//   return (
//     <div className="w-[45%] h-[90%] flex flex-col items-center shadow-lg rounded-lg p-4">
//       {/* Video Section */}
//       <video className="w-full h-auto rounded-lg shadow-md" controls>
//         <source src="/temp.mp4" type="video/mp4" />
//         <p className="font-imfell">Your browser does not support the video tag.</p>
//       </video>

//       {/* Trivia Question Section */}
//       {hasQuestion ? (
//         <div className="w-full bg-black/55 text-white text-lg font-imfell font-medium text-center mt-2 p-4 rounded-lg">
//           <h2 className="text-lg font-semibold mb-2 text-white">{chapter.question}</h2>
          
//           {/* Answer Buttons */}
//           <div className="grid grid-cols-2 gap-2">
//             {chapter.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`p-2 border rounded-lg text-black ${
//                   selectedAnswer === option
//                     ? isCorrect
//                       ? "bg-green-500 text-black"
//                       : "bg-red-500 text-black"
//                     : "bg-black"
//                 }`}
//                 onClick={() => handleAnswerClick(option)}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>

//           {/* Display Result */}
//           {selectedAnswer && (
//             <p className="w-full bg-black/55 text-white text-lg font-imfell font-medium text-center mt-2 p-2 rounded-lg">
//               {isCorrect ? "✅ Correct!" : "❌ Wrong answer"}
//             </p>
//           )}
//         </div>
//       ) : (
//         <p className="text-white text-center mt-2">No question available for this chapter.</p>
//       )}

//       {/* Navigation Buttons */}
//       <div className="flex justify-between mt-4">
//         <button
//           className={`p-2 border rounded-lg bg-gray-500 text-white ${
//             currentChapterIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handlePrevChapter}
//           disabled={currentChapterIndex === 0}
//         >
//           Previous
//         </button>

//         <button
//           className={`p-2 border rounded-lg bg-blue-500 text-white ${
//             currentChapterIndex === chapters.length - 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handleNextChapter}
//           disabled={currentChapterIndex === chapters.length - 1}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PeopleMedia;






// import React, { useState } from "react";

// const PeopleMedia = () => {
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isCorrect, setIsCorrect] = useState(null);

//   const question = {
//     text: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correct: "Paris",
//   };

//   const handleAnswerClick = (answer) => {
//     setSelectedAnswer(answer);
//     setIsCorrect(answer === question.correct);
//   };

//   return (
//     <div className="w-[45%] h-[90%] flex flex-col items-center shadow-lg rounded-lg p-4">
//         <video className="w-full h-auto rounded-lg shadow-md" controls>
//         <source src="/temp.mp4" type="video/mp4" />
//             <p className="font-imfell">Your browser does not support the video tag.</p>
//         </video>

//       {/* Trivia Question */}
//       <div className="w-full bg-black/55 text-white text-lg font-imfell font-medium text-center mt-2 p-2 rounded-lg">
//         <h2 className="text-lg font-semibold mb-2 text-white">{question.text}</h2>
//         <div className="grid grid-cols-2 gap-2">
//           {question.options.map((option, index) => (
//             <button
//               key={index}
//               className={`p-2 border rounded-lg text-black ${
//                 selectedAnswer === option
//                   ? isCorrect
//                     ? "bg-green-500 text-black"
//                     : "bg-red-500 text-black"
//                   : "bg-black"
//               }`}
//               onClick={() => handleAnswerClick(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       </div>
//       {selectedAnswer && (
//           <p className="w-full bg-black/55 text-white text-lg font-imfell font-medium text-center mt-2 p-2 rounded-lg">
//             {isCorrect ? "✅ Correct!" : "❌ Wrong answer"}
//           </p>
//         )}
//     </div>
//   );
// };

// export default PeopleMedia;
