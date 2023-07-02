import CheckIcon from "../UI/checkIcon";
import RemoveIcon from "../UI/removeIcon";

const ShoppingList = ({ shoppingList, onRemoveIngredients }) => {
  return (
    <div className="bg-eggshell h-screen">
      <h1 className="text-3xl text-center p-3 font-Geologica">Shopping List</h1>
      {shoppingList <= 0 && <div className="text-center mt-20 text-3xl">Browse Recipes to Add Ingredients to Shopping List!</div>}

      <div className="text-start p-4">
        {shoppingList.map((recipeIngredients, index) => {
          return (
            <div key={index} className="flex flex-col gap-3 justify-center">
              <div className="pt-5 flex items-center gap-3">
                <h1 className="text-3xl font-Caveat">
                  {recipeIngredients.title}
                </h1>
                <CheckIcon />
                <div
                  onClick={onRemoveIngredients.bind(null, recipeIngredients.id)}
                >
                  <RemoveIcon />
                </div>
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
    </div>
  );
};

export default ShoppingList;
