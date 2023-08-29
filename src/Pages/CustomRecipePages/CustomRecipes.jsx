import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomRecipeList from "./CustomRecipeList";

const CustomRecipes = ({ setRecipeInfo }) => {
  const customRecipes = useSelector((state) => state.customRecipe);

  //create component that renders a list of custom recipes
  return (
    <div className="bg-eggshell h-screen">
      <div className="flex flex-col justify-center lg:w-8/12 mx-auto">
      
          <Link
            className="text-center text-lg font-noto mt-5 border-vandyke border-2 mx-auto w-10/12 md:w-8/12  p-2 rounded cursor-pointer hover:bg-vandyke hover:text-eggshell transition-all ease-in-out"
            to="/customRecipes/createCustomRecipe"
          >
            Add Custom Recipe
          </Link>
    
        <div className="bg-eggshell mt-5">
          {customRecipes.customRecipeList.length == [] && (
            <h2 className="text-2xl text-center">No Custom Recipes</h2>
          )}
          <CustomRecipeList setRecipeInfo={setRecipeInfo}/>

        </div>
      </div>

      {/* <CustomRecipeForm /> */}
    </div>
  );
};

export default CustomRecipes;
