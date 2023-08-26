import React from "react";
import { useSelector } from "react-redux";
import DefaultImage from "../../Components/DefaultImage";
import RecipeDetails from "../../Components/RecipeDetails";

const CustomRecipeList = ({ setRecipeInfo }) => {
  const customRecipes = useSelector((state) => state.customRecipe);

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
                <RecipeDetails
                  title={recipe.title}
                  id={recipe.dbID}
                  readyInMinutes={recipe.cookTime}
                  servings={recipe.servingSize}
                  setRecipeInfo={setRecipeInfo}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CustomRecipeList;
