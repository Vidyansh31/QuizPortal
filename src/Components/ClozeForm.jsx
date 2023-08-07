import React, { useState, useRef } from "react";

const ClozeForm = () => {
  const [questionSentence, setQuestionSentence] = useState("");
  const [options, setOptions] = useState([]);
  const [preview, setPreview] = useState("");

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSentenceChange = (e) => {
    e.preventDefault()
    const newSentence = e.target.value;
    setQuestionSentence(newSentence);

    // Extract options from the sentence (words between * and *)
    const regex = /\*([^*]+)\*/g;
    const matchedOptions = [];
    let match;
    while ((match = regex.exec(newSentence))) {
      matchedOptions.push(match[1]);
    }
    setOptions(matchedOptions);

    // Update preview with underscores
    const previewText = newSentence.replace(/\*([^*]+)\*/g, "_____");
    setPreview(previewText);
  };

  const handleSort = () => {
    const updatedOptions = [...options];
    const dragItemContent = updatedOptions.splice(dragItem.current, 1)[0];
    updatedOptions.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setOptions(updatedOptions);
  };

  return (
    <div className="w-60vw mt-10 m-1  border border-transparent shadow-lg p-3">
      <div className="w-50vw p-5">
      <h1 className="text-center text-3xl font-bold text-indigo-500 m-5">Question 2</h1>
        <div className="border-b mb-4">
          <h2 className="text-xl font-bold text-indigo-500">Preview</h2>
          <p>{preview}</p>
        </div>
        <div className="border-b mb-4">
          <h2 className="text-xl font-bold text-indigo-500">Question</h2>
          <textarea
            value={questionSentence}
            onChange={handleSentenceChange}
            placeholder="Write a sentence..."
            className="w-full p-2 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
          />
          <span className="text-sm text-gray-300 italic">
            To make a word options just apply{" "}
            <span className="font-light">*</span> before and after that word
            like <span className="font-light">*</span>Hello
            <span className="font-light">*</span>
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-indigo-500">Options</h2>
          <div className="flex flex-col">
            {options.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => (dragItem.current = index)}
                onDragEnter={(e) => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className="flex items-center justify-between w-1/5 p-2 border border-gray-500 rounded-md shadow-md m-1 group hover:bg-gray-100"
              >
                <p className="mr-2">{item.replace(/\*/g, "")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClozeForm;
