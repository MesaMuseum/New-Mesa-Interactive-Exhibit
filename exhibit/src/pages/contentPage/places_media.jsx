import React, { useState, useEffect } from "react";

const PlacesMedia = ({ selectedChapter }) => {
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

export default PlacesMedia;
