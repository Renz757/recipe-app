import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomRecipes = ({ setRecipeInfo }) => {
  const customRecipes = useSelector((state) => state.customRecipe);

  //create component that renders a list of custom recipes
  return (
    <div className="bg-eggshell h-screen">
      <div className="flex flex-col justify-center lg:w-8/12 mx-auto">
      
          <Link
            className="p-4 mt-5 bg-green-400 rounded-xl w-8/12 mx-auto text-center"
            to="/customRecipes/createCustomRecipe"
          >
            Add Custom Recipe
          </Link>
    
        <div className="bg-eggshell mt-5">
          {customRecipes.customRecipeList.length == [] && (
            <h2 className="text-2xl text-center">No Custom Recipes</h2>
          )}
          {customRecipes.customRecipeList.map((recipe, index) => {
            return (
              <div key={index} className="grid grid-cols-1">
                <div className="">
                  <div className="">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      key={index}
                      className="w-full aspect-video object-cover blur-none"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-3xl font-Caveat">{recipe.title}</h1>
                    <div className="flex gap-2 font-noto">
                      <p>{`Prep Time: ${recipe.estimatedCookTime} Minutes - `}</p>
                      <p>{`Servings: ${recipe.servingSize}`}</p>
                    </div>

                    <Link
                      to={`/recipeInfo/${recipe.dbID}`}
                      onClick={() => setRecipeInfo(recipe.dbID)}
                    >
                      <p className="underline font-Geologica text-zinc-600">
                        Show Recipe
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <CustomRecipeForm /> */}
    </div>
  );
};

export default CustomRecipes;
