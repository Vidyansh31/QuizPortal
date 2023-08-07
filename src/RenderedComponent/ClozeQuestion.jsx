import React, { useEffect, useState } from "react";
import axios from "axios";

const ClozeQuestion = () => {
  const [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://quiz-portal-backend-a7rw.vercel.app/quiz/ClozeQuestion"
      );
      const data = response.data;
      setQuestion(data);
      setOptions(data.options); // Initialize options state
    } catch (err) {
      alert("Error fetching questions", err.message);
    }
  };

  const handleDragStart = (e, optionIndex) => {
    e.dataTransfer.setData("optionIndex", optionIndex);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const optionIndex = e.dataTransfer.getData("optionIndex");

    // Update options state
    const updatedOptions = [...options];
    updatedOptions.splice(optionIndex, 1); // Remove the dragged option
    setOptions(updatedOptions);

    // Update question.preview by replacing the first "_" with the dropped option
    const updatedPreview = question.preview.replace("_", question.options[optionIndex]);
    setQuestion({ ...question, preview: updatedPreview });
  };

  const renderPreview = () => {
    if (!question.preview) {
      return null;
    }

    const words = question.preview.split(" ");

    return (
      <p>
        {words.map((word, index) => (
          <React.Fragment key={index}>
            {word === "_____" ? (
              <div
                key={index}
                droppable={true}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => e.preventDefault()}
                style={{
                  display: "inline-block",
                  backgroundColor: "lightblue",
                  width: "10vw",
                  border: "1px solid grey",
                  height: "5vh",
                  alignItems: "center",
                  margin: "-10px 10px"
                }}
              ></div>
            ) : (
              word + " "
            )}
          </React.Fragment>
        ))}
      </p>
    );
  };

  return (
    <div className="w-60vw mt-5 m-1 border shadow-lg p-3">
      <div className="w-50vw p-5 text-center">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-indigo-500 mb-5">
            Fill in the Blank
          </h1>

          {renderPreview()}
          <span className="text-sm text-gray-300 italic mt-5">
            Drop the option at the appropriate position
          </span>
        </div>
        <div className="mb-4 text-center">
          <div className="flex flex-wrap justify-center">
            {options.map((option, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                className="bg-indigo-500 text-white p-2 rounded-md m-1"
                style={{ width: "10vw" }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClozeQuestion;
