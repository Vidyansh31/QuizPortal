import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate
import CategorizeQuestion from './CategorizeQuestion';
import ClozeQuestion from './ClozeQuestion';
import ComprehensionQuestion from './ComprehensionQuestion';

const FormBuilder = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = () => {
    
    setIsSubmitting(true);
  
    setTimeout(() => {
      
      setIsSubmitting(false); 
    }, 1000); 
  };

  return (
    <div className="bg-gray-100">
      <div className="p-20">
        <div className="w-70vw border-t-4 border-purple-500 rounded shadow bg-white p-4">
          <h1 className="text-5xl text-center mb-10 p-2">Quiz</h1>
          {/* Other form components */}
          <CategorizeQuestion />
          <ClozeQuestion />
          <ComprehensionQuestion />

          <div className="text-center mt-6">
            {isSubmitting ? (
              <p>Submitting...</p>
            ) : (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
                onClick={handleSubmission}
              >
                Submit
              </button>
            )}
          </div>
          
          {/* Use Navigate here */}
          {isSubmitting && <Navigate to="/submission" />}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
