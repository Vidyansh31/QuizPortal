import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import CategorizedForm from "./CategorizedForm.jsx";
import ClozeForm from "./ClozeForm.jsx";
import ComprehensionForm from './ComprehensionForm.jsx';

const FormBuilder = () => {
  return (
    <div className="bg-gray-100">
      <div className="p-20">
        <div className="w-70vw border-t-4 border-purple-500 rounded shadow bg-white p-4">
          <h1 className="text-5xl text-center mb-10 p-2 underline">Form Builder</h1>
        
          <CategorizedForm />
          <ClozeForm />
          <ComprehensionForm />
          
          <div className="flex justify-center mt-4">
            <Link to="/"> {/* Link to home page */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                Go to Home
              </button>
            </Link>
            <Link to="/quiz"> {/* Link to quiz page */}
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Go to Quiz
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;
