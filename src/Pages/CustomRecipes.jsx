import { useState } from "react";
import CustomRecipeForm from "../Components/CustomRecipeForm/CustomRecipeForm";

const CustomRecipes = () => {
  const [customRepices, setCustomRecipes] = useState([]);
  return (
    <>
     <CustomRecipeForm />
    </>
  );
};

export default CustomRecipes;
