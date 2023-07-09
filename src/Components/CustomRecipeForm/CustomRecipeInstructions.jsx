import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { customRecipeActions } from "../../store/customRecipes-slice";
import RemoveIcon from "../../UI/removeIcon";

const CustomRecipeInstructions = () => {
  const dispatch = useDispatch();
  const instructions = useSelector((state) => state.customRecipe);


  const inputHandler = (event) => {
    dispatch(customRecipeActions.setStep(event.target.value))
  };

  const addStep = () => {
    dispatch(customRecipeActions.addStep())
  };

  const removeStep = (index) => {
    dispatch(customRecipeActions.removeStep(index))
  };

  return (
    <>
      <div className="flex gap-3 justify-between font-noto mt-7">
        <textarea
          type="area"
          className="border p-2 rounded grow"
          id="ingredientInput"
          value={instructions.step}
          onChange={inputHandler}
        />
        <button onClick={addStep} type="button" className="px-7 bg-green-300">
          Add
        </button>
      </div>
      <ul className="overflow-x-scroll no-scrollbar h-full border-none p-0">
        {instructions.instructions.map((step, index) => {
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
