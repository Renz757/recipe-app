import { useState } from "react";

const ShoppingList = ({ shoppingList }) => {
  return (
    <>
      {shoppingList <= 0 && <h1>Shopping List is Empty</h1>}
      <h1 className="text-3xl text-center m-3 font-Geologica">Shopping List</h1>
      <div className="text-start p-4">
        {shoppingList.map((recipeIngredients, index) => {
          return (
            <div key={index} className="flex flex-col gap-3 justify-center">
              <h2 className="pt-5 text-3xl font-Caveat">{recipeIngredients.title}</h2>
              <ul>
                {recipeIngredients.ingredients.map((items) => (
                  <li className="font-noto text-lg p-1">{items}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShoppingList;
