import { useState } from "react";
import CheckIcon from "../UI/checkIcon";
import RemoveIcon from "../UI/removeIcon";

const ShoppingList = ({ shoppingList }) => {
  return (
    <>
      {shoppingList <= 0 && <h1>Shopping List is Empty</h1>}
      <h1 className="text-3xl text-center m-3 font-Geologica">Shopping List</h1>
      <div className="text-start p-4">
        {shoppingList.map((recipeIngredients, index) => {
          return (
            <div key={index} className="flex flex-col gap-3 justify-center">
              <div className="pt-5 flex items-center gap-3">
                <h1 className="text-3xl font-Caveat">
                  {recipeIngredients.title}
                </h1>
                <CheckIcon />
                <RemoveIcon />
              </div>
              <ul>
                {recipeIngredients.ingredients.map((items) => (
                  <li className="font-noto text-lg p-1 flex gap-2 items-center">
                    <input
                      className="h-5 w-5 accent-green-400"
                      type="checkbox"
                    />
                    <div className="w-10/12">{items}</div>
                  </li>
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
