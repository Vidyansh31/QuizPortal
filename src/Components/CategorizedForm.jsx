import React, { useRef, useState } from "react";
import axios from "axios";

const CategorizedForm = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [solutions, setSolutions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [optionDescription, setOptionDescription] = useState("");


  //save reference for DragItem and dragOverItem
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const AddCategory = () => {
    if (newCategory.trim() !== "") {
      const updatedCategory = [...category, newCategory];
      setCategory(updatedCategory);
      setNewCategory("");
    }
  };

  const removeCategory = (index) => {
    const updatedCategory = [...category];
    updatedCategory.splice(index, 1);
    setCategory(updatedCategory);
  };

  const addSolution = () => {
    if (optionDescription.trim() !== "" && selectedCategory !== "") {
      const newSolution = { optionDescription, category: selectedCategory };
      setSolutions([...solutions, newSolution]);
      
      setOptionDescription("");
      setSelectedCategory("");
    }
  };

  const removeSolution = (index) => {
    const updatedSolutions = [...solutions];
    updatedSolutions.splice(index, 1);
    setSolutions(updatedSolutions);
  };

  const handleSort = () => {
    const updatedCategory = [...category];

    //remove and save the dragitem content
    const dragItemContent = updatedCategory.splice(dragItem.current,1)[0];

    //switch position
    updatedCategory.splice(dragOverItem.current,0,dragItemContent)

    //update reference
    dragItem.current = null;
    dragOverItem.current = null;

    //update category
    setCategory(updatedCategory);
  }

  const handleReset = () => {
    setDescription("");
    setCategory([]);
    setNewCategory("");
    setSolutions([]);
    setSelectedCategory("");
    setOptionDescription("");
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        description,
        category,
        solutions,
      };

      await axios.post("http://localhost:5000/builder/CategorizeSubmit", formData);
      alert("submitted successfully!");
      handleReset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  }


  return (
    <div className="w-60vw m-1 border shadow-lg p-3">
      <div className="w-50vw p-5">
      <h1 className="text-center text-3xl font-bold text-indigo-500 m-5">Question 1</h1>
        <input
          type="text"
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
        />
        <div className="w-20vw mt-4">
          <input
            type="text"
            placeholder="Add Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-20vw p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={AddCategory}
            className="m-2 bg-indigo-500 text-white px-3 py-1 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Add
          </button>
          <h4 className="mt-4">Categories: </h4>
          <div className="flex flex-col">
            {category.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => dragItem.current=index}
                onDragEnter={(e) => dragOverItem.current = index}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault}
                className="flex items-center justify-between w-1/5 p-2 border border-gray-500 rounded-md shadow-md m-1 group hover:bg-gray-100"
              >
                <p className="mr-2">{item}</p>
                <button
                  onClick={() => removeCategory(index)}
                  className="text-red-500 opacity-0 group-hover:opacity-100 hover:text-red-700 font-semibold text-sm focus:outline-none"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
        </div>
        <div className="flex mt-4">
        <div className="w-1/2">
          <h2 className="text-xl font-bold text-indigo-500">Solution</h2>
          {solutions.map((solution, index) => (
            <div key={index} className="flex items-center mt-2">
              <p className="mr-2">{solution.optionDescription}</p>
              <p className="text-sm text-gray-500">(Category: {solution.category})</p>
              <button
                onClick={() => removeSolution(index)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold text-indigo-500">Options</h2>
          <input
            type="text"
            placeholder="Enter solution description"
            value={optionDescription}
            onChange={(e) => setOptionDescription(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          />
          <select
            className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            {category.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={addSolution}
            className="mt-2 bg-indigo-500 text-white px-3 py-1 rounded-md shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Add Solution
          </button>
        </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
        >
          Submit
        </button>
        <button
          onClick={handleReset}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default CategorizedForm;
