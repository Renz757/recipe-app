import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import RootLayout from "./Pages/Root";

const App = () => {
  //make a context with use reducer hook or implement redux for state management

  const [recipeData, setRecipeData] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const getIngredients = (id) => {
    setRecipeInfo(recipeData.filter((recipeInfo) => recipeInfo.id == id));
  };

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
          element: <Home getIngredients={getIngredients} />,
        },
        {
          path: "/recipes",
          element: (
            <Recipes recipeData={recipeData} getIngredients={getIngredients} />
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
            <Favorites favorites={favorites} getIngredients={getIngredients} />
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
