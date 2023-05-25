import { useState } from "react";
import Nav from "./Components/Navigation/Nav";
import Recipes from "./Pages/Recipes";

const App = () => {

  const [searchInput, setSearchInput] = useState('');
  const [recipeData, setRecipeData] = useState([]);


  // todo: create custom hook for API calls 
  async function fecthData() {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=9a988b71457d457fbe5c178fc9c8bcd4&query=${searchInput}&addRecipeInformation=true&fillIngredients=true&instructionsRequired=true`
    );
    const data = await response.json();
    setRecipeData(data.results)
    console.log(data.results);
  }

  // todo: implement react router 
  return (
    <>
      <Nav setSearchInput={setSearchInput} fecthData={fecthData} />
      <Recipes recipeData={recipeData}/>
    </>
  );
};

export default App;
