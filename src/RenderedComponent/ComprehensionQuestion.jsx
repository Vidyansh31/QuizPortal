import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ComprehensionQuestion = () => {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://quiz-portal-backend-a7rw.vercel.app/quiz/ComprehensionQuestion');
      const data = response.data;
      setQuestion(data);
    } catch (err) {
      alert('Error fetching questions', err.message);
    }
  };

  return (
    <div className="w-60vw mt-5 m-1 border shadow-lg p-3">
      <div className="w-50vw p-5 text-center">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-indigo-500">Read the Paragraph and give answers to the below MCQs</h2>
          <p>{question.description}</p>
        </div>
        <div
          className="w-full border border-gray-300 p-3 shadow-md rounded-md mb-6"
          style={{ marginTop: '3rem', marginBottom: '3rem', overflow: 'auto' }}
        >
          {/* Passage */}
          <div style={{ maxHeight: '300px' }}>
            <p>{question.passage}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md">
          <h2 className="text-md font-bold text-indigo-500 mb-4">MCQ Questions</h2>
          {/* Render MCQ questions within a card */}
          {question.mcqQuestions &&
            question.mcqQuestions.map((mcq, mcqIndex) => (
              <div
                key={mcqIndex}
                className="bg-white border border-gray-300 p-4 rounded-md shadow-md mb-4"
              >
                <div className="flex flex-col mb-2">
                  <div className="w-1/4 ">
                    <p>{mcq.question}</p>
                  </div>
                  <div className="w-3/4">
                    <div className="ml-10">
                      {mcq.options &&
                        mcq.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="flex items-center"
                          >
                            <input
                              type="radio"
                              name={`mcqOption_${mcqIndex}`}
                              value={option}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComprehensionQuestion;
