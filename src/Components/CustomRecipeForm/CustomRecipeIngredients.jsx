import React from "react";
import { useEffect, useState } from "react";

//todo: add input to add ingredients
const CustomRecipeIngredients = () => {
  //Add ingredientList to local Storage to persist after page reload
  const [ingredientList, setIngredientList] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {}, []);

  const addIngredient = (event) => {
    event.preventDefault();
    setIngredientList([...ingredientList, item]);
    setItem(" ");
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
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </>
  );
};

export default CustomRecipeIngredients;
