import { shoppingListActions } from "../store/shoppingList-slice";
import { useSelector, useDispatch } from "react-redux";
import CheckIcon from "../UI/checkIcon";
import RemoveIcon from "../UI/removeIcon";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const shoppingList = useSelector((state) => state.shoppingList.shoppingList);
  const user = useSelector((state) => state.auth.user);

  const removeHandler = (id) => {
    dispatch(shoppingListActions.removeIngredients({ id: id, uid: user.uid }));
  };

  return (
    <div className="bg-eggshell h-auto">
      <h1 className="text-3xl text-center p-3 font-Geologica">Shopping List</h1>
      {shoppingList == 0 && (
        <div className="bg-eggshell h-screen text-center w-screen pt-10 text-3xl">
          Browse Recipes to Add Ingredients to Shopping List!
        </div>
      )}

      <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto lg:grid-cols-none lg:block lg:columns-2 lg:gap-8 lg:h-auto">
        {shoppingList.map((recipeIngredients, index) => {
          return (
            <div key={index} className="pt-4 lg:h-full">
              <div className="pt-5 md:pt-0 flex items-center gap-3">
                <h1 className="text-3xl font-Caveat">
                  {recipeIngredients.title}
                </h1>
                <CheckIcon />
                <div onClick={removeHandler.bind(null, recipeIngredients.dbID)}>
                  <RemoveIcon />
                </div>
              </div>
              <ul>
                {recipeIngredients.ingredients.map((items, index) => (
                  <li key={index} className="font-noto text-lg p-1 flex gap-2 items-center">
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
