import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./Components/Navigation/Nav";
import Recipes from "./Pages/Recipes";
import RecipeInfo from "./Pages/RecipeInfo";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [recipeData, setRecipeData] = useState([]);
  const [recipeInfo, setRecipeInfo
  ] = useState([]);

  // todo: create custom hook for API calls
  async function fecthData() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${searchInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
    );
    const data = await response.json();
    setRecipeData(data.results);
    console.log("request sent for receipe", data.results);
  }

   function getIngredients(id) {
    setRecipeInfo
    (recipeData.filter(recipeInfo => recipeInfo.id == id))
    console.log(recipeInfo)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Recipes recipeData={recipeData} getIngredients={getIngredients}/>
      ),
    },
    {
      path: "/recipeInfo/:recipeId",
      element: <RecipeInfo recipeInfo={recipeInfo}/>,
    },
  ]);

  // todo: implement react router
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <Nav setSearchInput={setSearchInput} fecthData={fecthData} />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
