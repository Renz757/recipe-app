import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CustomRecipeList = ({ setRecipeInfo }) => {
  const customRecipes = useSelector((state) => state.customRecipe);
  return (
    <>
      {customRecipes.customRecipeList.map((recipe, index) => {
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
                  <p>{`Prep Time: ${recipe.cookTime} Minutes - `}</p>
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
    </>
  );
};

export default CustomRecipeList;
