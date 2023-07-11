import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const CustomRecipes = () => {
  const customRecipes = useSelector((state) => state.customRecipe);
  console.log(customRecipes.customRecipeList);

  //create component that renders a list of custom recipes 
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
