import React, { useState } from "react";
import RemoveIcon from "../../UI/removeIcon";

const CustomRecipeInstructions = () => {
  //initialize localStorage and ingredient state
  const instructionsArray = JSON.parse(
    localStorage.getItem("instructionsArray") || "[]"
  );

  const [instructions, setInstructions] = useState(instructionsArray);
  const [step, setStep] = useState("");

  const inputHandler = (event) => {
    setStep(event.target.value);
  };

  const addStep = () => {
    setInstructions([...instructions, step]);
    localStorage.setItem(
      "instructionsArray",
      JSON.stringify([...instructions, step])
    );
    setStep("");
  };

  const removeStep = (index) => {
    setInstructions(
      instructions.filter(
        (stepIndex) => instructions.indexOf(stepIndex) !== index
      )
    );
    localStorage.setItem(
      "instructionsArray",
      JSON.stringify(
        instructions.filter(
          (stepIndex) => instructions.indexOf(stepIndex) !== index
        )
      )
    );
  };

  return (
    <>
      <div className="flex gap-3 justify-between font-noto mt-14">
        <textarea
          type="area"
          className="border p-2 rounded grow"
          id="ingredientInput"
          value={step}
          onChange={inputHandler}
        />
        <button onClick={addStep} type="button" className="px-7 bg-green-300">
          Add
        </button>
      </div>
      <ul className="overflow-x-scroll no-scrollbar h-full border-none p-0">
        {instructions.map((step, index) => {
          return (
            <div
              className="flex items-center justify-between pt-6 pb-2 border-b-2 border-zinc-200"
              key={index}
            >
              <li>{step}</li>
              <div onClick={removeStep.bind(null, index)}>
                <RemoveIcon />
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default CustomRecipeInstructions;
