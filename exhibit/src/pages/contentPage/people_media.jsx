import React, { useState } from "react";

const PeopleMedia = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const question = {
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correct: "Paris",
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.correct);
  };

  return (
    <div className="w-[45%] h-[90%] flex flex-col items-center shadow-lg rounded-lg p-4">
        <h2 className="text-4xl font-lovers font-extrabold text-white-800 mb-3">Interactive Content</h2>
        <video className="w-full h-auto rounded-lg shadow-md" controls>
        <source src="/temp.mp4" type="video/mp4" />
            <p className="font-imfell">Your browser does not support the video tag.</p>
        </video>

      {/* Trivia Question */}
      <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2 text-black">{question.text}</h2>
        <div className="grid grid-cols-2 gap-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`p-2 border rounded-lg ${
                selectedAnswer === option
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <p className="mt-2 font-medium text-black flex justify-center">
            {isCorrect ? "✅ Correct!" : "❌ Wrong answer"}
          </p>
        )}
      </div>
    </div>
  );
};

export default PeopleMedia;
