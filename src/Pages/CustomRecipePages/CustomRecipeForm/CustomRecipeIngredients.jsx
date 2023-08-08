import React from "react";

const IngredientsList = ({ingredients, setIngredients}) => {

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <div>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="mb-2 flex gap-2 items-center">
            <input
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder="2 cups of flour, etc..."
              className="mt-1 p-2 w-full border rounded-md"
            />
            <button type="button" className="bg-red-500 rounded-md p-2" onClick={() => removeIngredient(index)}>Remove</button>
          </div>
        ))}
        <button className="bg-green-500 p-2 rounded-md" type="button" onClick={addIngredient}>Add Ingredient</button>
      </div>
    </div>
  );
}

export default IngredientsList;
