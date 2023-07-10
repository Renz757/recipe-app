import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const CustomRecipes = () => {
  const customRecipes = useSelector((state) => state.customRecipe);
  console.log(customRecipes.customRecipeList);
  return (
    <>
      <div>
        <Link to="/customRecipes/createCustomRecipe">Add New Recipe</Link>
      </div>
      
      {customRecipes.customRecipeList ? (
        <p>There are no custom recipes</p>
      ) : (
        <p>Render Array</p>
      )}

      {/* <CustomRecipeForm /> */}
    </>
  );
};

export default CustomRecipes;
