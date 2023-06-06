import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./Components/Navigation/Nav";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import RootLayout from "./Pages/Root";
import useHttp from "./hooks/use-https";

const App = () => {
  //make a context with use reducer hook or implement redux for state management
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const transformRecipeData = (recepieObj) => {
    setRecipeData(recepieObj.results);
  };

  const { error, isLoading, fecthData } = useHttp(
    {
      url: `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${searchInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`,
    },
    transformRecipeData
  );

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
      setFavorites(favorites.filter(index => index.id !== favObject.id))
    } else {
      //if recipe is not in favorites, add
      setFavorites([...favorites, favObject]);
    }
  };

 



  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout setSearchInput={setSearchInput} fecthData={fecthData} />
      ),
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
          element: <RecipeInfo recipeInfo={recipeInfo} onUpdateFavorite={onUpdateFavorite} favorites={favorites}/>,
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
    </>
  );
};

export default App;
