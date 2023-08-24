import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import DefaultImage from "../../Components/DefaultImage";

const CustomRecipeList = ({ setRecipeInfo }) => {
  const customRecipes = useSelector((state) => state.customRecipe);
  const [imageNotLoaded, setImageNotLoaded] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:max-w-5xl md:mx-auto lg:grid-cols-2 md:pt-7 lg:gap-4 bg-eggshell">
        {customRecipes.customRecipeList.map((recipe, index) => {
          return (
            <div key={index} className="">
              <div className="">
                <div className="">
                  <DefaultImage
                    src={recipe.image}
                    alt={recipe.title}
                    key={index}
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
      </div>
    </>
  );
};

export default CustomRecipeList;
