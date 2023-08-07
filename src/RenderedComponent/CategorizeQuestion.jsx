import React, { useEffect, useState } from "react";
import axios from "axios";

const CategorizeQuestion = () => {
  const [question, setQuestion] = useState({});
  const [droppedOptions, setDroppedOptions] = useState(Array.from({ length: 4 }, () => null));
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quiz/CategorizeQuestion");
      const data = response.data;
      setQuestion(data);
    } catch (err) {
      alert("Error fetching questions", err.message);
    }
  };

  const dragStarted = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, categoryIndex) => {
    e.preventDefault();
    const transferItem = e.dataTransfer.getData("index");
    const optionDescription = question.solutions[transferItem].optionDescription;

    if (currentCategory !== null) {
      const updatedDroppedOptions = [...droppedOptions];
      updatedDroppedOptions[categoryIndex] = optionDescription;
      setDroppedOptions(updatedDroppedOptions);

      const updatedSolutions = question.solutions.filter((_, index) => index !== +transferItem);
      setQuestion({
        ...question,
        solutions: updatedSolutions,
      });
    }
  };

  return (
    <div className="w-60vw m-1 border shadow-lg p-3">
      <div className="w-50vw p-5 text-center">
        {question.description ? (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-indigo-500">Description</h2>
            <p>{question.description}</p>
          </div>
        ) : (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-indigo-500">Drag and Drop</h2>
            <p>{question.description}</p>
          </div>
        )}
         
        <div className="mb-4 text-center">
          <div className="flex flex-wrap justify-center">
            {question.solutions &&
              question.solutions.map((solution, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => dragStarted(e, index)}
                  className="bg-indigo-500 text-white p-2 rounded-md m-1"
                  style={{ width: "10vw" }}
                >
                  {solution.optionDescription}
                </div>
              ))}
          </div>
        </div>
        <span className="text-sm text-gray-300 italic">
            To drop an item, drag it over the Name of the Category
          </span>
        <div className="box">
          <div className="Categories">
            {question.category &&
              question.category.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="Category"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleDrop(e, categoryIndex)}
                  onDragEnter={() => setCurrentCategory(categoryIndex)}
                  onDragLeave={() => setCurrentCategory(null)}
                >
                  <h1>{category}</h1>
                  <div className="flex flex-wrap justify-center h-30vh">
                    {droppedOptions[categoryIndex] && (
                      <div className="bg-gray-300 p-2 rounded-md m-1 mb-4 w-32">
                        {droppedOptions[categoryIndex]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorizeQuestion;
