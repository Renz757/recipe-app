import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import ShoppingList from "./Pages/shoppingList";
import CustomRecipes from "./Pages/CustomRecipes";
import RootLayout from "./Pages/Root";

const App = () => {
  //make a context with use reducer hook or implement redux for state management
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);


  const onUpdateIngredients = (ingredientObject) => {
    const existingIngredientIndex = shoppingList.findIndex(
      (index) => index.id === ingredientObject.id
    );

    const existingIngredients = shoppingList[existingIngredientIndex];

    if (existingIngredients) {
      //if recipe is in favorites, remove
      console.log("recipe is in the shopping cart ");
    } else {
      //if recipe is not in favorites, add
      setShoppingList([...shoppingList, ingredientObject]);
    }
  };

  const onRemoveIngredients = (id) => {
    setShoppingList(shoppingList.filter((index) => index.id !== id));
    console.log(shoppingList);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home setRecipeInfo={setRecipeInfo} />,
        },
        {
          path: "/recipes",
          element: <Recipes setRecipeInfo={setRecipeInfo} />,
        },
        {
          path: "/recipeInfo/:recipeId",
          element: (
            <RecipeInfo
              recipeInfoId={recipeInfo}
              onUpdateIngredients={onUpdateIngredients}
              setRecipeInfo={setRecipeInfo}
            />
          ),
        },
        {
          path: "/favorites",
          element: (
            <Favorites setRecipeInfo={setRecipeInfo}/>
          ),
        },
        {
          path: "/shoppingList",
          element: (
            <ShoppingList
              shoppingList={shoppingList}
              onRemoveIngredients={onRemoveIngredients}
            />
          ),
        },
        {
          path: "/customRecipes",
          element: <CustomRecipes />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
