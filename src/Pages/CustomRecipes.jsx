import { useState } from "react";

const CustomRecipes = () => {
  const [customRepices, setCustomRecipes] = useState([]);
  return (
    <>
     {customRepices ? <h1>No Custom Recipes</h1> : <h1>Custom Recipes</h1>}
    </>
  );
};

export default CustomRecipes;
