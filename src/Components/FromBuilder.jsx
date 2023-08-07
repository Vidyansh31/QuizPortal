import React from 'react'
import CategorizedForm from "./CategorizedForm.jsx"
import ClozeForm from "./ClozeForm.jsx"
import ComprehensionForm from './ComprehensionForm.jsx'

const FormBuilder = () => {
  return (
    <div className="bg-gray-100">
      <div className="p-20">
      <div className="w-70vw border-t-4 border-purple-500 rounded shadow bg-white p-4">
        <h1 className="text-5xl text-center mb-10 p-2 underline">Form Builder</h1>
        {/* Other form components */}

        <CategorizedForm />
        <ClozeForm />
        <ComprehensionForm/>
      </div>
    </div>
    </div>
  )
}

export default FormBuilder
