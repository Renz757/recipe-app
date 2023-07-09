import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomRecipeForm from "../Components/CustomRecipeForm/CustomRecipeForm";

const CustomRecipes = () => {
  const customRecipes = useSelector((state) => state.customRecipe);
  return (
    <>
    
      <CustomRecipeForm />
    </>
  );
};

export default CustomRecipes;
