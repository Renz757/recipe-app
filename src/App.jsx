import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./Components/Navigation/Nav";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);
 

  // todo: create custom hook for API calls
  async function fecthData() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=9a988b71457d457fbe5c178fc9c8bcd4&query=${searchInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
    );
    const data = await response.json();
    setRecipeData(data.results);
    console.log(data.results);
  }

  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav setSearchInput={setSearchInput} fecthData={fecthData} />,
      children: [
        { path: "/", element: <Recipes recipeData={recipeData} /> },
        { path: "/recipe/:recipeId", element: <RecipeInfo /> },
      ],
    },
  ]);

  // todo: implement react router
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
