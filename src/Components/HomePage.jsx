import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleMakeAQuiz = () => {
    navigate('/builder');
  };

  const handleTakeAQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-500 mb-6">Welcome to the Quiz Portal</h1>
        <button
          onClick={handleMakeAQuiz}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md mr-4"
        >
          Make A Quiz
        </button>
        <button
          onClick={handleTakeAQuiz}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md"
        >
          Take a Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;
