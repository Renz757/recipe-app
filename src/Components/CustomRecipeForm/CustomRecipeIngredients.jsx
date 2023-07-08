import React from "react";
import { useEffect, useState } from "react";
import RemoveIcon from "../../UI/removeIcon";

//todo: add input to add ingredients\
const CustomRecipeIngredients = () => {

  const ingredientArray = JSON.parse(
    localStorage.getItem("ingredientArray") || "[]"
  );

  //Add ingredientList to local Storage to persist after page reload
  const [ingredientList, setIngredientList] = useState(ingredientArray);
  const [item, setItem] = useState("");

  useEffect(() => {}, []);

  const addIngredient = (event) => {
    event.preventDefault();
    setIngredientList([...ingredientList, item]);
    localStorage.setItem(
      "ingredientArray",
      JSON.stringify([...ingredientList, item])
    );
    setItem(" ");
  };

  const removeIngredient = (index) => {
    setIngredientList(
      ingredientList.filter(
        (itemIndex) => ingredientList.indexOf(itemIndex) !== index
      )
    );
    localStorage.setItem(
      "ingredientArray",
      JSON.stringify(
        ingredientList.filter(
          (itemIndex) => ingredientList.indexOf(itemIndex) !== index
        )
      )
    );
  };

  const inputHandler = (event) => {
    event.preventDefault();
    setItem(event.target.value);
  };

  return (
    <>
      <div className="flex gap-3 justify-between font-noto mt-14">
        <input
          type="text"
          className="border p-2 rounded"
          id="ingredientInput"
          onChange={inputHandler}
          // add ingredient using Enter key, without submitting form
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIngredientList([...ingredientList, item]);
              localStorage.setItem(
                "ingredientArray",
                JSON.stringify([...ingredientList, item])
              );
              setItem(" ");
            }
          }}
          value={item}
        />
        <button
          onClick={addIngredient}
          type="button"
          className="px-7 bg-green-300"
        >
          Add
        </button>
      </div>

      <ul>
        {ingredientList.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between pt-6 pb-2 border-b-2 border-zinc-200"
            >
              <li>{item}</li>
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
