import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./Components/Navigation/Nav";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";
import Favorites from "./Pages/Favorites";
import RootLayout from "./Pages/Root";

const App = () => {
  //make a context with use reducer hook or implement redux for state management
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [recipeInfo, setRecipeInfo] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // todo: create custom hook for API calls
  //todo: handler errors
  async function fecthData() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${searchInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
    );
    const data = await response.json();
    setRecipeData(data.results);
  }

  const getIngredients = (id) => {
    setRecipeInfo(recipeData.filter((recipeInfo) => recipeInfo.id == id));
  };

  //implement localStorage ... eventually firebase
  const onAddFav = (favObject) => {
    setFavorites([...favorites, favObject]);
  };

  //todo: create removeFavorite function

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout setSearchInput={setSearchInput} fecthData={fecthData} />
      ),
      children: [
        {
          path: "/",
          element: (
            <Recipes recipeData={recipeData} getIngredients={getIngredients} />
          ),
        },
        {
          path: "/recipeInfo/:recipeId",
          element: <RecipeInfo recipeInfo={recipeInfo} onAddFav={onAddFav} />,
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
      {/* <RouterProvider router={router} /> */}

      <RouterProvider router={router} />
    </>
  );
};

export default App;
