import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const CustomRecipes = ({ setRecipeInfo }) => {

  const customRecipes = useSelector((state) => state.customRecipe);

  //create component that renders a list of custom recipes
  return (
    <div className="bg-eggshell h-full">
      <div className="flex flex-col justify-center gap-y-6 lg:w-8/12 mx-auto">
        <div>
          {customRecipes.customRecipeList.map((recipe, index) => {
            if (index < 2) {
              return (
                <div key={index} className=" grid grid-cols-1">
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
            }
          })}
        </div>

        <Link
          className="p-4 bg-blue-400 rounded-xl w-8/12 mx-auto text-center"
          to="/customRecipes/customRecipeList"
        >
          View All
        </Link>

        <Link
          className="p-4 bg-green-400 rounded-xl w-8/12 mx-auto text-center"
          to="/customRecipes/createCustomRecipe"
        >
          Add Custom Recipe
        </Link>
      </div>

      {/* <CustomRecipeForm /> */}
    </div>
  );
};

export default CustomRecipes;
