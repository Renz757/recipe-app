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

  const [recipeData, setRecipeData] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);

  //implement localStorage ... eventually firebase
  //check if receipe is already in favorites
  const onUpdateFavorite = (favObject) => {
    //if id's match, get index of favorite
    const existingFavoriteIndex = favorites.findIndex(
      (index) => index.id === favObject.id
    );

    const existingFavorite = favorites[existingFavoriteIndex];

    if (existingFavorite) {
      //if recipe is in favorites, remove
      setFavorites(favorites.filter((index) => index.id !== favObject.id));
    } else {
      //if recipe is not in favorites, add
      setFavorites([...favorites, favObject]);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout setRecipeData={setRecipeData} />,
      children: [
        {
          path: "/",
          element: <Home setRecipeInfo={setRecipeInfo}/>,
        },
        {
          path: "/recipes",
          element: (
            <Recipes recipeData={recipeData} setRecipeInfo={setRecipeInfo}/>
          ),
        },
        {
          path: "/recipeInfo/:recipeId",
          element: (
            <RecipeInfo
              recipeInfoId={recipeInfo}
              onUpdateFavorite={onUpdateFavorite}
              favorites={favorites}
            />
          ),
        },
        {
          path: "/favorites",
          element: (
            <Favorites favorites={favorites} setRecipeInfo={setRecipeInfo} />
          ),
        },
        {
          path: "/shoppingList",
          element: (
            <ShoppingList />
          ),
        },
        {
          path: "/customRecipes",
          element: (
            <CustomRecipes />
          ),
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
