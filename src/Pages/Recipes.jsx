import { Link } from "react-router-dom";
import HeartIcon from "../UI/heartIcon";

const Recipes = ({ recipeData, getIngredients }) => {
  console.log(recipeData);
  return (
    <>
      {recipeData == [] ? (
        <p>Search a Recipe!</p>
      ) : (
        recipeData.map((recipe, index) => {
          return (
            <div key={index} className=" grid grid-cols-1">
              <div className="">
                <div className="">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    key={recipe.id}
                    className="w-full aspect-video object-cover blur-none"
                  />
                </div>
                <div className="p-2">
                  <h1 className="text-2xl font-Geologica">{recipe.title}</h1>
                  <div className="flex gap-2 font-noto">
                    <p>{`Prep Time: ${recipe.readyInMinutes} Minutes - `}</p>
                    <p>{`Servings: ${recipe.servings}`}</p>
                  </div>
                 
                    <Link
                      to={`/recipeInfo/${recipe.id}`}
                      onClick={getIngredients.bind(null, recipe.id)}
                    >
                      <p className="underline font-Geologica text-zinc-600">Show Recipe</p>
                    </Link>
                  
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default Recipes;
