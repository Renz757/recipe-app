import React, { useState } from "react";

const InstructionList = ({setInstructions, instructions}) => {

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const removeInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  return (
    <div>
      <div>
        {instructions.map((instruction, index) => (
          <div key={index} className="mb-2 flex gap-2 items-center">
            <textarea
              type="textarea"
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              placeholder="Add dry ingredients to a large bowl, mix "
              className="mt-1 p-2 w-full border rounded-md"
            />
            <button type="button" className="bg-red-500 rounded-md p-2" onClick={() => removeInstruction(index)}>Remove</button>
          </div>
        ))}
        <button className="bg-green-500 p-2 rounded-md" type="button" onClick={addInstruction}>Add Instruction</button>
      </div>
    </div>
  );
}

export default InstructionList;
