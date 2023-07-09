import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { customRecipeActions } from "../../store/customRecipes-slice";
import RemoveIcon from "../../UI/removeIcon";

const CustomRecipeIngredients = () => {
  const dispatch = useDispatch();
  const ingredientList = useSelector((state) => state.customRecipe);

  const addIngredient = () => {
    dispatch(customRecipeActions.addIngredients());
  };

  const removeIngredient = (index) => {
    dispatch(customRecipeActions.removeIngredients(index));
  };

  const inputHandler = (event) => {
    dispatch(customRecipeActions.setItem(event.target.value));
  };

  return (
    <>
      <div className="flex gap-3 justify-between font-noto mt-7">
        <input
          type="text"
          className="border p-2 rounded"
          id="ingredientInput"
          onChange={inputHandler}
          // add ingredient using Enter key, without submitting form
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              dispatch(customRecipeActions.addIngredients());
            }
          }}
          value={ingredientList.item}
        />
        <button
          onClick={addIngredient}
          type="button"
          className="px-7 bg-green-300"
        >
          Add
        </button>
      </div>

      <ul className="overflow-x-scroll no-scrollbar h-full border-none p-0">
        {ingredientList.ingredients.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between pt-6 pb-2 border-b-2 border-zinc-200"
            >
              <li className="p-0 border-none">{item}</li>
              <div onClick={removeIngredient.bind(null, index)}>
                <RemoveIcon />
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default CustomRecipeIngredients;
