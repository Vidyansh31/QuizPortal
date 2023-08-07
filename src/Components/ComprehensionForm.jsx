import React, { useState } from "react";

const ComprehensionForm = () => {
  const [passage, setPassage] = useState("");
  const [mcqQuestions, setMcqQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctOption: 0 },
  ]);

  const handleAddMcqQuestion = () => {
    setMcqQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };

  const handleRemoveMcqQuestion = (index) => {
    const updatedQuestions = mcqQuestions.filter((_, i) => i !== index);
    setMcqQuestions(updatedQuestions);
  };

  console.log(mcqQuestions)

  return (
    <div className="w-60vw mt-10 m-1 border border-transparent shadow-lg p-3">
      <div className="w-50vw p-5">
      <h1 className="text-center text-3xl font-bold text-indigo-500 m-5">Question 3</h1>
        <div className="border-b mb-4">
          <h2 className="text-xl font-bold text-indigo-500">Passage</h2>
          <textarea
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder="Write the passage..."
            className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          />
          
        </div>
        <div className="border-b mb-4">
          <h2 className="text-xl font-bold text-indigo-500 mb-3">MCQ Questions</h2>
          {mcqQuestions.map((mcq, index) => (
            <div key={index} className="mb-4 border rounded-md p-4">
              <h3 className="text-lg font-semibold mb-2">
                MCQ Question {index + 1}
              </h3>
              <button
                onClick={() => handleRemoveMcqQuestion(index)}
                className="text-red-500 px-2 py-1 rounded-md border hover:bg-red-500 hover:text-white focus:outline-none focus:ring focus:ring-red-200"
              >
                Remove
              </button>
              <textarea
                value={mcq.question}
                onChange={(e) => {
                  const updatedQuestions = [...mcqQuestions];
                  updatedQuestions[index].question = e.target.value;
                  setMcqQuestions(updatedQuestions);
                }}
                placeholder="Write the MCQ question..."
                className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              />
              <div className="mt-2 space-y-2">
                {mcq.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <input
                      type="radio"
                      name={`mcq-${index}`}
                      value={optionIndex}
                    //   checked={mcq.correctOption === optionIndex+1}
                      onChange={() => {
                        const updatedQuestions = [...mcqQuestions];
                        updatedQuestions[index].correctOption = optionIndex+1;
                        setMcqQuestions(updatedQuestions);
                      }}
                    />
                    <textarea
                      value={option}
                      onChange={(e) => {
                        const updatedQuestions = [...mcqQuestions];
                        updatedQuestions[index].options[optionIndex] =
                          e.target.value;
                        setMcqQuestions(updatedQuestions);
                      }}
                      placeholder={`Option ${optionIndex + 1}`}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ))}
                
              </div>
            </div>
          ))}
          <button
            onClick={handleAddMcqQuestion}
            className="bg-indigo-500 text-white px-3 py-1 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 mt-2"
          >
            Add MCQ Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionForm;
